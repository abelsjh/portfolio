"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useTransform, useMotionValue, AnimatePresence } from "framer-motion";

// ─── VARIANT DEFINITIONS ──────────────────────────────────────────────────────
const cardVariants = {
  inactive: {
    opacity: 0.35,
    scale: 0.965,
    borderColor: "rgba(216, 208, 197, 0.15)",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.01)",
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
  active: {
    opacity: 1.0,
    scale: 1.0,
    borderColor: "rgba(44, 36, 31, 0.55)",
    boxShadow: "0 20px 60px rgba(44, 36, 31, 0.06)",
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
  past: {
    opacity: 0.65,
    scale: 0.98,
    borderColor: "rgba(216, 208, 197, 0.35)",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.02)",
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
} as const;

const nodeVariants = {
  inactive: {
    scale: 1.0,
    borderColor: "rgba(216, 208, 197, 0.5)",
    backgroundColor: "#F7F1E8",
    color: "#7A6F67",
    boxShadow: "0 2px 6px rgba(0,0,0,0.02)",
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
  active: {
    scale: 1.0,
    borderColor: "#2C241F",
    backgroundColor: "#2C241F",
    color: "#F7F1E8",
    boxShadow: "0 4px 16px rgba(44,36,31,0.18)",
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
  past: {
    scale: 1.0,
    borderColor: "#2C241F",
    backgroundColor: "#2C241F",
    color: "#F7F1E8",
    boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
} as const;

const handVariants = {
  inactive: {
    opacity: 0,
    y: 8,
    rotate: -12,
    transition: { duration: 0.45, ease: "easeOut" },
  },
  active: {
    opacity: 1,
    y: 0,
    rotate: -4,
    transition: { delay: 0.15, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
  past: {
    opacity: 0.7,
    y: 0,
    rotate: -4,
    transition: { duration: 0.45, ease: "easeOut" },
  },
} as const;

// ─── MILESTONE DATA ───────────────────────────────────────────────────────────
// nodeX must match the path's x-value at that milestone
// nodeY ≈ cardTop + 28 so the node overlaps the card's top-left/right corner
const MILESTONES = [
  {
    year: "2023",
    index: "01",
    chapterLabel: "CURIOSITY & ACADEMIC BEGINNINGS",
    title: "Learning Foundations",
    tags: ["logic & algorithms", "operating systems", "HTML/CSS/JS", "programming basics"],
    handwriting: "~ belajar logika dasar",
    noteLabel: "STUDY NOTE",
    note: "First compiler setup. Learned to think in structures and loops.",
    // path curves RIGHT to 72%
    pathX: 72,      // % in SVG viewBox (0-100)
    nodeY: 208,     // px; cardTop + ~28
    cardSide: "right" as const,
    cardTop: 180,
  },
  {
    year: "2024",
    index: "02",
    chapterLabel: "LEARN & EXPLORE",
    title: "Academic Growth",
    tags: ["relational databases", "OOP design", "system architecture", "software blueprints"],
    handwriting: "~ oop & database",
    noteLabel: "ARCHITECTURE NOTE",
    note: "SOLID principles assessment. Designing normalised schema blueprints.",
    // path curves LEFT to 28%
    pathX: 28,
    nodeY: 568,
    cardSide: "left" as const,
    cardTop: 540,
  },
  {
    year: "2025",
    index: "03",
    chapterLabel: "SYSTEMS BUILDER",
    title: "Real Project Experience",
    tags: ["attendance system", "e-office", "GPS tracking", "approval workflows"],
    handwriting: "~ presensi & e-office",
    noteLabel: "DEPLOYMENT NOTE",
    note: "GPS-based check-in live. E-office approval flow shipped to production.",
    pathX: 72,
    nodeY: 938,
    cardSide: "right" as const,
    cardTop: 910,
  },
  {
    year: "2026",
    index: "04",
    chapterLabel: "BESPOKE SYSTEMS",
    title: "Freelance Exploration",
    tags: ["client dashboards", "cinematic interfaces", "performance tuning", "interactive web"],
    handwriting: "~ solving client problems",
    noteLabel: "EXPLORATION NOTE",
    note: "Designing clean galleries. Interactive custom motion layout transitions.",
    pathX: 28,
    nodeY: 1298,
    cardSide: "left" as const,
    cardTop: 1270,
  },
];

// SVG path — curves match each milestone's pathX and nodeY
// viewBox: 0 0 100 1600
const PATH_D =
  "M 50 0 C 50 60, 72 100, 72 208 C 72 360, 28 450, 28 568 C 28 710, 72 810, 72 938 C 72 1090, 28 1200, 28 1298 C 28 1400, 50 1490, 50 1600";

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function Journey() {
  const detailedRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const scrollProgressVal = useMotionValue(0);

  useEffect(() => {
    const handleScroll = () => {
      const target = (canvasRef.current && canvasRef.current.offsetHeight > 0)
        ? canvasRef.current
        : detailedRef.current;
      if (!target) return;
      const rect = target.getBoundingClientRect();
      const viewportH = window.innerHeight;
      const entered = viewportH / 2 - rect.top;
      const p = Math.max(0, Math.min(1, entered / rect.height));
      scrollProgressVal.set(p);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [scrollProgressVal]);

  useEffect(() => {
    const unsub = scrollProgressVal.on("change", (val) => {
      if (val < 0.28) setActiveIndex(0);
      else if (val < 0.50) setActiveIndex(1);
      else if (val < 0.72) setActiveIndex(2);
      else setActiveIndex(3);
    });
    return unsub;
  }, [scrollProgressVal]);

  const clipH = useTransform(scrollProgressVal, [0, 0.95], [0, 1600]);
  const leftY = useTransform(scrollProgressVal, [0, 1], [0, -28]);
  const leftOpacity = useTransform(scrollProgressVal, [0, 0.1, 0.9, 1], [0, 1, 1, 0.75]);

  return (
    <section
      id="journey"
      className="relative select-none"
      style={{ backgroundColor: "#F7F1E8" }}
    >
      <div className="py-24 px-6 md:px-12 border-b border-[#D8D0C5]/20">
        <div
          ref={detailedRef}
          className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-20 items-start"
        >

          {/* ── LEFT COLUMN: STICKY NARRATIVE ─────────────────────────────── */}
          <div
            className="lg:sticky lg:top-28 h-fit z-10"
          >
            <motion.div
              style={{ y: isMobile ? 0 : leftY, opacity: isMobile ? 1 : leftOpacity }}
              className="relative flex flex-col gap-6"
            >
              <div className="absolute -left-12 -top-12 w-64 h-64 rounded-full blur-[80px] pointer-events-none"
                style={{ backgroundColor: "rgba(169,120,72,0.05)" }} />

              <div className="flex gap-5 items-stretch relative z-10">
                <div className="hidden sm:flex flex-col items-center w-4 select-none pointer-events-none">
                  <div className="w-[1px] h-10" style={{ backgroundColor: "rgba(216,208,197,0.5)" }} />
                  <div className="w-2 h-2 rounded-full my-2"
                    style={{ backgroundColor: "#A97848", boxShadow: "0 0 8px rgba(169,120,72,0.4)" }} />
                  <div className="w-[1px] flex-grow" style={{ backgroundColor: "rgba(216,208,197,0.2)" }} />
                </div>

                <div className="flex flex-col gap-5 flex-1">
                  <div className="flex flex-col gap-2">
                    <span className="text-xs uppercase tracking-[0.22em] font-bold" style={{ color: "#A97848" }}>
                      MY EVOLUTION
                    </span>
                    <h3 className="serif-font text-4xl sm:text-5xl font-light leading-[1.06] tracking-tight"
                      style={{ color: "#2C241F" }}>
                      Learning through
                      <br />
                      <span className="italic font-normal" style={{ color: "#A97848" }}>real-world</span>
                      <br />
                      experience.
                    </h3>
                  </div>

                  <motion.div
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                    className="handwritten text-xl select-none pointer-events-none self-start"
                    style={{ color: "rgba(169,120,72,0.55)", transform: "rotate(-3deg)" }}
                  >
                    ~ becoming through experience
                  </motion.div>

                  <p className="text-sm leading-loose font-light tracking-wide max-w-xs"
                    style={{ color: "#7A6F67" }}>
                    Every year became part of how I understand systems, interaction, and thoughtful experiences.
                  </p>

                  <div className="hidden lg:flex flex-col gap-2 mt-6" style={{ color: "rgba(122,111,103,0.5)" }}>
                    <span className="font-mono text-[9px] uppercase tracking-[0.25em] font-bold">
                      TRACE THE PATH
                    </span>
                    <motion.div
                      animate={{ y: [0, 6, 0], opacity: [0.35, 1, 0.35] }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                      className="text-sm font-bold"
                      style={{ color: "#A97848" }}
                    >
                      ↓
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT COLUMN: TIMELINE ── */}
          <div className="relative w-full">
            {/* DESKTOP TIMELINE (Winding path) */}
            <div ref={canvasRef} className="hidden lg:block relative w-full h-[1600px] z-10">
              <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
                <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 1600">
                  <defs>
                    <filter id="path-glow-jny" x="-30%" y="-5%" width="160%" height="110%">
                      <feGaussianBlur stdDeviation="4" result="blur" />
                    </filter>
                    <clipPath id="reveal-clip-jny">
                      <motion.rect x="0" y="0" width="100" height={clipH} />
                    </clipPath>
                  </defs>
                  <path d={PATH_D} fill="none" stroke="#D8D0C5" strokeWidth="1.5"
                    strokeLinecap="round" opacity="0.4" vectorEffect="non-scaling-stroke" />
                  <path d={PATH_D} fill="none" stroke="#E5B180" strokeWidth="7"
                    strokeLinecap="round" opacity="0.25" filter="url(#path-glow-jny)"
                    clipPath="url(#reveal-clip-jny)" vectorEffect="non-scaling-stroke" />
                  <path d={PATH_D} fill="none" stroke="#A97848" strokeWidth="1.8"
                    strokeLinecap="round" clipPath="url(#reveal-clip-jny)"
                    vectorEffect="non-scaling-stroke" />
                </svg>
              </div>

              {MILESTONES.map((ms, i) => {
                const state: "inactive" | "active" | "past" =
                  activeIndex === i ? "active"
                    : activeIndex > i ? "past"
                    : "inactive";

                const isRight = ms.cardSide === "right";

                const cardStyle = isRight
                  ? { top: `${ms.cardTop}px`, left: `${ms.pathX - 48}%`, width: "48%" }
                  : { top: `${ms.cardTop}px`, left: `${ms.pathX}%`, width: "48%" };

                return (
                  <div key={ms.year}>
                    <motion.div
                      initial={{ opacity: 0, y: 28 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute"
                      style={cardStyle}
                    >
                      <motion.div
                        variants={cardVariants}
                        animate={state}
                        style={{
                          rotate: isRight ? -0.7 : 0.7,
                          borderRadius: "16px",
                          border: "1px solid rgba(216,208,197,0.15)",
                          backgroundColor: "#F7F1E8",
                          padding: "20px",
                          position: "relative",
                        }}
                      >
                        {/* Elegant Card Body */}
                        <div className="flex flex-col gap-3">
                          <div className="flex justify-between items-baseline border-b border-[#2C241F]/10 pb-1.5">
                            <span className="font-serif text-lg font-bold text-[#A97848]">{ms.year}</span>
                            <span className="font-mono text-[9px] uppercase tracking-wider text-[#7A6F67]/60">
                              {ms.chapterLabel}
                            </span>
                          </div>
                          
                          <div className="flex flex-col gap-1.5">
                            <h4 className="text-sm font-bold text-[#2C241F]">{ms.title}</h4>
                            
                            {/* Tags */}
                            <div className="flex flex-wrap gap-1">
                              {ms.tags.map((tag) => (
                                <span key={tag} className="px-1.5 py-0.5 rounded bg-[#2C241F]/5 text-[#7A6F67] font-mono text-[8px]">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="bg-[#2C241F]/5 p-2.5 rounded border border-[#D8D0C5]/40 flex flex-col gap-1 text-[10px]">
                            <span className="font-mono text-[8px] uppercase font-bold text-[#A97848]">
                              {ms.noteLabel}
                            </span>
                            <p className="text-[#7A6F67] font-light leading-relaxed">
                              {ms.note}
                            </p>
                          </div>

                          <span className="handwritten text-sm text-[#A97848]/60 self-start mt-1">
                            {ms.handwriting}
                          </span>
                        </div>
                      </motion.div>
                    </motion.div>
                  </div>
                );
              })}
            </div>

            {/* MOBILE/TABLET TIMELINE (lg:hidden) */}
            <div className="lg:hidden relative w-full mt-6">
              {/* Splitscreen Grid */}
              <div className="grid grid-cols-[50px_1fr] md:grid-cols-[70px_1fr] gap-4 relative items-start">
                
                {/* Left HUD: Sticky Year & Progress Line */}
                <div className="sticky top-24 h-[60vh] flex flex-col items-center z-20">
                  {/* Vertical Track Line */}
                  <div className="absolute top-0 bottom-0 w-[1.5px] bg-[#D8D0C5]/40" />
                  
                  {/* Animated progress line */}
                  <motion.div
                    style={{ scaleY: scrollProgressVal, transformOrigin: "top" }}
                    className="absolute top-0 w-[1.5px] bg-[#A97848]"
                  />

                  {/* Floating Active Year HUD */}
                  <div className="sticky top-[25vh] flex flex-col items-center justify-center bg-[#FAF6EF]/95 backdrop-blur-[2px] py-3 px-2 rounded-full border border-[#D8D0C5]/40 shadow-sm z-30">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeIndex}
                        initial={{ opacity: 0, scale: 0.8, y: -8 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 8 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="flex flex-col items-center"
                      >
                        <span className="font-serif text-sm md:text-base font-bold text-[#A97848]">
                          '{MILESTONES[activeIndex].year.slice(2)}
                        </span>
                        <span className="font-mono text-[7px] md:text-[8px] text-[#7A6F67]/60 font-bold uppercase tracking-wider">
                          {MILESTONES[activeIndex].index}
                        </span>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>

                {/* Right Cards list */}
                <div className="flex flex-col gap-10 pb-6 pr-2">
                  {MILESTONES.map((ms, i) => {
                    const state: "inactive" | "active" | "past" =
                      activeIndex === i ? "active"
                        : activeIndex > i ? "past"
                        : "inactive";

                    return (
                      <motion.div
                        key={ms.year}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="w-full"
                      >
                        <motion.div
                          variants={cardVariants}
                          animate={state}
                          className="relative border rounded-2xl p-5 bg-[#FAF6EF]"
                          style={{
                            border: "1px solid rgba(216, 208, 197, 0.15)",
                          }}
                        >
                          {/* Elegant mobile card interior */}
                          <div className="flex flex-col gap-3 text-left">
                            <div className="flex justify-between items-baseline border-b border-[#2C241F]/10 pb-1.5">
                              <span className="font-serif text-base font-bold text-[#A97848]">{ms.year}</span>
                              <span className="font-mono text-[7px] md:text-[8px] uppercase tracking-wider text-[#7A6F67]/60">
                                {ms.chapterLabel}
                              </span>
                            </div>
                            
                            <div className="flex flex-col gap-1.5">
                              <h4 className="text-xs md:text-sm font-bold text-[#2C241F]">{ms.title}</h4>
                              
                              {/* Tags */}
                              <div className="flex flex-wrap gap-1">
                                {ms.tags.map((tag) => (
                                  <span key={tag} className="px-1.5 py-0.5 rounded bg-[#2C241F]/5 text-[#7A6F67] font-mono text-[7px]">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>

                            <div className="bg-[#2C241F]/5 p-2.5 rounded border border-[#D8D0C5]/40 flex flex-col gap-1 text-[9px] md:text-[10px]">
                              <span className="font-mono text-[7px] md:text-[8px] uppercase font-bold text-[#A97848]">
                                {ms.noteLabel}
                              </span>
                              <p className="text-[#7A6F67] font-light leading-relaxed">
                                {ms.note}
                              </p>
                            </div>

                            <span className="handwritten text-xs md:text-sm text-[#A97848]/60 self-start mt-0.5">
                              {ms.handwriting}
                            </span>
                          </div>
                        </motion.div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
