import React, { JSX, useRef, useEffect} from "react";
import * as THREE from "three"
import {Group} from "three";
import {useGLTF, useAnimations, RoundedBoxGeometry } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { group } from "console";
import { rotate } from "three/tsl";
import StandardNodeLibrary from "three/src/renderers/webgpu/nodes/StandardNodeLibrary.js";

 

// Helper functtion
function isMesh(object: THREE.Object3D): object is THREE.Mesh | THREE.SkinnedMesh {
    return (object as any).isMesh === true || (object as any).isSkinnedMesh === true
  }






export function BedModel():JSX.Element {

    const bedModel =  useGLTF("models/twinBedModel.glb", true)

    // ON CLICKED and ON POINTER OVER WORK ON Primitves!

    return (
        <primitive object = {bedModel.scene} 
        position = {[-6.8,1.8,-5.5]} 
        scale = {6}
        rotation = {[0,Math.PI/2,0]}
        castShadow
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
        castShadow
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
        castShadow
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
        castShadow
        recieveShadow/>
        
    )
}


export function CouchModel():JSX.Element{

    const couchModelCenter = useGLTF("models/couchModelCenter.glb",true)
    const couchModelLeft = useGLTF("models/couchModelLeft.glb",true)

    return(
        <group>
        <primitive object = {couchModelCenter.scene} 
        
        position = {[1.8,1.35,-0.75]} 
        scale = {2.5}
        rotation = {[0,0,0]}
        castShadow
        recieveShadow/>

        
        <primitive object = {couchModelLeft.scene} 
        
        position = {[6,1.35,-5.75]} 
        scale = {2.5}
        rotation = {[0,-Math.PI/2,0]}
        castShadow
        recieveShadow/>

        </group>
            
        
        
    )
}


export function ClosetModel():JSX.Element{

    const {scene:closetModel} = useGLTF("models/closetModel.glb", true)
    
      return(

        <primitive object = {closetModel} 
                
                position = {[-9,0.4,5]} 
                scale = {2.8}
                rotation = {[0,-Math.PI/2,0]}
                castShadow
                recieveShadow/>

        )
            
            
}


export function DrawerModel():JSX.Element {

    const {scene:drawerModel} = useGLTF("models/drawerModel.glb", true)
    
      return(

        <primitive object = {drawerModel} 
                
                position = {[-9.2,0,0]} 
                scale = {2.8}
                rotation = {[0,Math.PI/2,0]}
                castShadow
                recieveShadow/>

        )

}


export function CoffeeTableModel():JSX.Element {

    const {scene:coffeeTableModel} = useGLTF("models/coffeeTableModel.glb", true)
    
      return(

        <primitive object = {coffeeTableModel} 
                
                position = {[5.5,0.5,-0.5]} 
                scale = {2.8}
                rotation = {[0,Math.PI,0]}
                castShadow
                recieveShadow/>

        )

}


export function TVModel():JSX.Element {

    const {scene:tvModel} = useGLTF("models/tvModel.glb", true)
    
      return(
        <group>
        <mesh position={[9.8,4.5,0]} rotation = {[0,0,0.2]}>
        <boxGeometry args={[0.25,1,2]}/>
        <meshStandardMaterial color={"black"}/>
       </mesh>
        <primitive object = {tvModel} 
                
                position = {[9.745,2.95,-0.5]} 
                scale = {0.1}
                rotation = {[0,0,0.2]}
                castShadow
                recieveShadow/>


        </group>
        )

}


export function TVStandModel():JSX.Element{

    const {scene:tvStandModel} = useGLTF("models/tvStandModel.glb", true)
    
      return(
        
    
        <primitive object = {tvStandModel} 
                
                position = {[9,0.4,-0.3]} 
                scale = {3.5}
                rotation = {[0,-Math.PI/2,0]}
                castShadow
                recieveShadow/>


      
        )

}


export function ControllerAndHeadphonesModel():JSX.Element {

    const {scene:controllerModel} = useGLTF("models/ps5ControllerModel.glb", true)
    const {scene:headphoneModel} = useGLTF("models/headphoneModel.glb", true)


    return(
      <group>
      <primitive object = {controllerModel} 
              
              position = {[5.3,1.785,-0.53]} 
              scale = {4.5}
              rotation = {[0,-Math.PI/2,0]}
              castShadow
              receiveShadow >

      </primitive>
      <primitive object = {headphoneModel} 
              
              position = {[4.8,1.875,-0.05]} 
              scale = {0.25}
              rotation = {[Math.PI/2,-Math.PI/16,1]}
              castShadow
              recieveShadow/>


      </group>
      )

}


export function PlayStationModel():JSX.Element{
    const {scene:playStationModel} = useGLTF("models/ps5Model.glb", true)
    
    
    return (
        <primitive object = {playStationModel} 
        position = {[8.8,2.25,-2.4]} 
        scale = {0.7}
        rotation = {[0,Math.PI/9,0]}
        castShadow
        receiveShadow >
      </primitive>
    )
}


export function CeilingLightsModel():JSX.Element{

    const ceilingLightsModelRight = useGLTF("models/ceilingLightsModelRight.glb",true)
    const ceilingLightsModelLeft = useGLTF("models/ceilingLightsModelLeft.glb",true)

    return(
        <group>


        {/* Make light Scaffolding for Right Light */}
        <mesh position = {[5,8.5,0]} rotation={[0,0.135,0]}>
            <RoundedBoxGeometry args={[0.3,0.1,1.9]} radius = {0.015}/>
            <meshStandardMaterial color={"black"}/>

        </mesh>

        <mesh position = {[5,8.5,0]} rotation={[0,0.135 + Math.PI/2,0]}>
            <RoundedBoxGeometry args={[0.3,0.1,1.9]} radius = {0.015}/>
            <meshStandardMaterial color={"black"}/>

        </mesh>

        {/* Add in Cylinder */}

        <mesh position =  {[5,26,0]}>

        <cylinderGeometry args={[0.1, 0.1, 35, 32]} />
        <meshStandardMaterial color= {"black"}/>


        </mesh>

        <primitive object = {ceilingLightsModelRight.scene} 
        
        position = {[5,7,0]} 
        scale = {1}
        rotation = {[0,Math.PI/2,0]}
        castShadow
        recieveShadow/>


        {/* Make light Scaffolding for Right Light */}
        <mesh position = {[-5,8.5,0]} rotation={[0,-0.24,0]}>
            <RoundedBoxGeometry args={[0.3,0.1,1.9]} radius = {0.015}/>
            <meshStandardMaterial color={"black"}/>

        </mesh>

        <mesh position = {[-5,8.5,0]} rotation={[0,-0.24 + Math.PI/2,0]}>
            <RoundedBoxGeometry args={[0.3,0.1,1.9]} radius = {0.015}/>
            <meshStandardMaterial color={"black"}/>

        </mesh>

        {/* Add in Cylinder */}

        <mesh position =  {[-5,26,0]}>

        <cylinderGeometry args={[0.1, 0.1, 35, 32]} />
        <meshStandardMaterial color= {"black"}/>


        </mesh>

        <primitive object = {ceilingLightsModelLeft.scene} 
        
        position = {[-5,7,0]} 
        scale = {1}
        rotation = {[0,Math.PI/2 + 1.2,0]}
        castShadow
        recieveShadow/>

        </group>
            
        
        
    )
}


export function ClockModel():JSX.Element{
    const {scene:clockModel} = useGLTF("models/clockModel.glb", true)
    return (

        <group>
        <primitive object = {clockModel} 
        position = {[9.88,4,1]} 
        scale = {1}
        rotation = {[0,-Math.PI,0]}
        castShadow
        recieveShadow/>


        <mesh position = {[9.86,6.85,-0.25]} rotation = {[0,0,Math.PI/2]}>
        <boxGeometry args={[0.4,0.1,0.05]}/>
        <meshStandardMaterial color={"black"}/>
        </mesh>

        <mesh position = {[9.86,6.6,-0.35]} rotation = {[Math.PI/3,0,Math.PI/2]}>
        <boxGeometry args={[0.3,0.1,0.03]}/>
        <meshStandardMaterial color={"black"}/>
        </mesh>

        <mesh position = {[9.86,6.5,-0.115]} rotation = {[Math.PI/2+1,0,Math.PI/2]}>
        <boxGeometry args={[0.4,0.1,0.01]}/>
        <meshStandardMaterial color={"red"}/>
        </mesh>
        </group>
    )

}


export function WallArtModel1():JSX.Element{

    const {scene:paintingModel1} = useGLTF("models/paintingModel1.glb", true)
    return (
        <primitive object = {paintingModel1} 
        position = {[4,5,-7.39]} 
        scale = {27}
        rotation = {[0,0,0]}
        castShadow
        recieveShadow/>
    )

}


export function WallArtModel2():JSX.Element{
    const {scene:paintingModel2} = useGLTF("models/paintingModel2.glb", true)
    return (
        <primitive object = {paintingModel2} 
        position = {[6.1,4,-7.3]} 
        scale = {27}
        rotation = {[0,0,0]}
        castShadow/>

    )
}


export function WallArtModel3():JSX.Element{
    const {scene:paintingModel3} = useGLTF("models/paintingModel3.glb", true)
    return (
        <primitive object = {paintingModel3} 
        position = {[8.2,3,-7.3]} 
        scale = {27}
        rotation = {[0,0,0]}
        castShadow/>

    )
}

useGLTF.preload('models/twinBedModel.glb')
useGLTF.preload('models/chairModel.glb')
useGLTF.preload('models/tableModel.glb')
useGLTF.preload('models/lampModel.glb')
useGLTF.preload('models/couchModelCenter.glb')
useGLTF.preload('models/couchModelLeft.glb')
useGLTF.preload('models/closetModel.glb')
useGLTF.preload('models/drawerModel.glb')
useGLTF.preload('models/headphoneModel.glb')
useGLTF.preload('models/ps5ControllerModel.glb')
useGLTF.preload('models/ceilingLightsModelRight.glb')
useGLTF.preload('models/ceilingLightsModelLeft.glb')
useGLTF.preload('models/coffeeTableModel.glb')
useGLTF.preload('models/tvModel.glb')
useGLTF.preload('models/tvStandModel.glb')
useGLTF.preload('models/clockModel.glb')

