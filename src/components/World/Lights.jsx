import { Sky } from "@react-three/drei";

export default function Lights() {
    return (
        <>
            <directionalLight position={[-10, 5, 8]} intensity={0.6} />
            <ambientLight intensity={0.4} />

            <Sky
                distance={450000}
                sunPosition={[1, 1, 0.1]}
                inclination={10}
                azimuth={0.25}
            />
        </>
    );
}
