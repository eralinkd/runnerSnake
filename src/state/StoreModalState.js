import { create } from 'zustand'

const storeModalState = create((set) => ({
	isOpen: false,
	modalData: { title: '', prices: {}, id: null },
	openModal: (title, prices, id) =>
		set({ isOpen: true, modalData: { title, prices, id } }),
	closeModal: () => set({ isOpen: false }),
}));

export default storeModalState;