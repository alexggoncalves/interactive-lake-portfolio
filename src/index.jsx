import "./style.css";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import { Perf } from "r3f-perf";
import { KeyboardControls } from "@react-three/drei";
import Experience from "./Experience";

const root = ReactDOM.createRoot(document.querySelector("#root"));

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
            flat={true}
            shadows
            camera={{
                fov: 60,
                near: 0.4,
                far: 1000,
                position: [0, 13, 8],
            }}
            gl={{
                antialias: true,
                gammaOutput: true,
                webgl2: true
            }}
        >
            <Experience />
            <Perf position="top-left" />
        </Canvas>
    </KeyboardControls>
);
