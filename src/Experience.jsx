
import { Physics, Debug } from "@react-three/rapier"

import World from "./components/World"
import Lights from "./components/Lights"
import { useEffect, useState } from "react"
import { useThree } from "@react-three/fiber";


export default function Experience() {
  const [isFocused, setIsFocused] = useState(true);

  useEffect(() => {
        const handleBlur = () => setIsFocused(false);
        const handleFocus = () => setIsFocused(true);

        window.addEventListener("blur", handleBlur);
        window.addEventListener("focus", handleFocus);

        return () => {
            window.removeEventListener("blur", handleBlur);
            window.removeEventListener("focus", handleFocus);
        };
    }, []);

  return <>
    

    <Physics
      paused={!isFocused}
      gravity={[0,-9.8,0]}
      allowSleep={false}
    >
      {/* <Debug/> */}
      <World/>
      
    </Physics>

    <Lights/>
    
  </>
}
//Add a cube to this scene