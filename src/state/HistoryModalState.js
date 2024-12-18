import { create } from 'zustand'

const HistoryModalState = create((set) => ({
	isOpen: false,
	modalData: { title: '', imgSrc: '', operation: '' },
	openModal: (title, imgSrc, operation) =>
		set({ isOpen: true, modalData: { title, imgSrc, operation } }),
	closeModal: () => set({ isOpen: false }),
}));

export default HistoryModalState;
