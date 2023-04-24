import { useEffect } from "react";
import { useControls } from "leva";
import * as THREE from "three";
import { Sky, useGLTF } from "@react-three/drei";

import Boat from "./Boat";
import Lake from "./Water";
import Floor from "./Floor";
import Ocean from "./Floor";
import { RigidBody } from "@react-three/rapier";

export default function World() {
    const waterProps = useControls("Water controls", {
        waterSegments: {
            value: { x: 20, y: 20 },
            step: 1,
        },
        waterScale: {
            value: { x: 130, y: 130 },
            step: 1,
        },
        waveFrequency: {
            value: { x: 0.2, y: 0.2 },
            step: 0.01,
        },
        waveSpeed: {
            value: 0.6,
            step: 0.01,
        },
        waveElevation: {
            value: 1,
            step: 0.01,
        },
        higherColor: "#b2c6d8",
        lowerColor: "#6894b7",
        colorOffset: {
            value: 0.15,
            step: 0.01,
        },
        colorMultiplier: {
            value: 2.24,
            step: 0.01,
        },
    });

    const { nodes } = useGLTF("./models/lake_environment.glb");
    console.log(nodes);

    return (
        <>
            <Boat waterProps={waterProps} />
            <Lake waterProps={waterProps} />
            <Sky
                distance={450000}
                sunPosition={[1, 1, 0.1]}
                inclination={10}
                azimuth={0.25}
            />

            {/* Pier */}
            <group scale={0.7} position={[0, 0.8, 0]} rotation={[0, 0.2, 0]}>
                <mesh
                    geometry={nodes.pier.geometry}
                    position={nodes.pier.position}
                    material={nodes.pier.material}
                    castShadow
                />

                <mesh
                    geometry={nodes.land.children[0].geometry}
                    position={nodes.land.children[0].position}
                    material={nodes.land.children[0].material}
                    receiveShadow
                />

                <mesh
                    geometry={nodes.land.children[1].geometry}
                    position={nodes.land.children[1].position}
                    material={nodes.land.children[1].material}
                    receiveShadow
                ></mesh>
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

                <RigidBody type="fixed" colliders="hull" friction={-1}>
                    <mesh
                        geometry={nodes.ramp.geometry}
                        position={nodes.ramp.position}
                        material={nodes.ramp.material}
                    ></mesh>
                </RigidBody>
                <RigidBody 
                    type="fixed" 
                    colliders="trimesh" 
                    friction={1}
                    restitution={0}                    
                >
                    <mesh visible={false}
                        geometry={nodes.barrier.geometry}
                        position={nodes.barrier.position}
                    ></mesh>
                </RigidBody>
            </group>
        </>
    );
}
