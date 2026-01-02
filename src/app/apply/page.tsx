"use client";

import { FormEvent, useState } from "react";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { cn } from "../../lib/cn";

const roleOptions = [
  { label: "Brand", value: "Brand" },
  { label: "Agency", value: "Agency" },
  { label: "Other", value: "Other" },
];

const focusOptions = [
  "Which partners are worth pursuing",
  "Market coverage gaps",
  "Competitive landscape",
  "Other",
];

const timelineOptions = [
  { label: "Exploring", value: "Exploring" },
  { label: "Active planning", value: "Active planning" },
  { label: "Immediate need", value: "Immediate need" },
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
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-balance">Tell us about your markets</h1>
          <p className="text-lg text-white/85 leading-relaxed">
            Share your target geography, category, and objectives. If there&apos;s a fit, we&apos;ll follow up with how our research can help.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8" encType="multipart/form-data">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.4em] text-white/60">Signals</p>
            <div className="grid gap-4 md:grid-cols-2">
              <ToggleField id="sendBriefs" label="Subscribe to the blog" />
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

            <Field label="Company" required>
              <Input name="company" required placeholder="Company name" />
            </Field>

            <Field label="Your role" required>
              <Input name="role_title" required placeholder="Your title or role" />
            </Field>

            <Field label="Target markets" required helper="Cities or regions you're focused on">
              <Input name="market" required placeholder="Los Angeles, NYC, Texas, etc." />
            </Field>

            <Field label="Category focus" required helper="Fitness, food & bev, retail, hospitality, other">
              <Input name="category" required placeholder="fitness, food & bev, retail, hospitality, other" />
            </Field>

            <Field label="What are you trying to learn?" required>
              <select name="focus" required className={controlClasses} defaultValue="">
                <option value="" disabled>
                  Select focus
                </option>
                {focusOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Timeline" required>
              <select name="timeline" required className={controlClasses} defaultValue="">
                <option value="" disabled>
                  Select timeline
                </option>
                {timelineOptions.map((option) => (
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
                placeholder="Add any context about your objectives or questions"
              />
            </Field>
          </div>

          <div className="space-y-4">
            <Button type="submit" variant="gradient" size="lg" isLoading={status === "submitting"} className="w-full sm:w-auto">
              Submit
            </Button>
            {status === "success" && (
              <p className="text-sm text-emerald-400" role="status">
                Received. If there&apos;s a fit, we&apos;ll follow up with how our research can help.
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
