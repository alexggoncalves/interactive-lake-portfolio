import InteractionArea from "../InteractionArea";

function Boards({ nodes }) {
    return (
        <>
            <group>
                <mesh
                    geometry={nodes.board.geometry}
                    position={nodes.board.position}
                    rotation={nodes.board.rotation}
                    material={nodes.board.material}
                />

                <mesh
                    geometry={nodes.frame.geometry}
                    position={nodes.frame.position}
                    material={nodes.frame.material}
                    rotation={nodes.frame.rotation}
                />
                <InteractionArea
                    position={nodes.board.position}
                    rotation={nodes.board.rotation}
                />

            </group>
        </>
    );
}

export default Boards;
