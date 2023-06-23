import { RigidBody, interactionGroups } from "@react-three/rapier";
import { useState } from "react";
import { Vector3 } from "three";

import useApp from "../../stores/useApp";
import BoardContent from "./BoardContent";

const distanceFromBoard = 8;

const BoardInteraction = ({ frame, content }) => {
    const [active, setActive] = useState(false);
    const setCameraTarget = useApp((state) => state.setCameraTarget);
    const setCameraPosition = useApp((state) => state.setCameraPosition);
    const clearCameraTarget = useApp((state) => state.clearCameraTarget);
    const clearCameraPosition = useApp((state) => state.clearCameraPosition);
    const cameraPosition = useApp((state) => state.cameraPosition);

    const x = frame.position.x + distanceFromBoard * Math.sin(frame.rotation.y);
    const z = frame.position.z + distanceFromBoard * Math.cos(frame.rotation.y);

    const cameraPositionOnEnter = new Vector3(
        frame.position.x + 30 * Math.sin(frame.rotation.y),
        20,
        frame.position.z + 30 * Math.cos(frame.rotation.y)
    );

    const handleIntersectionEnter = () => {
        setCameraTarget(frame.position);
        setCameraPosition(cameraPositionOnEnter);
        setActive(true);
    };
    const handleIntersectionExit = () => {
        if (cameraPositionOnEnter.equals(cameraPosition)) {
            clearCameraTarget();
            clearCameraPosition();
        }
        setActive(false);
    };

    return (
        <>
            {/* Board Interaction Sensor */}
            <RigidBody
                sensor
                type="fixed"
                position={[x, 0, z]}
                rotation={frame.rotation}
                onIntersectionEnter={handleIntersectionEnter}
                onIntersectionExit={handleIntersectionExit}
                collisionGroups={interactionGroups(2, 0)}
                colliders="ball"
            >
                <mesh rotation={[-Math.PI / 2, 0, 0]}>
                    <sphereGeometry args={[10, 8, 8]} />
                    <meshBasicMaterial color="white" visible={false} />
                </mesh>
            </RigidBody>

            {/* Contents */}
            {content && (
                <BoardContent
                    active={active}
                    content={content}
                    frame={frame}
                />
            )}
        </>
    );
};

export default BoardInteraction;
