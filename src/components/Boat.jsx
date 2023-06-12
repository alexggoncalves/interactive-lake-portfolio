import { useFrame } from "@react-three/fiber";
import { RigidBody, CuboidCollider, ConvexHullCollider} from "@react-three/rapier";
import { useEffect, useRef, useState } from "react";
import { useKeyboardControls, Trail, useTrail, Line } from "@react-three/drei";
import { Quaternion } from "three";
import { useControls } from "leva";
import * as THREE from "three";

import useTouchInput from "../stores/useTouchInput";
import useApp from "../stores/useApp";
// import BoatTrail from "./BoatTrail";

export default function Boat({ position, boatModel }) {
    const isPaused = useApp((state) => state.isPaused)
    const setPosition = useApp((state) => state.setPosition)
    const setRotation = useApp((state) => state.setRotation)

    const [subscribeKeys, getKeys] = useKeyboardControls();
    const resetTouchInput = useTouchInput((state) => state.resetTouchInput);

    // Each corner of the main collider(body) is also a collider.
    const body = useRef();
    const boatCorner1 = useRef();
    const boatCorner2 = useRef();
    const boatCorner3 = useRef();
    const boatCorner4 = useRef();
    const boatMesh = useRef();
    const leftTrail = useRef();
    const rightTrail = useRef();
    const line = useRef();


    const waterHeight = 0;

    const boatWidth =
        boatModel.geometry.boundingBox.max.x -
        boatModel.geometry.boundingBox.min.x;
    const boatHeight =
        boatModel.geometry.boundingBox.max.y -
        boatModel.geometry.boundingBox.min.y;
    const boatDepth =
        boatModel.geometry.boundingBox.max.z -
        boatModel.geometry.boundingBox.min.z;

    const [angle, setAngle] = useState(0);
    const [smoothCameraPosition] = useState(() => new THREE.Vector3(0, 25, 25));
    const [smoothCameraTarget] = useState(() => new THREE.Vector3());

    // Debug
    const { depthBeforeSubmerged, displacementAmount } = useControls(
        "Boat Controls",
        {
            depthBeforeSubmerged: {
                value: 0.6,
                step: 0.01,
            },
            displacementAmount: {
                value: 2,
                step: 0.01,
            },
        }
    );

    const applyWaterBuoyancy = (boatCorner) => {
        const position = boatCorner.translation();
        

        if (position.y < waterHeight) {
            const displacementMultiplier = Math.max(
                0,
                Math.min((waterHeight - position.y) / depthBeforeSubmerged, 1)
            );

            body.current.applyImpulseAtPoint(
                { x: 0, y: displacementMultiplier * displacementAmount, z: 0 },
                position
            );
        }
    };

    const touchForward = useTouchInput((state) => state.forward);
    const touchBackward = useTouchInput((state) => state.backward);
    const touchLeftward = useTouchInput((state) => state.leftward);
    const touchRightward = useTouchInput((state) => state.rightward);

    useFrame((state, delta) => {
        if (!isPaused) {
            if (body.current.isSleeping) body.current.wakeUp();

            const position = body.current.translation();
            console.log(position)
            setPosition(position)

            const currentRotation = body.current.rotation();
            setRotation(currentRotation)
            
            const { forward, rightward, backward, leftward } = getKeys();

            const impulse = { x: 0, y: 0, z: 0 };
            const impulseStrength = 120 * delta;
            const torque = { x: 0, y: 0, z: 0 };
            const torqueStrength = 100 * delta;

            // Set the orientation angle
            const targetOrientation = new THREE.Vector3(0, 0, 1);
            const currentOrientation =
                targetOrientation.applyQuaternion(currentRotation);
            setAngle(Math.atan2(currentOrientation.x, currentOrientation.z));
            

            if (forward || touchForward) {
                impulse.z -= impulseStrength * Math.cos(angle);
                impulse.x -= impulseStrength * Math.sin(angle);
            }
            if (rightward || touchRightward) {
                torque.y -= torqueStrength;
            }
            if (backward || touchBackward) {
                impulse.z += impulseStrength * Math.cos(angle);
                impulse.x += impulseStrength * Math.sin(angle);
            }
            if (leftward || touchLeftward) {
                torque.y += torqueStrength;
            }

            // Apply impulses
            body.current.applyImpulse(impulse);
            body.current.applyTorqueImpulse(torque);

            // Apply buoyancy to each corner
            applyWaterBuoyancy(boatCorner1.current);
            applyWaterBuoyancy(boatCorner2.current);
            applyWaterBuoyancy(boatCorner3.current);
            applyWaterBuoyancy(boatCorner4.current);

            // Change trail position
            // if (leftTrail.current && boatCorner1.current) {
            //     const leftCorner = boatCorner3.current.translation();
            //     const rightCorner = boatCorner4.current.translation();
            //     leftTrail.current.position.set(leftCorner.x, 0.1, leftCorner.z);

            //     rightTrail.current.position.set(
            //         rightCorner.x,
            //         0.1,
            //         rightCorner.z
            //     );
            // }

            // Move camera
            const cameraPosition = new THREE.Vector3();
            cameraPosition.copy(position);
            cameraPosition.z += 25;
            cameraPosition.y = 25;

            const cameraTarget = new THREE.Vector3();
            cameraTarget.copy(position);
            cameraTarget.y = 0.5;

            smoothCameraPosition.lerp(cameraPosition, 5 * delta);
            smoothCameraTarget.lerp(cameraTarget, 5 * delta);

            state.camera.position.copy(smoothCameraPosition);
            state.camera.lookAt(smoothCameraTarget);
        }
    });
    
    return (
        <>
            <RigidBody
                ref={body}
                restitution={1}
                friction={1}
                angularDamping={1.5}
                linearDamping={1}
                position={position}
                gravityScale={1}
                colliders={false}
                
            >
                {/* Main Body Collider */}
                <CuboidCollider
                    mass={10}
                    args={[boatWidth / 2, boatHeight / 2, boatDepth / 2]}
                />

                {/* Floaters */}
                <CuboidCollider
                    ref={boatCorner1}
                    mass={0}
                    args={[0.05, 0.05, 0.05]}
                    position={[-boatWidth / 2, 0, -boatDepth / 2]}
                />
                <CuboidCollider
                    ref={boatCorner2}
                    mass={0}
                    args={[0.05, 0.05, 0.05]}
                    position={[boatWidth / 2, 0, -boatDepth / 2]}
                />
                <CuboidCollider
                    ref={boatCorner3}
                    mass={0}
                    args={[0.05, 0.05, 0.05]}
                    position={[-boatWidth / 2, 0, boatDepth / 2]}
                />
                <CuboidCollider
                    ref={boatCorner4}
                    mass={0}
                    args={[0.05, 0.05, 0.05]}
                    position={[boatWidth / 2, 0, boatDepth / 2]}
                />

                {/* Boat Mesh */}
                <mesh ref={boatMesh} geometry={boatModel.geometry}>
                    <meshStandardMaterial color="BurlyWood" />
                </mesh>
            </RigidBody>

            {/* <Trail
                width={5} // Width of the line
                color={"white"} // Color of the line
                length={10} // Length of the line
                decay={1} // How fast the line fades away
                local={true} // Wether to use the target's world or local positions
                stride={0} // Min distance between previous and current point
                interval={2} // Number of frames to wait before next calculation
                attenuation={(width) => width} // A function to define the width in each point along it.
            >
                <mesh ref={leftTrail} >
                    <planeGeometry  />
                    <meshBasicMaterial
                        visible={false}
                    ></meshBasicMaterial>
                </mesh>
            </Trail>

            <Trail
                width={5} // Width of the line
                color={"white"} // Color of the line
                length={10} // Length of the line
                decay={1} // How fast the line fades away
                local={true} // Wether to use the target's world or local positions
                stride={0} // Min distance between previous and current point
                interval={2} // Number of frames to wait before next calculation
                attenuation={(width) => width} // A function to define the width in each point along it.
                
            >
                <mesh ref={rightTrail}>
                    <planeGeometry  />
                    <meshBasicMaterial
                        visible={false}
                    ></meshBasicMaterial>
                </mesh>
            </Trail> */}
        </>
    );
}
