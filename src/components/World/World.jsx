import { PivotControls, useGLTF } from "@react-three/drei";
import { RigidBody, Physics, Debug } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import Boat from "../Boat";
import WaterBodies from "../WaterBodies/WaterBodies";
import { useEffect, useRef } from "react";

import useApp from "../../stores/useApp";
import CameraControls from "../CameraControls";
import MainTitle from "./MainTitle";

export default function World() {
    const boat = useRef();
    const pivot = useRef()
    
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
            loadingScreen.classList.add("hidden");
        };
        startButton.addEventListener("click", handleStart);

        return () => {
            startButton.removeEventListener("click", handleStart);
        };
    }, []);
    useFrame(() => {
        if (pivot.current) {
            console.log(pivot.current.position);
        }
    });


    return (
        <>
            <CameraControls />
            <Physics
                paused={isPaused}
                gravity={[0, -9.8, 0]}
            >
                <Boat
                    ref={boat}
                    initialPosition={nodes.spawn_point.position}
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

            {/* <PivotControls
            ref={pivot}
                depthTest={false}
                scale={5}
                offset={[-30, 0, 80]} 
            >*/}
                <MainTitle text={'Alex\nGonçalves'}></MainTitle>
            {/* </PivotControls> */}

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

                {/* Pier */}
                <mesh
                    geometry={nodes.pier_boards.geometry}
                    position={nodes.pier_boards.position}
                    material={nodes.pier_boards.material}
                    rotation={nodes.pier_boards.rotation}
                ></mesh>
                <mesh
                    geometry={nodes.pier_pillars.geometry}
                    position={nodes.pier_pillars.position}
                    material={nodes.pier_pillars.material}
                    rotation={nodes.pier_boards.rotation}
                ></mesh>

                {/* Bridge */}
                <mesh
                    geometry={nodes.bridge_boards.geometry}
                    position={nodes.bridge_boards.position}
                    material={nodes.bridge_boards.material}
                    rotation={nodes.bridge_boards.rotation}
                ></mesh>
                <mesh
                    geometry={nodes.bridge_pillars.geometry}
                    position={nodes.bridge_pillars.position}
                    material={nodes.bridge_pillars.material}
                    rotation={nodes.bridge_pillars.rotation}
                ></mesh>
                <mesh
                    geometry={nodes.bridge_ropes.geometry}
                    position={nodes.bridge_ropes.position}
                    material={nodes.bridge_ropes.material}
                    rotation={nodes.bridge_ropes.rotation}
                ></mesh>
            </group>
        </>
    );
}

useGLTF.preload("./models/river_environment.glb");
