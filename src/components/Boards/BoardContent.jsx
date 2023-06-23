import { useSpring, animated } from "@react-spring/three";
import { Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { degToRad } from "three/src/math/MathUtils";

const AnimatedText = animated(Text);

function BoardContent({ active, content, frame }) {
    const frameHeight =
        frame.geometry.boundingBox.max.y - frame.geometry.boundingBox.min.y;
    const frameWidth =
        frame.geometry.boundingBox.max.x - frame.geometry.boundingBox.min.x;
    const title = useRef();
    const center = [
        frame.position.x - 0.8 * Math.sin(frame.rotation.y),
        0,
        frame.position.z - 0.8 * Math.cos(frame.rotation.y),
    ];

    const leftCorner = [
        center[0] -
            (frameWidth / 2 - 0.2) * Math.sin(frame.rotation.y + Math.PI / 2),
        frameHeight,
        center[2] -
            (frameWidth / 2 - 0.2) * Math.cos(frame.rotation.y + Math.PI / 2),
    ];

    const { opacity } = useSpring({
        opacity: active ? 1 : 0,
        position: [],
        config: {
            mass: 20,
            friction: 120,
            tension: 200,
        },
    });

    return (
        <>
            {/* Title */}
            {content.title && (
                <AnimatedText
                    ref={title}
                    anchorX="left"
                    color="white"
                    anchorY="bottom"
                    position={leftCorner}
                    rotation={frame.rotation}
                    fillOpacity={opacity}
                >
                    {content.title}
                </AnimatedText>
            )}
        </>
    );
}

export default BoardContent;
