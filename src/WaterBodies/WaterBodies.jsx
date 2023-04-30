import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader, RepeatWrapping, NearestFilter } from "three";

import Lake from "./Lake";
import Waterfall from "./Waterfall";
import React, { useRef } from "react";
import WaterParticles from "./WaterParticles";

export default function ({ waterfallModel, riverModel }) {
    const waterfall = React.createRef();
    const particles = React.createRef();

    const noiseMap = useLoader(
        TextureLoader,
        "https://i.imgur.com/gPz7iPX.jpg"
    );
    const dudvMap = useLoader(TextureLoader, "https://i.imgur.com/hOIsXiZ.png");
    noiseMap.wrapS = noiseMap.wrapT = RepeatWrapping;
    noiseMap.minFilter = NearestFilter;
    noiseMap.magFilter = NearestFilter;
    dudvMap.wrapS = dudvMap.wrapT = RepeatWrapping;

    return (
        <>
            <Lake
                waterfallRef={waterfall}
                particlesRef={particles}
                noiseMap={noiseMap}
                dudvMap={dudvMap}
                riverModel={riverModel}
            />
            <Waterfall
                ref={waterfall}
                waterfallModel={waterfallModel}
                noiseMap={noiseMap}
                dudvMap={dudvMap}
            />
            <WaterParticles
                ref={particles}
                noiseMap={noiseMap}
                position={waterfallModel.position}
                rotation={waterfallModel.rotation}
            />
        </>
    );
}
