export const CONTACT_LIMITS = {
  name: 100,
  email: 200,
  subject: 150,
  message: 5000,
} as const;

export type ContactPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
  /** Honeypot — must stay empty. */
  company?: string;
};

export type ContactErrors = Partial<Record<keyof ContactPayload, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Shared by the form (client) and the API route (server). */
export function validateContact(input: Partial<ContactPayload>): ContactErrors {
  const errors: ContactErrors = {};
  const name = input.name?.trim() ?? "";
  const email = input.email?.trim() ?? "";
  const subject = input.subject?.trim() ?? "";
  const message = input.message?.trim() ?? "";

  if (!name) errors.name = "Please enter your name.";
  else if (name.length > CONTACT_LIMITS.name) errors.name = "Name is too long.";

  if (!email) errors.email = "Please enter your email.";
  else if (!EMAIL_RE.test(email) || email.length > CONTACT_LIMITS.email)
    errors.email = "Please enter a valid email address.";

  if (!subject) errors.subject = "Please add a subject.";
  else if (subject.length > CONTACT_LIMITS.subject) errors.subject = "Subject is too long.";

  if (message.length < 10) errors.message = "Message should be at least 10 characters.";
  else if (message.length > CONTACT_LIMITS.message) errors.message = "Message is too long.";

  return errors;
}

export function buildMailto(to: string, p: ContactPayload) {
  return `mailto:${to}?subject=${encodeURIComponent(`[Portfolio] ${p.subject}`)}&body=${encodeURIComponent(
    `Hi Mark,\n\n${p.message}\n\n— ${p.name} (${p.email})`
  )}`;
}
