"use client"

/**
 * Detects if the user is on a mobile device
 * Checks both user agent and screen width for reliability
 */
export function isMobileDevice(): boolean {
  // Client-side check only (SSR-safe)
  if (typeof window === 'undefined') {
    return false;
  }

  // Check screen width first (fastest check)
  const isSmallScreen = window.innerWidth <= 768;

  // Check user agent for mobile devices
  const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
  const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
  const isMobileUserAgent = mobileRegex.test(userAgent);

  // Check for touch capability
  const hasTouchScreen = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  // Consider it mobile if it has a small screen OR mobile user agent AND touch capability
  return isSmallScreen || (isMobileUserAgent && hasTouchScreen);
}

