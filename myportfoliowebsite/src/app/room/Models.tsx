import React, { JSX } from "react";
import * as THREE from "three"
import { useGLTF } from "@react-three/drei";
import { group } from "console";
 

export function BedModel():JSX.Element {

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


export function LampModel():JSX.Element{

    const lampModel = useGLTF("models/lampModel.glb",true)

    return (
        <primitive object = {lampModel.scene} 
        position = {[9,2.65,6.7]} 
        scale = {4.5}
        rotation = {[0,-Math.PI/1.4,0]}
        castShadown
        recieveShadow/>
        
    )

}


export function TableModel():JSX.Element{
    const tableModel = useGLTF("models/tableModel.glb", true)

    return (
        <primitive object = {tableModel.scene} 
        position = {[-1.45,1.8,-6.5]} 
        scale = {0.8}
        rotation = {[0,Math.PI,0]}
        castShadown
        recieveShadow/>
    )
      
}

export function ChairModel():JSX.Element{
    const chairModel = useGLTF("models/chairModel.glb", true)

    
    return (
        <primitive object = {chairModel.scene} 
        position = {[-1.4,0.39,-5]} 
        scale = {0.6}
        rotation = {[0,0,0]}
        castShadown
        recieveShadow/>
        
    )
}


export function CouchModel1():JSX.Element{

    const couchModelCenter = useGLTF("models/couchModelCenter.glb",true)
    const couchModelLeft = useGLTF("models/couchModelLeft.glb",true)

    return(
        <group>
        <primitive object = {couchModelCenter.scene} 
        
        position = {[1.8,1.35,-0.75]} 
        scale = {2.5}
        rotation = {[0,0,0]}
        castShadown
        recieveShadow/>

        
        <primitive object = {couchModelLeft.scene} 
        
        position = {[6,1.35,-5.75]} 
        scale = {2.5}
        rotation = {[0,-Math.PI/2,0]}
        castShadown
        recieveShadow/>

        </group>
            
        
        
    )
}


export 


useGLTF.preload('models/twinBedModel.glb')
useGLTF.preload('models/chairModel.glb')
useGLTF.preload('models/tableModel.glb')
useGLTF.preload('models/lampModel.glb')
useGLTF.preload('models/couchModel.glb')