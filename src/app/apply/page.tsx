"use client";

import { FormEvent, useState } from "react";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { cn } from "../../lib/cn";

const roleOptions = [
  { label: "Operator", value: "Operator" },
  { label: "Creator", value: "Creator" },
  { label: "Brand", value: "Brand" },
];

const outcomeOptions = [
  "Foot traffic",
  "Sales",
  "Signups",
  "Awareness",
  "Partnerships",
  "Other",
];

const budgetOptions = [
  { label: "Yes", value: "Yes" },
  { label: "No", value: "No" },
  { label: "Not sure", value: "Not sure" },
];

const controlClasses =
  "w-full rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--card))] text-[hsl(var(--card-foreground))] px-3 py-2 text-sm transition-colors placeholder:text-[hsl(var(--muted-foreground)/0.8)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--background))] disabled:opacity-60";

export default function ApplyPage() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/apply", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data?.error || "Unable to submit. Please try again.");
      }

      setStatus("success");
      form.reset();
    } catch (error) {
      console.error(error);
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Unable to submit right now.");
    }
  };

  return (
    <div className="font-sans">
      <section className="container section space-y-10">
        <div className="max-w-3xl space-y-4">
          <p className="headline-label text-white/60">Apply</p>
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-balance">Request a collaboration review</h1>
          <p className="text-lg text-white/85 leading-relaxed">
            If you have real distribution and a clear outcome, send the basics. STI reviews for fit and follows up when there is a credible path.
          </p>
          <div className="rounded-3xl border border-white/15 bg-white/5 px-6 py-5 text-sm text-white/80">
            Most work is private. Public case studies are limited. Redacted examples are available after initial fit.
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8" encType="multipart/form-data">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.4em] text-white/60">Signals</p>
            <div className="grid gap-4 md:grid-cols-2">
              <ToggleField id="sendBriefs" label="Subscribe to the blog" />
              <ToggleField id="collaborationIntent" label="I want to be considered for a collaboration" defaultChecked />
            </div>
          </div>

          <div className="grid gap-5">
            <Field label="You are a" required>
              <select name="role" required className={controlClasses} defaultValue="">
                <option value="" disabled>
                  Select option
                </option>
                {roleOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Name" required>
              <Input name="name" required placeholder="Full name" />
            </Field>

            <Field label="Company or handle" required>
              <Input name="company" required placeholder="Company, studio, or handle" />
            </Field>

            <Field label="Primary link" required helper="Website or social profile">
              <Input name="primaryLink" required placeholder="website or social profile" />
            </Field>

            <Field label="Market" required helper="City, region">
              <Input name="market" required placeholder="city, region" />
            </Field>

            <Field label="Category" required helper="Retail, hospitality, fitness, media, creator, other">
              <Input name="category" required placeholder="retail, hospitality, fitness, media, creator, other" />
            </Field>

            <Field label="What outcome are you trying to buy?" required>
              <select name="outcome" required className={controlClasses} defaultValue="">
                <option value="" disabled>
                  Select outcome
                </option>
                {outcomeOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </Field>

            <Field
              label="Distribution snapshot"
              required
              helper="Share what you have today. Examples: monthly foot traffic, email list size, follower count, average views, membership count."
            >
              <textarea
                name="distributionSnapshot"
                required
                rows={3}
                className={cn(controlClasses, "min-h-[120px] resize-vertical")}
                placeholder="Summarize reach metrics"
              />
              <div className="mt-2 text-xs text-white/60">
                <label htmlFor="distributionFile" className="block text-white/70 mb-1">
                  Optional upload (screenshots allowed)
                </label>
                <input
                  id="distributionFile"
                  name="distributionFile"
                  type="file"
                  accept="image/*,.pdf"
                  className="block w-full text-xs text-white/70 file:mr-4 file:rounded-md file:border-0 file:bg-white/10 file:px-3 file:py-2 file:text-xs file:font-semibold file:text-white hover:file:bg-white/20"
                />
              </div>
            </Field>

            <Field label="Past brand work (optional)" helper="List any brands you have worked with, even if informal.">
              <Input name="brandWork" placeholder="Brand roster or notable collaborations" />
            </Field>

            <Field label="Constraints or exclusions (optional)" helper="Anything you will not do or will not partner with.">
              <Input name="constraints" placeholder="List any guardrails" />
            </Field>

            <Field label="Budget reality" required>
              <select name="budgetReality" required className={controlClasses} defaultValue="">
                <option value="" disabled>
                  Select one
                </option>
                {budgetOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Notes (optional)">
              <textarea
                name="notes"
                rows={4}
                className={cn(controlClasses, "min-h-[140px] resize-vertical")}
                placeholder="Add any context or questions"
              />
            </Field>
          </div>

          <div className="space-y-4">
            <Button type="submit" variant="gradient" size="lg" isLoading={status === "submitting"} className="w-full sm:w-auto">
              Submit for review
            </Button>
            {status === "success" && (
              <p className="text-sm text-emerald-400" role="status">
                Received. If there is a fit, we will reach out. If you subscribed to the blog, you&apos;ll get new posts.
              </p>
            )}
            {status === "error" && errorMessage && (
              <p className="text-sm text-red-400" role="alert">
                {errorMessage}
              </p>
            )}
          </div>
        </form>
      </section>
    </div>
  );
}

function Field({
  label,
  required,
  helper,
  children,
}: {
  label: string;
  required?: boolean;
  helper?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="space-y-2">
      <span className="text-sm font-semibold text-white">
        {label}
        {required ? <span className="text-white/50"> *</span> : null}
      </span>
      {helper && <p className="text-xs text-white/60">{helper}</p>}
      {children}
    </label>
  );
}

function ToggleField({ id, label, defaultChecked }: { id: string; label: string; defaultChecked?: boolean }) {
  return (
    <label
      htmlFor={id}
      className="flex items-center justify-between gap-4 rounded-2xl border border-white/15 bg-white/5 px-4 py-3"
    >
      <div className="text-sm font-medium text-white/90">{label}</div>
      <div className="flex items-center">
        <input type="checkbox" id={id} name={id} className="peer sr-only" defaultChecked={defaultChecked} />
        <span className="relative inline-flex h-6 w-11 items-center rounded-full bg-white/20 transition peer-checked:bg-[#1F4FFF]">
          <span className="inline-block h-4 w-4 translate-x-1 rounded-full bg-white transition peer-checked:translate-x-6" />
        </span>
      </div>
    </label>
  );
}
