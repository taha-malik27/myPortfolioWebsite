"use client"

import React, {JSX} from 'react';
import Image from 'next/image';

interface LoadingScreenProps {
  isLoading: boolean;
}

export default function LoadingScreen({ isLoading }: LoadingScreenProps):JSX.Element|null {
  if (!isLoading) return null;

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'transparent', // Transparent so gradient and particles show through
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10, // Above particles and gradient, below nothing
        animation: 'fadeOut 0.3s ease-out forwards',
        animationDelay: '0.9s', // Start fade at 0.9s so it completes by 1.2s
        pointerEvents: 'none', // Allow interactions to pass through
      }}
    >
      <div style={{
        animation: 'fadeIn 0.4s ease-in forwards',
      }}>
        <Image 
          src="/images/SynthSun.gif" 
          alt="Loading..." 
          width={150} 
          height={150}
          priority
        />
      </div>
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes fadeOut {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

