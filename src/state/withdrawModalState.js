import { create } from 'zustand'

const withdrawModalState = create((set) => ({
	isOpen: false,
	modalData: { title: '', imgSrc: '' },
	openModal: (title, imgSrc) =>
		set({ isOpen: true, modalData: { title, imgSrc } }),
	closeModal: () => set({ isOpen: false }),
}));

export default withdrawModalState;