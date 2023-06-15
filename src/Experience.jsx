import { useEffect } from "react";

import { Environment } from "@react-three/drei";

import World from "./components/World/World";
import Lights from "./components/World/Lights";

import useApp from "./stores/useApp";

export default function Experience() {
    const pause = useApp((state) => state.pause);
    const unpause = useApp((state) => state.unpause);

    useEffect(() => {
        // Disable default behaviour of a pinch with 1 or more fingers
        const handleTouchMove = (event) => {
            if (event.touches.length > 1) {
                event.preventDefault();
            }
        };

        document.addEventListener("touchmove", handleTouchMove, {
            passive: false,
        });
        window.addEventListener("blur", pause);
        window.addEventListener("focus", unpause);

        return () => {
            window.removeEventListener("blur", pause);
            window.removeEventListener("focus", unpause);
            document.removeEventListener("touchmove", handleTouchMove);
        };
    }, []);

    return (
        <>
            <World />
            {/* <Environment 
                preset="sunset"
            /> */}
            <Lights/>
        </>
    );
}
