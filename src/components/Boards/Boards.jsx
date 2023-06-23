import { useTexture } from "@react-three/drei";

import Board from "./Board";
import contents from "../../boardContent.json";

function Boards({ nodes }) {
    const content_1 = useTexture("./board-content/board-1.png");
    content_1.flipY = false;

    return (
        <>
            <Board
                board={nodes.board_1}
                frame={nodes.frame_1}
                content={contents[nodes.board_1.name]}
            ></Board>
            <Board
                board={nodes.board_2}
                frame={nodes.frame_2}
                content={contents[nodes.board_2.name]}
            ></Board>
            <Board
                board={nodes.board_3}
                frame={nodes.frame_3}
                content={contents[nodes.board_3.name]}
            ></Board>
            <Board
                board={nodes.board_4}
                frame={nodes.frame_4}
                content={contents[nodes.board_4.name]}
            ></Board>
            <Board
                board={nodes.board_5}
                frame={nodes.frame_5}
                content={contents[nodes.board_5.name]}
            ></Board>
            <Board
                board={nodes.board_6}
                frame={nodes.frame_6}
                content={contents[nodes.board_6.name]}
            ></Board>
            <Board
                board={nodes.board_7}
                frame={nodes.frame_7}
                content={contents[nodes.board_7.name]}
            ></Board>
            <Board
                board={nodes.board_8}
                frame={nodes.frame_8}
                content={contents[nodes.board_8.name]}
            ></Board>
        </>
    );
}

export default Boards;

useTexture.preload("./board-content/board-1.png");
