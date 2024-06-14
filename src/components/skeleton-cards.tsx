import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCard() {
  return (
    <div className="flex w-full flex-wrap gap-5">
      <div className="flex h-96 w-72 animate-pulse flex-col items-center space-y-3 rounded-lg border p-2">
        <Skeleton className="h-52 w-40 rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[200px]" />
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[250px]" />
        </div>
      </div>
      <div className="flex h-96 w-72 animate-pulse flex-col items-center space-y-3 rounded-lg border p-2">
        <Skeleton className="h-52 w-40 rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[200px]" />
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[250px]" />
        </div>
      </div>
      <div className="flex h-96 w-72 animate-pulse flex-col items-center space-y-3 rounded-lg border p-2">
        <Skeleton className="h-52 w-40 rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[200px]" />
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[250px]" />
        </div>
      </div>
    </div>
  );
}
