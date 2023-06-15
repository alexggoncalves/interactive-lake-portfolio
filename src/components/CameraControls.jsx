import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { Vector3 } from "three";
import useApp from "../stores/useApp";

export default function CameraControls() {

    const {camera,scene} = useThree()
    
    const [smoothCameraPosition] = useState(() => new Vector3(-70,25,73));
    const [smoothCameraTarget] = useState(() => new Vector3(-70,25,73));

    const isPaused = useApp((state) => state.isPaused)


    useFrame(({ camera, scene }, delta) => {
        // console.log(scene.children[0].position);
        if (scene.children[0] && !isPaused) {
            const cameraPosition = new Vector3();
           
            cameraPosition.copy(scene.children[0].position);
            cameraPosition.z += 25;
            cameraPosition.y = 28;

            const cameraTarget = new Vector3();
            cameraTarget.copy(scene.children[0].position);
            cameraTarget.y = 0.5;

            camera.position.copy(cameraPosition);
            camera.lookAt(cameraTarget);
            // smoothCameraPosition.lerp(cameraPosition, 5 * delta);
            // smoothCameraTarget.lerp(cameraTarget, 5 * delta);

            
        }
    });

    return null;
}
