// import { Line, useTrail } from "@react-three/drei";
// import { useRef } from "react";
// import { useFrame } from "@react-three/fiber";

// export default function BoatTrail({ target }) {
    

//     const points = useTrail(
//         target, 
//         {
//             length: 2, // Length of the line
//             decay: 1, // How fast the line fades away
//             local: false, // Wether to use the target's world or local positions
//             stride: 0, // Min distance between previous and current point
//             interval: 0, // Number of frames to wait before next calculation
//         }
//     );

//     useFrame(() => {
//         if(line.current){
//             line.current.position.setPoints(points.current);
//         }
        
//     });

//     return (
//         <Line
//             ref={line}
//             color="black" // Default
//             lineWidth={1} // In pixels (default)
//             // {...lineProps} // All THREE.Line2 props are valid
//             // {...materialProps} // All THREE.LineMaterial props are valid
//         />
//     );
// }
