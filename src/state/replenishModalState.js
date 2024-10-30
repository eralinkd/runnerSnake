import { create } from 'zustand'

// const replenishModalState = create((set) => ({
// 	isOpen: false,
// 	open: () => set({ isOpen: true }),
// 	close: () => set({ isOpen: false }),
// }))

// export default replenishModalState

const replenishModalState = create((set) => ({
	isOpen: false,
	modalData: { title: '', imgSrc: '' },
	openModal: (title, imgSrc) =>
		set({ isOpen: true, modalData: { title, imgSrc } }),
	closeModal: () => set({ isOpen: false }),
}));

export default replenishModalState;