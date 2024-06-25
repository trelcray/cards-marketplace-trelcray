"use client";

import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ArrowRightLeft, XCircle } from "lucide-react";
import Image from "next/image";

import { useDetailsModal } from "@/hooks/use-details-modal";
import { cn } from "@/lib/utils";

import { Dialog } from "./dialog";
import { Button } from "./ui/button";

interface ICards {
  id: string;
  cardId: string;
  tradeId: string;
  type: string;
  card: {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    createdAt: Date;
  };
}

interface ITradeCardProps {
  tradeId?: string;
  offeringCards: ICards[];
  receivingCards: ICards[];
  index: number;
  user: { name: string };
  createdAt: Date | string;
  isDelete?: boolean;
}

export const TradeCard: React.FC<ITradeCardProps> = ({
  tradeId,
  offeringCards,
  receivingCards,
  index,
  user,
  createdAt,
  isDelete,
}) => {
  const openModal = useDetailsModal((state) => state.onOpen);

  const handleDetailsClick = () => {
    openModal({
      tradeId,
      offeringCards: offeringCards.map((card) => card.card),
      receivingCards: receivingCards.map((card) => card.card),
      user,
      createdAt,
    });
  };
  return (
    <div
      className="relative flex size-80 flex-col justify-evenly gap-y-2 rounded-lg border bg-white p-2"
      key={index}
    >
      <div className="flex w-full items-center justify-between gap-x-2">
        <p className="text-sm font-semibold">{user.name}</p>
        <span className="w-32 text-end text-xs">
          {formatDistanceToNow(createdAt, {
            locale: ptBR,
            addSuffix: true,
          })}
        </span>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium">
            {offeringCards.length}x cartas{" "}
            <span className="text-blue-500">oferecidas</span>
          </p>
        </div>
        <div>
          <p className="text-sm font-medium">
            {receivingCards.length}x cartas a{" "}
            <span className="text-emerald-500">receber</span>
          </p>
        </div>
      </div>
      <div className="flex h-40 w-full items-center justify-end gap-x-2">
        <div className="relative flex h-full flex-1 flex-col items-center justify-end">
          {offeringCards.slice(0, 2).map((tradeCard, i) => {
            return (
              <Image
                key={i}
                width={96}
                height={112}
                alt="imagem da carta"
                quality={100}
                priority
                src={tradeCard.card.imageUrl ?? "/images/image.png"}
                className={cn(
                  "absolute top-0 h-28 w-24 odd:right-0 even:left-0"
                )}
              />
            );
          })}
          {offeringCards.length > 2 && (
            <Button
              onClick={handleDetailsClick}
              className="w-full bg-slate-500 hover:bg-slate-500/90"
            >
              <span className="font-bold">+ {offeringCards.length - 2}</span>
            </Button>
          )}
        </div>
        <ArrowRightLeft size={20} />
        <div className="relative flex h-full flex-1 flex-col items-center justify-end">
          {receivingCards.slice(0, 2).map((tradeCard, i) => {
            return (
              <Image
                key={i}
                width={96}
                height={112}
                alt="imagem da carta"
                quality={100}
                priority
                src={tradeCard.card.imageUrl ?? "/images/image.png"}
                className={cn(
                  "absolute top-0 h-28 w-24 odd:left-0 even:right-0"
                )}
              />
            );
          })}
          {receivingCards.length > 2 && (
            <Button
              className="w-full bg-slate-500 hover:bg-slate-500/90"
              onClick={handleDetailsClick}
            >
              <span className="font-bold">+ {receivingCards.length - 2}</span>
            </Button>
          )}
        </div>
      </div>
      <Button className="full" onClick={handleDetailsClick}>
        Detalhes da troca
      </Button>
      {isDelete && (
        <Dialog id={tradeId}>
          <i className="absolute -right-3 -top-4 cursor-pointer rounded-full bg-gray-100 text-red-700">
            <XCircle className="size-9" />
          </i>
        </Dialog>
      )}
    </div>
  );
};
