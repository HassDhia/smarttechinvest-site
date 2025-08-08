export function Testimonial({ quote, author, role }: { quote: string; author: string; role?: string }) {
  return (
    <blockquote className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
      <p className="text-sm leading-7" style={{ color: "var(--muted)" }}>“{quote}”</p>
      <footer className="mt-3 text-sm font-semibold">
        {author}
        {role ? <span className="font-normal" style={{ color: "var(--muted)" }}> — {role}</span> : null}
      </footer>
    </blockquote>
  );
}




