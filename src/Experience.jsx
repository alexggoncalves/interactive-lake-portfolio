
import { Physics, Debug } from "@react-three/rapier"

import World from "./World"
import Lights from "./Lights"
import { useEffect, useState } from "react"


export default function Experience() {
  const [paused,setPaused] = useState(false);

  useEffect(()=>{
      const handleVisibilityChange = ()=>{
        setPaused(document.visibilityState !== 'visible');
      }

      document.addEventListener('visibilitychange', handleVisibilityChange);
      

      return ()=>{
        document.removeEventListener('visibilitychange', handleVisibilityChange);
      }
  },[])

  return <>
    

    <Physics
      paused={paused}
      gravity={[0,-9.8,0]}
      allowSleep={true}
    >
      {/* <Debug/> */}
      <World/>
      
    </Physics>

    <Lights/>
    
  </>
}
//Add a cube to this scene