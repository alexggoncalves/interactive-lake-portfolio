import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { Vector3 } from "three";
import useApp from "../stores/useApp";

export default function CameraControls({ initialPosition}) {
    const { camera, scene } = useThree();

    const isPaused = useApp((state) => state.isPaused);

    const [smoothCameraPosition] = useState(new Vector3(initialPosition.x,20,initialPosition.z + 12));
    const [smoothCameraTarget] = useState(initialPosition);

    const cameraPosition = new Vector3();
    const cameraTarget = new Vector3();

    const interactionTarget = useApp((state) => state.cameraTarget);
    const interactionPosition = useApp((state) => state.cameraPosition);
    
    useFrame(({ camera, scene }, delta) => {
        
            if (!isPaused && scene.children[0]) {
                cameraPosition.copy(scene.children[0].position);
                cameraPosition.z += 25;
                cameraPosition.y = 28;

                cameraTarget.copy(scene.children[0].position);
                cameraTarget.y = 0.5;

                if (interactionPosition == null && interactionTarget == null) {
                    smoothCameraPosition.lerp(cameraPosition, 3 * delta);
                    smoothCameraTarget.lerp(cameraTarget, 3 * delta);
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
