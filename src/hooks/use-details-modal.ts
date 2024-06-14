import { create } from "zustand";

interface ICard {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  createdAt: Date;
}

interface ITradeDetails {
  tradeId?: string;
  offeringCards: ICard[];
  receivingCards: ICard[];
  user: { name: string };
  createdAt: Date | string;
}

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
