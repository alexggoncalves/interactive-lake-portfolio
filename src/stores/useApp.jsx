import { Vector3 } from 'three'
import { create } from 'zustand'

const useApp = create((set) => ({
  isPaused: true,
  cameraTarget: null,
  cameraPosition: null,

  pause: () => set((state) =>({isPaused:true})),
  unpause: ()=> set((state)=>({isPaused:false})),
  setCameraTarget: (target)=> set((state)=>({cameraTarget:target})),
  setCameraPosition: (position)=> set((state)=>({cameraPosition:position})),
  clearCameraTarget: ()=> set((state)=>({cameraTarget:null})),
  clearCameraPosition: ()=> set((state)=>({cameraPosition:null})),
 }))

export default useApp