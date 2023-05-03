import "./style.css";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import { Perf } from "r3f-perf";
import { KeyboardControls } from "@react-three/drei";
import Experience from "./Experience";
import { Leva } from "leva";
import TouchControls from "./components/TouchControls";

const root = ReactDOM.createRoot(document.querySelector("#root"));
const isTouchScreen = "ontouchstart" in window;

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
            dpr={[1, 2]}
            flat={true}
            shadows
            camera={{
                fov: 60,
                near: 1,
                far: 500,
                position: [0, 25, 25],
            }}
            gl={{
                antialias: true,
                gammaOutput: true,
                webgl2: true
            }}
        >
            <Experience />

            {/* <Perf position="top-left"/> */}
            <Leva hidden />
        </Canvas>
        {isTouchScreen && <TouchControls/>}
        
    </KeyboardControls>
);
