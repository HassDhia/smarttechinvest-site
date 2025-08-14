import { Skeleton } from "../../components/ui/Skeleton";

export default function Loading() {
  return (
    <section className="container section">
      <div className="mb-4">
        <div className="h-6 w-52"><Skeleton /></div>
        <div className="h-8 w-80 mt-2"><Skeleton /></div>
      </div>
      <div className="rounded-2xl overflow-hidden border border-[hsl(var(--border))]">
        <div className="aspect-[16/10] w-full bg-[hsl(var(--muted))]" />
      </div>
    </section>
  );
}


