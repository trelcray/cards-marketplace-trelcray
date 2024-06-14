"use client";

import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";

import {
  ICard,
  ICreateTradeCardRequest,
  ICreateTradeCardResponse,
} from "@/@types";
import { fetchWrapper } from "@/api/fetch";
import { Step1 } from "@/components/trade/step1";
import { Step2 } from "@/components/trade/step2";
import { Button } from "@/components/ui/button";
import { Stepper } from "@/components/ui/stepper";
import { revalidateTrades } from "@/lib/actions";

const cardSchema = z.object({
  selectedOfferingCards: z
    .array(z.string())
    .min(1, "Você deve selecionar pelo menos um card."),
  selectedReceivingCards: z
    .array(z.string())
    .min(1, "Você deve selecionar pelo menos um card."),
});

type CardSchema = z.infer<typeof cardSchema>;

const steps = ["Carta a oferecer", "Carta a receber"];

interface ITradeClientProps {
  cards: ICard[];
  allCards: ICard[];
  more: boolean;
  page: number;
}

export const TradeClient: React.FC<ITradeClientProps> = ({
  cards,
  allCards,
  more,
  page,
}) => {
  const methods = useForm<CardSchema>({
    resolver: zodResolver(cardSchema),
    defaultValues: { selectedOfferingCards: [], selectedReceivingCards: [] },
  });

  const { handleSubmit, trigger, reset } = methods;
  const [currentStep, setCurrentStep] = useState(1);
  const [complete, setComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isLastStep = currentStep === steps.length;

  const nextStep = async () => {
    let valid = false;
    if (currentStep === 1) {
      valid = await trigger("selectedOfferingCards");
    } else {
      valid = await trigger("selectedReceivingCards");
    }

    if (valid) {
      if (isLastStep) {
        setComplete(true);
        return handleSubmit(onSubmit)();
      } else setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const onSubmit = async (data: CardSchema) => {
    setIsLoading(true);

    const offeringCards: ICreateTradeCardRequest[] =
      data.selectedOfferingCards.map((id) => {
        return { cardId: id, type: "OFFERING" };
      });
    const receivingCards: ICreateTradeCardRequest[] =
      data.selectedReceivingCards.map((id) => {
        return { cardId: id, type: "RECEIVING" };
      });

    try {
      await fetchWrapper<ICreateTradeCardResponse[]>("/trades", {
        method: "POST",
        body: JSON.stringify({ cards: [...offeringCards, ...receivingCards] }),
      });
      toast.success("Troca efetuada com sucesso!");
      reset();
      setCurrentStep(1);
      setComplete(false);
      revalidateTrades();
    } catch (error) {
      console.error((error as Error).message);
      toast.error("Error ao efetuar a troca");
    } finally {
      setIsLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <Step1 cards={cards} />;
      case 2:
        return <Step2 cards={allCards} more={more} page={page} />;
      default:
        return null;
    }
  };
  return (
    <>
      <Stepper currentStep={currentStep} steps={steps} complete={complete} />
      <FormProvider {...methods}>
        <form
          className="flex flex-col gap-y-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          {renderStepContent()}
          <div className="flex w-full justify-center gap-x-2">
            <Button onClick={prevStep} disabled={currentStep === 1}>
              Voltar
            </Button>
            <Button type="button" onClick={nextStep} disabled={isLoading}>
              {isLastStep ? "Efetuar" : "Próximo"}
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};
