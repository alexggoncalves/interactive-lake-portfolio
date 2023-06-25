import { useEffect } from "react";
import BoardInteraction from "./BoardInteraction";

const Board = ({ board, frame, content, image }) => {    

    return (
        <group name={board.name}>
            <mesh
                geometry={board.geometry}
                position={board.position}
                rotation={board.rotation}
            >
                <meshBasicMaterial map={image}/>
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
