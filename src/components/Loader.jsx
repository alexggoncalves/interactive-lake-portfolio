import { Html, useProgress } from "@react-three/drei";

import useApp from "../stores/useApp";
import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";

export default function Loader() {
    const { active, progress, errors, item, loaded, total } = useProgress();
    const loadingBarFill = document.querySelector(".loading-bar-fill");
    const loadingScreen = document.querySelector(".loading-screen");

    const [smoothProgress, setSmoothProgress] = useState(0);

    useEffect(() => {
        if (progress === 100) {
            console.log("loaded");
        }
        if (loadingBarFill) {
            loadingBarFill.style.width = progress + "%";
        }
    }, [progress]);

    return (
        <div className="loading-screen">
            <div className="loading-screen-text">
                <div>hi</div>
            </div>

            <div className="loading-bar">
                <div className="loading-bar-fill"></div>
                <div className="loading-state">
                    <span>{progress != 100 ? "loading..." : "done"}</span>
                    <span>{progress.toFixed(0)}%</span>
                </div>
            </div>

            <span
                className={`start-button ${
                    progress != 100 ? "disabled" : "enabled"
                }`}
            >
                start
            </span>
        </div>
    );
}
