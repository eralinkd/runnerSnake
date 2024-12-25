import { create } from 'zustand'

const inventoryModalState = create((set) => ({
	isOpen: false,
	modalData: { type: null, selectedItem: null, onSelect: () => { } },
	openModal: (type, selectedItem, onSelect) =>
		set({ isOpen: true, modalData: { type, selectedItem, onSelect } }),
	closeModal: () => set({ isOpen: false }),
}));

export default inventoryModalState;