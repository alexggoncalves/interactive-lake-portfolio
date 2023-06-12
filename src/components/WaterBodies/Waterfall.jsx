import * as THREE from "three";
import { useFrame, extend } from "@react-three/fiber";
import React, { useEffect, useMemo, useRef } from "react";

import { WaterfallMaterial } from "./WaterfallMaterial";

extend({ WaterfallMaterial });

export const Waterfall = React.forwardRef(
    ({ waterfallModel, noiseMap, dudvMap }, ref) => {
        const waterfallMaterial = useRef();

        useEffect(() => {
            waterfallMaterial.current.uniforms.tNoise.value = noiseMap;
            waterfallMaterial.current.uniforms.tDudv.value = dudvMap;
        }, [waterfallMaterial.current]);

        useFrame((state, delta) => {
                waterfallMaterial.current.uniforms.time.value += delta / 3;
        });

        return (
            <>
                <mesh
                    ref={ref}
                    geometry={waterfallModel.geometry}
                    position={waterfallModel.position}
                    rotation={waterfallModel.rotation}
                >
                    <waterfallMaterial ref={waterfallMaterial} />
                </mesh>
            </>
        );
    }
);

export default Waterfall;
