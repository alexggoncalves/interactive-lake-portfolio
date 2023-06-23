import { Sky } from "@react-three/drei";

export default function Lights() {
    return (
        <>
            <directionalLight
                shadow-mapSize={[4096, 4096]}
                castShadow
                position={[5, 5, 5]}
                intensity={0.8}
                color={"#F9D794"}
            >
                <orthographicCamera attach="shadow-camera" args={[-10, 10, -10, 10, 0.1, 50]} />
            </directionalLight>
            <ambientLight intensity={0.4} color={"#B6E3FF"} />

            {/* <Sky
                distance={450000}
                sunPosition={[1, 1, 0.1]}
                inclination={10}
                azimuth={0.25}
                
            /> */}
        </>
    );
}
