import { Vector3 } from 'three'
import { create } from 'zustand'

const useApp = create((set) => ({
  position: new Vector3(0,0,0),
  rotation: new Vector3(0,0,0),
  isPaused: true,

  setPosition: (newPosition) => set((state)=>({position:newPosition})),
  setRotation: (newRotation) => set((state)=>({rotation:newRotation})),
  pause: () => set((state) =>({isPaused:true})),
  unpause: ()=> set((state)=>({isPaused:false}))
 }))

export default useApp