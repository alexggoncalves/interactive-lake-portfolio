
import { RepeatWrapping, NearestFilter } from "three";
import { createRef, useEffect } from "react";
import { useTexture } from "@react-three/drei";
import Lake from "./Lake";
import Waterfall from "./Waterfall";
import WaterParticles from "./WaterParticles";

export default function WaterBodies({ waterfallModel, boatCutOut , boat}) {
    const noiseMap = useTexture("https://i.imgur.com/gPz7iPX.jpg");
    const dudvMap = useTexture("https://i.imgur.com/hOIsXiZ.png");

    // useEffect(() => {
        noiseMap.wrapS = noiseMap.wrapT = RepeatWrapping;
        noiseMap.minFilter = NearestFilter;
        noiseMap.magFilter = NearestFilter;
        dudvMap.wrapS = dudvMap.wrapT = RepeatWrapping;
    // }, []);
    
    const waterfall = createRef();
    const particles = createRef();
    const lake = createRef();

    return (
        <>
            <Lake
                ref={lake}
                dudvMap={dudvMap}
                boatCutOut={boatCutOut}
                boat={boat}
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

useTexture.preload("https://i.imgur.com/gPz7iPX.jpg")
useTexture.preload("https://i.imgur.com/hOIsXiZ.png")