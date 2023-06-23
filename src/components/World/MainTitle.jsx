import { MeshMatcapMaterial, sRGBEncoding } from "three";
import { useMatcapTexture, Text3D, Center, Float } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";

const material = new MeshMatcapMaterial();

function MainTitle({ text }) {
    const ref = useRef();
    // const [matcap] = useMatcapTexture("7B5254_E9DCC7_B19986_C8AC91",256);

    // useEffect(() => {
    //     matcap.colorSpace = sRGBEncoding;
    //     matcap.needsUpdate = true;

    //     material.matcap = matcap;
    //     material.needsUpdate = true;
    // }, []);

    return (
        <Float
            speed={0.6} // Animation speed, defaults to 1
            rotationIntensity={0.1} // XYZ rotation intensity, defaults to 1
            floatIntensity={0.1} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
            floatingRange={[1, 2]}
        >
            <Center position={[-55, 7, 82]} rotation={[-0.6,0.3,0.2]}>
                <Text3D
                    // material={material}
                    font="./fonts/Inter_Bold.json"
                    curveSegments={4}
                    bevelEnabled
                    bevelSize={0.04}
                    bevelThickness={0.2}
                    height={0.5}
                    lineHeight={0.6}
                    letterSpacing={-0.06}
                    size={2.5}
                    
                >
                    {text}
                </Text3D>
                <Text3D
                    // material={material}
                    font="./fonts/Inter_Bold.json"
                    curveSegments={4}
                    bevelEnabled
                    bevelSize={0.04}
                    bevelThickness={0.2}
                    height={0.5}
                    lineHeight={0.55}
                    letterSpacing={-0.06}
                    size={1.0}
                    position={[0.2,-5.3,0]}
                >
                    CREATIVE DEVELOPER
                </Text3D>
            </Center>
        </Float>
    );
}

export default MainTitle;
