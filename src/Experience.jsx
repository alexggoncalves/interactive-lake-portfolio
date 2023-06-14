import { useEffect, useState, Suspense } from "react";
import { Physics, Debug } from "@react-three/rapier";
import { useTexture } from "@react-three/drei";

import World from "./components/World/World";
import Lights from "./components/World/Lights";

import useApp from "./stores/useApp";

import { Loader } from "./components/Loader";

export default function Experience() {
    const pause = useApp((state) => state.pause);
    const unpause = useApp((state) => state.unpause);

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
            <World />
            <Lights />
            <Loader />
        </>
    );
}
