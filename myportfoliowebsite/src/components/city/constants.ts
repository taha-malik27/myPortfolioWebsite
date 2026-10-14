export const WORLD = 7600;
export const CITY_H = 840;
export const GROUND = 760;
export const INTRO_X = 700;
export const DRIFT_SPEED = 48;
export const IDLE_MS = 1500;
export const MAX_FRAME = 0.05;
export const LANDSCAPE_CITY_MQ =
  "(orientation: landscape) and (max-height: 560px) and (max-width: 960px)";
/** Day-to-day 16:9 and 16:10 desktops. Excludes ultrawide (~21:9 and wider). */
export const DESKTOP_16_9_MQ =
  "(min-width: 961px) and (min-aspect-ratio: 1.45) and (max-aspect-ratio: 2.2)";
export const LANDSCAPE_CITY_FIT = 0.75;

export const LAYERS = [
  { id: "far", ratio: 0.15, z: 3 },
  { id: "mid", ratio: 0.35, z: 4 },
  { id: "near", ratio: 0.65, z: 5 },
  { id: "fore", ratio: 1, z: 7 },
] as const;

export type LayerId = (typeof LAYERS)[number]["id"];

export const FX_MS: Record<string, number> = {
  tower: 2200,
  shop: 3400,
  antenna: 1800,
  flyer: 1700,
  fan: 4600,
  citizen: 1900,
  train: 2800,
  mind: 2600,
  quant: 2200,
  tm: 1500,
};

export function hash(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function wrap(value: number, size: number): number {
  return ((value % size) + size) % size;
}
