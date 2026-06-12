"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface Metric {
  icon: string;
  value: string;
  label: string;
}

interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  color: string;
  bgGlow: string;
  images: string[]; // multiple screenshots for hover slideshow
  description: string;
  metrics: Metric[];
  tags: string[];
  github: string;
  demo?: string;
}

const projects: Project[] = [
  {
    id: "01",
    title: "BookIt Marketplace",
    subtitle: "Book Marketplace with Real-Time Price Negotiation",
    category: "Marketplace · Web Dev",
    color: "#16a34a",
    bgGlow: "rgba(22, 163, 74, 0.07)",
    images: [
      "/bookit_home_real.png",
      "/bookit_myorders_auth.png",
      "/bookit_user_home.png",
      "/bookit_negotiations_auth.png",
    ],
    description:
      "My first real web development project. A CodeIgniter 4-based marketplace featuring real-time price negotiation via WebSocket — buyers and sellers can haggle live without ever refreshing the page.",
    metrics: [
      { icon: "🤝", value: "Real-time", label: "Negotiation via WebSocket" },
      { icon: "📦", value: "Multi-role", label: "Buyer, Seller & Admin" },
      { icon: "📱", value: "Responsive", label: "Mobile-friendly UI" },
    ],
    tags: ["CodeIgniter 4", "PHP", "MySQL", "WebSocket", "Bootstrap 5"],
    github: "https://github.com/abelsjh/BookIt-Marketplace",
  },
  {
    id: "02",
    title: "GKI E-Office System",
    subtitle: "Attendance & Digital Letter Management System for a Church",
    category: "E-Office · Internship",
    color: "#7c3aed",
    bgGlow: "rgba(124, 58, 237, 0.07)",
    images: [
      "/gereja_scan_active.png",
      "/gereja_absensi_list.png",
      "/gereja_surat_keluar_form.png",
      "/gereja_arsip_main.png",
    ],
    description:
      "A digital administration system built for GKI Pekalongan — covering RFID-based congregation attendance, multi-level letter disposition workflows, digital archiving, attendance reports, and integration with WhatsApp Gateway & SMTP email.",
    metrics: [
      { icon: "📋", value: "Days → Minutes", label: "Letter disposition process" },
      { icon: "✅", value: "Fully Automated", label: "Congregation attendance recap" },
      { icon: "🗂️", value: "8 Modules", label: "Active system features" },
    ],
    tags: ["CodeIgniter 4", "PHP 8.2", "MySQL", "RFID", "WA Gateway", "SMTP"],
    github: "https://github.com/abelsjh",
  },
  {
    id: "03",
    title: "PartsPro POS",
    subtitle: "Cashier & Spare Parts Inventory Management System",
    category: "POS System · Prototype",
    color: "#2563eb",
    bgGlow: "rgba(37, 99, 235, 0.07)",
    images: [
      "/pos_kasir_final.png",
      "/pos_inventori_final.png",
      "/pos_laporan_final.png",
      "/pos_aktivitas_final.png",
    ],
    description:
      "A full-featured POS system for a motorcycle spare parts shop — multi-role access (Owner & Cashier), FIFO batch stock management, camera-based barcode scanning, 3-zone label printing, real-time profit reports, and a hidden cost-code system to protect supplier pricing. Built with Laravel; this prototype demonstrates the core feature set.",
    metrics: [
      { icon: "⚡", value: "3× Faster", label: "Transaction processing" },
      { icon: "📉", value: "~80% Reduced", label: "Cashier human error" },
      { icon: "🏗️", value: "7 Modules", label: "Core system features" },
    ],
    tags: ["Laravel", "PHP", "MySQL", "Barcode", "FIFO Batch"],
    github: "https://github.com/abelsjh/demo-client",
  },
];

// ── Hover Slideshow Hook ────────────────────────────────────────────────────
function useSlideshow(images: string[], isHovered: boolean) {
  const [idx, setIdx] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isHovered && images.length > 1) {
      timer.current = setInterval(() => {
        setIdx((prev) => (prev + 1) % images.length);
      }, 1800);
    } else {
      if (timer.current) clearInterval(timer.current);
      if (!isHovered) setIdx(0);
    }
    return () => { if (timer.current) clearInterval(timer.current); };
  }, [isHovered, images.length]);

  return idx;
}

// ── Project Card ────────────────────────────────────────────────────────────
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false);
  const imgIdx = useSlideshow(project.images, hovered);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative rounded-2xl border overflow-hidden transition-all duration-500 cursor-default"
      style={{
        background: hovered ? project.bgGlow : "var(--bg2)",
        borderColor: hovered ? project.color + "50" : "var(--border)",
        boxShadow: hovered ? `0 12px 48px ${project.color}18` : "none",
        transform: hovered ? "translateY(-3px)" : "none",
      }}
    >
      {/* top accent bar */}
      <div
        className="h-[2px] w-full transition-all duration-700"
        style={{
          background: hovered
            ? `linear-gradient(90deg, ${project.color}, ${project.color}44, transparent)`
            : "transparent",
        }}
      />

      <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 items-center">

        {/* ── LEFT INFO ── */}
        <div className="flex flex-col gap-5">

          {/* badges row */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-mono text-[11px]" style={{ color: "var(--text-muted)" }}>
              {project.id}
            </span>
            <span
              className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wide uppercase border"
              style={{
                color: project.color,
                borderColor: project.color + "40",
                background: project.color + "10",
              }}
            >
              {project.category}
            </span>
          </div>

          {/* title */}
          <div>
            <h3
              className="text-2xl sm:text-3xl font-bold leading-tight mb-1.5 transition-colors duration-300"
              style={{
                fontFamily: "'DM Serif Display', serif",
                color: hovered ? project.color : "var(--text)",
              }}
            >
              {project.title}
            </h3>
            <p className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
              {project.subtitle}
            </p>
          </div>

          {/* description */}
          <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
            {project.description}
          </p>

          {/* metrics — visible on hover */}
          <div
            className="grid grid-cols-3 gap-3 transition-all duration-500"
            style={{
              opacity: hovered ? 1 : 0.4,
              transform: hovered ? "translateY(0)" : "translateY(4px)",
            }}
          >
            {project.metrics.map((m) => (
              <div
                key={m.label}
                className="rounded-xl p-3 border transition-all duration-300"
                style={{
                  background: hovered ? project.color + "0d" : "var(--bg)",
                  borderColor: hovered ? project.color + "30" : "var(--border)",
                }}
              >
                <span className="text-xl block mb-1">{m.icon}</span>
                <div className="text-xs font-bold leading-tight" style={{ color: project.color }}>
                  {m.value}
                </div>
                <div className="text-[10px] mt-0.5" style={{ color: "var(--text-muted)" }}>
                  {m.label}
                </div>
              </div>
            ))}
          </div>

          {/* tags + links */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t" style={{ borderColor: "var(--border)" }}>
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-mono px-2 py-0.5 rounded border"
                  style={{ color: "var(--text-muted)", borderColor: "var(--border)", background: "var(--bg)" }}
                >
                  #{tag}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-200 hover:scale-105"
                style={{ color: project.color, borderColor: project.color + "40", background: project.color + "0d" }}
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </a>
            </div>
          </div>
        </div>

        {/* ── RIGHT: SLIDESHOW IMAGE ── */}
        <div
          className="relative rounded-xl overflow-hidden border transition-all duration-500"
          style={{
            aspectRatio: "16/10",
            borderColor: hovered ? project.color + "50" : "var(--border)",
            boxShadow: hovered ? `0 8px 32px ${project.color}22` : "0 2px 8px rgba(0,0,0,0.06)",
          }}
        >
          {/* browser chrome bar */}
          <div
            className="absolute top-0 left-0 right-0 z-20 flex items-center gap-1.5 px-3 py-2"
            style={{ background: "rgba(15,15,20,0.8)", backdropFilter: "blur(8px)" }}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-red-400 opacity-70" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 opacity-70" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-400 opacity-70" />
            <div
              className="ml-2 flex-1 rounded text-[9px] font-mono px-2 py-0.5 truncate"
              style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.4)" }}
            >
              localhost:8080
            </div>
            {/* Image counter dots */}
            <div className="flex gap-1 ml-2">
              {project.images.map((_, i) => (
                <span
                  key={i}
                  className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                  style={{
                    background: i === imgIdx ? project.color : "rgba(255,255,255,0.2)",
                    transform: i === imgIdx ? "scale(1.3)" : "scale(1)",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Images with crossfade */}
          {project.images.map((src, i) => (
            <Image
              key={src}
              src={src}
              alt={`${project.title} screenshot ${i + 1}`}
              fill
              sizes="(max-width: 1024px) 100vw, 380px"
              className="object-cover object-top transition-all duration-700"
              style={{
                opacity: i === imgIdx ? 1 : 0,
                transform: i === imgIdx
                  ? hovered ? "scale(1.03)" : "scale(1)"
                  : "scale(0.98)",
                zIndex: i === imgIdx ? 1 : 0,
              }}
              unoptimized
              priority={index === 0 && i === 0}
            />
          ))}

          {/* bottom gradient */}
          <div
            className="absolute bottom-0 left-0 right-0 h-10 pointer-events-none z-10"
            style={{
              background: `linear-gradient(to top, ${project.color}18, transparent)`,
              opacity: hovered ? 1 : 0,
              transition: "opacity 0.5s",
            }}
          />

          {/* hover hint */}
          {!hovered && (
            <div
              className="absolute bottom-2 right-3 z-10 text-[9px] font-mono px-2 py-1 rounded"
              style={{ background: "rgba(0,0,0,0.4)", color: "rgba(255,255,255,0.5)" }}
            >
              hover to explore ↗
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Main Works Section ──────────────────────────────────────────────────────
export default function Works() {
  return (
    <section id="work" className="py-24 px-6 md:px-12 bg-bg relative overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-14 flex flex-col md:flex-row justify-between items-start gap-6">
          <div className="max-w-xl">
            <span className="text-[11px] uppercase tracking-[0.2em] text-accent font-bold block mb-3">
              Selected Works
            </span>
            <h2
              className="text-3xl sm:text-5xl font-bold leading-[1.15] mb-4"
              style={{ fontFamily: "'DM Serif Display', serif", color: "var(--text)" }}
            >
              Projects I{" "}
              <span
                className="italic font-normal"
                style={{ color: "var(--accent)", fontFamily: "'DM Serif Display', serif" }}
              >
                actually built.
              </span>
            </h2>
            <p className="text-sm sm:text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
              A curated selection of key systems I built to solve real operational problems.
              Hover each card to see a live preview of the project.
            </p>
          </div>

          <div className="flex gap-8 flex-shrink-0">
            {[
              { n: "3", l: "Featured" },
              { n: "10+", l: "Repositories" },
              { n: "18+", l: "Features" },
            ].map((s) => (
              <div key={s.l} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold" style={{ color: "var(--accent)" }}>
                  {s.n}
                </div>
                <div className="text-[10px] uppercase tracking-widest mt-0.5" style={{ color: "var(--text-muted)" }}>
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cards */}
        <div className="flex flex-col gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
            Interested in seeing all my repositories?
          </p>
          <a
            href="https://github.com/abelsjh"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold border transition-all duration-200 hover:scale-105"
            style={{ color: "var(--accent)", borderColor: "var(--accent)", background: "var(--accent)" + "10" }}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
            View all on GitHub →
          </a>
        </div>

      </div>
    </section>
  );
}
