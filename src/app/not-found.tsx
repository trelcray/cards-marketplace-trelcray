import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-y-2">
      <span className="rounded-full bg-gray-300 px-3 py-1">Error 404</span>
      <h2 className="text-lg">Página não encontrada</h2>
      <p className="text-gray-700">
        Desculpe, nós não podemos encontrar a página você está procurando.
      </p>
      <Link href="/">
        <Button>Ir para o ínicio</Button>
      </Link>
    </div>
  );
}
