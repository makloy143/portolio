"use client";

import { motion } from "framer-motion";
import { stackItems } from "@/lib/data";
import { SectionHeader } from "@/components/section-header";

export function Skills() {
  return (
    <section id="skills" className="py-20 md:py-28 divider bg-[var(--surface)]/50">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          number="03"
          label="Stack"
          title="Tools of the"
          emphasis="trade"
          count={stackItems.length}
        />

        <div className="flex flex-wrap gap-3">
          {stackItems.map((skill, idx) => (
            <motion.span
              key={skill}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.02 }}
              className="px-4 py-2.5 text-sm border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] font-sans hover:border-[var(--border-strong)] transition-colors"
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
