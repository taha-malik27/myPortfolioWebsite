import {JSX} from "react"
import * as THREE from "three"


function Scene(): JSX.Element {
    
    return (
        <group>
            {/* Floor */}
            {/* Rotation is X Y Z across axis in radians*/}
            <mesh rotation = {[-Math.PI/2, 0, 0]} position={[0,0,0]} receiveShadow>
                <planeGeometry args={[20,15]}/>
                <meshStandardMaterial color ="red" side={THREE.DoubleSide} />
            </mesh>


            {/* Back wall */}
            <mesh position = {[0,2.5,-7.5]} receiveShadow>
                <planeGeometry args={[20,5]}/>
                <meshStandardMaterial color ="blue" side={THREE.DoubleSide}/>

            </mesh>

            {/* Right wall */}
            <mesh position = {[10,2.5,0]} rotation ={[0,-Math.PI/2,0]} receiveShadow>
                <planeGeometry args={[15,5]}/>
                <meshStandardMaterial color = "green" side={THREE.DoubleSide}/>

            </mesh>

            {/* Left Wall */}
            <mesh position = {[-10,2.5,0]} rotation ={[0,Math.PI/2,0]} receiveShadow>
                <planeGeometry args={[15,5]}/>
                <meshStandardMaterial color = "orange" side={THREE.DoubleSide}/>

            </mesh>

            
        </group>
    )
}

export default Scene