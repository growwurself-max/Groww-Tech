"use client";

import { useEffect, useRef, useState } from "react";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Loader2,
  Send,
} from "lucide-react";
import {
  BUDGET_OPTIONS,
  CONTACT_LIMITS,
  MIN_DESCRIPTION,
  PROJECT_TYPES,
  WHATSAPP_NUMBER,
} from "@/config/contact";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

type Values = {
  fullName: string;
  email: string;
  phone: string;
  projectType: string;
  budget: string;
  description: string;
};

type Status = "idle" | "submitting" | "success" | "error";

const EMPTY: Values = {
  fullName: "",
  email: "",
  phone: "",
  projectType: "",
  budget: "",
  description: "",
};

const inputClass =
  "w-full rounded-xl border border-line bg-canvas-soft px-4 py-3 text-sm text-ink shadow-xs transition-colors duration-300 ease-smooth placeholder:text-ink-faint hover:border-line-strong focus-visible:border-brand-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40";

function validate(values: Values): Record<string, string> {
  const errors: Record<string, string> = {};
  const name = values.fullName.trim();
  const email = values.email.trim();
  const phone = values.phone.trim();
  const description = values.description.trim();

  if (name.length < 2) errors.fullName = "Please enter your full name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (phone && !/^\+?[\d\s\-\(\)]{10,}$/.test(phone)) {
    errors.phone = "Please enter a valid phone number.";
  }
  if (!values.projectType) errors.projectType = "Please choose a project type.";
  if (description.length < MIN_DESCRIPTION) {
    errors.description = `Please describe your project in at least ${MIN_DESCRIPTION} characters.`;
  }
  return errors;
}

export function ContactForm() {
  const [values, setValues] = useState<Values>(EMPTY);
  const [honeypot, setHoneypot] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [submittedName, setSubmittedName] = useState("");
  const startedAtRef = useRef(0);

  useEffect(() => {
    startedAtRef.current = Date.now();
  }, []);

  const update = (field: keyof Values, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setFieldErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "submitting") return;

    const errors = validate(values);
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) {
      setStatus("idle");
      setMessage("Please review the highlighted fields.");
      return;
    }

    setStatus("submitting");
    setMessage("");

    // Build WhatsApp message with all form details
    const message = `📋 *New Project Inquiry*

*Name:* ${values.fullName.trim()}
*Email:* ${values.email.trim()}
${values.phone.trim() ? `*Phone:* ${values.phone.trim()}\n` : ''}*Project Type:* ${values.projectType}
${values.budget ? `*Budget:* ${values.budget}\n` : ''}*Description:*
${values.description.trim()}`;

    // URL-encode the message
    const encodedMessage = encodeURIComponent(message);

    // Construct WhatsApp URL
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    // Show success message before redirecting
    setSubmittedName(values.fullName.trim());
    setValues(EMPTY);
    setHoneypot("");
    setFieldErrors({});
    setMessage("");
    setStatus("success");

    // Open WhatsApp after a short delay to show success message
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
    }, 1500);
  };

  if (status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex flex-col items-center rounded-3xl border border-line bg-surface p-8 text-center shadow-md sm:p-12"
      >
        <span className="flex size-14 items-center justify-center rounded-full bg-brand-50 text-brand-600">
          <CheckCircle2 className="size-7" />
        </span>
        <h2 className="mt-6 text-2xl text-ink">
          {submittedName ? `Thanks, ${submittedName}!` : "Thank you!"}
        </h2>
        <p className="mt-3 max-w-md text-sm text-pretty text-ink-muted">
          WhatsApp is opening with your inquiry ready to send. Complete the
          message there to reach us directly!
        </p>
        <Button
          type="button"
          variant="secondary"
          className="mt-8"
          onClick={() => setStatus("idle")}
        >
          Send another inquiry
        </Button>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="rounded-3xl border border-line bg-surface p-6 shadow-md sm:p-8 md:p-10"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="fullName" className="text-sm font-medium text-ink">
            Full name
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            autoComplete="name"
            required
            maxLength={CONTACT_LIMITS.fullName}
            value={values.fullName}
            onChange={(e) => update("fullName", e.target.value)}
            aria-invalid={Boolean(fieldErrors.fullName)}
            aria-describedby={fieldErrors.fullName ? "fullName-error" : undefined}
            className={cn(inputClass, fieldErrors.fullName && "border-red-400")}
            placeholder="Jane Doe"
          />
          {fieldErrors.fullName ? (
            <p id="fullName-error" className="text-xs text-red-600">
              {fieldErrors.fullName}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium text-ink">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={CONTACT_LIMITS.email}
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            aria-invalid={Boolean(fieldErrors.email)}
            aria-describedby={fieldErrors.email ? "email-error" : undefined}
            className={cn(inputClass, fieldErrors.email && "border-red-400")}
            placeholder="you@example.com"
          />
          {fieldErrors.email ? (
            <p id="email-error" className="text-xs text-red-600">
              {fieldErrors.email}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="phone" className="text-sm font-medium text-ink">
            Phone number{" "}
            <span className="font-normal text-ink-faint">(optional)</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            maxLength={CONTACT_LIMITS.fullName}
            value={values.phone}
            onChange={(e) => update("phone", e.target.value)}
            aria-invalid={Boolean(fieldErrors.phone)}
            aria-describedby={fieldErrors.phone ? "phone-error" : undefined}
            className={cn(inputClass, fieldErrors.phone && "border-red-400")}
            placeholder="+1 (555) 123-4567"
          />
          {fieldErrors.phone ? (
            <p id="phone-error" className="text-xs text-red-600">
              {fieldErrors.phone}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="projectType" className="text-sm font-medium text-ink">
            Project type
          </label>
          <div className="relative">
            <select
              id="projectType"
              name="projectType"
              required
              value={values.projectType}
              onChange={(e) => update("projectType", e.target.value)}
              aria-invalid={Boolean(fieldErrors.projectType)}
              aria-describedby={
                fieldErrors.projectType ? "projectType-error" : undefined
              }
              className={cn(
                inputClass,
                "appearance-none pr-10",
                !values.projectType && "text-ink-faint",
                fieldErrors.projectType && "border-red-400",
              )}
            >
              <option value="" disabled>
                Select a project type
              </option>
              {PROJECT_TYPES.map((type) => (
                <option key={type} value={type} className="text-ink">
                  {type}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-ink-faint" />
          </div>
          {fieldErrors.projectType ? (
            <p id="projectType-error" className="text-xs text-red-600">
              {fieldErrors.projectType}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="budget" className="text-sm font-medium text-ink">
            Estimated budget{" "}
            <span className="font-normal text-ink-faint">(optional)</span>
          </label>
          <div className="relative">
            <select
              id="budget"
              name="budget"
              value={values.budget}
              onChange={(e) => update("budget", e.target.value)}
              className={cn(
                inputClass,
                "appearance-none pr-10",
                !values.budget && "text-ink-faint",
              )}
            >
              <option value="">Prefer not to say</option>
              {BUDGET_OPTIONS.map((option) => (
                <option key={option} value={option} className="text-ink">
                  {option}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-ink-faint" />
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:col-span-2">
          <label htmlFor="description" className="text-sm font-medium text-ink">
            Project description
          </label>
          <textarea
            id="description"
            name="description"
            required
            rows={6}
            maxLength={CONTACT_LIMITS.description}
            value={values.description}
            onChange={(e) => update("description", e.target.value)}
            aria-invalid={Boolean(fieldErrors.description)}
            aria-describedby="description-help"
            className={cn(
              inputClass,
              "resize-y",
              fieldErrors.description && "border-red-400",
            )}
            placeholder="Tell us what you want to build, who it's for, and any deadlines or references."
          />
          <p id="description-help" className="text-xs text-ink-faint">
            {fieldErrors.description ? (
              <span className="text-red-600">{fieldErrors.description}</span>
            ) : (
              `A few sentences is enough — ${values.description.trim().length}/${CONTACT_LIMITS.description} characters.`
            )}
          </p>
        </div>
      </div>

      {/* Spam honeypot — hidden from people, irresistible to bots. */}
      <div aria-hidden className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      <div aria-live="polite" className="min-h-[1.5rem]">
        {status === "error" && message ? (
          <p className="mt-5 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            <AlertCircle className="mt-0.5 size-4 shrink-0" />
            <span>{message}</span>
          </p>
        ) : null}
      </div>

      <div className="mt-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-xs text-xs text-pretty text-ink-subtle">
          Your inquiry will be sent directly via WhatsApp for a faster response.
        </p>
        <Button
          type="submit"
          size="lg"
          disabled={status === "submitting"}
          className="group w-full sm:w-auto"
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Opening WhatsApp…
            </>
          ) : (
            <>
              <Send className="size-4" />
              Send via WhatsApp
              <ArrowRight className="size-4 transition-transform duration-300 ease-smooth group-hover:translate-x-0.5" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
