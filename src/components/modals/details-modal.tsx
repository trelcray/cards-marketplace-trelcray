"use client";

import { useDetailsModal } from "@/hooks/use-details-modal";

import { Card } from "../card";
import { Modal } from "../ui/modal";

export const DetailsModal = () => {
  const { isOpen, onClose, tradeDetails } = useDetailsModal();

  if (!tradeDetails) return null;

  return (
    <Modal title="Detalhes da troca" isOpen={isOpen} onClose={onClose}>
      <div className="flex max-h-[80vh] flex-col gap-2 overflow-y-auto bg-white text-center">
        <p>
          <strong>Solicitação de:</strong> {tradeDetails.user.name}
        </p>
        <p>
          <strong>Oferecidas:</strong> {tradeDetails.offeringCards.length}{" "}
          cartas
        </p>
        <p>
          <strong>A receber:</strong> {tradeDetails.receivingCards.length}{" "}
          cartas
        </p>
        <div>
          <h3 className="text-md font-semibold text-emerald-600">
            Cartas Oferecidas:
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {tradeDetails.offeringCards.map((card) => (
              <Card
                key={card.id}
                description={card.description}
                id={card.id}
                imageUrl={card.imageUrl ?? "/images/image.png"}
                name={card.name}
              />
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-md font-semibold text-cyan-600">
            Cartas a Receber:
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {tradeDetails.receivingCards.map((card) => (
              <Card
                key={card.id}
                description={card.description}
                id={card.id}
                imageUrl={card.imageUrl ?? "/images/image.png"}
                name={card.name}
              />
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};
