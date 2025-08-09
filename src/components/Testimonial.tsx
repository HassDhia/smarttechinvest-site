export function Testimonial({ quote, author, role }: { quote: string; author: string; role?: string }) {
  return (
    <blockquote className="relative overflow-hidden rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] text-[hsl(var(--card-foreground))] shadow-[var(--shadow-sm)] p-5 md:p-6">
      <p className="text-sm md:text-base leading-7">“{quote}”</p>
      <footer className="mt-3 text-sm font-semibold text-[hsl(var(--muted-foreground))]">
        {author}
        {role ? <span className="font-normal"> — {role}</span> : null}
      </footer>
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-noise opacity-40" />
    </blockquote>
  );
}




