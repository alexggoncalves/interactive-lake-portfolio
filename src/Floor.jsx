

export default function Floor() {
  return <mesh position={[0,-5,0]} rotation={[-Math.PI/2,0,0]}>
        <planeGeometry args={[100,100,10,10]}></planeGeometry>
        <meshStandardMaterial color="#d2aa6d"/>
  </mesh>
}