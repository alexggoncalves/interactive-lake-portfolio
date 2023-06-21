import { PointsMaterial } from "three";

function WaterfallParticles() {
    const positions = new Float32Array(count * 3);

    return (
        <points>
            <bufferGeometry>
                <bufferAttribute
                    attach="position"
                    count={particlesPosition.length / 3}
                    array={particlesPosition}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.015}
                color="#5786F5"
                sizeAttenuation
                depthWrite={false}
            ></pointsMaterial>
        </points>
    );
}

export default WaterfallParticles;
