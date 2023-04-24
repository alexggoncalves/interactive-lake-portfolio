export default function Lights() {
  return <>
    <directionalLight 
        position={[-10,5,8]}
        intensity={0.6}
    />
    <ambientLight
        intensity={0.4}
    />
  </>
}