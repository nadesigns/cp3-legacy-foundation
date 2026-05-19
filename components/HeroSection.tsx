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

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 text-center pt-32 pb-20">

        {/* Logo centered above heading */}
        {showLogo && (
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex justify-center mb-8"
          >
            <Image
              src="/images/cp3logo.png"
              alt="CP3 Family Legacy Foundation"
              width={160}
              height={160}
              className="object-contain drop-shadow-2xl"
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
          className="uppercase text-white leading-none mb-6 drop-shadow-lg"
          style={{
            fontFamily: "var(--font-oswald), 'Arial Narrow', Arial, sans-serif",
            fontWeight: 700,
            fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
            letterSpacing: "0.04em",
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
          className="flex justify-center mb-6"
        >
          <div className="w-24 h-1 bg-gold" />
        </motion.div>

        {subheading && (
          <motion.p
            custom={showLogo ? 3 : 2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-white/85 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-medium"
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
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            {primaryCta && (
              <Link
                href={primaryCta.href}
                className="px-10 py-4 bg-gold hover:bg-gold-light text-navy font-bold uppercase tracking-[0.12em] text-sm rounded transition-all duration-200 hover:scale-105 shadow-lg"
                style={{ fontFamily: "var(--font-oswald), 'Arial Narrow', Arial, sans-serif" }}
              >
                {primaryCta.label}
              </Link>
            )}
            {secondaryCta && (
              <Link
                href={secondaryCta.href}
                className="px-10 py-4 border-2 border-white/80 text-white hover:border-gold hover:text-gold font-bold uppercase tracking-[0.12em] text-sm rounded transition-all duration-200"
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
            className="text-white/50 text-sm tracking-widest uppercase mt-12"
            style={{ fontFamily: "var(--font-inter), Arial, sans-serif", letterSpacing: "0.2em" }}
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
