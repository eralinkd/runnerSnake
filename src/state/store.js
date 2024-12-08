import { create } from 'zustand'

const useStore = create((set) => ({
    userId: 1,
    setUserId: (id) => set({ userId: id }),
}))

export default useStore
