import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Download, MapPin, Clock } from "lucide-react";
import { siteConfig, stats } from "@/lib/data";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { LocalTime } from "@/components/local-time";
import { SocialLinks } from "@/components/social-links";

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-32 pb-20 sm:pt-36 md:pb-28">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid" />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-glow" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 sm:px-6 lg:grid-cols-[1.35fr_1fr]">
        <div>
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border bg-card/70 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-success" />
            </span>
            {siteConfig.availability}
          </p>

          <h1 className="text-[clamp(2.4rem,6vw,4.25rem)] font-semibold leading-[1.05] tracking-tight text-foreground">
            I build reliable web apps with{" "}
            <span className="bg-gradient-to-r from-primary to-[oklch(0.6_0.2_300)] bg-clip-text text-transparent">
              React & Node.js
            </span>
            .
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            I&apos;m {siteConfig.name}, a full stack developer with 6+ years across IT
            support and web development — shipping ticketing, attendance, and
            enrollment platforms plus fast, SEO-ready business websites.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className={cn(buttonVariants({ size: "lg" }), "h-11 rounded-full px-6 text-sm")}
            >
              View my work
              <ArrowRight className="size-4" />
            </a>
            <a
              href={siteConfig.resumePath}
              download={siteConfig.resumeFileName}
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-11 rounded-full px-6 text-sm"
              )}
            >
              <Download className="size-4" />
              Download résumé
            </a>
          </div>

          <SocialLinks className="mt-8" />
        </div>

        <Reveal delay={0.1}>
          <div className="relative mx-auto max-w-sm rounded-3xl border bg-card/80 p-6 shadow-xl shadow-primary/5 backdrop-blur">
            <div className="flex items-center gap-4">
              <div className="relative size-16 shrink-0 overflow-hidden rounded-2xl border">
                <Image
                  src={siteConfig.profileImage}
                  alt={siteConfig.name}
                  fill
                  priority
                  sizes="64px"
                  className="object-cover"
                />
              </div>
              <div className="min-w-0">
                <p className="truncate font-semibold">{siteConfig.name}</p>
                <p className="text-sm text-muted-foreground">{siteConfig.role}</p>
              </div>
            </div>

            <dl className="mt-6 grid grid-cols-3 gap-3 border-y py-5 text-center">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="text-2xl font-semibold tracking-tight">{stat.value}</dd>
                  <p aria-hidden className="mt-1 text-[11px] leading-tight text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              ))}
            </dl>

            <ul className="mt-5 space-y-2.5 text-sm text-muted-foreground">
              <li className="flex items-center gap-2.5">
                <MapPin className="size-4 text-primary" />
                Based in the {siteConfig.location} · works remote
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="size-4 text-primary" />
                <span>
                  Local time <LocalTime className="font-medium text-foreground" /> (PHT)
                </span>
              </li>
            </ul>

            <Link
              href="/resume"
              className="mt-6 flex items-center justify-between rounded-xl bg-muted px-4 py-3 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              Read the full résumé
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
