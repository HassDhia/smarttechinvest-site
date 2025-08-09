import { Skeleton } from "../../components/ui/Skeleton";

export default function Loading() {
  return (
    <section className="container section">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="rounded-2xl p-5 border border-[hsl(var(--border))] bg-[hsl(var(--card))] shadow-[var(--shadow-sm)]">
            <Skeleton className="h-6 w-2/3" />
            <Skeleton className="mt-2 h-4 w-3/4" />
            <div className="mt-3 space-y-2">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-5/6" />
              <Skeleton className="h-3 w-2/3" />
            </div>
            <Skeleton className="mt-4 h-9 w-28 rounded-md" />
          </div>
        ))}
      </div>
    </section>
  );
}


