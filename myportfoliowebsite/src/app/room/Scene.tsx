import {JSX} from "react"



function Scene(): JSX.Element {
    
    return (
        <group>
            {/* Floor */}
            {/* Rotation is X Y Z across axis in radians*/}
            <mesh rotation = {[-Math.PI/2, 0, 0]} position={[0,0,0]} receiveShadow>
                <planeGeometry args={[20,15]}/>
                <meshStandardMaterial color ="red" />
            </mesh>


            {/* Back wall */}
            <mesh position = {[0,2.5,-7.5]} receiveShadow>
                <planeGeometry args={[20,5]}/>
                <meshStandardMaterial color ="blue"/>

            </mesh>


        </group>
    )
}

export default Scene