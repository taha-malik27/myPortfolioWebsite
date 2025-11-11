"use client";

import {Canvas} from "@react-three/fiber";
import {Suspense, useState} from "react";
import { JSX } from "react";
import Scene from "@/app/room/Scene"
import Effects from "@/app/room/effects"
import {Preload, OrbitControls} from "@react-three/drei"
import PhysicsWorld from "@/app/room/physicsWorld"
import FirstPersonControls from "@/app/room/firstPersonControls"

function RoomCanvas():JSX.Element{

    const [controlMode, setControlMode] = useState<"orbit" | "firstPerson">("orbit");
    const [isPointerLocked, setIsPointerLocked] = useState(false);

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

return (

    <div id = "canvas-container" style={{position: "relative"}}>

        {/*Cameria Position is 0 X (deadcenter), 2Y (above ground), 4.5 Z (closer to viewer). FOV is 45 degrees, shadows, antialiasing, and alpha/transparence enabled, 
        dpr or pixel level is limited from 1 (standard monitors) to 2 (retina displays)*/}
        <Canvas camera = {{position: [0, 25, 25] , fov:45}} 
                dpr = {[1, 1.5]}  
                gl = {{
                    antialias: true, 
                    alpha: false,
                    powerPreference: "high-performance",
                    stencil: false,
                    depth: true
                }}
                shadows="soft"
                performance={{ min: 0.5 }}
                style={{height: "97.5vh", alignSelf:"center", justifyContent: "center"}} >

            <color attach= "background" args = {["#fabb69"]} />

            <Suspense fallback = {null}>
                
                <ambientLight intensity = {0.9} />

                <PhysicsWorld>
                    <Scene />
                    
                    {controlMode === "firstPerson" && (
                        <FirstPersonControls 
                            spawnPosition={[-2, 3.2, 0]} 
                            onPointerLockChange={setIsPointerLocked}
                        />
                    )}
                </PhysicsWorld>

                <Effects />

                {/* OrbitControls for camera movement dictated by left mouse button and scroll wheel*/}
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


        {/* Control Mode Toggle UI */}
        <div style={{
            position: "absolute",
            bottom: "20px",
            right: "20px",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            padding: "15px",
            borderRadius: "8px",
            color: "white",
            fontFamily: "Arial, sans-serif",
            fontSize: "14px",
            zIndex: 1000
        }}>
            {controlMode === "firstPerson" && isPointerLocked ? (
                <div style={{textAlign: "center"}}>
                    <p style={{margin: 0}}>Press <strong>ESC</strong> to return to Orbit</p>
                </div>
            ) : (
                <div>
                    <div style={{marginBottom: "10px", fontWeight: "bold"}}>Control Mode</div>
                    <div style={{display: "flex", gap: "10px"}}>
                        <button
                            onClick={() => handleControlModeChange("orbit")}
                            style={{
                                padding: "8px 16px",
                                backgroundColor: controlMode === "orbit" ? "#4CAF50" : "#555",
                                color: "white",
                                border: "none",
                                borderRadius: "4px",
                                cursor: "pointer",
                                fontWeight: controlMode === "orbit" ? "bold" : "normal"
                            }}
                        >
                            Orbit
                        </button>
                        <button
                            onClick={() => handleControlModeChange("firstPerson")}
                            style={{
                                padding: "8px 16px",
                                backgroundColor: controlMode === "firstPerson" ? "#4CAF50" : "#555",
                                color: "white",
                                border: "none",
                                borderRadius: "4px",
                                cursor: "pointer",
                                fontWeight: controlMode === "firstPerson" ? "bold" : "normal"
                            }}
                        >
                            First Person
                        </button>
                    </div>
                </div>
            )}
        </div>
    </div>

)

}

export default RoomCanvas