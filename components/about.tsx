"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { experienceStats, siteConfig, skillCategories } from "@/lib/data";
import { SectionHeader } from "@/components/section-header";

export function About() {
  return (
    <section id="about" className="py-20 md:py-28 divider">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          number="02"
          label="About"
          title="The person behind"
          emphasis="the code"
        />

        <div className="grid lg:grid-cols-[280px_1fr] gap-12 lg:gap-20 items-start">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative w-full max-w-[280px] aspect-[4/5] overflow-hidden border border-border bg-surface"
          >
            <Image
              src={siteConfig.profileImage}
              alt={siteConfig.name}
              fill
              className="object-cover"
              sizes="280px"
            />
          </motion.div>

          <div>
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-8 font-sans max-w-3xl">
              Full Stack Web Developer and IT Support Specialist from the{" "}
              {siteConfig.location} with over six years of combined experience
              in IT infrastructure, technical support, and full-stack web
              development. I build scalable web applications using React.js,
              Node.js, Express.js, MongoDB, MySQL, PHP, and RESTful APIs — and
              deploy them on Linux servers with Nginx.
            </p>

            <p className="text-muted-foreground leading-relaxed mb-12 font-sans max-w-3xl">
              My background spans ticketing systems, attendance platforms,
              enrollment management, accounting applications, and business
              websites. I&apos;m passionate about writing clean, maintainable
              code, solving complex technical challenges, and delivering
              reliable software that teams and clients depend on.
            </p>

            <div className="grid sm:grid-cols-3 gap-6 mb-12 pb-12 border-b border-border">
              {experienceStats.map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.06 }}
                >
                  <p className="font-serif text-3xl sm:text-4xl text-foreground mb-2">
                    {stat.value}
                  </p>
                  <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground font-sans">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="space-y-10">
              {skillCategories.map((category, idx) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                  className="grid sm:grid-cols-[auto_1fr] gap-4 sm:gap-8"
                >
                  <span className="font-serif italic text-lg text-muted-foreground">
                    ({category.id})
                  </span>
                  <div>
                    <h3 className="font-serif text-2xl text-foreground mb-3">
                      {category.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed font-sans">
                      {category.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
