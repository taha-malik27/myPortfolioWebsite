import {JSX} from "react"
import * as THREE from "three"
import { RoundedBoxGeometry, useTexture } from "@react-three/drei"
import { normalMap, roughness } from "three/tsl"
import BedModel from "./Models";







function Scene(): JSX.Element {
    
    // Initial texture for the Carpet

    const carpetTexture = useTexture({
        map:"/textures/carpet/curly_teddy_natural_diff_4k.jpg",
        normalMap: "/textures/carpet/curly_teddy_natural_nor_gl_4k.png",
        roughnessMap:"textures/carpet/curly_teddy_natural_rough_4k.png",
        displacementMap: "/textures/carpet/curly_teddy_natural_disp_4k.png",
    });


    carpetTexture.map.colorSpace = THREE.SRGBColorSpace

    const mappings = [
        carpetTexture.map, 
        carpetTexture.normalMap, 
        carpetTexture.roughnessMap,
        carpetTexture.displacementMap
      ] as THREE.Texture[];

      

    mappings.forEach((mapping) => {
        if (!mapping) return;
        mapping.wrapS = mapping.wrapT = THREE.MirroredRepeatWrapping
        mapping.repeat.set(10,7)
    })




    return (
        <group>
            {/* Floor */}
            {/* Rotation is X Y Z across axis in radians*/}
            <mesh rotation = {[-Math.PI/2, 0, 0]} position={[0,0.3,0]} receiveShadow>
                <RoundedBoxGeometry args={[20.15,15.15,0.2]} radius={0.1}/>
                <meshPhysicalMaterial
                color ="#7a7a7a"
                map={carpetTexture.map}
                normalMap={carpetTexture.normalMap}
                roughnessMap={carpetTexture.roughnessMap}
                metalness={0}
                sheen={1}                      
                sheenRoughness={0.5}
                sheenColor={"#ffffff"}
                anisotropyMap={useTexture("/textures/carpet/curly_teddy_natural_anisotropy_strength_4k.png")}
                />
            </mesh>




            {/* Back wall */}
            <mesh position = {[0,2.85,-7.5]} castShadow receiveShadow>
                <boxGeometry args={[20,5,0.2]}/>
                <meshStandardMaterial color ="#fce5c7" side={THREE.DoubleSide} />

            </mesh>
            {/* Back wall Siding */}
            <mesh position = {[0.1,0.5,-7.4]} castShadow receiveShadow>
                <boxGeometry args={[19.9,0.2,0.05]}/>
                <meshStandardMaterial color = "#ffffff" side={THREE.DoubleSide}/>
            </mesh>




            {/* Right wall */}
            <mesh position = {[10,2.85,0]} rotation ={[0,-Math.PI/2,0]} castShadow receiveShadow>
                <boxGeometry args={[15,5,0.2]}/>
                <meshStandardMaterial color = "#fce5c7" side={THREE.DoubleSide}/>
            </mesh>
            {/* Right Wall Siding */}
            <mesh position = {[9.9,0.5,0]} rotation ={[0,Math.PI/2,0]} castShadow receiveShadow>
                <boxGeometry args={[15,0.2,0.05]}/>
                <meshStandardMaterial color = "#ffffff" side={THREE.DoubleSide}/>
            </mesh>




            {/* Left Wall */}
            <mesh position = {[-10,2.85,0]} rotation ={[0,Math.PI/2,0]} castShadow receiveShadow>
                <boxGeometry args={[15,5,0.2]}/>
                <meshStandardMaterial color = "#fce5c7" side={THREE.DoubleSide}/>
            </mesh>
            {/* Left Wall Siding */}
            <mesh position = {[-9.9,0.5,0]} rotation ={[0,Math.PI/2,0]} castShadow receiveShadow>
                <boxGeometry args={[15,0.2,0.05]}/>
                <meshStandardMaterial color = "#ffffff" side={THREE.DoubleSide}/>
            </mesh>
            



            {/* Props and Models Below This Point */}

            <BedModel />


        </group>
    )
}

export default Scene