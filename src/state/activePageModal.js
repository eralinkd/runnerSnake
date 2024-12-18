import { create } from "zustand";
import { menuItems } from "../constants/menuItems";

const useNavigationStore = create((set) => ({
	activePage: menuItems[2].id,
	setActivePage: (item) => set({ activePage: item }),
}));

export default useNavigationStore;
