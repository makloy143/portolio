"use client";

import { motion } from "framer-motion";
import { stackItems } from "@/lib/data";
import { SectionHeader } from "@/components/section-header";
import { Badge } from "@/components/ui/badge";

export function Skills() {
  return (
    <section id="skills" className="py-20 md:py-28 divider bg-surface/50">
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
            <motion.div
              key={skill}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.02 }}
            >
              <Badge
                variant="outline"
                className="h-auto rounded-none border-border bg-background px-4 py-2.5 text-sm font-normal text-foreground hover:border-[var(--border-strong)] transition-colors"
              >
                {skill}
              </Badge>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
