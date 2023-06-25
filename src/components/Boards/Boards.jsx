import { useTexture } from "@react-three/drei";
import { v4 as uuidv4 } from 'uuid';

import Board from "./Board";
import content from "../../boardContent.json";



export default function Boards({ nodes }) {
    const images = {};

    for (const board in content) {
        if (content[board].image) {
            const image = useTexture(`./board-content/${content[board].image}`);
            image.flipY = false;
            images[board] = image;
        }
    }

    return (
        <>
            {Object.keys(content).map((key, index) => {
                return (
                    <Board
                        key={uuidv4()}
                        board={nodes[key]}
                        frame={nodes[`frame_${index+1}`]}
                        content={content[key]}
                        image={content[key].image ? images[key] : null}
                    />
                );
            })}
        </>
    );
}

for (const board in content) {
    if (content[board].image) {
        useTexture.preload(`./board-content/${content[board].image}`);
    }
}
