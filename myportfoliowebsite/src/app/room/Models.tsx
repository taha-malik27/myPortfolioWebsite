import React, { JSX } from "react";
import * as THREE from "three"
import { useGLTF } from "@react-three/drei";
 

export default function BedModel():JSX.Element {

    const bedModel =  useGLTF("models/twinBedModel.glb", true)

    // ON CLICKED and ON POINTER OVER WORK ON Primitves!

    return (
        <primitive object = {bedModel.scene} 
        position = {[-6.8,1.8,-5.5]} 
        scale = {6}
        rotation = {[0,Math.PI/2,0]}
        castShadown
        recieveShadow/>
        
    )
}

useGLTF.preload('models/twinBedModel.glb')