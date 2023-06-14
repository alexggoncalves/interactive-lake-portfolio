import { Vector3 } from 'three'
import { create } from 'zustand'

const useApp = create((set) => ({
  isPaused: true,

  pause: () => set((state) =>({isPaused:true})),
  unpause: ()=> set((state)=>({isPaused:false}))
 }))

export default useApp