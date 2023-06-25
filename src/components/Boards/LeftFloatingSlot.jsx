import { useSpring, animated } from "@react-spring/three";
import { Text } from "@react-three/drei";

const AnimatedText = animated(Text);

function LeftFloatingSlot(
    {content,
    isActive,
    visiblePosition,
    hiddenPosition,
    rotation}
) {
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

    const leftSlotAnimation = useSpring({
        position: isActive
            ? [visiblePosition.x, visiblePosition.y, visiblePosition.z]
            : [hiddenPosition.x, hiddenPosition.y, hiddenPosition.z],

        config,
    });

    const titleSize = 0.3;
    const contentSize = 0.4;
    const titleMargin = 0.2;
    const sectionMargin = 0.8;

    return (
        <animated.group
            position={leftSlotAnimation.position}
            rotation={rotation}
        >
            {/* Tags */}
            {content.tags && (
                <>
                    <AnimatedText
                        font="./fonts/Roboto-Regular.ttf"
                        color="white"
                        fontSize={titleSize}
                        anchorX="right"
                        anchorY="top"
                        scale={visibilityAnimation.scale}
                        fillOpacity={visibilityAnimation.opacity}
                    >
                        TAGS
                    </AnimatedText>
                    <AnimatedText
                        font="./fonts/Roboto-Bold.ttf"
                        color="white"
                        fontSize={contentSize}
                        anchorX="right"
                        textAlign="right"
                        anchorY="top"
                        position={[0,-titleSize - titleMargin, 0]}
                        scale={visibilityAnimation.scale}
                        fillOpacity={visibilityAnimation.opacity}
                        lineHeight={1.2}
                    >
                        {content.tags.map((tag) => `${tag}\n`)}
                    </AnimatedText>
                </>
            )}
        </animated.group>
    );
}

export default LeftFloatingSlot;
