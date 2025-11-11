"use client";

import { JSX, ReactNode } from "react";
import { Physics } from "@react-three/rapier";

interface PhysicsWorldProps {
  children: ReactNode;
}

export default function PhysicsWorld({ children }: PhysicsWorldProps): JSX.Element {
  return (
    <Physics 
      gravity={[0, -9.81, 0]} 
      debug={false}
      timeStep={1/60}
      paused={false}
      interpolate={true}
      updatePriority={-50}
    >
      {children}
    </Physics>
  );
}

