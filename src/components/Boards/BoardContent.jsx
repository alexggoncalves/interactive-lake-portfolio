import { useSpring, animated } from "@react-spring/three";
import { Text } from "@react-three/drei";
import { Vector3 } from "three";
import RightFloatingSlot from "./RightFloatingSlot";
import LeftFloatingSlot from "./LeftFloatingSlot";

const AnimatedText = animated(Text);

function BoardContent({ isActive, content, frame }) {
    const frameHeight =
        frame.geometry.boundingBox.max.y - frame.geometry.boundingBox.min.y;
    const frameWidth =
        frame.geometry.boundingBox.max.x - frame.geometry.boundingBox.min.x;

    const center = new Vector3(
        frame.position.x - 0.8 * Math.sin(frame.rotation.y),
        frame.position.z,
        frame.position.z - 0.8 * Math.cos(frame.rotation.y)
    );

    const topSlot = new Vector3(
        center.x -
            (frameWidth / 2 - 0.2) * Math.sin(frame.rotation.y + Math.PI / 2),
        frame.position.y + frameHeight + 1,
        center.z -
            (frameWidth / 2 - 0.2) * Math.cos(frame.rotation.y + Math.PI / 2)
    );

    const rightSlot = new Vector3(
        center.x +
            (frameWidth / 2 + 0.5) * Math.sin(frame.rotation.y + Math.PI / 2),
        frame.position.y + frameHeight - 0.8,
        center.z +
            (frameWidth / 2 + 0.5) * Math.cos(frame.rotation.y + Math.PI / 2)
    );
    const hiddenSlots = new Vector3(
        center.x + Math.sin(frame.rotation.y + Math.PI / 2),
        rightSlot.y,
        center.z + Math.cos(frame.rotation.y + Math.PI / 2)
    );

    const leftSlot = new Vector3(
        center.x -
            (frameWidth / 2 + 0.5) * Math.sin(frame.rotation.y + Math.PI / 2),
        frame.position.y + frameHeight - 0.8,
        center.z -
            (frameWidth / 2 + 0.5) * Math.cos(frame.rotation.y + Math.PI / 2)
    );

    const config = {
        mass: 20,
        friction: 120,
        tension: 200,
    };

    const visibilityAnimation = useSpring({
        opacity: isActive ? 1 : 0,
        scale: isActive ? 1 : 0.8,
        config,
    });

    const titleAnimation = useSpring({
        position: isActive
            ? [topSlot.x, topSlot.y, topSlot.z]
            : [topSlot.x, topSlot.y - 1.8, topSlot.z],

        config,
    });

    return (
        <>
            {/* Title */}
            {content.title && (
                <AnimatedText
                    font="./fonts/Roboto-Medium.ttf"
                    color="white"
                    rotation={frame.rotation}
                    anchorX="left"
                    anchorY="center"
                    scale={visibilityAnimation.scale}
                    position={titleAnimation.position}
                    fillOpacity={visibilityAnimation.opacity}
                >
                    {content.title}
                </AnimatedText>
            )}
            <RightFloatingSlot
                content={content}
                isActive={isActive}
                visiblePosition={rightSlot}
                hiddenPosition={hiddenSlots}
                rotation={frame.rotation}
            />
            <LeftFloatingSlot
                content={content}
                isActive={isActive}
                visiblePosition={leftSlot}
                hiddenPosition={hiddenSlots}
                rotation={frame.rotation}
            />
        </>
    );
}

export default BoardContent;
