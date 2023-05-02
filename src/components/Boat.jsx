import { useFrame } from "@react-three/fiber";
import { RigidBody, CuboidCollider } from "@react-three/rapier";
import { useEffect, useRef, useState } from "react";
import { useKeyboardControls } from "@react-three/drei";
import { Quaternion } from "three";
import { useControls } from "leva";
import * as THREE from "three";

export default function Boat() {
    // Each corner of the main collider(body) is also a collider.
    const body = useRef();
    const boatCorner1 = useRef();
    const boatCorner2 = useRef();
    const boatCorner3 = useRef();
    const boatCorner4 = useRef();

    const waterHeight = 0;

    const [subscribeKeys, getKeys] = useKeyboardControls();

    // Pause boat movement when the window is out of focus
    const [isFocused, setIsFocused] = useState(true);
    useEffect(() => {
        const handleBlur = () => setIsFocused(false);
        const handleFocus = () => setIsFocused(true);

        window.addEventListener("blur", handleBlur);
        window.addEventListener("focus", handleFocus);

        return () => {
            window.removeEventListener("blur", handleBlur);
            window.removeEventListener("focus", handleFocus);
        };
    }, []);

    const [angle, setAngle] = useState(0);
    const [smoothCameraPosition] = useState(() => new THREE.Vector3(0, 25, 25));
    const [smoothCameraTarget] = useState(() => new THREE.Vector3());

    // Debug
    const { depthBeforeSubmerged, displacementAmount } = useControls(
        "Boat Controls",
        {
            depthBeforeSubmerged: {
                value: 0.15,
                step: 0.01,
            },
            displacementAmount: {
                value: 0.24,
                step: 0.01,
            },
        }
    );

    // This 
    const applyWaterBuoyancy = (boatCorner) => {
        const position = boatCorner.translation();

        if (position.y < waterHeight) {
            const displacementMultiplier = Math.max(
                0,
                Math.min(
                    (waterHeight - position.y) / depthBeforeSubmerged,
                    1
                )
            );
            
            body.current.applyImpulseAtPoint(
                { x: 0, y: displacementMultiplier * displacementAmount, z: 0 },
                position
            );
        }
    };

    useFrame((state, delta) => {
        if (isFocused) {
            if(body.current.isSleeping) body.current.wakeUp();
            
            const position = body.current.translation();
            const currentRotation = body.current.rotation();

            // Get the input states
            const { forward, rightward, backward, leftward } = getKeys();

            // Set 
            const impulse = { x: 0, y: 0, z: 0 };
            const impulseStrength = 20 * delta;
            const torque = { x: 0, y: 0, z: 0 };
            const torqueStrength = 8 * delta;

            // Set the orientation angle
            const targetOrientation = new THREE.Vector3(0, 0, 1);
            const currentQuaternion = new Quaternion(
                currentRotation.x,
                currentRotation.y,
                currentRotation.z,
                currentRotation.w
            );
            const currentOrientation =
                targetOrientation.applyQuaternion(currentQuaternion);
            setAngle(Math.atan2(currentOrientation.x, currentOrientation.z));

            //
            if (forward) {
                
                impulse.z -= impulseStrength * Math.cos(angle);
                impulse.x -= impulseStrength * Math.sin(angle);
            }
            if (rightward) {
                torque.y -= torqueStrength;
            }
            if (backward) {
                impulse.z += impulseStrength * Math.cos(angle);
                impulse.x += impulseStrength * Math.sin(angle);
            }
            if (leftward) {
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
                angularDamping={2}
                linearDamping={1}
                position={[0, 2, 0]}
                gravityScale={0.8}
                scale={[1.5, 0.7, 2]}
                colliders={false}
            >
                <CuboidCollider args={[0.5, 0.5, 0.5]} />
                <CuboidCollider
                    ref={boatCorner1}
                    mass={0}
                    args={[0.05, 0.05, 0.05]}
                    position={[-0.5, 0, -0.5]}
                />
                <CuboidCollider
                    ref={boatCorner2}
                    mass={0}
                    args={[0.05, 0.05, 0.05]}
                    position={[0.5, 0, -0.5]}
                />
                <CuboidCollider
                    ref={boatCorner3}
                    mass={0}
                    args={[0.05, 0.05, 0.05]}
                    position={[-0.5, 0, 0.5]}
                />
                <CuboidCollider
                    ref={boatCorner4}
                    mass={0}
                    args={[0.05, 0.05, 0.05]}
                    position={[0.5, 0, 0.5]}
                />
                <mesh position={[0, 0, 0]}>
                    <boxGeometry />
                    <meshStandardMaterial color="BurlyWood" />
                </mesh>
            </RigidBody>
        </>
    );
}
