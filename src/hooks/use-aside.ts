import { create } from "zustand";

interface IUseAsideStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useAside = create<IUseAsideStore>((set) => ({
  isOpen: true,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
