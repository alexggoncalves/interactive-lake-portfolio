import { useControls } from "leva";
import { Sky, useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

import Boat from "./Boat";
import Lake from "./WaterBodies/Lake";
import Waterfall from "./WaterBodies/Waterfall";
import WaterBodies from "./WaterBodies/WaterBodies";

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
        foamColor: "#6894b7"
    });

    const { nodes } = useGLTF("./models/lake_environment.glb");

    return (
        <>
            <Boat waterProps={waterProps} />
            
            <Sky
                distance={450000}
                sunPosition={[1, 1, 0.1]}
                inclination={10}
                azimuth={0.25}
            />
            
            <group scale={0.7} rotation={[0, 0.2, 0]}>
                <WaterBodies waterfallModel={nodes.waterfall} riverModel={nodes.river} lakeModel={nodes.lake}/>
                
                {/* Pier */}
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
