"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

interface ScriptureQuoteProps {
  verse: string;
  reference: string;
  dark?: boolean;
}

export default function ScriptureQuote({ verse, reference, dark = false }: ScriptureQuoteProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="flex flex-col items-center text-center py-16 px-4"
    >
      <div className="w-16 h-0.5 bg-gold mb-8" />
      <blockquote
        className={`font-scripture italic text-2xl sm:text-3xl max-w-3xl leading-relaxed mb-6 ${
          dark ? "text-white/90" : "text-navy"
        }`}
      >
        &ldquo;{verse}&rdquo;
      </blockquote>
      <cite
        className={`font-ui text-sm uppercase tracking-widest not-italic ${
          dark ? "text-gold" : "text-gold"
        }`}
      >
        — {reference}
      </cite>
      <div className="w-16 h-0.5 bg-gold mt-8" />
    </motion.div>
  );
}
