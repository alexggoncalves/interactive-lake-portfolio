import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { Vector3 } from "three";
import useApp from "../stores/useApp";

export default function CameraControls() {
    const { camera, scene } = useThree();

    const [smoothCameraPosition] = useState(() => new Vector3(-70, 25, 73));
    const [smoothCameraTarget] = useState(() => new Vector3(-70, 25, 73));

    const isPaused = useApp((state) => state.isPaused);

    const cameraPosition = new Vector3();
    const cameraTarget = new Vector3();

    const interactionTarget = useApp((state) => state.cameraTarget);
    const interactionPosition = useApp((state) => state.cameraPosition);

    useFrame(({ camera, scene }, delta) => {
        // console.log(scene.children[0].position);
        if (scene.children[0] && !isPaused) {
            cameraPosition.copy(scene.children[0].position);
            cameraPosition.z += 25;
            cameraPosition.y = 28;

            cameraTarget.copy(scene.children[0].position);
            cameraTarget.y = 0.5;

            
            

            if (interactionPosition == null && interactionTarget == null) {
                smoothCameraPosition.lerp(cameraPosition, 5 * delta);
                smoothCameraTarget.lerp(cameraTarget, 5 * delta);
            } else {
                smoothCameraPosition.lerp(interactionPosition, 2 * delta);
                smoothCameraTarget.lerp(interactionTarget, 2 * delta);
            }
            camera.position.copy(smoothCameraPosition);
            camera.lookAt(smoothCameraTarget);
        }
    });

    return null;
}
