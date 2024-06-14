import { create } from "zustand";

interface IuseAsideStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useAside = create<IuseAsideStore>((set) => ({
  isOpen: true,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
