import { useEffect } from "react";
import BoardInteraction from "./BoardInteraction";
import { Html, Image, Text } from "@react-three/drei";

const Board = ({ board, frame, content }) => {
    useEffect(()=>{
        console.log(content)
    },[])

    return (
        <group name={board.name}>
            <mesh
                geometry={board.geometry}
                position={board.position}
                rotation={board.rotation}
            >
                <meshBasicMaterial />
            </mesh>
            <mesh
                geometry={frame.geometry}
                position={frame.position}
                material={frame.material}
                rotation={frame.rotation}
            />
            <BoardInteraction
                frame={frame}
                content={content}
            />
        </group>
    );
};

export default Board;
