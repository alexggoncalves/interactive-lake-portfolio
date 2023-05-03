import { create } from 'zustand'

const useTouchInput = create((set) => ({
  forward: false,
  backward: false,
  leftward: false,
  rightward: false,

  toggleForward: () => set((state)=>({forward:!state.forward})),
  toggleBackward: () => set((state)=>({backward:!state.backward})),
  toggleLeftward: () => set((state)=>({leftward:!state.leftward})),
  toggleRightward: () => set((state)=>({rightward:!state.rightward})),
  resetTouchInput: () => set((state)=>({forward:false,backward:false,rightward:false,leftward:false,}))
}))

export default useTouchInput