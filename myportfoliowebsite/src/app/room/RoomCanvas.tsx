"use client";

import {Canvas} from "@react-three/fiber";
import {Suspense} from "react";
import { JSX } from "react";
import Scene from "@/app/room/Scene"
import Effects from "@/app/room/effects"
import {Preload, OrbitControls} from "@react-three/drei"

function RoomCanvas():JSX.Element{


return (

    <div id = "canvas-container" >

        {/*Cameria Position is 0 X (deadcenter), 2Y (above ground), 4.5 Z (closer to viewer). FOV is 45 degrees, shadows, antialiasing, and alpha/transparence enabled, 
        dpr or pixel level is limited from 1 (standard monitors) to 2 (retina displays)*/}
        <Canvas camera = {{position: [0, 25, 25] , fov:45}} 
                dpr = {[1,2]}  
                gl = {{antialias: true, alpha: true}}
                shadows
                style={{height: "97.5vh", alignSelf:"center", justifyContent: "center"}} >

            <color attach= "background" args = {["#fabb69"]} />

            <Suspense fallback = {null}>
                
                <ambientLight intensity = {0.9} />

                <Scene />

                <Effects />

                {/* OrbitControls for camera movement dictated by left mouse button and scroll wheel*/}
                <OrbitControls enableZoom ={true} 
                                zoomSpeed = {0.75}
                                enableRotate = {true} 
                                maxPolarAngle = {Math.PI * 0.45} 
                                minDistance = {5}
                                maxDistance = {40}
                                enableDamping/>


                {/* Preload all assets */}
                <Preload all/>
               
            </Suspense>
        </Canvas>
    </div>

)

}

export default RoomCanvas