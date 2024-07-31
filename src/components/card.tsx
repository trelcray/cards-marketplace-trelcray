"use client";

import { PlusCircle } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

import { IAddCardResponse } from "@/@types";
import { revalidateCards } from "@/actions/revalidates";
import { fetchWrapper } from "@/lib/fetch";
import { cn } from "@/lib/utils";

interface ICardProps {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  onSelect?: () => void;
  selected?: boolean;
  isCreate?: boolean;
}

export const Card: React.FC<ICardProps> = ({
  id,
  description,
  imageUrl,
  name,
  onSelect,
  selected,
  isCreate,
}) => {
  const handleClick = async (cardIds: string[]) => {
    try {
      await fetchWrapper<IAddCardResponse>("/me/cards", {
        method: "POST",
        body: JSON.stringify(cardIds),
      });
      toast.success("Carta adicionada com sucesso!");
      revalidateCards();
    } catch (error) {
      console.error((error as Error).message);
      toast.error("Error ao adicionar a carta");
    }
  };

  return (
    <div
      className={cn(
        "relative flex h-96 w-72 flex-col items-center justify-start gap-y-2 rounded-lg border bg-white p-2",
        { "outline outline-4 outline-blue-600": selected }
      )}
      onClick={onSelect}
    >
      <picture>
        <Image
          alt="imagem da carta"
          src={imageUrl ?? "/images/image.png"}
          height={200}
          width={160}
        />
      </picture>
      <div className="flex flex-col gap-y-1">
        <span className="text-center font-semibold">
          {name.length > 0 ? name : "Acid-Spewer Dragon"}
        </span>
        <p className="line-clamp-6 text-xs">
          {description.length > 0
            ? description
            : "You may cast this card face down as a 2/2 creature for 3"}
        </p>
      </div>
      {isCreate && (
        <i
          onClick={() => handleClick([id])}
          className="absolute -right-2 -top-2 cursor-pointer rounded-full bg-gray-100 text-green-700"
        >
          <PlusCircle className="size-14 p-1" />
        </i>
      )}
    </div>
  );
};
