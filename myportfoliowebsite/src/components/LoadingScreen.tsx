"use client"

import React, {JSX, useEffect, useState} from 'react';
import Image from 'next/image';

interface LoadingScreenProps {
  isLoading: boolean;
}

export default function LoadingScreen({ isLoading }: LoadingScreenProps):JSX.Element|null {
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    if (isLoading) {
      setMounted(true);
      return;
    }

    const timer = window.setTimeout(() => setMounted(false), 300);
    return () => window.clearTimeout(timer);
  }, [isLoading]);

  if (!mounted) return null;

  return (
    <div
      className="loading-screen-container"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'transparent',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
        opacity: isLoading ? 1 : 0,
        transition: 'opacity 0.3s ease-out',
        pointerEvents: 'none',
      }}
    >
      <div className="loading-screen-icon-wrapper" style={{
        animation: 'loaderFadeIn 0.4s ease-out forwards',
      }}>
        <Image 
          src="/images/SynthSun.gif" 
          alt="Loading..." 
          width={150} 
          height={150}
          priority
          className="loading-screen-icon"
        />
      </div>
      <style jsx>{`
        @keyframes loaderFadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

