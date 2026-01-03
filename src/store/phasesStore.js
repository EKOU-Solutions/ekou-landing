import { create } from 'zustand'

export const usePhasesStore = create((set) => ({
  currentPhase: '1',
  setCurrentPhase: (value) => set({ currentPhase: value }),
}))
