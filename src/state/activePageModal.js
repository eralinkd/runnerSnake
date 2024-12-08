import { create } from "zustand";
import { menuItems } from "../constants/menuItems";

export const useNavigationStore = create((set) => ({
	activePage: menuItems[0].id,
	setActivePage: (item) => set({ activePage: item }),
}));
