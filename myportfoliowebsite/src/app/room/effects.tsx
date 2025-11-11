import {JSX} from "react"

 
function Effects() {
    
    return(
    
        <group>
      
        <ambientLight intensity = {0.8}/>

        <spotLight penumbra = {10} 
        intensity={500}  
        angle={1*Math.PI}
        position={[0,50,0]} 
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={100}
        shadow-bias={-0.0001}
        />
        
        <pointLight
        position={[-5,7,0]}
        distance={0}
        intensity={250}
        color = {"#fff4de"}
        />
        <pointLight
        position={[5,7,0]}
        distance={0}
        intensity={250}
        color = {"#fff4de"}
        
        />

        <pointLight
        position = {[9,3,6.7]} 
        distance={0}
        intensity={50}
        color = {"#f7c96d"}
        
        />


        </group>
    )
    
                            
}

export default Effects