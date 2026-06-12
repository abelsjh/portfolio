"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const BELIEFS = [
  {
    phrase: "Systems should feel",
    emphasis: "quiet.",
    delay: 0,
  },
  {
    phrase: "Interfaces should feel",
    emphasis: "thoughtful.",
    delay: 0.12,
  },
  {
    phrase: "Experiences should feel",
    emphasis: "deeply human.",
    delay: 0.24,
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [40, 0, 0, -20]);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative py-40 px-6 md:px-12 bg-bg overflow-hidden border-b border-border/20"
    >
      {/* Subtle ambient bronze — very quiet */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] rounded-full bg-accent/[0.025] blur-[130px] pointer-events-none" />

      <motion.div
        style={{ opacity, y }}
        className="max-w-4xl mx-auto flex flex-col gap-16 relative z-10"
      >
        {/* Overline */}
        <div className="flex items-center gap-4">
          <div className="w-8 h-[1px] bg-accent/40" />
          <span className="text-[10px] uppercase tracking-[0.3em] text-accent/70 font-mono font-bold">
            My Philosophy
          </span>
        </div>

        {/* Main Belief Statements — massive, quiet typography */}
        <div className="flex flex-col gap-10">
          {BELIEFS.map(({ phrase, emphasis, delay }) => (
            <motion.div
              key={emphasis}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-1"
            >
              <span
                className="serif-font font-light text-text-muted leading-tight tracking-tight"
                style={{ fontSize: "clamp(1.5rem, 4.5vw, 3.25rem)" }}
              >
                {phrase}
              </span>
              <span
                className="serif-font italic text-text leading-tight tracking-tight"
                style={{ fontSize: "clamp(2rem, 6vw, 4.5rem)" }}
              >
                {emphasis}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Single quiet closing sentence */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1.4, delay: 0.4, ease: "easeOut" }}
          className="text-text-muted text-sm sm:text-base font-light leading-loose max-w-xl tracking-wide mt-6 border-t border-border/30 pt-8"
        >
          Not every solution needs to be complex. The best systems are the ones people barely notice — because they work, quietly, exactly as intended.
        </motion.p>

        {/* Handwritten signature note */}
        <motion.div
          initial={{ opacity: 0, rotate: -6 }}
          whileInView={{ opacity: 1, rotate: -2 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-handwritten text-accent/50 text-2xl sm:text-3xl self-start select-none pointer-events-none"
        >
          ~ simplicity is a choice.
        </motion.div>
      </motion.div>
    </section>
  );
}
