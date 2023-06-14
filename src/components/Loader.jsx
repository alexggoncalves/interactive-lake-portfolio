import { Html, useProgress } from "@react-three/drei";

import useApp from "../stores/useApp";
import { useEffect } from "react";
import { useFrame } from "@react-three/fiber";

export default function Loader() {
    const { active, progress, errors, item, loaded, total } = useProgress();

    useEffect(() => {
        console.log(progress);
        if (progress === 100) {
            console.log('loaded')
        }
        
    }, [progress]);

    return (
        <div className="loading-screen">
            <div>{progress.toFixed(2)} % loaded</div>
            <span className="start-button">
                Start
            </span>
        </div>
    );
}
