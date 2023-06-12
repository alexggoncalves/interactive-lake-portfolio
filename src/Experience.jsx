import { useEffect, useState, Suspense } from "react";
import { Physics, Debug } from "@react-three/rapier";

import World from "./components/World/World";
import Lights from "./components/World/Lights";

import useApp from "./stores/useApp";

export default function Experience() {
    const pause = useApp((state) => state.pause);
    const unpause = useApp((state) => state.unpause);
    const isPaused = useApp((state) => state.isPaused);

    useEffect(() => {
        window.addEventListener("blur", pause);
        window.addEventListener("focus", unpause);

        return () => {
            window.removeEventListener("blur", pause);
            window.removeEventListener("focus", unpause);
        };
    }, []);

    return (
        <>
            <Physics
                paused={isPaused}
                gravity={[0, -9.8, 0]}
                // allowSleep={false}
            >
                <World />

                {/* <Debug/> */}
            </Physics>

            <Lights />
        </>
    );
}
