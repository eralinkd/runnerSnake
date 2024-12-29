import { create } from 'zustand';

const eggModalState = create((set) => ({
	isOpen: false,
	success: false,
	openModal: (success) => set({ isOpen: true, success }),
	closeModal: () => set({ isOpen: false }),
}));

export default eggModalState; 