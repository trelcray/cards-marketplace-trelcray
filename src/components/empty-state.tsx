import { DatabaseBackup } from "lucide-react";

export const EmptyState = () => {
  return (
    <div className="flex size-full flex-col items-center justify-center gap-y-3">
      <DatabaseBackup size={30} />
      <p>Ops! Parece que nenhum dado foi encontrado, adicione um novo!</p>
    </div>
  );
};
