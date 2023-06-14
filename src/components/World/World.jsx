import { useControls } from "leva";
import { useGLTF, useTexture } from "@react-three/drei";
import { RigidBody, Physics, Debug } from "@react-three/rapier";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { TextureLoader, RepeatWrapping, NearestFilter } from "three";

import Boat from "../Boat";
import WaterBodies from "../WaterBodies/WaterBodies";
import { useEffect, useRef } from "react";
import { Suspense } from "react";
import Loader from "./../Loader";

import useApp from "../../stores/useApp";

export default function World() {
    const boat = useRef();
    const { nodes } = useGLTF("./models/river_environment.glb");
    // useEffect(() => {
    //     console.log(nodes);
    // }, [nodes]);
    const isPaused = useApp((state) => state.isPaused);
    const unpause = useApp((state) => state.unpause);

    useEffect(() => {
        const startButton = document.querySelector(".start-button");
        const loadingScreen = document.querySelector(".loading-screen");
        const handleStart = () => {
            unpause();

            startButton.removeEventListener("click", handleStart);
            setTimeout(() => loadingScreen.classList.add("hidden"), 0);
        };
        startButton.addEventListener("click", handleStart);

        return () => {
            startButton.removeEventListener("click", handleStart);
        };
    }, []);

    return (
        <>
            <Physics
                paused={isPaused}
                gravity={[0, -9.8, 0]}
                // allowSleep={true}
            >
                <Boat
                    ref={boat}
                    position={nodes.spawn_point.position}
                    boatModel={nodes.boat}
                />

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
                    ></mesh>
                </RigidBody>

                {/* <Debug /> */}
            </Physics>

            <WaterBodies
                waterfallModel={nodes.waterfall}
                waterfallModel2={nodes.waterfall_2}
                lakeModel={nodes.lake}
                boatCutOut={nodes.boat_cutout}
                boat={boat}
            />

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
            </group>
        </>
    );
}

useGLTF.preload("./models/river_environment.glb");
