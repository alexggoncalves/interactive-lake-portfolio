import { useControls } from "leva";
import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { TextureLoader, RepeatWrapping, NearestFilter } from "three";

import Boat from "../Boat";
import WaterBodies from "../WaterBodies/WaterBodies";
import { useEffect } from "react";
import { Suspense } from "react";

import { Loader } from "./../Loader";

export default function World() {
    const waterProps = useControls("Water controls", {
        waterScale: {
            value: { x: 130, y: 130 },
            step: 1,
        },
        waveSpeed: {
            value: 0.6,
            step: 0.01,
        },
        waterColor: "#b2c6d8",
        foamColor: "#6894b7",
    });

    const { nodes } = useGLTF("./models/river_environment.glb");
    // useEffect(() => {
    //     console.log(nodes);
    // }, [nodes]);

    const noiseMap = useLoader(
        TextureLoader,
        "https://i.imgur.com/gPz7iPX.jpg"
    );
    const dudvMap = useLoader(TextureLoader, "https://i.imgur.com/hOIsXiZ.png");

    noiseMap.wrapS = noiseMap.wrapT = RepeatWrapping;
    noiseMap.minFilter = NearestFilter;
    noiseMap.magFilter = NearestFilter;
    dudvMap.wrapS = dudvMap.wrapT = RepeatWrapping;

    return (
        <>
        <WaterBodies
                        waterfallModel={nodes.waterfall}
                        waterfallModel2={nodes.waterfall_2}
                        lakeModel={nodes.lake}
                        boatCutOut={nodes.boat_cutout}
                        dudvMap={dudvMap}
                        noiseMap={noiseMap}
                    />
            <Suspense fallback={<Loader />}>
                <group dispose={null}>
                    
                    <mesh
                        geometry={nodes.floor.children[0].geometry}
                        position={nodes.floor.children[0].position}
                        material={nodes.floor.children[0].material}
                    />

                    <mesh
                        geometry={nodes.floor.children[1].geometry}
                        position={nodes.floor.children[1].position}
                        material={nodes.floor.children[1].material}
                    />

                    <mesh
                        geometry={nodes.cliff_1.geometry}
                        position={nodes.cliff_1.position}
                        material={nodes.cliff_1.material}
                    ></mesh>

                    <mesh
                        geometry={nodes.cliff_2.geometry}
                        position={nodes.cliff_2.position}
                        material={nodes.cliff_2.material}
                    ></mesh>

                    <mesh
                        geometry={nodes.plaque.geometry}
                        position={nodes.plaque.position}
                        material={nodes.plaque.material}
                    ></mesh>
                    <mesh
                        geometry={nodes.water_block.geometry}
                        position={nodes.water_block.position}
                        material={nodes.water_block.material}
                    ></mesh>

                    {/* Barrier */}
                    <RigidBody
                        type="fixed"
                        colliders="trimesh"
                        friction={0}
                        restitution={1}
                    >
                        <mesh
                            geometry={nodes.barrier.geometry}
                            position={nodes.barrier.position}
                            material={false}
                        >
                            {/* <meshBasicMaterial/> */}
                        </mesh>
                    </RigidBody>

                    <Boat
                        position={nodes.spawn_point.position}
                        boatModel={nodes.boat}
                    />
                </group>
            </Suspense>
        </>
    );
}

useGLTF.preload("./models/river_environment.glb");
