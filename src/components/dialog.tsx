"use client";

import { toast } from "sonner";

import { revalidateTrades } from "@/actions/revalidates";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { fetchWrapper } from "@/lib/fetch";

interface IDialogProps {
  children: React.ReactElement;
  id?: string;
}

export const Dialog: React.FC<IDialogProps> = ({ children, id }) => {
  const handleDeleteTrade = async (id?: string): Promise<void> => {
    try {
      await fetchWrapper(`/trades/${id}`, {
        method: "DELETE",
      });
      toast.success("Solicitação de troca excluída com sucesso!");
      revalidateTrades();
    } catch (error) {
      console.error((error as Error).message);
      toast.error("Error ao excluir a solicitação de troca");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Você tem certeza disso?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação não pode ser desfeita. Isto vai deletar permanentemente
            seu dados do nosso servidor.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleDeleteTrade(id)}>
            Excluir
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
