"use client";

import { useState, type FormEvent } from "react";
import { Check, CheckCircle2, Copy, Loader2, Mail, MapPin, Send, Timer } from "lucide-react";
import { siteConfig } from "@/lib/data";
import { CONTACT_LIMITS, validateContact, type ContactErrors, type ContactPayload } from "@/lib/contact";
import { cn } from "@/lib/utils";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { SocialLinks } from "@/components/social-links";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type Status = "idle" | "loading" | "success" | "fallback" | "error";

const fieldClass = "h-11 rounded-xl bg-background px-3.5 text-sm";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<ContactErrors>({});
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(siteConfig.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${siteConfig.email}`;
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as unknown as ContactPayload;

    const clientErrors = validateContact(data);
    setErrors(clientErrors);
    if (Object.keys(clientErrors).length > 0) {
      const first = Object.keys(clientErrors)[0];
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();

      if (!res.ok) {
        if (result.errors) setErrors(result.errors);
        throw new Error(result.error ?? "Failed to send message.");
      }

      if (result.fallback && result.mailto) {
        window.location.href = result.mailto;
        setStatus("fallback");
        setMessage("Your email app should open with the message ready to send.");
        return;
      }

      setStatus("success");
      setMessage("Thanks! Your message is on its way — I'll reply within one business day.");
      form.reset();
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Failed to send message.");
    }
  }

  const clearError = (field: keyof ContactErrors) =>
    errors[field] && setErrors((e) => ({ ...e, [field]: undefined }));

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Let's build something together"
      description="Hiring for a full-stack role or need a reliable web app or website? Send a message — I usually reply within a day."
      className="border-t"
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_1.5fr]">
        <Reveal className="flex flex-col gap-6 rounded-2xl border bg-card p-6 md:p-8">
          <div>
            <p className="text-sm text-muted-foreground">Email me directly</p>
            <div className="mt-2 flex items-center gap-2">
              <a
                href={`mailto:${siteConfig.email}`}
                className="truncate text-lg font-semibold tracking-tight hover:text-primary"
              >
                {siteConfig.email}
              </a>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={copyEmail}
                aria-label={copied ? "Email copied" : "Copy email address"}
                className="shrink-0 rounded-full"
              >
                {copied ? <Check className="size-4 text-success" /> : <Copy className="size-4" />}
              </Button>
            </div>
            <span aria-live="polite" className="sr-only">
              {copied ? "Email address copied to clipboard" : ""}
            </span>
          </div>

          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-center gap-3">
              <MapPin className="size-4 text-primary" /> {siteConfig.location} · Remote worldwide
            </li>
            <li className="flex items-center gap-3">
              <Timer className="size-4 text-primary" /> Replies within 24 hours
            </li>
            <li className="flex items-center gap-3">
              <Mail className="size-4 text-primary" /> {siteConfig.availability}
            </li>
          </ul>

          <div className="mt-auto border-t pt-6">
            <p className="mb-3 text-sm text-muted-foreground">Find me online</p>
            <SocialLinks />
          </div>
        </Reveal>

        <Reveal delay={0.08} className="rounded-2xl border bg-card p-6 md:p-8">
          {status === "success" ? (
            <div role="status" className="flex h-full min-h-80 flex-col items-center justify-center text-center">
              <CheckCircle2 className="mb-4 size-12 text-success" />
              <h3 className="text-xl font-semibold">Message sent</h3>
              <p className="mt-2 max-w-sm text-muted-foreground">{message}</p>
              <Button variant="outline" className="mt-6 rounded-full" onClick={() => setStatus("idle")}>
                Send another message
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              {/* Honeypot: hidden from people, tempting to bots */}
              <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                <label>
                  Company
                  <input type="text" name="company" tabIndex={-1} autoComplete="off" />
                </label>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field id="name" label="Name" error={errors.name}>
                  <Input
                    id="name" name="name" autoComplete="name" placeholder="Jane Doe"
                    maxLength={CONTACT_LIMITS.name} className={fieldClass}
                    aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined}
                    onChange={() => clearError("name")}
                  />
                </Field>
                <Field id="email" label="Email" error={errors.email}>
                  <Input
                    id="email" name="email" type="email" autoComplete="email" placeholder="jane@company.com"
                    maxLength={CONTACT_LIMITS.email} className={fieldClass}
                    aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined}
                    onChange={() => clearError("email")}
                  />
                </Field>
              </div>

              <Field id="subject" label="Subject" error={errors.subject}>
                <Input
                  id="subject" name="subject" placeholder="Full-stack developer role / project inquiry"
                  maxLength={CONTACT_LIMITS.subject} className={fieldClass}
                  aria-invalid={!!errors.subject} aria-describedby={errors.subject ? "subject-error" : undefined}
                  onChange={() => clearError("subject")}
                />
              </Field>

              <Field id="message" label="Message" error={errors.message}>
                <Textarea
                  id="message" name="message" rows={6} placeholder="Tell me about the role or project, timeline, and goals…"
                  maxLength={CONTACT_LIMITS.message}
                  className="min-h-36 resize-y rounded-xl bg-background px-3.5 py-3 text-sm"
                  aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-error" : undefined}
                  onChange={() => clearError("message")}
                />
              </Field>

              {message && (
                <p
                  role={status === "error" ? "alert" : "status"}
                  className={cn(
                    "rounded-xl px-4 py-3 text-sm",
                    status === "error" ? "bg-destructive/10 text-destructive" : "bg-accent text-accent-foreground"
                  )}
                >
                  {message}
                </p>
              )}

              <Button
                type="submit"
                size="lg"
                disabled={status === "loading"}
                className="h-11 w-full rounded-full text-sm sm:w-auto sm:px-8"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="size-4 animate-spin" /> Sending…
                  </>
                ) : (
                  <>
                    <Send className="size-4" /> Send message
                  </>
                )}
              </Button>
            </form>
          )}
        </Reveal>
      </div>
    </Section>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-medium">
        {label}
      </Label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
