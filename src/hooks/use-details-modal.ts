import { create } from "zustand";

import { ITradeDetails } from "@/@types";

interface ModalState {
  isOpen: boolean;
  tradeDetails: ITradeDetails | null;
  onOpen: (details: ITradeDetails) => void;
  onClose: () => void;
}

export const useDetailsModal = create<ModalState>((set) => ({
  isOpen: false,
  tradeDetails: null,
  onOpen: (details) => set({ isOpen: true, tradeDetails: details }),
  onClose: () => set({ isOpen: false, tradeDetails: null }),
}));
