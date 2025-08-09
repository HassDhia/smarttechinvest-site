import { Skeleton } from "../../components/ui/Skeleton";

export default function Loading() {
  return (
    <section className="container section max-w-2xl">
      <Skeleton className="h-8 w-2/3" />
      <Skeleton className="mt-2 h-4 w-1/2" />
      <div className="grid gap-3 mt-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="grid gap-1">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>
        ))}
        <Skeleton className="h-11 w-full rounded-md" />
      </div>
    </section>
  );
}


