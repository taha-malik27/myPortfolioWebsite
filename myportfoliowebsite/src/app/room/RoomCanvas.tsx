"use client";

import {Canvas} from "@react-three/fiber";
import {Suspense, useState, useEffect} from "react";
import { JSX } from "react";
import Scene from "@/app/room/Scene"
import Effects from "@/app/room/effects"
import {Preload, OrbitControls} from "@react-three/drei"
import PhysicsWorld from "@/app/room/physicsWorld"
import FirstPersonControls from "@/app/room/firstPersonControls"
import { useThree } from "@react-three/fiber"
import * as THREE from "three"

function RoomCanvas():JSX.Element{

    const [controlMode, setControlMode] = useState<"orbit" | "firstPerson">("orbit");
    const [isPointerLocked, setIsPointerLocked] = useState(false);
    const [savedPlayerPosition, setSavedPlayerPosition] = useState<[number, number, number] | null>(null);
    const [isHoveringClickable, setIsHoveringClickable] = useState(false);

    const handleControlModeChange = (mode: "orbit" | "firstPerson") => {
        setControlMode(mode);
        if (mode === "orbit") {
            // Exit pointer lock if switching back to orbit
            if (document.pointerLockElement) {
                document.exitPointerLock();
            }
            setIsPointerLocked(false);
        }
    };

    const handleSavePlayerPosition = (position: [number, number, number]) => {
        setSavedPlayerPosition(position);
    };


    
return (

    <div id = "canvas-container" style={{position: "relative", width: "100%", height: "100vh", overflow: "hidden"}}>
        
        {/* Gradient background */}
        <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "linear-gradient(to top,rgb(254, 107, 71) 50%,rgb(255, 172, 108),rgb(251, 222, 135))",
            zIndex: 0
        }} />

        {/*Cameria Position is 0 X (deadcenter), 2Y (above ground), 4.5 Z (closer to viewer). FOV is 45 degrees, shadows, antialiasing, and alpha/transparence enabled, 
        dpr or pixel level is limited from 1 (standard monitors) to 2 (retina displays)*/}
        <Canvas camera = {{position: [0, 25, 25] , fov:45}} 
                dpr = {[1, 1.5]}  
                gl = {{
                    antialias: true, 
                    alpha: true,
                    powerPreference: "high-performance",
                    stencil: false,
                    depth: true
                }}
                shadows="variance"
                performance={{ min: 0.5 }}
                style={{width: "100%", height: "100%", display: "block", position: "relative", zIndex: 1}} >

            <Suspense fallback = {null}>
                
                <ambientLight intensity = {0.9} />

                <CameraResetter controlMode={controlMode} />
                <ResponsiveCamera />

                <PhysicsWorld>
                    <Scene onHoverClickableChange={setIsHoveringClickable} />
                    
                    {controlMode === "firstPerson" && (
                        <FirstPersonControls 
                            spawnPosition={savedPlayerPosition || [-2, 3.2, 0]} 
                            onPointerLockChange={setIsPointerLocked}
                            onPositionChange={handleSavePlayerPosition}
                        />
                    )}
                </PhysicsWorld>

                <Effects />

                {/* OrbitControls for camera movement dictated by left mouse button and scroll wheel */}
                {controlMode === "orbit" && (
                    <OrbitControls enableZoom ={true} 
                                    zoomSpeed = {0.75}
                                    enableRotate = {true} 
                                    maxPolarAngle = {Math.PI * 0.45} 
                                    minDistance = {5}
                                    maxDistance = {40}
                                    enableDamping
                                    makeDefault/>
                )}


                {/* Preload all assets */}
                <Preload all/>
               
            </Suspense>
        </Canvas>


        {/* Crosshair for First Person Mode */}
        {controlMode === "firstPerson" && isPointerLocked && (
            <div style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 1001,
                pointerEvents: "none",
                transition: "all 0.3s ease"
            }}>
                {/* Horizontal line */}
                <div style={{
                    position: "absolute",
                    width: isHoveringClickable ? "30px" : "20px",
                    height: isHoveringClickable ? "3px" : "2px",
                    backgroundColor: isHoveringClickable ? "#ffd700" : "white",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    boxShadow: isHoveringClickable 
                        ? "0 0 4px 2px rgba(255, 215, 0, 0.8), 0 0 8px 2px rgba(255, 215, 0, 0.6)" 
                        : "0 0 2px 1px black, 0 0 4px 1px black",
                    transition: "all 0.3s ease"
                }} />
                {/* Vertical line */}
                <div style={{
                    position: "absolute",
                    width: isHoveringClickable ? "3px" : "2px",
                    height: isHoveringClickable ? "30px" : "20px",
                    backgroundColor: isHoveringClickable ? "#ffd700" : "white",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    boxShadow: isHoveringClickable 
                        ? "0 0 4px 2px rgba(255, 215, 0, 0.8), 0 0 8px 2px rgba(255, 215, 0, 0.6)" 
                        : "0 0 2px 1px black, 0 0 4px 1px black",
                    transition: "all 0.3s ease"
                }} />
                {/* Optional: Add center dot when hovering */}
                {isHoveringClickable && (
                    <div style={{
                        position: "absolute",
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        backgroundColor: "#ffd700",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        boxShadow: "0 0 4px 2px rgba(255, 215, 0, 0.8)"
                    }} />
                )}
            </div>
        )}

        {/* Control Mode Toggle UI */}
        <div style={{
            position: "absolute",
            bottom: "20px",
            right: "20px",
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            padding: "1.25rem",
            borderRadius: "12px",
            color: "white",
            fontFamily: "'Outfit', sans-serif",
            fontSize: "0.9rem",
            zIndex: 1000,
            transition: "all 0.3s ease"
        }}>
            {controlMode === "firstPerson" && isPointerLocked ? (
                <div style={{
                    textAlign: "center",
                    fontFamily: "'Outfit', sans-serif"
                }}>
                    <p style={{
                        margin: 0,
                        color: "rgba(255, 255, 255, 0.9)",
                        fontSize: "0.9rem",
                        lineHeight: "1.5"
                    }}>
                        Press <strong style={{
                            fontFamily: "'Stack Sans Notch', sans-serif",
                            fontWeight: 600,
                            backgroundImage: "linear-gradient(120deg, rgb(223, 21, 21) 25%, rgb(255, 168, 7))",
                            backgroundClip: "text",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent"
                        }}>ESC</strong> to return to Orbit
                    </p>
                </div>
            ) : (
                <div>
                    <div style={{
                        marginBottom: "0.75rem",
                        fontFamily: "'Stack Sans Notch', sans-serif",
                        fontWeight: 600,
                        fontSize: "1rem",
                        color: "white"
                    }}>
                        Control Mode
                    </div>
                    <div style={{display: "flex", gap: "10px"}}>
                        <button
                            onClick={() => handleControlModeChange("orbit")}
                            style={{
                                position: "relative",
                                padding: "0.75rem 1.5rem",
                                backgroundColor: controlMode === "orbit" 
                                    ? "transparent" 
                                    : "rgba(255, 255, 255, 0.1)",
                                color: "white",
                                border: controlMode === "orbit"
                                    ? "2px solid transparent"
                                    : "2px solid rgba(255, 255, 255, 0.3)",
                                borderRadius: "8px",
                                cursor: "pointer",
                                fontFamily: "'Stack Sans Notch', sans-serif",
                                fontWeight: controlMode === "orbit" ? 600 : 400,
                                fontSize: "0.9rem",
                                transition: "all 0.4s ease",
                                overflow: "hidden"
                            }}
                            onMouseEnter={(e) => {
                                if (controlMode !== "orbit") {
                                    e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.15)";
                                    e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.5)";
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (controlMode !== "orbit") {
                                    e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
                                    e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.3)";
                                }
                            }}
                        >
                            <span style={{
                                position: "relative",
                                zIndex: 1
                            }}>
                                Orbit
                            </span>
                            <div style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                backgroundImage: "linear-gradient(120deg, rgb(223, 21, 21) 25%, rgb(255, 168, 7))",
                                opacity: controlMode === "orbit" ? 1 : 0,
                                transition: "opacity 0.4s ease",
                                pointerEvents: "none"
                            }} />
                        </button>
                        <button
                            onClick={() => handleControlModeChange("firstPerson")}
                            style={{
                                position: "relative",
                                padding: "0.75rem 1.5rem",
                                backgroundColor: controlMode === "firstPerson" 
                                    ? "transparent" 
                                    : "rgba(255, 255, 255, 0.1)",
                                color: "white",
                                border: controlMode === "firstPerson"
                                    ? "2px solid transparent"
                                    : "2px solid rgba(255, 255, 255, 0.3)",
                                borderRadius: "8px",
                                cursor: "pointer",
                                fontFamily: "'Stack Sans Notch', sans-serif",
                                fontWeight: controlMode === "firstPerson" ? 600 : 400,
                                fontSize: "0.9rem",
                                transition: "all 0.4s ease",
                                overflow: "hidden"
                            }}
                            onMouseEnter={(e) => {
                                if (controlMode !== "firstPerson") {
                                    e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.15)";
                                    e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.5)";
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (controlMode !== "firstPerson") {
                                    e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
                                    e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.3)";
                                }
                            }}
                        >
                            <span style={{
                                position: "relative",
                                zIndex: 1
                            }}>
                                First Person
                            </span>
                            <div style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                backgroundImage: "linear-gradient(120deg, rgb(223, 21, 21) 25%, rgb(255, 168, 7))",
                                opacity: controlMode === "firstPerson" ? 1 : 0,
                                transition: "opacity 0.4s ease",
                                pointerEvents: "none"
                            }} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    </div>

)

}

// Component to reset camera position when entering orbit mode
function CameraResetter({ controlMode }: { controlMode: "orbit" | "firstPerson" }) {
    const { camera } = useThree();

    useEffect(() => {
        if (controlMode === "orbit") {
            // Reset camera to initial position
            camera.position.set(0, 25, 25);
            camera.lookAt(0, 0, 0);
        }
    }, [controlMode, camera]);

    return null;
}

// Component to handle responsive camera adjustments
function ResponsiveCamera() {
    const { camera, size } = useThree();

    useEffect(() => {
        if (camera instanceof THREE.PerspectiveCamera) {
            // Only update aspect ratio and projection matrix
            // Don't change camera position - let OrbitControls handle that
            camera.aspect = size.width / size.height;
            camera.updateProjectionMatrix();
        }
    }, [size, camera]);

    return null;
}

export default RoomCanvas