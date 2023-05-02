import { useRef, forwardRef } from "react";
import { useFrame, extend } from "@react-three/fiber";

import { WaterMaterial } from "./WaterMaterial";
import { useThree } from "@react-three/fiber/dist/react-three-fiber.cjs";

extend({ WaterMaterial });

const Lake = forwardRef(({ dudvMap, depthTexture, size }, lake) => {
    
    const lakeMaterial = useRef();

    useFrame(({ camera }, delta) => {
        const pixelRatio = window.window.devicePixelRatio;
        
        if (lakeMaterial.current) {
            lakeMaterial.current.uniforms.tDepth.value = depthTexture;
            lakeMaterial.current.uniforms.time.value += delta / 6;
            lakeMaterial.current.uniforms.cameraNear.value = camera.near;
            lakeMaterial.current.uniforms.cameraFar.value = camera.far;
            lakeMaterial.current.uniforms.resolution.value.set(
                size.width * pixelRatio,
                size.height * pixelRatio
            );
            lakeMaterial.current.uniforms.tDudv.value = dudvMap;
        }
    });

    return (
        <mesh ref={lake} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
            <planeGeometry args={[220, 220]} />
            <waterMaterial ref={lakeMaterial} />
        </mesh>
    );
});

export default Lake;
