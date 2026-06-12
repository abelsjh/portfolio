"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValue } from "framer-motion";

// Simulated Masking Tape Component
function Tape({ className = "", rotate = 12 }: { className?: string; rotate?: number }) {
  return (
    <div
      className={`absolute bg-[#E8E0D5]/60 border-l border-r border-[#2C241F]/5 w-8 h-3.5 backdrop-blur-[1px] shadow-sm select-none pointer-events-none z-20 ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    />
  );
}

const DETAILED_YEARS = [
  {
    year: "2023",
    title: "The Beginning",
    label: "CURIOSITY & ACADEMIC BEGINNINGS",
    description:
      "Exploring logic, variables, and algorithm structures through my first academic experiences.",
    handwriting: "~ belajar logika dasar",
  },
  {
    year: "2024",
    title: "Building Structure",
    label: "LEARN & EXPLORE",
    description:
      "Structuring relational database schemas and studying systems design blueprints.",
    handwriting: "~ oop & database",
  },
  {
    year: "2025",
    title: "Real-World Systems",
    label: "SYSTEMS BUILDER",
    description:
      "Deploying active operational attendance workflows and digital office integration lines.",
    handwriting: "~ presensi online & GPS",
  },
  {
    year: "2026",
    title: "Creative Independence",
    label: "BESPOKE SYSTEMS",
    description:
      "Actively building freelance systems while exploring immersive interfaces, thoughtful interactions, and operational experiences through real business workflows.",
    handwriting: "~ POS sparepart workflow",
  },
];

// Organic Wandering Route SVG Path (viewBox: 0 0 100 100)
// Weaves through 75% (2023), 25% (2024), 75% (2025), and 50% (2026)
const WANDERING_PATH_D =
  "M 50 0 C 55 8, 75 12, 75 22 C 75 30, 25 35, 25 45 C 25 55, 75 60, 75 70 C 75 78, 50 82, 50 88 L 50 100";

export default function DetailedJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check mobile on mount & resize
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Track scroll progress of the entire container for left column & SVG path
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Animate the trimpath SVG line
  const clipH = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Left column opacity & parallax shift
  const leftY = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const leftOpacity = useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0.5]);

  return (
    <section
      id="detailed-journey"
      ref={containerRef}
      className="relative select-none overflow-hidden"
      style={{ backgroundColor: "#F7F1E8" }}
    >
      {/* Subtle division border */}
      <div className="w-full h-[1px] bg-border/20" />

      {/* Main Grid Container */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-16 items-start py-32 px-6 md:px-12 relative">
        
        {/* ── LEFT COLUMN: STICKY NARRATIVE ─────────────────────────────── */}
        <div className="lg:sticky lg:top-24 h-fit z-20">
          <motion.div
            style={{ y: leftY, opacity: leftOpacity }}
            className="relative flex flex-col gap-6"
          >
            {/* Ambient bronze glow */}
            <div
              className="absolute -left-12 -top-12 w-64 h-64 rounded-full blur-[80px] pointer-events-none"
              style={{ backgroundColor: "rgba(169,120,72,0.03)" }}
            />

            <div className="flex gap-5 items-stretch relative z-10">
              {/* Graphic line decorator */}
              <div className="hidden sm:flex flex-col items-center w-4 select-none pointer-events-none">
                <div className="w-[1px] h-10 bg-border/40" />
                <div
                  className="w-2.5 h-2.5 rounded-full my-2.5 bg-accent"
                  style={{ boxShadow: "0 0 10px rgba(169,120,72,0.3)" }}
                />
                <div className="w-[1px] flex-grow bg-border/15" />
              </div>

              {/* Narratives */}
              <div className="flex flex-col gap-5 flex-grow">
                <div className="flex flex-col gap-2">
                  <span className="text-xs uppercase tracking-[0.25em] font-bold text-accent">
                    MY EVOLUTION
                  </span>
                  <h3 className="serif-font text-4xl sm:text-5xl font-light leading-[1.08] tracking-tight text-text">
                    Learning through
                    <br />
                    <span className="italic font-normal text-accent">real-world</span>
                    <br />
                    experience.
                  </h3>
                </div>

                <motion.div
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
                  className="handwritten text-xl select-none pointer-events-none self-start text-accent/60"
                  style={{ transform: "rotate(-4deg)" }}
                >
                  ~ becoming through experience
                </motion.div>

                <p className="text-sm leading-loose font-light tracking-wide max-w-xs text-text-muted">
                  Every year became part of how I understand systems, interaction, and thoughtful experiences.
                </p>

                {/* Scroll Indicator Prompt */}
                <div className="hidden lg:flex flex-col gap-2 mt-6 text-text-muted/40">
                  <span className="font-mono text-[9px] uppercase tracking-[0.25em] font-bold">
                    TRACE THE PATH
                  </span>
                  <motion.div
                    animate={{ y: [0, 6, 0], opacity: [0.35, 1, 0.35] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                    className="text-sm font-bold text-accent"
                  >
                    ↓
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── RIGHT COLUMN: CINEMATIC MEMORY ARCHIVE (Desktop) ─────────── */}
        <div className="hidden lg:block relative w-full h-full z-10">
          
          {/* Wandering Path SVG Layer */}
          <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
              <defs>
                <filter id="detailed-path-glow" x="-30%" y="-5%" width="160%" height="110%">
                  <feGaussianBlur stdDeviation="3.5" result="blur" />
                </filter>
                <clipPath id="detailed-reveal-clip">
                  <motion.rect x="0" y="0" width="100" height={clipH} />
                </clipPath>
              </defs>
              
              {/* Backing track (dormant/light gray) */}
              <path
                d={WANDERING_PATH_D}
                fill="none"
                stroke="#D8D0C5"
                strokeWidth="1.2"
                strokeLinecap="round"
                opacity="0.3"
                vectorEffect="non-scaling-stroke"
              />
              {/* Active path glow */}
              <path
                d={WANDERING_PATH_D}
                fill="none"
                stroke="#E5B180"
                strokeWidth="6"
                strokeLinecap="round"
                opacity="0.18"
                filter="url(#detailed-path-glow)"
                clipPath="url(#detailed-reveal-clip)"
                vectorEffect="non-scaling-stroke"
              />
              {/* Active path line */}
              <path
                d={WANDERING_PATH_D}
                fill="none"
                stroke="#A97848"
                strokeWidth="1.5"
                strokeLinecap="round"
                clipPath="url(#detailed-reveal-clip)"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>

          {/* Floating Scenes */}
          <div className="flex flex-col w-full relative">
            
            {/* ── 2023: THE BEGINNING (Scattered diagonal) ── */}
            <YearSceneWrapper year="2023" heightClass="h-[120vh]">
              {/* Giant background watermark */}
              <div className="absolute left-[10%] top-[10%] text-[14vw] font-serif italic text-accent/[0.025] select-none pointer-events-none z-0">
                BEGINNING
              </div>

              {/* Floating Year label */}
              <YearParallax scrollOffset={20} className="absolute left-[12%] top-[8%] z-10">
                <span className="text-5xl font-serif text-accent/25 font-light select-none">
                  2023
                </span>
              </YearParallax>

              {/* Floating Title */}
              <YearParallax scrollOffset={25} className="absolute left-[12%] top-[18%] z-10">
                <h4 className="serif-font text-4xl font-light text-text">The Beginning</h4>
              </YearParallax>

              {/* Floating Description */}
              <YearParallax scrollOffset={30} className="absolute left-[12%] top-[28%] max-w-[250px] z-10">
                <p className="text-text-muted text-xs leading-loose font-light">
                  Exploring logic, variables, and algorithm structures through my first academic experiences.
                </p>
              </YearParallax>

              {/* Floating Terminal Code box (drifts faster, faded bottom) */}
              <YearParallax scrollOffset={55} className="absolute right-[8%] top-[12%] w-[310px] z-10">
                <div 
                  className="bg-[#1C1613]/90 backdrop-blur-[2px] text-[#E8E0D5] p-3 shadow-lg border border-white/5 font-mono text-[9px] flex flex-col gap-1.5 select-text rotate-[-2deg]"
                  style={{ maskImage: "linear-gradient(to bottom, white 75%, transparent 100%)", WebkitMaskImage: "linear-gradient(to bottom, white 75%, transparent 100%)" }}
                >
                  <div className="flex items-center gap-1.5 border-b border-white/5 pb-1 select-none">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500/80" />
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-500/80" />
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500/80" />
                    <span className="text-[7px] text-white/40 ml-1.5 uppercase tracking-wider">shell - python</span>
                  </div>
                  <div>
                    <span className="text-accent2">&gt;&gt;&gt;</span> <span className="text-white">def</span> <span className="text-accent">learn_logic</span>():<br />
                    <span className="text-white/40">&nbsp;...</span>&nbsp;&nbsp;&nbsp;print(<span className="text-accent2">&quot;Hello, Algorithms!&quot;</span>)<br />
                    <span className="text-white/40">&nbsp;...</span><br />
                    <span className="text-accent2">&gt;&gt;&gt;</span> learn_logic()<br />
                    <span className="text-white/70">Hello, Algorithms!</span>
                  </div>
                </div>
              </YearParallax>

              {/* Floating Notebook sketch (drifts slower, paper look) */}
              <YearParallax scrollOffset={-35} className="absolute right-[12%] top-[48%] w-[270px] z-10">
                <div className="bg-[#FAF6EF] p-4 shadow-md border-t border-accent/20 rotate-[3deg] relative flex flex-col gap-2.5">
                  <span className="text-[7px] font-mono tracking-wider text-accent uppercase font-bold border-b border-border/20 pb-0.5">
                    LOGIC SKETCH
                  </span>
                  <div className="h-16 relative flex items-center justify-center border border-dashed border-border/30 rounded bg-bg/15">
                    <svg className="w-36 h-10" viewBox="0 0 160 50">
                      <rect x="5" y="15" width="40" height="20" rx="2" fill="none" stroke="#A97848" strokeWidth="0.8" />
                      <text x="25" y="27" fontSize="5.5" fontFamily="monospace" textAnchor="middle" fill="#2C241F">Start</text>
                      
                      <path d="M 45 25 L 65 25" fill="none" stroke="#A97848" strokeWidth="0.8" />
                      <polygon points="65,25 61,22 61,28" fill="#A97848" />

                      <polygon points="85,10 105,25 85,40 65,25" fill="none" stroke="#A97848" strokeWidth="0.8" />
                      <text x="85" y="27" fontSize="5" fontFamily="monospace" textAnchor="middle" fill="#2C241F">Loop?</text>
                      
                      <path d="M 105 25 L 125 25" fill="none" stroke="#A97848" strokeWidth="0.8" />
                      <polygon points="125,25 121,22 121,28" fill="#A97848" />
                      
                      <rect x="125" y="15" width="30" height="20" rx="2" fill="none" stroke="#A97848" strokeWidth="0.8" />
                      <text x="140" y="27" fontSize="5.5" fontFamily="monospace" textAnchor="middle" fill="#2C241F">Code</text>
                    </svg>
                  </div>
                </div>
              </YearParallax>

              {/* Floating Handwritten note */}
              <YearParallax scrollOffset={15} className="absolute left-[20%] top-[72%] z-20">
                <span className="handwritten text-2xl text-accent/65 select-none rotate-[-4deg] block">
                  ~ belajar logika dasar
                </span>
              </YearParallax>
            </YearSceneWrapper>

            {/* ── 2024: BUILDING STRUCTURE (Slightly grid structured) ── */}
            <YearSceneWrapper year="2024" heightClass="h-[120vh]">
              {/* Giant background watermark */}
              <div className="absolute right-[8%] top-[12%] text-[10vw] font-serif uppercase tracking-widest text-accent/[0.02] select-none pointer-events-none z-0">
                STRUCTURE
              </div>

              {/* Floating Year label */}
              <YearParallax scrollOffset={20} className="absolute right-[15%] top-[8%] z-10">
                <span className="text-5xl font-serif text-accent/25 font-light select-none">
                  2024
                </span>
              </YearParallax>

              {/* Floating Title */}
              <YearParallax scrollOffset={25} className="absolute right-[15%] top-[18%] z-10 text-right">
                <h4 className="serif-font text-4xl font-light text-text">Building Structure</h4>
              </YearParallax>

              {/* Floating Description */}
              <YearParallax scrollOffset={30} className="absolute right-[15%] top-[28%] max-w-[250px] z-10 text-right">
                <p className="text-text-muted text-xs leading-loose font-light">
                  Structuring relational database schemas and studying systems design blueprints.
                </p>
              </YearParallax>

              {/* Floating Database Schema (drifts slower, ripped paper look) */}
              <YearParallax scrollOffset={-45} className="absolute left-[8%] top-[14%] w-[310px] z-10">
                <div className="bg-[#FCF9F3] p-4 shadow-md border-b border-accent/15 rotate-[-2deg] relative flex flex-col gap-2.5 font-mono text-[9px]">
                  <Tape className="-top-3 left-8" rotate={-6} />
                  <div className="flex items-center justify-between border-b border-border/20 pb-1.5">
                    <span className="text-[7.5px] font-bold text-accent uppercase tracking-widest">SCHEMA MODEL // 1:N</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3.5 relative">
                    <div className="absolute top-1/2 left-1/3 right-1/3 h-[1px] border-b border-dashed border-accent/30 z-0 select-none pointer-events-none" />
                    
                    <div className="bg-bg/25 p-2 rounded border border-border/30 z-10">
                      <div className="font-bold text-[8px] text-text border-b border-border/15 pb-0.5 mb-1">
                        users
                      </div>
                      <div className="text-[7px] text-text-muted flex flex-col gap-0.5">
                        <div>id INT (PK)</div>
                        <div>email VARCHAR</div>
                      </div>
                    </div>

                    <div className="bg-bg/25 p-2 rounded border border-border/30 z-10">
                      <div className="font-bold text-[8px] text-text border-b border-border/15 pb-0.5 mb-1">
                        projects
                      </div>
                      <div className="text-[7px] text-text-muted flex flex-col gap-0.5">
                        <div>id INT (PK)</div>
                        <div>user_id INT (FK)</div>
                      </div>
                    </div>
                  </div>
                </div>
              </YearParallax>

              {/* Floating OOP Class Blueprint card (drifts faster, overlaps slightly) */}
              <YearParallax scrollOffset={45} className="absolute left-[14%] top-[48%] w-[250px] z-15">
                <div className="bg-[#F4EFE6] border-t border-accent/30 shadow-md p-3.5 rotate-[3deg] relative font-mono text-[8.5px] text-text-muted flex flex-col gap-2">
                  <Tape className="-top-3.5 right-8" rotate={10} />
                  <span className="text-[7px] font-bold text-accent uppercase tracking-wider">OOP CLASS</span>
                  <div className="border border-border/30 rounded p-2 bg-bg/30">
                    <span className="text-accent">class</span> <span className="text-text font-bold">System</span> &#123;<br />
                    &nbsp;&nbsp;public <span className="text-accent2">execute</span>() &#123;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;return &quot;active&quot;;<br />
                    &nbsp;&nbsp;&#125;<br />
                    &#125;
                  </div>
                </div>
              </YearParallax>

              {/* Floating Handwritten note */}
              <YearParallax scrollOffset={15} className="absolute right-[22%] top-[72%] z-20">
                <span className="handwritten text-2xl text-accent/65 select-none rotate-[2deg] block">
                  ~ oop & database
                </span>
              </YearParallax>
            </YearSceneWrapper>

            {/* ── 2025: REAL-WORLD SYSTEMS (Horizontal workflow flow) ── */}
            <YearSceneWrapper year="2025" heightClass="h-[150vh]">
              {/* Giant background watermark */}
              <div className="absolute left-[5%] top-[12%] text-[7.5vw] font-serif uppercase tracking-wider text-accent/[0.025] select-none pointer-events-none z-0">
                REAL-WORLD SYSTEMS
              </div>

              {/* Floating Year label */}
              <YearParallax scrollOffset={20} className="absolute left-[10%] top-[8%] z-10">
                <span className="text-5xl font-serif text-accent/25 font-light select-none">
                  2025
                </span>
              </YearParallax>

              {/* Floating Title */}
              <YearParallax scrollOffset={25} className="absolute left-[10%] top-[18%] z-10">
                <h4 className="serif-font text-4xl font-light text-text">Real-World Systems</h4>
              </YearParallax>

              {/* Floating Description */}
              <YearParallax scrollOffset={30} className="absolute left-[10%] top-[28%] max-w-[250px] z-10">
                <p className="text-text-muted text-xs leading-loose font-light">
                  Deploying active operational attendance workflows and digital office integration lines.
                </p>
              </YearParallax>

              {/* Floating Horizontal validation chips flow (drifts faster) */}
              <YearParallax scrollOffset={65} className="absolute right-[6%] top-[14%] w-[340px] z-10">
                <div className="flex flex-col gap-2.5 font-mono text-[9px]">
                  <span className="text-[7.5px] font-bold text-accent uppercase tracking-widest border-b border-border/15 pb-1">
                    EMPLOYEE CHECK-IN FLOW
                  </span>
                  
                  {/* Floating status chips connected by tiny dotted lines */}
                  <div className="flex items-center justify-between gap-1 p-2 rounded bg-bg/25 border border-border/30 backdrop-blur-[1px]">
                    <div className="px-2 py-0.5 bg-[#FAF6EF] shadow-sm rounded text-text-muted">check-in</div>
                    <div className="text-border/60">&rarr;</div>
                    <div className="px-2 py-0.5 bg-accent/15 rounded text-accent font-bold">validation</div>
                    <div className="text-border/60">&rarr;</div>
                    <div className="px-2 py-0.5 bg-accent2/15 rounded text-accent2 font-bold">approved</div>
                  </div>
                </div>
              </YearParallax>

              {/* Floating GPS HUD Geofence zones (drifts slower) */}
              <YearParallax scrollOffset={-25} className="absolute right-[12%] top-[45%] w-[290px] z-10">
                <div className="bg-white/40 backdrop-blur-[2px] p-4 shadow-md border border-border/30 rounded-lg rotate-[2deg] flex flex-col gap-3 font-mono">
                  <Tape className="-top-3 left-10" rotate={-8} />
                  <div className="flex items-center gap-3">
                    {/* Faint technical geofence circle */}
                    <div className="relative w-10 h-10 rounded-full border border-dashed border-accent flex items-center justify-center bg-accent/[0.01] flex-shrink-0">
                      <span className="w-1 h-1 rounded-full bg-accent animate-ping absolute" />
                      <span className="w-1.5 h-1.5 rounded-full bg-accent relative z-10" />
                    </div>
                    <div className="text-[7.5px] text-text-muted flex flex-col gap-0.5">
                      <div className="font-bold text-text">GPS ZONE RADAR</div>
                      <div>Accuracy: 3.8m</div>
                      <div className="text-accent2 font-bold mt-0.5">✓ Inside geofence boundary</div>
                    </div>
                  </div>
                </div>
              </YearParallax>

              {/* Floating Handwritten note */}
              <YearParallax scrollOffset={15} className="absolute left-[18%] top-[70%] z-20">
                <span className="handwritten text-2xl text-accent/65 select-none rotate-[-3deg] block">
                  ~ presensi online & GPS
                </span>
              </YearParallax>
            </YearSceneWrapper>

            {/* ── 2026: CREATIVE INDEPENDENCE (Climax centered minimalist scene) ── */}
            <YearSceneWrapper year="2026" heightClass="h-[170vh]" isClimax={true}>
              {/* Giant background watermark */}
              <div className="absolute left-1/2 -translate-x-1/2 top-[8%] text-[8vw] font-serif text-accent/[0.03] select-none pointer-events-none z-0 text-center w-full uppercase tracking-widest">
                INDEPENDENCE
              </div>

              {/* Centered Large Year label */}
              <YearParallax scrollOffset={20} className="absolute left-1/2 -translate-x-1/2 top-[16%] z-10 text-center">
                <span className="text-7xl font-serif text-accent/25 font-light select-none">
                  2026
                </span>
              </YearParallax>

              {/* POS Spareparts Invoice centerpiece layout (drifts faster) */}
              <YearParallax scrollOffset={75} className="absolute left-1/2 -translate-x-1/2 top-[24%] w-[380px] sm:w-[410px] z-10">
                <div className="bg-[#FCF9F3] p-5 rounded border border-border/35 shadow-xl rotate-[-1deg] relative font-mono text-[9px] select-text">
                  <Tape className="-top-3 right-12" rotate={8} />
                  
                  {/* Invoice Header */}
                  <div className="flex justify-between items-start border-b border-border/30 pb-3 select-none">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[9.5px] font-bold text-text uppercase tracking-widest">INV-2026-892</span>
                      <span className="text-[7.5px] text-text-muted">Stock Checkout Invoice</span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-accent2/10 border border-accent2/25 text-accent2 font-bold text-[7px] tracking-wide">
                      PAID
                    </span>
                  </div>

                  {/* Line Items */}
                  <div className="flex flex-col gap-2 mt-3 select-none">
                    <span className="text-[7px] text-text-muted/50 uppercase font-bold tracking-widest border-b border-border/10 pb-0.5">
                      LINE ITEMS
                    </span>
                    <div className="flex justify-between items-center text-text">
                      <span>Clutch Plate Kit (x1)</span>
                      <span className="font-bold">Rp 450.000</span>
                    </div>
                    <div className="flex justify-between items-center text-text">
                      <span>Piston Ring Set (x2)</span>
                      <span className="font-bold">Rp 360.000</span>
                    </div>
                    <div className="flex justify-between items-center text-text">
                      <span>Engine Oil Shell 1L (x1)</span>
                      <span className="font-bold">Rp 95.000</span>
                    </div>
                  </div>

                  {/* Calculations */}
                  <div className="border-t border-dashed border-border/30 pt-3 flex flex-col gap-1.5 mt-3 select-none">
                    <div className="flex justify-between text-text-muted">
                      <span>Subtotal</span>
                      <span>Rp 905.000</span>
                    </div>
                    <div className="flex justify-between text-text-muted">
                      <span>Tax (PPN 11%)</span>
                      <span>Rp 99.550</span>
                    </div>
                    <div className="flex justify-between text-text font-bold text-[11px] border-t border-border/20 pt-1.5 mt-0.5">
                      <span>TOTAL PAID</span>
                      <span className="text-accent">Rp 1.004.550</span>
                    </div>
                  </div>

                  {/* Drifting Layered Stock analytics overlay inside the receipt */}
                  <YearParallax scrollOffset={100} className="absolute -right-12 top-[120px] w-[140px] z-20 select-none">
                    <div className="bg-[#F0EADF] p-3 shadow-md border border-border/40 rotate-[4deg] flex flex-col gap-1 font-mono text-[7px]">
                      <span className="font-bold text-accent">STOCK REPORT</span>
                      <div className="text-text-muted">
                        Piston Ring: <span className="text-red-500/80 font-bold">Low (2)</span>
                      </div>
                    </div>
                  </YearParallax>
                </div>
              </YearParallax>

              {/* Floating Title (centered below) */}
              <YearParallax scrollOffset={35} className="absolute left-1/2 -translate-x-1/2 top-[66%] w-full text-center z-10">
                <h4 className="serif-font text-3xl font-light text-text">Creative Independence</h4>
              </YearParallax>

              {/* Floating Handwritten note */}
              <YearParallax scrollOffset={15} className="absolute left-1/2 -translate-x-1/2 top-[76%] z-20 text-center w-full">
                <span className="handwritten text-2xl text-accent/65 select-none rotate-[-1deg] inline-block">
                  ~ POS sparepart workflow
                </span>
              </YearParallax>
            </YearSceneWrapper>

          </div>
        </div>

        {/* ── MOBILE JOURNAL LAYOUT (documentary mode) ──────────────────── */}
        <div className="lg:hidden flex flex-col gap-10 pl-6 border-l border-border/20 mt-8 w-full z-10 relative">
          
          {/* Mobile active line path */}
          <div className="absolute left-[1px] top-0 bottom-0 w-[1px] bg-border/40 pointer-events-none">
            <motion.div
              style={{ scaleY: scrollYProgress, transformOrigin: "top" }}
              className="absolute top-0 left-0 w-full h-full bg-accent"
            />
          </div>

          {DETAILED_YEARS.map((ms, idx) => (
            <div key={ms.year} className="relative flex flex-col gap-4">
              
              {/* Indicator Node */}
              <div
                className="absolute z-10 w-2.5 h-2.5 rounded-full border border-accent bg-text"
                style={{ left: "-31px", top: "18px" }}
              />

              <div
                className="rounded-2xl p-6 flex flex-col gap-4 text-left border border-border/20 shadow-sm"
                style={{ backgroundColor: "rgba(247,241,232,0.6)" }}
              >
                {/* Year Label */}
                <div className="flex items-baseline gap-2 border-b border-border/20 pb-2">
                  <span className="text-2xl serif-font font-bold text-accent">{ms.year}</span>
                  <span className="text-[8px] font-mono uppercase tracking-wider text-text-muted/65">
                    {ms.label}
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  <h4 className="text-base font-bold text-text">{ms.title}</h4>
                  <p className="text-xs text-text-muted leading-relaxed font-light">{ms.description}</p>
                </div>

                <span className="handwritten text-lg -rotate-1 text-accent/65 self-start">
                  {ms.handwriting}
                </span>

                {/* Simplified Mobile Visual Displays */}
                {idx === 0 && (
                  <div className="bg-[#1C1613] text-[#E8E0D5] p-3 rounded-lg border border-text/10 font-mono text-[8px] mt-2">
                    <div>
                      <span className="text-accent2">&gt;&gt;&gt;</span> print(<span className="text-accent2">&quot;Hello, Basic Algorithms!&quot;</span>)<br />
                      <span className="text-white/70">Hello, Basic Algorithms!</span>
                    </div>
                  </div>
                )}
                {idx === 1 && (
                  <div className="bg-bg/45 p-3 rounded border border-border/50 font-mono text-[8px] text-text-muted mt-2 flex justify-between gap-1">
                    <div>
                      <div className="font-bold text-text mb-1">tbl_users</div>
                      <div>id INT (PK)</div>
                      <div>email VARCHAR</div>
                    </div>
                    <div className="text-border">➔</div>
                    <div>
                      <div className="font-bold text-text mb-1">tbl_projects</div>
                      <div>id INT (PK)</div>
                      <div>user_id INT (FK)</div>
                    </div>
                  </div>
                )}
                {idx === 2 && (
                  <div className="w-full py-2 rounded border border-accent2/60 bg-accent2/[0.02] text-accent2 font-mono font-bold text-[8px] text-center tracking-widest mt-2">
                    ✓ GPS LOCATION VERIFIED (Inside Zone)
                  </div>
                )}
                {idx === 3 && (
                  <div className="bg-[#FAF6EF] p-4 rounded-xl border border-border/40 font-mono text-[8px] text-text-muted mt-2 flex flex-col gap-1.5">
                    <div className="flex justify-between border-b border-border/20 pb-1 mb-1 font-bold text-text">
                      <span>INV-2026-892</span>
                      <span className="text-accent">PAID</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Invoice Transaction</span>
                      <span className="font-bold text-text">Rp 1.004.550</span>
                    </div>
                  </div>
                )}

              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

// ─── CONTEXT SYSTEM: PROVIDE SCROLLY PROGRESS TO CHILDREN ────────────────
import React, { createContext, useContext } from "react";
const ScrollContext = createContext<any>(null);

// ─── YEAR SCENE SCROLL-TRACKED CONTAINER WRAPPER ────────────────────────
function YearSceneWrapper({
  year,
  heightClass = "h-[130vh]",
  isClimax = false,
  children,
}: {
  year: string;
  heightClass?: string;
  isClimax?: boolean;
  children: React.ReactNode;
}) {
  const sceneRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress of this specific scene
  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start end", "end start"],
  });

  // Scene transition drift & fade
  const opacity = useTransform(scrollYProgress, [0, 0.22, 0.78, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.22, 0.78, 1], [40, 0, 0, -40]);

  return (
    <ScrollContext.Provider value={scrollYProgress}>
      <motion.div
        ref={sceneRef}
        style={{ opacity, y }}
        className={`relative w-full overflow-hidden ${heightClass} flex flex-col justify-center`}
      >
        {/* Background climax lighting decoration */}
        {isClimax && (
          <div
            className="absolute inset-0 pointer-events-none select-none z-0"
            style={{
              background: "radial-gradient(circle at center, rgba(169, 120, 72, 0.05) 0%, transparent 60%)",
            }}
          />
        )}
        {children}
      </motion.div>
    </ScrollContext.Provider>
  );
}

// ─── PARALLAX TRANSLATOR ELEMENT ────────────────────────────────────────
function YearParallax({
  scrollOffset,
  className,
  children,
}: {
  scrollOffset: number;
  className?: string;
  children: React.ReactNode;
}) {
  const scrollYProgress = useContext(ScrollContext);

  const fallback = useMotionValue(0.5);

  // Parallax transform (moves y offset dynamically)
  const yOffset = useTransform(
    scrollYProgress || fallback, 
    [0, 1], 
    [scrollOffset, -scrollOffset]
  );

  return (
    <motion.div style={{ y: yOffset }} className={className}>
      {children}
    </motion.div>
  );
}
