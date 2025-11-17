"use client"

import { useState, useEffect } from 'react';

export function usePageLoader(duration: number = 1500) {
  
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Force the loader to stay for at least the specified duration
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, duration);
  
    return () => clearTimeout(timer);
  }, [duration]);

  return isLoading;
}

