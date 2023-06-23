import { PivotControls, Shadow, useGLTF } from "@react-three/drei";
import {
    RigidBody,
    Physics,
    Debug,
    interactionGroups,
} from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";

import useApp from "../../stores/useApp";
import CameraControls from "../CameraControls";
import MainTitle from "./MainTitle";
import Boat from "../Boat";
import WaterBodies from "../WaterBodies/WaterBodies";
import Boards from "../Boards/Boards";
import { MeshBasicMaterial } from "three";

export default function World() {
    const boat = useRef();
    const pivot = useRef();

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
        {/* <fog attach="fog" args={["white", 0, 200]} /> */}
            <CameraControls initialPosition={nodes.spawn_point.position} />
            <Physics
                timeStep={1 / 240}
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
                    collisionGroups={interactionGroups(1, 0)}
                >
                    <mesh
                        geometry={nodes.barrier.geometry}
                        position={nodes.barrier.position}
                        material={false}
                    ></mesh>
                </RigidBody>

                <Boards nodes={nodes}></Boards>

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
            <MainTitle text={"Luís\nGonçalves"}></MainTitle>
            {/* </PivotControls> */}

            <group>
                {/* Floor */}
                <mesh
                    
                    geometry={nodes.floor.children[0].geometry}
                    position={nodes.floor.children[0].position}
                    material={nodes.floor.children[0].material}
                />

                <mesh
                    receiveShadow
                    geometry={nodes.floor.children[1].geometry}
                    position={nodes.floor.children[1].position}
                    material={nodes.floor.children[1].material}
                >
                </mesh>

                {/* Cliffs */}
                <mesh
                    geometry={nodes.cliff_1.geometry}
                    position={nodes.cliff_1.position}
                    material={nodes.cliff_1.material}
                />

                <mesh
                    geometry={nodes.cliff_2.geometry}
                    position={nodes.cliff_2.position}
                    material={nodes.cliff_2.material}
                />

                {/* This block serves to get the depth map to 
                register the water over the edge of the map*/}
                <mesh
                    geometry={nodes.water_block.geometry}
                    position={nodes.water_block.position}
                    material={nodes.water_block.material}
                />

                {/* Directions plaque */}
                <mesh
                    geometry={nodes.plaque.geometry}
                    position={nodes.plaque.position}
                    material={nodes.plaque.material}
                ></mesh>
                <mesh
                    geometry={nodes.plaque_text_1.geometry}
                    position={nodes.plaque_text_1.position}
                    material={nodes.plaque_text_1.material}
                    rotation={nodes.plaque_text_1.rotation}
                ></mesh>
                <mesh
                    geometry={nodes.plaque_text_2.geometry}
                    position={nodes.plaque_text_2.position}
                    material={nodes.plaque_text_2.material}
                    rotation={nodes.plaque_text_2.rotation}
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

                {/* Fire pit */}
                <mesh
                    geometry={nodes.firepit_base.geometry}
                    position={nodes.firepit_base.position}
                    material={nodes.firepit_base.material}
                    rotation={nodes.firepit_base.rotation}
                ></mesh>
                <mesh
                    geometry={nodes.firepit_top.geometry}
                    position={nodes.firepit_top.position}
                    material={nodes.firepit_top.material}
                    rotation={nodes.firepit_top.rotation}
                ></mesh>
            </group>
        </>
    );
}

useGLTF.preload("./models/river_environment.glb");
