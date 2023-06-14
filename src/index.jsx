import "./style.css";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import { Perf } from "r3f-perf";
import { KeyboardControls } from "@react-three/drei";
import Experience from "./Experience";
import { Leva } from "leva";
import TouchControls from "./components/TouchControls";
import Loader from "./components/Loader";
const root = ReactDOM.createRoot(document.querySelector("#root"));
const isTouchScreen = "ontouchstart" in window;
import { Suspense } from "react";

root.render(
    <KeyboardControls
        map={[
            { name: "forward", keys: ["ArrowUp", "KeyW"] },
            { name: "backward", keys: ["ArrowDown", "KeyS"] },
            { name: "rightward", keys: ["ArrowRight", "KeyD"] },
            { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
        ]}
    >
        <Canvas
            frameloop="demand"
            dpr={[1, 2]}
            flat={true}
            // shadows
            camera={{
                fov: 50,
                near: 2,
                far: 1000,
                // position: [0, 25, 25],
            }}
            gl={{
                antialias: true,
                gammaOutput: true,
                webgl2: true,
            }}
        >
            <Suspense fallback={null}>
                <Experience />
            </Suspense>
            <Leva hidden />
            {/* <Perf position="top-left" /> */}
        </Canvas>
        <Loader></Loader> 

        {isTouchScreen && <TouchControls />}
    </KeyboardControls>
);
