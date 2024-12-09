import { create } from 'zustand'

const storeModalState = create((set) => ({
	isOpen: false,
	modalData: { title: '' },
	openModal: (title) =>
		set({ isOpen: true, modalData: { title } }),
	closeModal: () => set({ isOpen: false }),
}));

export default storeModalState;