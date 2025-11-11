"use client";

import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { RigidBody, CapsuleCollider } from "@react-three/rapier";
import * as THREE from "three";

interface FirstPersonControlsProps {
  spawnPosition?: [number, number, number];
  onPointerLockChange?: (locked: boolean) => void;
}

export default function FirstPersonControls({ 
  spawnPosition = [-2, 3.2, 0],
  onPointerLockChange
}: FirstPersonControlsProps) {
  const { camera, gl } = useThree();
  const rigidBodyRef = useRef<any>(null);
  
  // Movement state
  const moveState = useRef({
    forward: false,
    backward: false,
    left: false,
    right: false,
  });

  // Camera rotation
  const euler = useRef(new THREE.Euler(0, 0, 0, "YXZ"));
  const PI_2 = Math.PI / 2;

  // Set initial position
  useEffect(() => {
    if (rigidBodyRef.current) {
      rigidBodyRef.current.setTranslation(
        { x: spawnPosition[0], y: spawnPosition[1], z: spawnPosition[2] },
        true
      );
    }
    camera.position.set(spawnPosition[0], spawnPosition[1], spawnPosition[2]);
    euler.current.set(0, 0, 0);
  }, [camera, spawnPosition]);

  // Pointer lock handling
  useEffect(() => {
    const canvas = gl.domElement;

    const handlePointerLockChange = () => {
      const isLocked = document.pointerLockElement === canvas;
      if (onPointerLockChange) {
        onPointerLockChange(isLocked);
      }
    };

    const onMouseMove = (event: MouseEvent) => {
      if (document.pointerLockElement !== canvas) return;

      const movementX = event.movementX || 0;
      const movementY = event.movementY || 0;

      euler.current.y -= movementX * 0.002;
      euler.current.x -= movementY * 0.002;

      // Clamp vertical rotation
      euler.current.x = Math.max(-PI_2, Math.min(PI_2, euler.current.x));
    };

    const onKeyDown = (event: KeyboardEvent) => {
      switch (event.code) {
        case "KeyW":
          moveState.current.forward = true;
          break;
        case "KeyS":
          moveState.current.backward = true;
          break;
        case "KeyA":
          moveState.current.left = true;
          break;
        case "KeyD":
          moveState.current.right = true;
          break;
        case "Escape":
          if (document.pointerLockElement === canvas) {
            document.exitPointerLock();
          }
          break;
      }
    };

    const onKeyUp = (event: KeyboardEvent) => {
      switch (event.code) {
        case "KeyW":
          moveState.current.forward = false;
          break;
        case "KeyS":
          moveState.current.backward = false;
          break;
        case "KeyA":
          moveState.current.left = false;
          break;
        case "KeyD":
          moveState.current.right = false;
          break;
      }
    };

    const onClick = () => {
      canvas.requestPointerLock();
    };

    canvas.addEventListener("click", onClick);
    document.addEventListener("pointerlockchange", handlePointerLockChange);
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keyup", onKeyUp);

    return () => {
      canvas.removeEventListener("click", onClick);
      document.removeEventListener("pointerlockchange", handlePointerLockChange);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("keyup", onKeyUp);
    };
  }, [gl, onPointerLockChange]);

  // Movement and camera update
  useFrame((state, delta) => {
    if (!rigidBodyRef.current) return;

    const walkSpeed = 5;
    
    // Calculate movement direction based on camera rotation
    const direction = new THREE.Vector3();
    const sideDirection = new THREE.Vector3();

    camera.getWorldDirection(direction);
    direction.y = 0; // Lock to horizontal plane
    direction.normalize();

    sideDirection.crossVectors(camera.up, direction).normalize();

    const moveDirection = new THREE.Vector3(0, 0, 0);

    if (moveState.current.forward) {
      moveDirection.x += direction.x;
      moveDirection.z += direction.z;
    }
    if (moveState.current.backward) {
      moveDirection.x -= direction.x;
      moveDirection.z -= direction.z;
    }
    if (moveState.current.left) {
      moveDirection.x += sideDirection.x;
      moveDirection.z += sideDirection.z;
    }
    if (moveState.current.right) {
      moveDirection.x -= sideDirection.x;
      moveDirection.z -= sideDirection.z;
    }

    // Normalize and apply speed
    if (moveDirection.length() > 0) {
      moveDirection.normalize();
      moveDirection.multiplyScalar(walkSpeed);
    }

    // Set velocity on rigid body (respects collisions)
    rigidBodyRef.current.setLinvel(
      { 
        x: moveDirection.x, 
        y: 0, // No vertical movement
        z: moveDirection.z 
      }, 
      true
    );

    // Lock Y position to spawn height
    const currentPos = rigidBodyRef.current.translation();
    if (Math.abs(currentPos.y - spawnPosition[1]) > 0.01) {
      rigidBodyRef.current.setTranslation(
        { x: currentPos.x, y: spawnPosition[1], z: currentPos.z },
        true
      );
    }

    // Update camera position and rotation
    const newPos = rigidBodyRef.current.translation();
    camera.position.set(newPos.x, newPos.y, newPos.z);
    camera.rotation.copy(euler.current);
  });

  return (
    <RigidBody
      ref={rigidBodyRef}
      type="dynamic"
      colliders={false}
      position={spawnPosition}
      enabledRotations={[false, false, false]}
      gravityScale={0}
      linearDamping={5}
      angularDamping={1}
    >
      <CapsuleCollider args={[0.3, 0.3]} />
    </RigidBody>
  );
}

