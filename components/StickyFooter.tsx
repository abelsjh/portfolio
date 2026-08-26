"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function StickyFooter() {
  const currentYear = new Date().getFullYear();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowH = window.innerHeight;
      const docH = document.documentElement.scrollHeight;
      // Show footer when within ~120px of the very bottom
      setVisible(scrollY + windowH >= docH - 120);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.footer
      initial={false}
      animate={
        visible
          ? { y: 0, opacity: 1 }
          : { y: "100%", opacity: 0 }
      }
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-0 left-0 right-0 z-40 px-6 md:px-12 py-4 flex flex-col sm:flex-row items-center justify-between gap-2"
      style={{
        background: "rgba(247, 241, 232, 0.88)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderTop: "1px solid var(--border)",
      }}
    >
      <a
        href="#"
        className="serif-font text-base font-bold tracking-tight text-text hover:text-accent transition-colors duration-300"
      >
        abelsjh
      </a>
      <span className="text-xs text-text-muted">
        &copy; {currentYear} abelsjh. All rights reserved.
      </span>
    </motion.footer>
  );
}
