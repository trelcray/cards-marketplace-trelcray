import { SkeletonCard } from "@/components/skeleton-cards";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="mt-10 flex min-h-screen w-full flex-col flex-wrap gap-5 bg-gray-100 p-8">
      <Skeleton className="h-4 w-[250px]" />
      <SkeletonCard />
    </div>
  );
}
