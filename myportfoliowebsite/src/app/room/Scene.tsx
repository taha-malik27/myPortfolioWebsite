import {JSX} from "react"
import * as THREE from "three"
import { RoundedBoxGeometry, useTexture } from "@react-three/drei"
import { normalMap, roughness } from "three/tsl"
import { RigidBody, CuboidCollider, CylinderCollider } from "@react-three/rapier"
import {BedModel, ChairModel, CouchModel, LampModel, TableModel, 
    ClosetModel, DrawerModel, CoffeeTableModel, TVModel, ControllerAndHeadphonesModel,
    CeilingLightsModel, TVStandModel, ClockModel, WallArtModel1, WallArtModel2, WallArtModel3,
    PlayStationModel, LaptopModel, TrashCanModel, WallPieceModel} from "./Models";







function Scene(): JSX.Element {
    
    // Initialize the texture for the Carpet

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
        mapping.repeat.set(5,3)
    })


    //Initialize the grass texture
    const grassTexture = useTexture({
        map: "/textures/grass/Poliigon_GrassPatchyGround_4585_BaseColor.jpg",
        normalMap: "/textures/grass/Poliigon_GrassPatchyGround_4585_Normal.png",
        roughnessMap: "/textures/grass/Poliigon_GrassPatchyGround_4585_Roughness.jpg",
        displacementMap: "/textures/grass/Poliigon_GrassPatchyGround_4585_Displacement.jpg",
        aoMap: "/textures/grass/Poliigon_GrassPatchyGround_4585_AmbientOcclusion.jpg",
    });

    grassTexture.map.colorSpace = THREE.SRGBColorSpace;

    const grassMappings = [
        grassTexture.map,
        grassTexture.normalMap,
        grassTexture.roughnessMap,
        grassTexture.displacementMap,
        grassTexture.aoMap
    ] as THREE.Texture[];

    grassMappings.forEach((mapping) => {
        if (!mapping) return;
        mapping.wrapS = mapping.wrapT = THREE.MirroredRepeatWrapping;
        mapping.repeat.set(1, 1); // Larger repeat for the big grass area
    });


    return (
        <group>
            {/* Floor */}
            {/* Rotation is X Y Z across axis in radians*/}
            <RigidBody type="fixed" colliders={false}>
                <CuboidCollider args={[10.075, 0.1, 7.575]} position={[0, 0.3, 0]} />
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
            </RigidBody>

            <RigidBody type="fixed" colliders={false}>
                <CuboidCollider args={[500, 0.1, 500]} position={[0, 0.2, 0]} />
                <mesh rotation = {[-Math.PI/2, 0, 0]} position={[0,0.2,0]} receiveShadow>
                    <RoundedBoxGeometry args={[1000,1000,0.2]} radius={0.1}/>
                    <meshPhysicalMaterial
                    map={grassTexture.map}
                    normalMap={grassTexture.normalMap}
                    roughnessMap={grassTexture.roughnessMap}
                    aoMap={grassTexture.aoMap}
                    displacementMap={grassTexture.displacementMap}
                    displacementScale={0.1}
                    metalness={0}
                    roughness={1}
                    />
                </mesh>
            </RigidBody>


            {/* Back wall */}
            <RigidBody type="fixed" colliders={false}>
                <CuboidCollider args={[10, 3.75, 0.1]} position={[0, 4, -7.5]} />
                <mesh position = {[0,4,-7.5]} castShadow receiveShadow>
                    <boxGeometry args={[20,7.5,0.2]}/>
                    <meshStandardMaterial color ="#fce3b1" side={THREE.DoubleSide} />
                </mesh>
                {/* Back wall Siding */}
                <mesh position = {[0.1,0.5,-7.4]} castShadow receiveShadow>
                    <boxGeometry args={[19.9,0.2,0.05]}/>
                    <meshStandardMaterial color = "#ffffff" side={THREE.DoubleSide}/>
                </mesh>
            </RigidBody>




            {/* Right wall */}
            <RigidBody type="fixed" colliders={false}>
                <CuboidCollider args={[0.1, 3.75, 7.5]} position={[10, 4, 0]} />
                <mesh position = {[10,4,0]} rotation ={[0,-Math.PI/2,0]} castShadow receiveShadow>
                    <boxGeometry args={[15,7.5,0.2]}/>
                    <meshStandardMaterial color = "#fce3b1" side={THREE.DoubleSide}/>
                </mesh>
                {/* Right Wall Siding */}
                <mesh position = {[9.9,0.5,0]} rotation ={[0,Math.PI/2,0]} castShadow receiveShadow>
                    <boxGeometry args={[15,0.2,0.05]}/>
                    <meshStandardMaterial color = "#ffffff" side={THREE.DoubleSide}/>
                </mesh>
            </RigidBody>




            {/* Left Wall */}
            <RigidBody type="fixed" colliders={false}>
                <CuboidCollider args={[0.1, 3.75, 7.5]} position={[-10, 4, 0]} />
                <mesh position = {[-10,4,0]} rotation ={[0,Math.PI/2,0]} castShadow receiveShadow>
                    <boxGeometry args={[15,7.5,0.2]}/>
                    <meshStandardMaterial color = "#fce3b1" side={THREE.DoubleSide}/>
                </mesh>
                {/* Left Wall Siding */}
                <mesh position = {[-9.9,0.5,0]} rotation ={[0,Math.PI/2,0]} castShadow receiveShadow>
                    <boxGeometry args={[15,0.2,0.05]}/>
                    <meshStandardMaterial color = "#ffffff" side={THREE.DoubleSide}/>
                </mesh>
            </RigidBody>
            



            {/* Props and Models Below This Point */}

            <BedModel />
            <LampModel/>
            <ChairModel/>
            <TableModel/>
            <CouchModel/>
            <ClosetModel/>
            <DrawerModel/>
            <CoffeeTableModel/>
            <TVModel/>
            <TVStandModel/>
            <ControllerAndHeadphonesModel/>
            <PlayStationModel/>
            <CeilingLightsModel/>
            <ClockModel/>
            <WallArtModel1/>
            <WallArtModel2/>
            <WallArtModel3/>
            <LaptopModel/>
            <TrashCanModel/>
            <WallPieceModel/>

            {/* Invisible Collision Boxes for Furniture - Same structure as walls */}
            
            {/* Bed Collision */}
            <RigidBody type="fixed" colliders={false}>
                <CuboidCollider args={[2, 1.25, 3.05]} position={[-6.8, 1.8, -5.5]} rotation={[0, Math.PI/2, 0]} />
                <mesh position={[-6.8, 1.8, -5.5]} rotation={[0, Math.PI/2, 0]} castShadow receiveShadow>
                    <boxGeometry args={[4, 2.5, 6.1]} />
                    <meshStandardMaterial transparent opacity={0} side={THREE.DoubleSide} />
                </mesh>
            </RigidBody>

            {/* Table Collision */}
            <RigidBody type="fixed" colliders={false}>
                <CuboidCollider args={[1.75, 1.5, 0.6]} position={[-1.45, 1.8, -6.5]} />
                <mesh position={[-1.45, 1.8, -6.5]} castShadow receiveShadow>
                    <boxGeometry args={[3.5, 3, 1.2]} />
                    <meshStandardMaterial transparent opacity={0} side={THREE.DoubleSide} />
                </mesh>
            </RigidBody>

            {/* Chair Collision */}
            <RigidBody type="fixed" colliders={false}>
                <CuboidCollider args={[0.5, 2, 0.5]} position={[-1.4, 1, -5]} />
                <mesh position={[-1.4, 1, -5]} castShadow receiveShadow>
                    <boxGeometry args={[1, 4, 1]} />
                    <meshStandardMaterial transparent opacity={0} side={THREE.DoubleSide} />
                </mesh>
            </RigidBody>

            {/* Couch Center Collision */}
            <RigidBody type="fixed" colliders={false}>
                <CuboidCollider args={[1.5, 2, 2.9]} position={[1.8, 1.35, -0.75]} />
                <mesh position={[1.8, 1.35, -0.75]} castShadow receiveShadow>
                    <boxGeometry args={[3, 4, 5.8]} />
                    <meshStandardMaterial transparent opacity={0} side={THREE.DoubleSide} />
                </mesh>
            </RigidBody>

            {/* Couch Left Collision */}
            <RigidBody type="fixed" colliders={false}>
                <CuboidCollider args={[2.9, 2, 1.5]} position={[6, 1.35, -5.75]} />
                <mesh position={[6, 1.35, -5.75]} castShadow receiveShadow>
                    <boxGeometry args={[5.8, 4, 3]} />
                    <meshStandardMaterial transparent opacity={0} side={THREE.DoubleSide} />
                </mesh>
            </RigidBody>

            {/* Closet Collision */}
            <RigidBody type="fixed" colliders={false}>
                <CuboidCollider args={[1, 3, 2]} position={[-9, 2, 5]} />
                <mesh position={[-9, 2, 5]} castShadow receiveShadow>
                    <boxGeometry args={[2, 6, 4]} />
                    <meshStandardMaterial transparent opacity={0} side={THREE.DoubleSide} />
                </mesh>
            </RigidBody>

            {/* Drawer Collision */}
            <RigidBody type="fixed" colliders={false}>
                <CuboidCollider args={[0.6, 2.5, 2.25]} position={[-9.2, 1, 0]} />
                <mesh position={[-9.2, 1, 0]} castShadow receiveShadow>
                    <boxGeometry args={[1.2, 5, 4.5]} />
                    <meshStandardMaterial transparent opacity={0} side={THREE.DoubleSide} />
                </mesh>
            </RigidBody>

            {/* Coffee Table Collision */}
            <RigidBody type="fixed" colliders={false}>
                <CylinderCollider args={[3, 1.6]} position={[5.65, 0.8, -0.6]} />
                <mesh position={[5.65, 0.8, -0.6]} castShadow receiveShadow>
                    <cylinderGeometry args={[1.8, 0.9, 4]} />
                    <meshStandardMaterial transparent opacity={0} side={THREE.DoubleSide} />
                </mesh>
            </RigidBody>

            {/* TV Stand Collision */}
            <RigidBody type="fixed" colliders={false}>
                <CuboidCollider args={[0.7, 2.5, 2.75]} position={[9, 1, -0.3]} />
                <mesh position={[9, 1, -0.3]} castShadow receiveShadow>
                    <boxGeometry args={[1.4, 5, 5.5]} />
                    <meshStandardMaterial transparent opacity={0} side={THREE.DoubleSide} />
                </mesh>
            </RigidBody>

        </group>
    )
}

export default Scene