import { useFrame } from "@react-three/fiber";
import { RigidBody, interactionGroups } from "@react-three/rapier";
import { useRef } from "react";
import { Vector3, Matrix4 } from "three";

import useApp from "../stores/useApp";

const distanceFromBoard = 8;

const InteractionArea = ({ position, rotation, link }) => {
    const area = useRef();

    const setCameraTarget = useApp((state) => state.setCameraTarget);
    const setCameraPosition = useApp((state) => state.setCameraPosition);
    const clearCameraTarget = useApp((state) => state.clearCameraTarget);
    const clearCameraPosition = useApp((state) => state.clearCameraPosition);

    const x = position.x + distanceFromBoard * Math.sin(rotation.y);
    const z = position.z + distanceFromBoard * Math.cos(rotation.y);

    const cameraPositionOnEnter = new Vector3(
        position.x + 30 * Math.sin(rotation.y),
        20,
        position.z + 30 * Math.cos(rotation.y)
    );

    const handleIntersectionEnter = () => {
        setCameraTarget(position);
        setCameraPosition(cameraPositionOnEnter);
        console.log("aa");
    };
    const handleIntersectionExit = () => {
        clearCameraTarget();
        clearCameraPosition();
    };

    return (
        <RigidBody
            sensor
            type="fixed"
            position={[x, 0, z]}
            rotation={rotation}
            onIntersectionEnter={handleIntersectionEnter}
            onIntersectionExit={handleIntersectionExit}
            collisionGroups={interactionGroups(2, 0)}
            // visible={false}
        >
            <mesh  ref={area} rotation={[-Math.PI / 2, 0, 0]}>
                <boxGeometry args={[15, 12, 10]} />
                <meshBasicMaterial color="#white" visible={false}/>
            </mesh>
        </RigidBody>
    );
};

export default InteractionArea;
