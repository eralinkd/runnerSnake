import { create } from 'zustand'

const useStore = create((set) => ({
	userId: 817930953,
	setUserId: (id) => set({ userId: id }),

	userData: {},
	setUserData: (data) => set({ userData: data }),
}))


export default useStore
