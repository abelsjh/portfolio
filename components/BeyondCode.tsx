"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";

interface CardConfig {
  id: number;
  image: string;
  title: string;
  category: string;
  width: number;
  alt?: string;
  delay: number; // Staggered timeline delay multiplier
  // Positioning in the canvas container
  left?: string;
  right?: string;
  top?: string;
  bottom?: string;
  // Animation trajectory boundaries
  initialX: number;
  targetX: number;
  exitX: number;
  initialY: number;
  targetY: number;
  exitY: number;
  initialRotate: number;
  targetRotate: number;
  exitRotate: number;
  scaleRange: [number, number, number];
}

const CARDS_CONFIG: CardConfig[] = [
  // Wave 1: delay 0.0 to 0.10
  {
    id: 1,
    image: "/Foto/foto_1.webp",
    title: "captured frames",
    category: "Moments",
    width: 210,
    left: "2%",
    top: "6%",
    delay: 0.0,
    initialX: -320,
    targetX: 0,
    exitX: 180,
    initialY: 400,
    targetY: 0,
    exitY: -450,
    initialRotate: -35,
    targetRotate: -8,
    exitRotate: 15,
    scaleRange: [0.85, 1, 0.9],
  },
  {
    id: 2,
    image: "/Foto/foto_2.jpg",
    title: "laughter and love",
    category: "Memory Shards",
    width: 200,
    right: "2%",
    top: "6%",
    delay: 0.05,
    initialX: 380,
    targetX: 0,
    exitX: -220,
    initialY: 350,
    targetY: 0,
    exitY: -400,
    initialRotate: 30,
    targetRotate: 6,
    exitRotate: -15,
    scaleRange: [0.8, 1, 0.95],
  },

  // Wave 2: delay 0.10 to 0.20
  {
    id: 3,
    image: "/Foto/foto_3.jpg",
    title: "scenic focus",
    category: "Fujifilm Prints",
    width: 180,
    left: "10%",
    top: "24%",
    delay: 0.10,
    initialX: -360,
    targetX: 0,
    exitX: 280,
    initialY: 220,
    targetY: 0,
    exitY: -350,
    initialRotate: -22,
    targetRotate: -9,
    exitRotate: 18,
    scaleRange: [0.75, 0.95, 0.88],
  },
  {
    id: 4,
    image: "/Foto/foto_4.jpg",
    title: "spontaneous pauses",
    category: "Captured Stories",
    width: 185,
    right: "10%",
    top: "24%",
    delay: 0.15,
    initialX: 390,
    targetX: 0,
    exitX: -280,
    initialY: 260,
    targetY: 0,
    exitY: -330,
    initialRotate: 22,
    targetRotate: 8,
    exitRotate: -12,
    scaleRange: [0.78, 0.98, 0.85],
  },

  // Wave 3: delay 0.20 to 0.30
  {
    id: 5,
    image: "/Foto/foto_5.jpg",
    title: "shared moments",
    category: "Fellowship",
    width: 190,
    left: "1%",
    top: "42%",
    delay: 0.20,
    initialX: 120,
    targetX: 0,
    exitX: -90,
    initialY: -280,
    targetY: 0,
    exitY: -520,
    initialRotate: -12,
    targetRotate: -3,
    exitRotate: 10,
    scaleRange: [0.85, 1, 0.9],
  },
  {
    id: 6,
    image: "/Foto/foto_6.jpg",
    title: "meaningful walks",
    category: "Daily Life",
    width: 180,
    right: "1%",
    top: "42%",
    delay: 0.25,
    initialX: 340,
    targetX: 0,
    exitX: -160,
    initialY: -200,
    targetY: 0,
    exitY: -480,
    initialRotate: 18,
    targetRotate: 4,
    exitRotate: -8,
    scaleRange: [0.82, 1, 0.88],
  },

  // Wave 4: delay 0.30 to 0.40
  {
    id: 7,
    image: "/Foto/foto_7.jpg",
    title: "sunsets & stories",
    category: "Reflections",
    width: 190,
    left: "9%",
    bottom: "38%",
    delay: 0.30,
    initialX: -300,
    targetX: 0,
    exitX: 140,
    initialY: -220,
    targetY: 0,
    exitY: -500,
    initialRotate: -28,
    targetRotate: -6,
    exitRotate: 14,
    scaleRange: [0.8, 1, 0.9],
  },
  {
    id: 8,
    image: "/Foto/foto_8.jpg",
    title: "warm gatherings",
    category: "Connections",
    width: 195,
    left: "2%",
    bottom: "20%",
    delay: 0.35,
    initialX: -250,
    targetX: 0,
    exitX: 160,
    initialY: 520,
    targetY: 0,
    exitY: -320,
    initialRotate: -15,
    targetRotate: -4,
    exitRotate: 10,
    scaleRange: [0.75, 1.05, 0.9],
  },

  // Wave 5: delay 0.40 to 0.50
  {
    id: 9,
    image: "/Foto/foto_9.webp",
    title: "journey log",
    category: "Explore",
    width: 185,
    right: "9%",
    bottom: "38%",
    delay: 0.40,
    initialX: 420,
    targetX: 0,
    exitX: -190,
    initialY: 480,
    targetY: 0,
    exitY: -360,
    initialRotate: 35,
    targetRotate: 12,
    exitRotate: -8,
    scaleRange: [0.8, 0.98, 0.85],
  },
  {
    id: 10,
    image: "/Foto/foto_10.jpg",
    title: "timeless snaps",
    category: "Nostalgia",
    width: 180,
    left: "8%",
    bottom: "4%",
    delay: 0.45,
    initialX: -180,
    targetX: 0,
    exitX: 240,
    initialY: 380,
    targetY: 0,
    exitY: -300,
    initialRotate: 14,
    targetRotate: -5,
    exitRotate: 12,
    scaleRange: [0.8, 1, 0.9],
  },

  // Wave 6: delay 0.50 to 0.60
  {
    id: 11,
    image: "/Foto/foto_11.webp",
    title: "youth community",
    category: "Fellowship",
    width: 185,
    right: "2%",
    bottom: "20%",
    delay: 0.50,
    initialX: 280,
    targetX: 0,
    exitX: -260,
    initialY: 420,
    targetY: 0,
    exitY: -340,
    initialRotate: -20,
    targetRotate: 9,
    exitRotate: -16,
    scaleRange: [0.8, 0.96, 0.88],
  },
  {
    id: 12,
    image: "/Foto/foto_12.jpg",
    title: "candid smiles",
    category: "Joy",
    width: 170,
    right: "8%",
    bottom: "4%",
    delay: 0.55,
    initialX: -130,
    targetX: 0,
    exitX: 190,
    initialY: 500,
    targetY: 0,
    exitY: -400,
    initialRotate: -18,
    targetRotate: -2,
    exitRotate: 8,
    scaleRange: [0.75, 0.95, 0.9],
  },
];

function PhotoCard({
  config,
  progress,
  sectionRef,
}: {
  config: CardConfig;
  progress: MotionValue<number>;
  sectionRef: React.RefObject<HTMLDivElement | null>;
}) {
  const d = config.delay;
  // Wide staggered entry offset mapping (0.0 to 0.74 progress window)
  const startAppear = d * 0.9; 
  const endAppear = startAppear + 0.18; 
  
  // Late simultaneous exit window (locks photos on screen much longer)
  const startExit = 0.78;
  const endExit = 0.93;

  const x = useTransform(progress, [startAppear, endAppear, startExit, endExit], [config.initialX, config.targetX, config.targetX, config.exitX]);
  const y = useTransform(progress, [startAppear, endAppear, startExit, endExit], [config.initialY, config.targetY, config.targetY, config.exitY]);
  const rotate = useTransform(progress, [startAppear, endAppear, startExit, endExit], [config.initialRotate, config.targetRotate, config.targetRotate, config.exitRotate]);
  const scale = useTransform(progress, [startAppear, endAppear, startExit, endExit], [config.scaleRange[0], config.scaleRange[1], config.scaleRange[1], config.scaleRange[2]]);
  const opacity = useTransform(progress, [startAppear, endAppear, startExit, endExit], [0, 1, 1, 0]);

  return (
    <motion.div
      style={{
        x,
        y,
        rotate,
        scale,
        opacity,
        left: config.left,
        right: config.right,
        top: config.top,
        bottom: config.bottom,
      }}
      className="absolute pointer-events-auto cursor-grab active:cursor-grabbing"
      drag
      dragConstraints={sectionRef}
      dragElastic={0.2}
      whileHover={{ scale: 1.05, zIndex: 100, transition: { duration: 0.2 } }}
    >
      <div
        className="relative overflow-hidden bg-bg2 rounded-[24px] border border-white/40 shadow-xl shadow-black/8 select-none group"
        style={{ width: `${config.width}px`, aspectRatio: "4/3" }}
      >
        <Image
          src={config.image}
          alt={config.alt || config.title}
          fill
          className="object-cover pointer-events-none"
          unoptimized
        />
        {/* Glowing glass card info overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 pointer-events-none">
          <span className="text-white/80 text-[8px] uppercase tracking-wider font-semibold">
            {config.category}
          </span>
          <span className="font-serif italic text-white text-sm mt-0.5 leading-tight">
            {config.title}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function BeyondCode() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Track scroll progress of the section relative to viewport
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Create spring-dampened motion values for buttery smooth movement
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 45,
    damping: 18,
    mass: 0.5,
  });

  return (
    <section
      ref={sectionRef}
      id="beyond"
      className={`relative bg-bg border-b border-border/20 z-10 ${
        isMobile ? "h-auto py-24 px-6 md:px-12" : "h-[300vh]"
      }`}
    >
      <div
        className={`${
          isMobile
            ? "w-full flex flex-col items-center"
            : "sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center px-6 md:px-12"
        }`}
      >
        {/* Quiet ambient glow */}
        <div className="absolute right-[5%] top-[20%] w-[45vw] h-[45vw] max-w-[600px] max-h-[600px] rounded-full bg-accent/[0.03] blur-[150px] pointer-events-none" />

        <div className="max-w-5xl mx-auto w-full relative z-20 pointer-events-none">
          {/* Header */}
          <div className="max-w-2xl mx-auto text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-5">
              <div className="w-8 h-[1px] bg-accent/40" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-accent/70 font-mono font-bold">
                Beyond Code
              </span>
              <div className="w-8 h-[1px] bg-accent/40" />
            </div>
            <h2
              className="serif-font font-light text-text leading-[1.1] tracking-tight"
              style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)" }}
            >
              Things that live{" "}
              <span className="italic text-accent">outside</span>{" "}
              the screen.
            </h2>
            <p className="text-text-muted text-sm sm:text-base font-light leading-relaxed max-w-lg mx-auto mt-6">
              The parts of me that don&apos;t show up in a commit history — but quietly shape the way I think and build.
            </p>
          </div>
        </div>

        {isMobile ? (
          /* Mobile Layout: An elegant responsive grid of Memory Shards (Shows all 12 items) */
          <div className="w-full max-w-2xl mx-auto grid grid-cols-2 gap-4 z-10 px-4">
            {CARDS_CONFIG.map((card) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative overflow-hidden bg-bg2 rounded-[20px] border border-white/40 shadow-lg w-full aspect-[4/3]"
              >
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-4">
                  <span className="text-white/80 text-[8px] uppercase tracking-wider font-semibold">
                    {card.category}
                  </span>
                  <span className="font-serif italic text-white text-xs sm:text-sm mt-0.5 leading-tight">
                    {card.title}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          /* Desktop Layout: Flying Scattered Parallax Canvas (15 cards flying around on a sticky stage) */
          <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
            <div className="relative w-full h-full max-w-7xl mx-auto">
              {CARDS_CONFIG.map((config) => (
                <PhotoCard
                  key={config.id}
                  config={config}
                  progress={smoothProgress}
                  sectionRef={sectionRef}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
