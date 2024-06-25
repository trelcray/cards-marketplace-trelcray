"use client";

// Error components must be Client Components
import { useEffect } from "react";

import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <>
      <div className="flex h-full flex-col items-center justify-center">
        <div className="w-full px-4">
          <div className="mx-auto max-w-[400px] text-center">
            <h2 className="mb-2 text-4xl font-bold leading-none">Error: 404</h2>
            <h4 className="mb-3 text-[22px] font-semibold leading-tight">
              Oops! Alguma coisa deu errado!
            </h4>
            <p className="mb-8 text-lg">
              A página buscada teve uma falha de rede. Tente novamente.
            </p>
            <Button onClick={() => reset()}>Try again</Button>
          </div>
        </div>
      </div>
    </>
  );
}
