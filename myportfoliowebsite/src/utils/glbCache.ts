"use client"

/**
 * IndexedDB Cache Utility for GLB Models
 * Provides persistent caching with 24-hour expiration
 */

const DB_NAME = 'glb-models-cache';
const DB_VERSION = 1;
const STORE_NAME = 'glbFiles';
const CACHE_EXPIRY_HOURS = 24;

interface CachedGLB {
  url: string;
  data: ArrayBuffer;
  timestamp: number;
  size: number;
}

class GLBCache {
  private db: IDBDatabase | null = null;
  private initPromise: Promise<IDBDatabase> | null = null;

  private async ensureDB(): Promise<IDBDatabase> {
    if (this.db) {
      return this.db;
    }

    if (this.initPromise) {
      return this.initPromise;
    }

    this.initPromise = new Promise((resolve, reject) => {
      console.log(`[GLB Cache] Initializing database: ${DB_NAME} v${DB_VERSION}...`);

      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => {
        console.error('[GLB Cache] Error opening database:', request.error);
        reject(request.error);
        this.initPromise = null;
      };

      request.onsuccess = () => {
        this.db = request.result;
        console.log('[GLB Cache] Database opened successfully');
        resolve(this.db);
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        // Create object store if it doesn't exist
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          const store = db.createObjectStore(STORE_NAME, { keyPath: 'url' });
          store.createIndex('timestamp', 'timestamp', { unique: false });
          console.log(`[GLB Cache] Created object store: ${STORE_NAME}`);
        }
      };
    });

    return this.initPromise;
  }

  async has(url: string): Promise<boolean> {
    const db = await this.ensureDB();
    const transaction = db.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);

    return new Promise((resolve, reject) => {
      const request = store.get(url);

      request.onerror = () => {
        console.error(`[GLB Cache] Error checking if ${url} exists:`, request.error);
        reject(request.error);
      };

      request.onsuccess = () => {
        resolve(!!request.result);
      };
    });
  }

  async get(url: string): Promise<ArrayBuffer | null> {
    try {
      const db = await this.ensureDB();
      const transaction = db.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);

      return new Promise((resolve, reject) => {
        const request = store.get(url);

        request.onerror = () => {
          console.error(`[GLB Cache] Error getting ${url}:`, request.error);
          reject(request.error);
        };

        request.onsuccess = () => {
          const result = request.result as CachedGLB | undefined;

          if (!result) {
            // Debug: Log what we're looking for vs what's available
            store.getAllKeys().onsuccess = (debugEvent: any) => {
              const allKeys = debugEvent.target.result as string[];
              console.log(`[GLB Cache] Cache MISS: ${url} - not found in cache`);
              if (allKeys.length > 0) {
                console.log(`[GLB Cache] 🔍 Looking for: "${url}"`);
                console.log(`[GLB Cache] 📦 Available keys (${allKeys.length}):`, allKeys.slice(0, 10));
                // Check for similar keys
                const similarKey = allKeys.find(k => k.includes(url.split('/').pop() || ''));
                if (similarKey) {
                  console.log(`[GLB Cache] ⚠️ Similar key found: "${similarKey}" - might be key mismatch!`);
                }
              }
            };
            resolve(null);
            return;
          }

          const now = Date.now();
          const ageMs = now - result.timestamp;
          const ageHours = ageMs / (1000 * 60 * 60);
          const isExpired = ageHours > CACHE_EXPIRY_HOURS;

          if (isExpired) {
            console.log(
              `[GLB Cache] Cache EXPIRED: ${url} (${this.formatSize(result.size)}, cached ${this.formatAge(ageMs)} ago) - will fetch fresh copy`
            );
            this.delete(url).catch(console.error);
            resolve(null);
            return;
          }

          const remainingHours = CACHE_EXPIRY_HOURS - ageHours;
          console.log(
            `[GLB Cache] Cache HIT: ${url} (${this.formatSize(result.size)}, cached ${this.formatAge(ageMs)} ago, expires in ${remainingHours.toFixed(1)}h)`
          );
          resolve(result.data);
        };
      });
    } catch (error) {
      console.error(`[GLB Cache] Error retrieving ${url} from cache:`, error);
      return null;
    }
  }

  async set(url: string, data: ArrayBuffer): Promise<void> {
    try {
      const db = await this.ensureDB();
      const transaction = db.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);

      const cachedGLB: CachedGLB = {
        url,
        data,
        timestamp: Date.now(),
        size: data.byteLength,
      };

      return new Promise((resolve, reject) => {
        const request = store.put(cachedGLB);

        request.onerror = () => {
          console.error(`[GLB Cache] Error storing ${url}:`, request.error);
          reject(request.error);
        };

        request.onsuccess = () => {
          console.log(
            `[GLB Cache] Stored: ${url} (${this.formatSize(data.byteLength)}) - expires in ${CACHE_EXPIRY_HOURS}h`
          );
          resolve();
        };
      });
    } catch (error) {
      console.error(`[GLB Cache] Error storing ${url} in cache:`, error);
      throw error;
    }
  }

  async delete(url: string): Promise<void> {
    try {
      const db = await this.ensureDB();
      const transaction = db.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);

      return new Promise((resolve, reject) => {
        const request = store.delete(url);

        request.onerror = () => {
          console.error(`[GLB Cache] Error deleting ${url}:`, request.error);
          reject(request.error);
        };

        request.onsuccess = () => {
          console.log(`[GLB Cache] Deleted: ${url}`);
          resolve();
        };
      });
    } catch (error) {
      console.error(`[GLB Cache] Error deleting ${url} from cache:`, error);
      throw error;
    }
  }

  async clear(): Promise<void> {
    try {
      const db = await this.ensureDB();
      const transaction = db.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);

      return new Promise((resolve, reject) => {
        const request = store.clear();

        request.onerror = () => {
          console.error('[GLB Cache] Error clearing cache:', request.error);
          reject(request.error);
        };

        request.onsuccess = () => {
          console.log('[GLB Cache] Cache cleared');
          resolve();
        };
      });
    } catch (error) {
      console.error('[GLB Cache] Error clearing cache:', error);
      throw error;
    }
  }

  async getAllKeys(): Promise<string[]> {
    try {
      const db = await this.ensureDB();
      const transaction = db.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);

      return new Promise((resolve, reject) => {
        const request = store.getAllKeys();

        request.onerror = () => {
          console.error('[GLB Cache] Error getting all keys:', request.error);
          reject(request.error);
        };

        request.onsuccess = () => {
          const keys = request.result as string[];
          console.log(`[GLB Cache] Found ${keys.length} cached files`);
          resolve(keys);
        };
      });
    } catch (error) {
      console.error('[GLB Cache] Error getting all keys:', error);
      return [];
    }
  }

  async cleanupExpired(): Promise<number> {
    try {
      const db = await this.ensureDB();
      const transaction = db.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const index = store.index('timestamp');

      const now = Date.now();
      const expiryMs = CACHE_EXPIRY_HOURS * 60 * 60 * 1000;
      const cutoffTime = now - expiryMs;

      return new Promise((resolve, reject) => {
        const request = index.openCursor(IDBKeyRange.upperBound(cutoffTime));

        let deletedCount = 0;

        request.onerror = () => {
          console.error('[GLB Cache] Error cleaning up expired entries:', request.error);
          reject(request.error);
        };

        request.onsuccess = (event) => {
          const cursor = (event.target as IDBRequest).result;
          if (cursor) {
            cursor.delete();
            deletedCount++;
            cursor.continue();
          } else {
            if (deletedCount > 0) {
              console.log(`[GLB Cache] Cleaned up ${deletedCount} expired entries`);
            }
            resolve(deletedCount);
          }
        };
      });
    } catch (error) {
      console.error('[GLB Cache] Error cleaning up expired entries:', error);
      return 0;
    }
  }

  async logStats(): Promise<void> {
    try {
      const db = await this.ensureDB();
      const transaction = db.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);

      return new Promise((resolve) => {
        const request = store.getAll();

        request.onsuccess = () => {
          const items = request.result as CachedGLB[];
          const totalSize = items.reduce((sum, item) => sum + item.size, 0);

          if (items.length > 0) {
            const now = Date.now();
            const oldest = Math.min(...items.map(item => item.timestamp));
            const newest = Math.max(...items.map(item => item.timestamp));

            console.log(`[GLB Cache] Cache Statistics:`);
            console.log(`[GLB Cache]   - Total files: ${items.length}`);
            console.log(`[GLB Cache]   - Total size: ${this.formatSize(totalSize)}`);
            console.log(`[GLB Cache]   - Oldest entry: ${this.formatAge(now - oldest)} old`);
            console.log(`[GLB Cache]   - Newest entry: ${this.formatAge(now - newest)} old`);
          } else {
            console.log('[GLB Cache] Cache is empty');
          }

          resolve();
        };

        request.onerror = () => {
          console.error('[GLB Cache] Error getting cache stats');
          resolve();
        };
      });
    } catch (error) {
      console.error('[GLB Cache] Error getting cache stats:', error);
    }
  }

  private formatSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  }

  private formatAge(ms: number): string {
    if (ms < 1000) return `${Math.round(ms)}ms`;
    if (ms < 60 * 1000) return `${(ms / 1000).toFixed(1)}s`;
    if (ms < 60 * 60 * 1000) return `${Math.round(ms / (60 * 1000))}m`;
    return `${Math.round(ms / (60 * 60 * 1000))}h`;
  }
}

export const glbCache = new GLBCache();
