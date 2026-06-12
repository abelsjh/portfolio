"use client";

import React from "react";

interface Tech {
  name: string;
  color: string; // Tailwind color or hex
  glow: string; // RGB values for shadow glow
  icon: React.ReactNode;
}

const TECHNOLOGIES: Tech[] = [
  {
    name: "Laravel",
    color: "#FF2D20",
    glow: "255, 45, 32",
    icon: (
      <svg className="w-5 h-5 transition-colors duration-300" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.09 17.61L12.55 23a1 1 0 0 1-1.09 0L1.91 17.61a1 1 0 0 1-.51-.87V5.76a1 1 0 0 1 .51-.87L11.46.2a1 1 0 0 1 1.09 0l9.54 4.69a1 1 0 0 1 .51.87v11a1 1 0 0 1-.51.85zM12 2.22L3.41 7.27 12 12.33l8.59-5.06zm-8.59 7.3v8l8.59 5.06V14.6zm10.59 13.06l8.59-5.06v-8L12 14.6z"/>
      </svg>
    ),
  },
  {
    name: "CodeIgniter",
    color: "#EE4326",
    glow: "238, 67, 38",
    icon: (
      <svg className="w-5 h-5 transition-colors duration-300" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C7.2 0 4.8 4.8 4.8 9.6c0 4.8 3.6 7.2 3.6 9.6 0 2.4-1.2 3.6-2.4 4.8C10.8 24 19.2 19.2 19.2 12c0-7.2-4.8-12-7.2-12zm-1.2 16.8c-.6-.6-1.2-1.8-1.2-3 0-1.8 1.2-3 2.4-4.8.6.6 1.2 1.8 1.2 3 0 1.8-1.2 3-2.4 4.8z"/>
      </svg>
    ),
  },
  {
    name: "PHP",
    color: "#777BB4",
    glow: "119, 123, 180",
    icon: (
      <svg className="w-5 h-5 transition-colors duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <ellipse cx="12" cy="12" rx="10" ry="6" />
        <path d="M9 9.5v5M7 12h3M15 9.5v5M13 12h3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "MySQL",
    color: "#00758F",
    glow: "0, 117, 143",
    icon: (
      <svg className="w-5 h-5 transition-colors duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22c5.523 0 10-2.239 10-5V7c0-2.761-4.477-5-10-5S2 4.239 2 7v10c0 2.761 4.477 5 10 5z"/>
        <path d="M22 7c0 2.761-4.477 5-10 5S2 9.761 2 7"/>
        <path d="M22 12c0 2.761-4.477 5-10 5S2 14.761 2 12"/>
      </svg>
    ),
  },
  {
    name: "TypeScript",
    color: "#3178C6",
    glow: "49, 120, 198",
    icon: (
      <svg className="w-5 h-5 transition-colors duration-300" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="3" fill="currentColor" />
        <text x="22" y="21" fill="#F7F1E8" fontSize="11" fontWeight="900" fontFamily="system-ui, sans-serif" textAnchor="end">TS</text>
      </svg>
    ),
  },
  {
    name: "React",
    color: "#61DAFB",
    glow: "97, 218, 251",
    icon: (
      <svg className="w-5 h-5 transition-colors duration-300 animate-[spin_12s_linear_infinite]" viewBox="-11.5 -10.23 23 20.46" fill="none" stroke="currentColor" strokeWidth="1.5">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        <circle r="2" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "Next.js",
    color: "#2C241F",
    glow: "44, 36, 31",
    icon: (
      <svg className="w-5 h-5 transition-colors duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M9 17V7l7.5 10V7" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    name: "Tailwind CSS",
    color: "#06B6D4",
    glow: "6, 182, 212",
    icon: (
      <svg className="w-5 h-5 transition-colors duration-300" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.002 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C7.666 17.818 9.027 19 12.002 19c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"/>
      </svg>
    ),
  },
  {
    name: "Framer Motion",
    color: "#F024B6",
    glow: "240, 36, 182",
    icon: (
      <svg className="w-5 h-5 transition-colors duration-300" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0L24 12H12L0 24V12H12L24 0z"/>
      </svg>
    ),
  },
  {
    name: "WebSockets",
    color: "#8a9a5b",
    glow: "138, 154, 91",
    icon: (
      <svg className="w-5 h-5 transition-colors duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 10V5a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v5"/>
        <path d="M6 10c0 3.3 2.7 6 6 6s6-2.7 6-6"/>
        <path d="M12 16v4"/>
        <path d="M8 20h8"/>
        <path d="M8 3v2"/>
        <path d="M16 3v2"/>
      </svg>
    ),
  },
  {
    name: "Git",
    color: "#F05032",
    glow: "240, 80, 50",
    icon: (
      <svg className="w-5 h-5 transition-colors duration-300" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.3 10.9L13.1.7C12.7.3 12 .3 11.6.7L8.9 3.4l3.1 3.1c.8-.3 1.6 0 2.2.6.6.6.8 1.4.6 2.2l3.1 3.1c.8-.2 1.6 0 2.2.6.8.8.8 2.1 0 2.9-.8.8-2.1.8-2.9 0-.6-.6-.8-1.4-.6-2.2L11.3 10.6c-.2.2-.2.5-.2.8v5c.2.8-.1 1.7-.8 2.3-.8.8-2.1.8-2.9 0-.8-.8-.8-2.1 0-2.9.6-.6 1.4-.8 2.2-.6V10c0-.8-.4-1.5-1-2L5.8 5.2.7 10.3c-.4.4-.4 1.1 0 1.5l10.2 10.2c.4.4 1.1.4 1.5 0l10.9-10.9c.4-.4.4-1.2 0-1.7z"/>
      </svg>
    ),
  },
  {
    name: "JavaScript",
    color: "#D9A71E", // Darker gold for better contrast on light cream bg
    glow: "217, 167, 30",
    icon: (
      <svg className="w-5 h-5 transition-colors duration-300" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="3" fill="currentColor" />
        <text x="22" y="21" fill="#2C241F" fontSize="11" fontWeight="900" fontFamily="system-ui, sans-serif" textAnchor="end">JS</text>
      </svg>
    ),
  },
];

// Repeat technologies to ensure smooth infinite loop on wide screens
const DOUBLE_TECHNOLOGIES = [...TECHNOLOGIES, ...TECHNOLOGIES, ...TECHNOLOGIES];

export default function TechStack() {
  return (
    <section className="relative py-20 bg-bg overflow-hidden border-b border-border/20 select-none">
      {/* Subtle background strip highlights */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-bg to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-bg to-transparent z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-8 h-[1px] bg-accent/40" />
          <span className="text-[10px] uppercase tracking-[0.3em] text-accent/70 font-mono font-bold">
            Technologies & Tools
          </span>
        </div>
      </div>

      {/* Marquee Wrapper Container */}
      <div className="w-full relative flex items-center overflow-hidden py-4">
        
        {/* Animated Row */}
        <div className="flex gap-4 min-w-max animate-marquee pr-4">
          {DOUBLE_TECHNOLOGIES.map((tech, idx) => {
            return (
              <div
                key={`${tech.name}-${idx}`}
                className="flex items-center gap-3 px-6 py-3 rounded-xl border transition-all duration-300 hover:scale-[1.03] hover:-translate-y-0.5"
                style={{
                  color: "var(--text)",
                  borderColor: `rgba(${tech.glow}, 0.22)`,
                  backgroundColor: `rgba(${tech.glow}, 0.04)`,
                  boxShadow: `0 2px 8px rgba(${tech.glow}, 0.03)`,
                  cursor: "default",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = `rgba(${tech.glow}, 0.45)`;
                  el.style.boxShadow = `0 8px 24px rgba(${tech.glow}, 0.15)`;
                  el.style.backgroundColor = `rgba(${tech.glow}, 0.08)`;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = `rgba(${tech.glow}, 0.22)`;
                  el.style.boxShadow = `0 2px 8px rgba(${tech.glow}, 0.03)`;
                  el.style.backgroundColor = `rgba(${tech.glow}, 0.04)`;
                }}
              >
                <div style={{ color: tech.color }} className="flex items-center justify-center">
                  {tech.icon}
                </div>
                <span className="text-xs font-semibold tracking-wide font-sans text-text">
                  {tech.name}
                </span>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

