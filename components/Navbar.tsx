"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_ITEMS = [
  { label: "Journey", href: "#journey" },
  { label: "Work", href: "#work" },
  { label: "Activity", href: "#activity" },
  { label: "Log", href: "#beyond-code" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [connectStatus, setConnectStatus] = useState<"idle" | "sending" | "copied">("idle");
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    if (connectStatus !== "idle") return;
    setConnectStatus("sending");

    setTimeout(() => {
      navigator.clipboard.writeText("abeljason11@gmail.com");
      setConnectStatus("copied");
      setCopied(true);

      setTimeout(() => {
        setConnectStatus("idle");
        setCopied(false);
      }, 2000);
    }, 800);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    const target = document.querySelector(href);
    if (target) {
      if (href === "#beyond-code") {
        const rect = target.getBoundingClientRect();
        const scrollTop = window.scrollY + rect.top;
        const targetScroll = scrollTop + window.innerHeight * 1.38;
        window.scrollTo({ top: targetScroll, behavior: "smooth" });
      } else {
        target.scrollIntoView({ behavior: "smooth" });
      }
      setActiveSection(href);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.35);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection Observer for Scrollspy (Active Section Highlighting)
  useEffect(() => {
    const sections = NAV_ITEMS.map((item) => document.querySelector(item.href)).filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { threshold: 0.15 }
    );

    sections.forEach((sec) => sec && observer.observe(sec));
    return () => sections.forEach((sec) => sec && observer.unobserve(sec));
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] px-3 sm:px-8 py-2.5 sm:py-4 ${
          scrolled
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-6 pointer-events-none"
        }`}
      >
        <div className="w-full max-w-7xl flex items-center justify-between rounded-full px-4 py-2 sm:px-6 sm:py-2.5 bg-[#F7F1E8]/90 backdrop-blur-[20px] border border-border/80 shadow-[0_8px_32px_rgba(28,22,19,0.08)]">
          {/* Logo Brand */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
              setActiveSection("");
            }}
            className="serif-font text-lg sm:text-xl font-bold tracking-tight text-text hover:text-accent transition-colors duration-300 flex items-center gap-2 flex-shrink-0"
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            abelsjh
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1 bg-border/20 p-1 rounded-full border border-border/40 backdrop-blur-md">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`relative px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
                    isActive
                      ? "text-accent font-bold"
                      : "text-text-muted hover:text-text"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activePill"
                      className="absolute inset-0 rounded-full bg-bg shadow-sm border border-border/60"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Unified Action Cluster: Resume | Connect */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* View Resume Button */}
            <a
              href="/Resume_Abelsjh_Portfolio.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 border border-border hover:border-accent/50 rounded-full text-xs font-bold text-text-muted hover:text-accent transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-1.5 bg-bg/50 backdrop-blur-sm"
              aria-label="View Resume"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span>Resume</span>
            </a>

            {/* Connect Email Copy Button */}
            <button
              onClick={handleCopyEmail}
              disabled={connectStatus !== "idle"}
              className="min-w-[85px] sm:min-w-[95px] px-3.5 py-1.5 bg-accent text-bg rounded-full text-xs font-bold hover:bg-accent/90 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer shadow-sm relative overflow-hidden"
            >
              <AnimatePresence mode="wait">
                {connectStatus === "idle" && (
                  <motion.span
                    key="idle"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.18 }}
                    className="flex items-center gap-1.5"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>Connect</span>
                  </motion.span>
                )}
                {connectStatus === "sending" && (
                  <motion.span
                    key="sending"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.18 }}
                    className="flex items-center gap-1.5"
                  >
                    <span>Sending</span>
                  </motion.span>
                )}
                {connectStatus === "copied" && (
                  <motion.span
                    key="copied"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.18 }}
                    className="flex items-center gap-1.5"
                  >
                    <span className="text-accent2">✓</span>
                    <span>Copied!</span>
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Mobile Menu Hamburger Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden ml-1 p-1.5 rounded-full border border-border/80 bg-bg/80 text-text hover:text-accent transition-colors flex items-center justify-center"
              aria-label="Toggle Navigation Menu"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-x-4 top-16 z-40 lg:hidden p-5 rounded-2xl bg-[#F7F1E8]/95 backdrop-blur-[24px] border border-border shadow-2xl flex flex-col gap-4"
          >
            <div className="flex flex-col gap-1.5">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.href;
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-xs uppercase font-bold tracking-widest transition-all ${
                      isActive
                        ? "bg-accent/15 text-accent border border-accent/20"
                        : "text-text-muted hover:text-text hover:bg-border/30"
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className="text-base">→</span>
                  </a>
                );
              })}
            </div>

            <div className="pt-3 border-t border-border/60 flex items-center justify-between gap-2">
              <a
                href="/Resume_Abelsjh_Portfolio.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-4 border border-border text-text rounded-xl text-xs font-bold flex items-center justify-center gap-1.5"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span>Resume</span>
              </a>

              <button
                onClick={handleCopyEmail}
                className="flex-1 py-2.5 px-4 bg-accent text-bg rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>{connectStatus === "copied" ? "Email Copied!" : "Connect"}</span>
              </button>

              <div className="flex items-center gap-1 border-l border-border/50 pl-2">
                <a
                  href="https://github.com/abelsjh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg border border-border text-text hover:text-accent flex items-center justify-center"
                  aria-label="GitHub Profile"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
                <a
                  href="https://linkedin.com/in/abelsjh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg border border-border text-text hover:text-accent flex items-center justify-center"
                  aria-label="LinkedIn Profile"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast Notification */}
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-full bg-[#1C1613] text-[#E8E0D5] border border-accent/20 shadow-xl flex items-center gap-2 text-xs font-semibold tracking-wide"
          >
            <span className="text-accent2">✓</span> Email has been copied! (abeljason11@gmail.com)
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
