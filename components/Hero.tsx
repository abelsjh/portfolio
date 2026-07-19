"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";

// Simulated Masking Tape Component
function Tape({ className = "", rotate = 12 }: { className?: string; rotate?: number }) {
  return (
    <div
      className={`absolute bg-[#E8E0D5]/40 border-l border-r border-[#2C241F]/5 w-10 h-3.5 backdrop-blur-[1px] shadow-sm select-none pointer-events-none z-20 ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    />
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Responsive state mount check
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Scroll Progress tracker
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Scroll Transforms (Desktop only)
  const scaleVal = useTransform(scrollYProgress, [0, 0.8], [1, 0.97]);
  const yTextVal = useTransform(scrollYProgress, [0, 0.8], [0, -60]);
  const xCollageLeftVal = useTransform(scrollYProgress, [0, 0.8], [0, -30]);
  const xCollageRightVal = useTransform(scrollYProgress, [0, 0.8], [0, 30]);
  const glowOpacityVal = useTransform(scrollYProgress, [0, 0.5], [0.15, 0]);

  const scale = isMobile ? 1 : scaleVal;
  const yText = isMobile ? 0 : yTextVal;
  const xCollageLeft = isMobile ? 0 : xCollageLeftVal;
  const xCollageRight = isMobile ? 0 : xCollageRightVal;
  const glowOpacity = isMobile ? 0.15 : glowOpacityVal;

  const imageUrl = "https://framerusercontent.com/images/U0ia6khKM9yh5yPOpfdCAWaQwE.jpg";
  const cardImageUrl = "/profile.jpg";

  // Mouse move parallax state (spring-dampened)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  // Different translation multipliers to create varied speeds (depth perception)
  const card1X = useTransform(springX, (x) => x * -25);
  const card1Y = useTransform(springY, (y) => y * -25);

  const card2X = useTransform(springX, (x) => x * -12);
  const card2Y = useTransform(springY, (y) => y * -12);

  const card3X = useTransform(springX, (x) => x * -35);
  const card3Y = useTransform(springY, (y) => y * -35);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    // Calculate normalized offset from center (-0.5 to 0.5)
    const x = (clientX / innerWidth) - 0.5;
    const y = (clientY / innerHeight) - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Animation config
  const floatAnim = (delay = 0, duration = 6, amp = 6) => ({
    animate: {
      y: [0, -amp, 0],
    },
    transition: {
      duration: duration,
      repeat: Infinity,
      ease: "easeInOut" as const,
      delay: delay,
    },
  });

  // Stagger reveal animations (Heavy motion weight for headline)
  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.18,
        delayChildren: 0.3,
      },
    },
  };

  const lineReveal = {
    hidden: { y: 28, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1.4,
        ease: [0.16, 1, 0.3, 1] as const, // Custom slow cinematic easing
      },
    },
  };

  const elementReveal = {
    hidden: { y: 15, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1] as const,
        delay: 1.4, // reveal later
      },
    },
  };

  const cardReveal = (delay: number) => ({
    hidden: { scale: 0.95, opacity: 0, y: 15 },
    show: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.0,
        ease: [0.16, 1, 0.3, 1] as const,
        delay: delay,
      },
    },
  });

  const handwrittenReveal = {
    hidden: { scale: 0.85, opacity: 0, rotate: 10 },
    show: {
      scale: 1,
      opacity: 1,
      rotate: -4,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
        delay: 1.7, // playful snappy reveal
      },
    },
  };

  return (
    <motion.section
      id="hero"
      ref={containerRef}
      style={{ scale }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative h-auto xl:h-screen min-h-screen xl:min-h-[650px] flex flex-col justify-center items-center px-6 md:px-12 py-20 xl:py-16 overflow-hidden bg-bg z-10"
    >
      {/* Background Glow */}
      <motion.div
        style={{
          opacity: glowOpacity,
          background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
        }}
        className="absolute top-0 right-0 w-[55vw] h-[55vw] rounded-full blur-[140px] pointer-events-none"
      />

      <div className="max-w-6xl mx-auto w-full flex flex-col items-center justify-center text-center relative z-10">
        
        {/* Left-floating element (Desktop only) */}
        <motion.div
          style={{ x: xCollageLeft }}
          initial="hidden"
          animate="show"
          className="absolute left-[-8%] top-[25%] hidden xl:flex flex-col gap-6"
        >
          {/* Card 1: Workspace Candid Photo */}
          <motion.div
            variants={cardReveal(0.8)}
            style={{ x: card1X, y: card1Y }}
            className="w-[160px] h-[210px] relative z-10"
          >
            <motion.div
              {...floatAnim(0, 6.5, 6)}
              className="relative w-full h-full rounded-[24px] overflow-hidden border border-border shadow-md bg-bg2"
            >
              <Tape className="-top-2 left-8" rotate={-8} />
              <Image
                src={cardImageUrl}
                alt="Personal exploration"
                fill
                className="object-cover scale-110"
                unoptimized
              />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Right-floating elements (Desktop only) */}
        <motion.div
          style={{ x: xCollageRight }}
          initial="hidden"
          animate="show"
          className="absolute right-[-8%] top-[20%] hidden xl:flex flex-col gap-8 items-end"
        >
          {/* Card 2: Interactive Mock Notebook Sketch */}
          <motion.div
            variants={cardReveal(1.1)}
            style={{ x: card2X, y: card2Y }}
            className="w-[190px] relative z-10"
          >
            <motion.div
              {...floatAnim(0.5, 7.2, 5)}
              className="bg-[#F0EADF] p-4 rounded-lg border border-border/80 shadow-md flex flex-col gap-2.5 font-mono text-[9px] text-text-muted text-left"
            >
              <Tape className="-top-2 right-8" rotate={10} />
              <div className="flex items-center justify-between border-b border-border/40 pb-1">
                <span className="text-[8px] font-bold tracking-wider text-accent uppercase">EXPLORATION // 01</span>
                <span className="w-1 h-1 rounded-full bg-accent animate-pulse" />
              </div>
              <span>{"// learning process notes"}</span>
              <div className="border border-dashed border-border/85 h-12 flex items-center justify-center bg-bg/40 text-[8px] text-center px-2">
                [ Audio Synthesizer Node ]
              </div>
            </motion.div>
          </motion.div>

          {/* Card 3: Handwritten note overlay */}
          <motion.div
            variants={cardReveal(1.3)}
            style={{ x: card3X, y: card3Y }}
            className="mr-6"
          >
            <motion.div
              variants={handwrittenReveal}
              className="bg-white/85 p-3 rounded-lg shadow-sm border border-border/40 font-handwritten text-xl text-accent cursor-default hover:scale-105 transition-transform duration-300"
            >
              process over perfection
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Main Content: Typography & Copy */}
        <motion.div
          style={{ y: yText }}
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center gap-5 max-w-3xl"
        >
          {/* Small Label */}
          <motion.span
            variants={lineReveal}
            className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-text-muted font-bold"
          >
            CREATIVE DEVELOPER &bull; SYSTEM DESIGNER &bull; STORYTELLER
          </motion.span>

          {/* Main Headline */}
          <h1
            className="serif-font text-text leading-[1.12] tracking-tight max-w-2xl"
            style={{ fontSize: "clamp(2.2rem, 5.5vw, 4rem)" }}
          >
            <motion.span variants={lineReveal} className="block">
              I{" "}
              {/* Inline avatar with organic outline border */}
              <span className="inline-flex items-center justify-center align-middle mx-1 sm:mx-2 w-10 h-10 sm:w-14 sm:h-14 rounded-[48%_52%_45%_55%] overflow-hidden border border-border/80 shadow-md relative transform hover:scale-105 transition-transform duration-300">
                <Image
                  src={imageUrl}
                  alt="Avatar"
                  fill
                  className="object-cover scale-110"
                  unoptimized
                />
              </span>{" "}
              build through
            </motion.span>
            <motion.span variants={lineReveal} className="block font-serif italic font-light">
              what I learn,
            </motion.span>
            <motion.span variants={lineReveal} className="block font-serif italic font-light">
              what I feel,
            </motion.span>
            <motion.span variants={lineReveal} className="block">
              and what I
            </motion.span>
            <motion.span variants={lineReveal} className="block font-serif italic text-accent font-normal">
              experience.
            </motion.span>
          </h1>

          {/* Supporting Copy */}
          <motion.p
            variants={elementReveal}
            className="text-text-muted text-sm sm:text-base leading-relaxed max-w-md"
          >
            Every project becomes a place where I learn, explore, and shape ideas into experiences.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={elementReveal}
            className="flex flex-col sm:flex-row items-center gap-4 mt-2 w-full sm:w-auto"
          >
            <a
              href="#journey"
              className="w-full sm:w-auto px-7 py-3.5 bg-accent text-bg font-semibold rounded-full hover:translate-y-[-2px] transition-all duration-300 shadow-md hover:shadow-accent/25 flex items-center justify-center gap-2 text-sm"
            >
              Explore the Journey
            </a>
            <a
              href="#contact"
              className="w-full sm:w-auto px-7 py-3.5 border border-border text-text font-semibold rounded-full hover:border-accent hover:text-accent hover:translate-y-[-2px] transition-all duration-300 flex items-center justify-center text-sm"
            >
              Let’s Connect
            </a>
          </motion.div>
        </motion.div>

        {/* Mobile candid photo (Curated single photo vertical experience) */}
        <div className="xl:hidden w-full flex justify-center mt-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1.0 }}
            className="relative w-[220px] aspect-[4/5] rounded-[24px] overflow-hidden border border-border shadow-lg"
          >
            <Tape className="-top-2 left-18" rotate={-6} />
            <Image
              src={cardImageUrl}
              alt="Creative workspace"
              fill
              className="object-cover"
              unoptimized
            />
          </motion.div>
        </div>

      </div>

      {/* Scroll indicator (Ambient motion weight) */}
      <div className="scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 select-none pointer-events-none">
        <span className="text-[8px] tracking-[0.25em] text-text-muted/60 font-bold uppercase mb-1">
          SCROLL
        </span>
        <div className="w-[1px] h-10 bg-border relative overflow-hidden">
          <motion.div
            animate={{
              y: ["-100%", "100%"],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-0 left-0 w-full h-1/2 bg-accent"
          />
        </div>
      </div>
    </motion.section>
  );
}
