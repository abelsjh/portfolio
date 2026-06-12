"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SocialSidebar() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("abeljason11@gmail.com");
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
        className="fixed left-6 bottom-0 z-40 hidden lg:flex flex-col items-center gap-6"
      >
        <div className="flex flex-col items-center gap-5">
          {/* GitHub link */}
          <a
            href="https://github.com/abelsjh"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted hover:text-accent transition-all duration-300 hover:-translate-y-1 block p-1"
            aria-label="GitHub"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.11.82-.26.82-.577v-2.234c-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22v3.293c0 .319.22.694.825.576C20.565 21.795 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>

          {/* LinkedIn link */}
          <a
            href="https://linkedin.com/in/abelsjh"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted hover:text-accent transition-all duration-300 hover:-translate-y-1 block p-1"
            aria-label="LinkedIn"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </a>

          {/* Email copy action */}
          <button
            onClick={handleCopyEmail}
            className="text-text-muted hover:text-accent transition-all duration-300 hover:-translate-y-1 block p-1 cursor-pointer"
            aria-label="Copy Email"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </button>
        </div>

        {/* Decorative line */}
        <div className="w-[1px] h-24 bg-border/60" />
      </motion.div>

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
