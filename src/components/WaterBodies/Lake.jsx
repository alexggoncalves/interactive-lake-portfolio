import { useRef, forwardRef, useEffect } from "react";
import { useFrame, extend } from "@react-three/fiber";
import { Geometry, Base, Subtraction } from "@react-three/csg";
import { PlaneGeometry } from "three";

import { WaterMaterial } from "./WaterMaterial";

import useApp from "../../stores/useApp";

extend({ WaterMaterial });

const Lake = forwardRef(({ dudvMap, depthTexture, size, boatCutOut }, lake) => {
    const lakeMaterial = useRef();
    const csg = useRef();
    const subtraction = useRef();

    const boatPosition = useApp((state) => state.position);
    const boatRotation = useApp((state) => state.rotation);

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
        subtraction.current.quaternion.copy(boatRotation);
    });
    const lakeGeometry = new PlaneGeometry(252, 252, 1, 1);

    // useEffect(() => {
    //     csg.current.update();
    // }, [boatPosition, boatRotation]);

    return (
        <mesh ref={lake}>
            <Geometry ref={csg}>
                <Base rotation={[-Math.PI / 2, 0, 0]} geometry={lakeGeometry} />
                <Subtraction
                    ref={subtraction}
                    position={[boatPosition.x, boatPosition.y, boatPosition.z]}
                    geometry={boatCutOut.geometry}
                />
            </Geometry>

            <waterMaterial ref={lakeMaterial} />
        </mesh>
    );
});

export default Lake;
