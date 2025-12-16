const REQUEST_COLLAB_REVIEW_EMAIL =
  "mailto:partnerships@smarttechinvest.com?subject=STI%20Collaboration%20Review%20%7C%20Operator";

export function ActivationAngleCTA({ categoryHint }: { categoryHint?: string | null }) {
  const categoryLabel = categoryHint?.trim() || "this category";

  return (
    <div className="rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 sm:p-8 shadow-[0_15px_35px_rgba(0,0,0,0.35)]">
      <p className="text-xs uppercase tracking-[0.35em] text-[var(--text-muted)] mb-3">Activation angle</p>
      <p className="text-lg text-[var(--text-primary)] leading-relaxed mb-6">
        If you want to apply this signal to your market, STI can map partner-fit targets for {categoryLabel}
        {" "}
        and structure a collaboration you can take to a budget owner.
      </p>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <a
          href={REQUEST_COLLAB_REVIEW_EMAIL}
          className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-black shadow-[0_10px_30px_rgba(255,255,255,0.4)] transition hover:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-surface)]"
        >
          Request a collaboration review
        </a>
        <p className="text-xs text-[var(--text-secondary)]">If it’s a fit, we reply within 48 hours.</p>
      </div>
    </div>
  );
}
