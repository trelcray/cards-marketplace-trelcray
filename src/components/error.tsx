import { XCircle } from "lucide-react";

export const Error = () => {
  return (
    <div className="flex size-full flex-col items-center justify-center gap-y-3">
      <XCircle size={30} />
      <p>Ops! Parece que ocorreu algum erro, tente novamente mais tarde.</p>
    </div>
  );
};
