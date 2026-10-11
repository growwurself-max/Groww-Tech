/**
 * Shared configuration for the "Start a Project" inquiry form.
 *
 * Imported by both the client form and the server API route so the allowed
 * options and validation limits can never drift apart.
 */

export const PROJECT_TYPES = [
  "Website",
  "SaaS Application",
  "E-commerce",
  "AI Integration",
  "Custom Software",
  "Other",
] as const;

export type ProjectType = (typeof PROJECT_TYPES)[number];

export const BUDGET_OPTIONS = [
  "Not sure yet",
  "Under $1,000",
  "$1,000 – $5,000",
  "$5,000 – $15,000",
  "$15,000 – $50,000",
  "$50,000+",
] as const;

export type BudgetOption = (typeof BUDGET_OPTIONS)[number];

/** Maximum accepted length for each free-text field (server-enforced). */
export const CONTACT_LIMITS = {
  fullName: 100,
  email: 254,
  description: 5000,
  budget: 60,
} as const;

/** Minimum description length so inquiries carry enough context. */
export const MIN_DESCRIPTION = 20;

/** Minimum time (ms) a genuine visitor needs to complete the form. */
export const MIN_FILL_MS = 2000;

/** Fallback recipient when CONTACT_TO_EMAIL is not provided. */
export const DEFAULT_CONTACT_TO = "growwurself@gmail.com";

/** Environment variable names used by the server route. */
export const CONTACT_ENV = {
  apiKey: "RESEND_API_KEY",
  from: "CONTACT_FROM_EMAIL",
  to: "CONTACT_TO_EMAIL",
} as const;
