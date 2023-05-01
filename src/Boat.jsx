import { useFrame, useThree } from "@react-three/fiber";
import { RigidBody, CuboidCollider } from "@react-three/rapier";
import { useEffect, useRef, useState, useMemo } from "react";
import { useKeyboardControls, PivotControls } from "@react-three/drei";
import { Quaternion } from "three";
import { useControls } from "leva";
import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";

export default function Boat({ waterProps }) {
    const mainCollider = useRef();
    const boatCorner1 = useRef();
    const boatCorner2 = useRef();
    const boatCorner3 = useRef();
    const boatCorner4 = useRef();
    const body = useRef();

    const waterHeight = 0;

    const [angle, setAngle] = useState(0);

    const [subscribeKeys, getKeys] = useKeyboardControls();

    useEffect(() => {
        return () => {
            subscribeKeys({});
        };
    }, []);

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

    useFrame((state, delta) => {
        const position = body.current.translation();
        const currentRotation = body.current.rotation();

        /**
         * Input controls
         */
        const { forward, rightward, backward, leftward } = getKeys();

        const impulse = { x: 0, y: 0, z: 0 };
        const impulseStrength = 20 * delta;

        const torque = { x: 0, y: 0, z: 0 };
        const torqueStrength = 8 * delta;

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

        // Rotation
        const targetOrientation = new THREE.Vector3(0, 0, 1);
        const currentQuaternion = new Quaternion(
            currentRotation.x,
            currentRotation.y,
            currentRotation.z,
            currentRotation.w
        );
        const currentOrientation = targetOrientation.applyQuaternion(currentQuaternion);
        setAngle(Math.atan2(currentOrientation.x, currentOrientation.z));

        // Apply impulses
        if (body.current.isSleeping) body.current.wakeUp();
        body.current.applyImpulse(impulse, true);
        body.current.applyTorqueImpulse(torque, true);

        applyWaterBuoyancy(
            boatCorner1,
            body,
            depthBeforeSubmerged,
            displacementAmount
        );
        applyWaterBuoyancy(
            boatCorner2,
            body,
            depthBeforeSubmerged,
            displacementAmount
        );
        applyWaterBuoyancy(
            boatCorner3,
            body,
            depthBeforeSubmerged,
            displacementAmount
        );
        applyWaterBuoyancy(
            boatCorner4,
            body,
            depthBeforeSubmerged,
            displacementAmount
        );

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
    });

    function applyWaterBuoyancy(
        boatCorner,
        body,
        depthBeforeSubmerged,
        displacementAmount
    ) {
        const pointPosition = boatCorner.current.translation();

        if (pointPosition.y < waterHeight) {
            const displacementMultiplier = Math.max(
                0,
                Math.min(
                    (waterHeight - pointPosition.y) / depthBeforeSubmerged,
                    1
                )
            );

            body.current.applyImpulseAtPoint(
                { x: 0, y: displacementMultiplier * displacementAmount, z: 0 },
                pointPosition
            );
        }
    }

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
                <CuboidCollider ref={mainCollider} args={[0.5, 0.5, 0.5]} />
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
