"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Contact() {
  const currentYear = new Date().getFullYear();
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

  return (
    <section
      id="contact"
      className="relative pt-32 pb-12 px-6 md:px-12 bg-bg overflow-hidden flex flex-col items-center justify-between"
    >
      {/* Central Glow Gradient */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] max-w-[600px] max-h-[600px] rounded-full blur-[140px] pointer-events-none opacity-20"
        style={{
          background:
            "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
        }}
      />

      {/* CTA Content */}
      <div className="max-w-3xl mx-auto text-center flex flex-col items-center gap-8 relative z-10 my-16">
        <h2
          className="display-font font-bold text-text leading-[1.1] tracking-tight"
          style={{ fontSize: "clamp(2.25rem, 6vw, 4.5rem)" }}
        >
          Let&apos;s build something{" "}
          <span className="text-accent italic display-font font-normal">
            remarkable.
          </span>
        </h2>

        <p className="text-text-muted text-base sm:text-lg max-w-xl leading-relaxed">
          I&apos;m always open to discussing new projects, creative opportunities, or
          collaborative ideas. Feel free to reach out!
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
          <button
            onClick={handleCopyEmail}
            disabled={connectStatus !== "idle"}
            className="w-full sm:w-auto min-w-[200px] px-8 py-4 bg-accent text-bg font-semibold rounded-full hover:translate-y-[-2px] transition-all duration-300 shadow-md hover:shadow-accent/25 flex items-center justify-center gap-2 text-sm cursor-pointer overflow-hidden relative"
          >
            <AnimatePresence mode="wait">
              {connectStatus === "idle" && (
                <motion.span
                  key="idle"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center justify-center gap-2"
                >
                  Let&apos;s Connect <span className="text-base">→</span>
                </motion.span>
              )}
              {connectStatus === "sending" && (
                <motion.span
                  key="sending"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center justify-center gap-2"
                >
                  Sending...
                  <motion.svg
                    initial={{ opacity: 0, x: -10, y: 10, scale: 0.8, rotate: -15 }}
                    animate={{
                      opacity: [0, 1, 1, 0],
                      x: [-10, 0, 0, 30],
                      y: [10, 0, 0, -30],
                      scale: [0.8, 1, 1, 0.9],
                      rotate: [-15, 0, 0, 15]
                    }}
                    transition={{
                      duration: 0.8,
                      times: [0, 0.2, 0.6, 1],
                      ease: "easeInOut"
                    }}
                    className="w-4 h-4 text-bg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </motion.svg>
                </motion.span>
              )}
              {connectStatus === "copied" && (
                <motion.span
                  key="copied"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center justify-center gap-2"
                >
                  Email Copied!
                  <motion.svg
                    initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    className="w-4 h-4 text-accent2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </motion.svg>
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full max-w-7xl mx-auto mt-24 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
        <a
          href="#"
          className="serif-font text-xl font-bold tracking-tight text-text hover:text-accent transition-colors duration-300"
        >
          Portfolio
        </a>
        <span className="text-xs text-text-muted">
          &copy; {currentYear} abelsjh. All rights reserved.
        </span>
      </div>

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
    </section>
  );
}
