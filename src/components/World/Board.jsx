const Board = ({nodes}) => {
    
    return <>
        <mesh
                geometry={nodes.board_2.geometry}
                position={nodes.board_2.position}
                material={nodes.board_2.material}
            ></mesh>

            <mesh
                geometry={nodes.frame_2.geometry}
                position={nodes.frame_2.position}
                material={nodes.frame_2.material}
            >
                
            </mesh>
    </>
}

export default Board