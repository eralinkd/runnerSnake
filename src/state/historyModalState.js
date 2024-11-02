import { create } from 'zustand'

const HistoryModalState = create((set) => ({
	isOpen: false,
	modalData: { title: '', imgSrc: '', operation: '' },
	openModal: (title, imgSrc) =>
		set({ isOpen: true, modalData: { title, imgSrc } }),
	closeModal: () => set({ isOpen: false }),
}));

export default HistoryModalState;