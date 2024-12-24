import { create } from "zustand";
import { minigamesTabs } from "../constants/constants";

export const activeTabOnMinigames = create((set) => ({
    activeTab: minigamesTabs[0].name,
    setActiveTab: (item) => set({ activeTab: item }),
}));
