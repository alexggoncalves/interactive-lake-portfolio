import { Html, useProgress } from "@react-three/drei";

import useApp from "../stores/useApp";
import { useEffect } from "react";
import { useFrame } from "@react-three/fiber";

export function Loader() {
    const unpause = useApp((state) => state.unpause)
    const isPaused = useApp((state) => state.isPaused)

    const { active, progress, errors, item, loaded, total } = useProgress();

    useEffect(()=>{
        if(progress == 100){
            unpause()
            
        } 
        console.log(progress)
    },[progress])

    return <Html>{progress} % loaded</Html>;
}
