import { OrbitControls } from "@react-three/drei";
import { Physics, Debug } from "@react-three/rapier"

import World from "./World"
import Lights from "./Lights"


export default function Experience() {

  return <>
    <OrbitControls/>

    <Physics
      gravity={[0,-9.8,0]}
    >
      {/* <Debug/> */}
      <World/>
      
    </Physics>

    <Lights/>
    
  </>
}
//Add a cube to this scene