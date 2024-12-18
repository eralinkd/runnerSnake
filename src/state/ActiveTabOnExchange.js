import { create } from "zustand";
import { activeTabs } from "../constants/constants";

export const activeTabOnExchange = create((set) => ({
	activeTab: activeTabs[0].name,
	setActiveTab: (item) => set({ activeTab: item }),
}));
