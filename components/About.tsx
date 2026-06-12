"use client";

import Image from "next/image";
import { motion } from "framer-motion";

// Tape Component
function Tape({ className = "", rotate = 12 }: { className?: string; rotate?: number }) {
  return (
    <div
      className={`absolute bg-[#E8E0D5]/50 border-l border-r border-[#2C241F]/5 w-8 h-3.5 backdrop-blur-[1px] shadow-sm select-none pointer-events-none z-20 ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    />
  );
}

interface SummaryYear {
  year: string;
  shortYear: string;
  label: string;
  description: string;
}

const summaryYears: SummaryYear[] = [
  {
    year: "2023",
    shortYear: "'23",
    label: "Beginning",
    description: "Entered Information Systems. Explored early web stacks, logic structures, and systems logic.",
  },
  {
    year: "2024",
    shortYear: "'24",
    label: "System Architecture",
    description: "Mastered OOP, database normalization schemes, and structured software engineering architecture.",
  },
  {
    year: "2025",
    shortYear: "'25",
    label: "E-Office & POS",
    description: "Designed operational POS platforms, custom attendance tracking workflows, and corporate systems.",
  },
  {
    year: "2026",
    shortYear: "'26",
    label: "Creative Freelance",
    description: "Active freelancing. Crafting bespoke web experiences, interactive UI systems, and dashboards.",
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="py-24 px-6 md:px-12 bg-bg relative overflow-hidden border-b border-border/30"
    >
      {/* Subtle background glow behind right timeline */}
      <div className="absolute right-0 top-1/4 w-[40vw] h-[40vw] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-16 lg:gap-24 items-start">
        
        {/* Left Side: About Me (Atmospheric & Authered Desk Collage) */}
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-3">
            <span className="text-[10px] uppercase tracking-[0.25em] text-accent font-bold">
              ABOUT ME
            </span>
            <h2 className="serif-font text-3xl sm:text-4.5xl text-text font-medium leading-[1.15] max-w-lg">
              I see systems not only as tools, but as experiences people interact with daily.
            </h2>
          </div>

          {/* Workspace Photo Collage */}
          <div className="relative w-full aspect-[4/3] max-w-md">
            <div className="relative w-full h-full rounded-[24px] overflow-hidden border border-border shadow-md bg-bg2">
              <Tape className="-top-2 left-20" rotate={-6} />
              <Image
                src="/cozy_desk.png"
                alt="Workspace desk setup"
                fill
                className="object-cover scale-105"
                sizes="(max-width: 768px) 100vw, 500px"
              />
            </div>
            {/* Taped value sticker */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, rotate: 8 }}
              whileInView={{ scale: 1, opacity: 1, rotate: -3 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
              className="absolute bottom-[-10px] right-[-8px] bg-[#F0EADF] px-4 py-3 rounded-lg shadow-md border border-border/60 z-20 max-w-[140px] text-center"
            >
              <Tape className="-top-2.5 left-12" rotate={10} />
              <span className="font-handwritten text-xl text-accent block leading-tight">
                intentional<br />meaningful<br />impactful
              </span>
            </motion.div>
          </div>

          <p className="text-text-muted text-sm sm:text-base leading-relaxed max-w-md">
            I craft digital platforms that operate quietly yet effectively. By combining logic and visual storytelling, I design workflows that simplify real daily challenges and elevate the user's emotional experience.
          </p>
        </div>

        {/* Right Side: Evolution Bridge (Mini Winding Timeline Path) */}
        <div className="flex flex-col gap-10 lg:pl-6 w-full">
          <div className="flex flex-col gap-3">
            <span className="text-[10px] uppercase tracking-[0.25em] text-accent font-bold">
              MY EVOLUTION
            </span>
            <h3 className="serif-font text-3xl sm:text-4.5xl text-text font-medium leading-[1.15]">
              Learning through real-world experience.
            </h3>
          </div>

          {/* DESKTOP: MINI WINDING PATH LAYOUT */}
          <div className="hidden md:block relative h-[600px] w-full mt-4 select-none">
            {/* Background Winding SVG track */}
            <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
              <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 600">
                {/* Winding Track */}
                <path
                  d="M 50 0 C 50 40, 65 40, 65 80 C 65 140, 35 140, 35 200 C 35 260, 65 260, 65 320 C 65 380, 45 380, 45 440 C 45 490, 50 510, 50 600"
                  fill="none"
                  stroke="var(--border)"
                  strokeWidth="1.5"
                  className="opacity-45"
                  vectorEffect="non-scaling-stroke"
                />
                {/* Active Winding Track on View */}
                <motion.path
                  d="M 50 0 C 50 40, 65 40, 65 80 C 65 140, 35 140, 35 200 C 35 260, 65 260, 65 320 C 65 380, 45 380, 45 440 C 45 490, 50 510, 50 600"
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="1.5"
                  vectorEffect="non-scaling-stroke"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
                />
              </svg>
            </div>

            {/* Year Node 2023 */}
            <div className="absolute left-[65%] top-[80px] -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, type: "spring" }}
                className="w-8 h-8 rounded-full border border-accent bg-bg flex items-center justify-center shadow-sm"
              >
                <span className="font-mono text-[9px] font-bold text-accent">{summaryYears[0].shortYear}</span>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="absolute right-[40%] top-[45px] w-[50%] text-right pr-4"
            >
              <h4 className="text-xs font-bold text-text uppercase tracking-wider mb-1">{summaryYears[0].label}</h4>
              <p className="text-[11px] sm:text-xs text-text-muted leading-relaxed">{summaryYears[0].description}</p>
            </motion.div>

            {/* Year Node 2024 */}
            <div className="absolute left-[35%] top-[200px] -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, type: "spring" }}
                className="w-8 h-8 rounded-full border border-accent bg-bg flex items-center justify-center shadow-sm"
              >
                <span className="font-mono text-[9px] font-bold text-accent">{summaryYears[1].shortYear}</span>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="absolute left-[40%] top-[165px] w-[50%] text-left pl-4"
            >
              <h4 className="text-xs font-bold text-text uppercase tracking-wider mb-1">{summaryYears[1].label}</h4>
              <p className="text-[11px] sm:text-xs text-text-muted leading-relaxed">{summaryYears[1].description}</p>
            </motion.div>

            {/* Year Node 2025 */}
            <div className="absolute left-[65%] top-[320px] -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, type: "spring" }}
                className="w-8 h-8 rounded-full border border-accent bg-bg flex items-center justify-center shadow-sm"
              >
                <span className="font-mono text-[9px] font-bold text-accent">{summaryYears[2].shortYear}</span>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="absolute right-[40%] top-[285px] w-[50%] text-right pr-4"
            >
              <h4 className="text-xs font-bold text-text uppercase tracking-wider mb-1">{summaryYears[2].label}</h4>
              <p className="text-[11px] sm:text-xs text-text-muted leading-relaxed">{summaryYears[2].description}</p>
            </motion.div>

            {/* Year Node 2026 */}
            <div className="absolute left-[45%] top-[440px] -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, type: "spring" }}
                className="w-8 h-8 rounded-full border border-accent bg-bg flex items-center justify-center shadow-sm"
              >
                <span className="font-mono text-[9px] font-bold text-accent">{summaryYears[3].shortYear}</span>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="absolute left-[50%] top-[405px] w-[45%] text-left pl-4"
            >
              <h4 className="text-xs font-bold text-text uppercase tracking-wider mb-1">{summaryYears[3].label}</h4>
              <p className="text-[11px] sm:text-xs text-text-muted leading-relaxed">{summaryYears[3].description}</p>
            </motion.div>
          </div>

          {/* MOBILE: SIMPLIFIED VERTICAL STACK */}
          <div className="md:hidden flex flex-col gap-8 relative pl-6 border-l border-border/80">
            {summaryYears.map((item, idx) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="relative flex flex-col gap-1.5 text-left"
              >
                {/* Node dot on mobile */}
                <div className="absolute left-[-30px] top-1.5 w-2 h-2 rounded-full bg-accent border border-bg z-10" />
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-xs text-accent font-bold">{item.year}</span>
                  <h4 className="text-xs font-bold text-text uppercase tracking-wider">
                    {item.label}
                  </h4>
                </div>
                <p className="text-xs text-text-muted leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

