import { useRef, forwardRef } from "react";
import { useFrame, extend } from "@react-three/fiber";

import { WaterMaterial } from "./WaterMaterial";

extend({ WaterMaterial });

const Lake = forwardRef(({ dudvMap, depthTexture }, lake) => {
    const pixelRatio = window.devicePixelRatio;

    const lakeMaterial = useRef();

    useFrame(({ camera }, delta) => {
        if (lakeMaterial.current) {
            lakeMaterial.current.uniforms.tDepth.value = depthTexture;
            lakeMaterial.current.uniforms.time.value += delta / 6;
            lakeMaterial.current.uniforms.cameraNear.value = camera.near;
            lakeMaterial.current.uniforms.cameraFar.value = camera.far;
            lakeMaterial.current.uniforms.resolution.value.set(
                window.innerWidth * pixelRatio,
                window.innerHeight * pixelRatio
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
