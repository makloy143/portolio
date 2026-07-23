"use client";

import { FormEvent, useState } from "react";
import { Loader2 } from "lucide-react";
import { siteConfig } from "@/lib/data";
import { SectionHeader } from "@/components/section-header";

type FormState = "idle" | "loading" | "success" | "error";

export function Contact() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [feedback, setFeedback] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormState("loading");
    setFeedback("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      subject: String(formData.get("subject") ?? ""),
      message: String(formData.get("message") ?? ""),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error ?? "Failed to send message.");
      }

      if (result.fallback && result.mailto) {
        window.location.href = result.mailto;
        setFormState("success");
        setFeedback("Opening your email client to send the message.");
        return;
      }

      setFormState("success");
      setFeedback("Message sent successfully. I'll get back to you soon.");
      form.reset();
    } catch (error) {
      setFormState("error");
      setFeedback(
        error instanceof Error
          ? error.message
          : "Failed to send message. Please email me directly."
      );
    }
  }

  return (
    <section id="contact" className="py-20 md:py-28 divider">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          number="04"
          label="Contact"
          title="Let's build"
          emphasis="something together."
        />

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          <div>
            <div className="flex flex-wrap gap-x-8 gap-y-4 mb-8 font-sans">
              <a href={`mailto:${siteConfig.email}`} className="editorial-link">
                Say hello ↗
              </a>
              <a href={`mailto:${siteConfig.email}`} className="editorial-link">
                Email ↗
              </a>
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noopener noreferrer"
                className="editorial-link"
              >
                GitHub ↗
              </a>
              <a
                href={siteConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="editorial-link"
              >
                LinkedIn ↗
              </a>
            </div>
            <p className="text-sm text-[var(--muted)] font-sans">
              Usually replies within a day
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 font-sans">
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label
                  htmlFor="contact-name"
                  className="text-xs uppercase tracking-[0.14em] text-[var(--muted)]"
                >
                  Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  className="w-full px-0 py-3 bg-transparent border-b border-[var(--border)] focus:outline-none focus:border-[var(--foreground)] transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="contact-email"
                  className="text-xs uppercase tracking-[0.14em] text-[var(--muted)]"
                >
                  Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="w-full px-0 py-3 bg-transparent border-b border-[var(--border)] focus:outline-none focus:border-[var(--foreground)] transition-colors"
                  placeholder="you@email.com"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label
                htmlFor="contact-subject"
                className="text-xs uppercase tracking-[0.14em] text-[var(--muted)]"
              >
                Subject
              </label>
              <input
                id="contact-subject"
                name="subject"
                type="text"
                required
                className="w-full px-0 py-3 bg-transparent border-b border-[var(--border)] focus:outline-none focus:border-[var(--foreground)] transition-colors"
                placeholder="Project inquiry"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="contact-message"
                className="text-xs uppercase tracking-[0.14em] text-[var(--muted)]"
              >
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={4}
                required
                className="w-full px-0 py-3 bg-transparent border-b border-[var(--border)] focus:outline-none focus:border-[var(--foreground)] transition-colors resize-none"
                placeholder="Tell me about your project..."
              />
            </div>

            {feedback && (
              <p
                role="status"
                className={`text-sm ${
                  formState === "error"
                    ? "text-red-700"
                    : "text-[var(--muted)]"
                }`}
              >
                {feedback}
              </p>
            )}

            <button
              type="submit"
              disabled={formState === "loading"}
              className="editorial-link disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2"
            >
              {formState === "loading" ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  Sending...
                </>
              ) : (
                "Send message ↗"
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
