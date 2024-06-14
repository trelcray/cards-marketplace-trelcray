"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "./ui/button";

interface PaginationProps {
  pageIndex: number;
  more: boolean;
  url?: string;
}

export function Pagination({ more, pageIndex, url = "" }: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    router.push(`${url}?${params.toString()}`);
  };

  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-muted-foreground">Página {pageIndex}</span>

      <div className="flex items-center gap-6 lg:gap-8">
        <div className="flex items-center gap-2">
          <Button
            onClick={() => handlePageChange(pageIndex - 1)}
            variant="outline"
            className="size-8 p-0"
            disabled={pageIndex === 1}
          >
            <ChevronLeft className="size-4" />
            <span className="sr-only">Página anterior</span>
          </Button>
          <Button
            onClick={() => handlePageChange(pageIndex + 1)}
            variant="outline"
            className="size-8 p-0"
            disabled={!more}
          >
            <ChevronRight className="size-4" />
            <span className="sr-only">Próxima página</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
