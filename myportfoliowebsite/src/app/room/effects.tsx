import {JSX} from "react"

 
function Effects() {
    
    return(
    
        <group>
        <spotLight penumbra = {0.5} 
        intensity={10}  
        angle={1*Math.PI}
        position={[-4,2.5,0]}  />
    
        <spotLight penumbra = {0.5} 
        intensity={10}  
        angle={1*Math.PI}
        position={[4,2.5,0]}  />
    
        </group>
    )
    
                            
}

export default Effects