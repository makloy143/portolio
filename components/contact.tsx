"use client";

import { FormEvent, useState } from "react";
import { Loader2 } from "lucide-react";
import { siteConfig } from "@/lib/data";
import { SectionHeader } from "@/components/section-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type FormState = "idle" | "loading" | "success" | "error";

const fieldClassName =
  "rounded-none border-0 border-b border-border bg-transparent px-0 shadow-none focus-visible:border-foreground focus-visible:ring-0 dark:bg-transparent";

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
                Email me ↗
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
            <p className="text-sm text-muted-foreground font-sans">
              Usually replies within a day
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 font-sans">
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label
                  htmlFor="contact-name"
                  className="text-xs uppercase tracking-[0.14em] text-muted-foreground font-normal"
                >
                  Name
                </Label>
                <Input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  className={fieldClassName}
                  placeholder="Your name"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="contact-email"
                  className="text-xs uppercase tracking-[0.14em] text-muted-foreground font-normal"
                >
                  Email
                </Label>
                <Input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className={fieldClassName}
                  placeholder="you@email.com"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="contact-subject"
                className="text-xs uppercase tracking-[0.14em] text-muted-foreground font-normal"
              >
                Subject
              </Label>
              <Input
                id="contact-subject"
                name="subject"
                type="text"
                required
                className={fieldClassName}
                placeholder="Project inquiry"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="contact-message"
                className="text-xs uppercase tracking-[0.14em] text-muted-foreground font-normal"
              >
                Message
              </Label>
              <Textarea
                id="contact-message"
                name="message"
                rows={4}
                required
                className={`${fieldClassName} min-h-28 resize-none`}
                placeholder="Tell me about your project..."
              />
            </div>

            {feedback && (
              <p
                role="status"
                className={`text-sm ${
                  formState === "error"
                    ? "text-destructive"
                    : "text-muted-foreground"
                }`}
              >
                {feedback}
              </p>
            )}

            <Button
              type="submit"
              variant="outline"
              disabled={formState === "loading"}
              className="rounded-none border-0 border-b border-[var(--border-strong)] bg-transparent px-0 uppercase tracking-[0.04em] shadow-none hover:bg-transparent hover:opacity-60"
            >
              {formState === "loading" ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Sending...
                </>
              ) : (
                "Send message ↗"
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
