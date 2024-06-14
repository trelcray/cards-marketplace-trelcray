"use client";

import { useRouter, useSearchParams } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const SelectRpp = ({ rpp }: { rpp: string }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleRppChange = (newRpp: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("rpp", newRpp);
    router.push(`?${params.toString()}`);
  };
  return (
    <div className="flex items-center gap-x-2">
      <p>Número de páginas:</p>
      <Select onValueChange={handleRppChange} defaultValue={rpp}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="RPP" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="3">3</SelectItem>
          <SelectItem value="6">6</SelectItem>
          <SelectItem value="9">9</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
