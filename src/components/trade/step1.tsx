"use client";

import { Controller, useFormContext } from "react-hook-form";

import { AlertCircle } from "lucide-react";

import { ICard } from "@/@types";
import { Card } from "@/components/card";

interface IStepProps {
  cards: ICard[];
}

export const Step1: React.FC<IStepProps> = ({ cards }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-col gap-y-6">
      <Controller
        name="selectedOfferingCards"
        control={control}
        render={({ field }) => (
          <div className="flex flex-wrap justify-evenly gap-4">
            {cards.map((card, i) => (
              <Card
                key={i}
                id={card.id}
                description={card.description}
                imageUrl={card.imageUrl}
                name={card.name}
                onSelect={() => {
                  const isSelected = field.value.includes(card.id);
                  if (isSelected) {
                    field.onChange(
                      field.value.filter((id: string) => id !== card.id)
                    );
                  } else {
                    field.onChange([...field.value, card.id]);
                  }
                }}
                selected={field.value.includes(card.id)}
              />
            ))}
          </div>
        )}
      />
      {errors.selectedOfferingCards && (
        <div className="flex items-center justify-center gap-x-2 text-red-500">
          <i>
            <AlertCircle />
          </i>
          <span className="text-center font-semibold">
            {errors.selectedOfferingCards.message?.toString()}
          </span>
        </div>
      )}
    </div>
  );
};
