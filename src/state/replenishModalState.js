import { create } from 'zustand'

const replenishModalState = create((set) => ({
	isOpen: false,
	open: () => set({ isOpen: true }),
	close: () => set({ isOpen: false }),
}))

export default replenishModalState