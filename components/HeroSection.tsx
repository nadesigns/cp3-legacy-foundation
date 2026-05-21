"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface HeroSectionProps {
  heading: string;
  subheading?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  scripture?: string;
  overlayClass?: string;
  minHeight?: string;
  bgVideo?: boolean;
  showLogo?: boolean;
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export default function HeroSection({
  heading,
  subheading,
  primaryCta,
  secondaryCta,
  scripture,
  overlayClass = "from-black/75 via-black/60 to-navy/70",
  minHeight = "min-h-screen",
  bgVideo = false,
  showLogo = false,
}: HeroSectionProps) {
  return (
    <section
      className={`relative flex flex-col items-center justify-center ${minHeight} bg-navy overflow-hidden`}
    >
      {/* Video background */}
      {bgVideo && (
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="/images/hero-poster.jpg"
          preload="none"
        >
          <source src="/hero.webm" type="video/webm" />
          <source src="/hero.mp4" type="video/mp4" />
        </video>
      )}

      {/* Dark overlay — heavier for readability */}
      <div className={`absolute inset-0 bg-gradient-to-b ${overlayClass}`} />

      {/* Extra darkening pass for text legibility */}
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pt-28 pb-14 text-center sm:px-6 sm:pt-34 sm:pb-18">
        {/* Logo centered above heading */}
        {showLogo && (
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mb-5 flex justify-center sm:mb-6"
          >
            <Image
              src="/images/cp3logo.png"
              alt="CP3 Family Legacy Foundation"
              width={160}
              height={160}
              className="h-24 w-24 object-contain drop-shadow-2xl sm:h-32 sm:w-32"
              priority
            />
          </motion.div>
        )}

        {/* Main heading — bold, impactful, sports-style */}
        <motion.h1
          custom={showLogo ? 1 : 0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mb-4 uppercase leading-none text-white drop-shadow-lg sm:mb-5"
          style={{
            fontFamily: "var(--font-oswald), 'Arial Narrow', Arial, sans-serif",
            fontWeight: 700,
            fontSize: "clamp(2.1rem, 7.6vw, 5.2rem)",
            letterSpacing: "0.02em",
            textShadow: "0 2px 20px rgba(0,0,0,0.6)",
          }}
        >
          {heading}
        </motion.h1>

        {/* Gold divider */}
        <motion.div
          custom={showLogo ? 2 : 1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mb-5 flex justify-center sm:mb-6"
        >
          <div className="h-1 w-20 bg-gold sm:w-24" />
        </motion.div>

        {subheading && (
          <motion.p
            custom={showLogo ? 3 : 2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mx-auto mb-7 max-w-2xl text-[0.95rem] leading-relaxed font-medium text-white/85 sm:mb-8 sm:text-lg"
            style={{ fontFamily: "var(--font-inter), Arial, sans-serif", textShadow: "0 1px 8px rgba(0,0,0,0.5)" }}
          >
            {subheading}
          </motion.p>
        )}

        {(primaryCta || secondaryCta) && (
          <motion.div
            custom={showLogo ? 4 : 3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4"
          >
            {primaryCta && (
              <Link
                href={primaryCta.href}
                className="w-full rounded px-8 py-3.5 text-center text-[0.78rem] font-bold uppercase tracking-[0.11em] text-navy shadow-lg transition-all duration-200 hover:scale-105 bg-gold hover:bg-gold-light sm:w-auto sm:px-9"
                style={{ fontFamily: "var(--font-oswald), 'Arial Narrow', Arial, sans-serif" }}
              >
                {primaryCta.label}
              </Link>
            )}
            {secondaryCta && (
              <Link
                href={secondaryCta.href}
                className="w-full rounded border-2 border-white/80 px-8 py-3.5 text-center text-[0.78rem] font-bold uppercase tracking-[0.11em] text-white transition-all duration-200 hover:border-gold hover:text-gold sm:w-auto sm:px-9"
                style={{ fontFamily: "var(--font-oswald), 'Arial Narrow', Arial, sans-serif" }}
              >
                {secondaryCta.label}
              </Link>
            )}
          </motion.div>
        )}

        {scripture && (
          <motion.p
            custom={showLogo ? 5 : 4}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-8 text-[0.68rem] uppercase text-white/50 sm:mt-10 sm:text-xs"
            style={{ fontFamily: "var(--font-inter), Arial, sans-serif", letterSpacing: "0.13em" }}
          >
            {scripture}
          </motion.p>
        )}
      </div>

      {/* Bottom fade to content */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-navy/60 to-transparent" />
    </section>
  );
}
