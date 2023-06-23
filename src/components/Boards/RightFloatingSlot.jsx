import { useSpring, animated } from "@react-spring/three";
import { Text } from "@react-three/drei";

const AnimatedText = animated(Text);

function RightFloatingSlot({
    content,
    isActive,
    visiblePosition,
    hiddenPosition,
    rotation,
}) {
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

    const rightSlotAnimation = useSpring({
        position: isActive
            ? [visiblePosition.x, visiblePosition.y, visiblePosition.z]
            : [hiddenPosition.x, hiddenPosition.y, hiddenPosition.z],

        config,
    });

    const titleSize = 0.45;
    const contentSize = 0.65;
    const titleMargin = 0.2;
    const sectionMargin = 0.8;
    let rolesAmount = 0;
    let collaboratorsAmount = 0;

    if (content.roles) {
        rolesAmount = content.roles.length;
    }
    if (content.with) {
        collaboratorsAmount = content.with.length;
    }

    let collaboratorsY = -titleSize - titleMargin - rolesAmount*contentSize - sectionMargin;
    if(!content.roles) collaboratorsY = 0;

    let atY = collaboratorsY - titleSize - titleMargin - collaboratorsAmount*contentSize - sectionMargin;
    if(!content.roles && !content.with) atY = 0;

    return (
        // * RIGHT SLOT
        <animated.group
            position={rightSlotAnimation.position}
            rotation={rotation}
        >
            {/* Roles */}
            {content.roles && (
                <>
                    <AnimatedText
                        font="./fonts/Roboto-Regular.ttf"
                        color="white"
                        fontSize={titleSize}
                        anchorX="left"
                        anchorY="top"
                        scale={visibilityAnimation.scale}
                        fillOpacity={visibilityAnimation.opacity}
                    >
                        {`ROLES`}
                    </AnimatedText>
                    <AnimatedText
                        font="./fonts/Roboto-Bold.ttf"
                        color="white"
                        fontSize={contentSize}
                        anchorX="left"
                        anchorY="top"
                        position={[0, -titleSize - titleMargin, 0]}
                        scale={visibilityAnimation.scale}
                        fillOpacity={visibilityAnimation.opacity}
                        lineHeight={1.2}
                    >
                        {content.roles.map((role) => `${role}\n`)}
                    </AnimatedText>
                </>
            )}

            {/* Collaborators */}
            {content.with && (
                <>
                    <AnimatedText
                        font="./fonts/Roboto-Regular.ttf"
                        color="white"
                        fontSize={titleSize}
                        anchorX="left"
                        anchorY="top"
                        position={[0,collaboratorsY, 0]}
                        scale={visibilityAnimation.scale}
                        fillOpacity={visibilityAnimation.opacity}
                    >
                        {`WITH:`}
                    </AnimatedText>
                    <AnimatedText
                        font="./fonts/Roboto-Bold.ttf"
                        color="white"
                        fontSize={contentSize}
                        anchorX="left"
                        anchorY="top"
                        position={[0, collaboratorsY - titleSize -titleMargin, 0]}
                        scale={visibilityAnimation.scale}
                        fillOpacity={visibilityAnimation.opacity}
                        lineHeight={1.2}
                    >
                        {content.with.map(
                            (collaborator) => `${collaborator}\n`
                        )}
                    </AnimatedText>
                </>
            )}

            {/* Project Origin */}
            {content.at && (
                <>
                    <AnimatedText
                        font="./fonts/Roboto-Regular.ttf"
                        color="white"
                        fontSize={titleSize}
                        anchorX="left"
                        anchorY="top"
                        position={[0, atY, 0]}
                        scale={visibilityAnimation.scale}
                        fillOpacity={visibilityAnimation.opacity}
                    >
                        {`AT:`}
                    </AnimatedText>
                    <AnimatedText
                        font="./fonts/Roboto-Bold.ttf"
                        color="white"
                        fontSize={contentSize}
                        anchorX="left"
                        anchorY="top"
                        position={[0, atY - titleSize -titleMargin, 0]}
                        lineHeight={1.2}
                        scale={visibilityAnimation.scale}
                        fillOpacity={visibilityAnimation.opacity}
                    >
                        {content.at}
                    </AnimatedText>
                </>
            )}
        </animated.group>
    );
}

export default RightFloatingSlot;
