import { Skeleton } from "@/components/ui/skeleton";

export function JSONSkeleton() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[500px] w-full rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="w-1/2 h-4 " />
        <Skeleton className="w-1/3 h-4" />
        <Skeleton className="w-1/4 h-4" />
      </div>
    </div>
  )
}

export function SimpleSkeleton() {
  return (
    <div className="flex flex-col space-y-3 p-4">
      <div className="space-y-2">
        <Skeleton className="w-1/2 h-4 " />
        <Skeleton className="w-1/3 h-4" />
        <Skeleton className="w-1/4 h-4" />
      </div>
    </div>
  )
}

