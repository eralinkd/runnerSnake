import { create } from 'zustand'

const useStore = create((set) => ({
    userId: 1,
    setUserId: (id) => set({ userId: id }),

    userData: {},
    setUserData: (data) => set({ userData: data }),
}))


export default useStore
