"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [connectStatus, setConnectStatus] = useState<"idle" | "sending" | "copied">("idle");
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    if (connectStatus !== "idle") return;
    setConnectStatus("sending");

    // Simulate sending animation for 800ms
    setTimeout(() => {
      navigator.clipboard.writeText("abeljason11@gmail.com");
      setConnectStatus("copied");
      setCopied(true);

      // Reset back to idle after 2s
      setTimeout(() => {
        setConnectStatus("idle");
        setCopied(false);
      }, 2000);
    }, 800);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.4) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          scrolled
            ? "opacity-100 translate-y-0 bg-[#F7F1E8]/85 backdrop-blur-[16px] border-b border-border py-4 shadow-sm"
            : "opacity-0 -translate-y-4 pointer-events-none py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <a
            href="#"
            className="serif-font text-xl font-bold tracking-tight text-text hover:text-accent transition-colors duration-300"
          >
            abelsjh
          </a>

          <div className="flex items-center gap-4 sm:gap-6">
            <nav className="flex items-center gap-4 sm:gap-6">
              <a
                href="#journey"
                className="text-[0.78rem] sm:text-[0.85rem] uppercase tracking-[0.04em] font-bold text-text-muted hover:text-accent transition-colors duration-300"
              >
                Journey
              </a>
              <a
                href="#work"
                className="text-[0.78rem] sm:text-[0.85rem] uppercase tracking-[0.04em] font-bold text-text-muted hover:text-accent transition-colors duration-300"
              >
                Work
              </a>
              <a
                href="#contact"
                className="text-[0.78rem] sm:text-[0.85rem] uppercase tracking-[0.04em] font-bold text-text-muted hover:text-accent transition-colors duration-300"
              >
                Contact
              </a>
            </nav>

            <div className="h-4 w-[1px] bg-border/40 hidden min-[480px]:block" />

            <div className="flex items-center gap-2">
              {/* Resume Download Button */}
              <a
                href="/Abel_Jason_Portfolio.pdf"
                download="Abel_Jason_Portfolio.pdf"
                className="px-3 sm:px-4 py-1.5 sm:py-2 border border-border hover:border-accent/45 rounded-full text-[9px] sm:text-xs font-bold text-text-muted hover:text-accent transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer shadow-sm bg-bg/20"
                aria-label="Download Resume"
              >
                <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>Resume</span>
              </a>

              {/* Connect Button */}
              <button
                onClick={handleCopyEmail}
                disabled={connectStatus !== "idle"}
                className="min-w-[85px] sm:min-w-[100px] px-3 sm:px-4 py-1.5 sm:py-2 bg-accent text-bg rounded-full text-[9px] sm:text-xs font-bold hover:bg-accent/90 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer overflow-hidden relative shadow-sm"
              >
                <AnimatePresence mode="wait">
                  {connectStatus === "idle" && (
                    <motion.span
                      key="idle"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center gap-1.5"
                    >
                      <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span>Connect</span>
                    </motion.span>
                  )}
                  {connectStatus === "sending" && (
                    <motion.span
                      key="sending"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center gap-1.5"
                    >
                      <motion.svg
                        initial={{ opacity: 0, x: -10, y: 10, scale: 0.8, rotate: -15 }}
                        animate={{
                          opacity: [0, 1, 1, 0],
                          x: [-10, 0, 0, 25],
                          y: [10, 0, 0, -25],
                          scale: [0.8, 1, 1, 0.9],
                          rotate: [-15, 0, 0, 15]
                        }}
                        transition={{
                          duration: 0.8,
                          times: [0, 0.2, 0.6, 1],
                          ease: "easeInOut"
                        }}
                        className="w-3 h-3 sm:w-3.5 sm:h-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </motion.svg>
                      <span>Connecting</span>
                    </motion.span>
                  )}
                  {connectStatus === "copied" && (
                    <motion.span
                      key="copied"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center gap-1.5"
                    >
                      <motion.svg
                        initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 15 }}
                        className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-accent2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="3"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </motion.svg>
                      <span>Copied!</span>
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              {/* GitHub Button */}
              <a
                href="https://github.com/abelsjh"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 sm:p-2 border border-border hover:border-accent/40 rounded-full text-text-muted hover:text-accent transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center"
                aria-label="GitHub"
              >
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </header>

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
