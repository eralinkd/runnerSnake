import { create } from 'zustand'

const swapModalState = create((set) => ({
	isOpen: false,
	modalData: { title: '', imgSrc: '', amount: 0 },
	openModal: (title, imgSrc, amount) =>
		set({ isOpen: true, modalData: { title, imgSrc, amount } }),
	closeModal: () => set({ isOpen: false }),
}));

export default swapModalState;