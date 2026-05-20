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

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 text-center pt-32 pb-16 sm:pt-40 sm:pb-20">
        {/* Logo centered above heading */}
        {showLogo && (
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mb-6 flex justify-center sm:mb-8"
          >
            <Image
              src="/images/cp3logo.png"
              alt="CP3 Family Legacy Foundation"
              width={160}
              height={160}
              className="h-28 w-28 object-contain drop-shadow-2xl sm:h-40 sm:w-40"
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
          className="mb-5 uppercase leading-none text-white drop-shadow-lg sm:mb-6"
          style={{
            fontFamily: "var(--font-oswald), 'Arial Narrow', Arial, sans-serif",
            fontWeight: 700,
            fontSize: "clamp(2.45rem, 9vw, 6rem)",
            letterSpacing: "0.03em",
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
            className="mx-auto mb-8 max-w-3xl text-base leading-relaxed font-medium text-white/85 sm:mb-10 sm:text-xl"
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
                className="w-full rounded px-8 py-4 text-center text-sm font-bold uppercase tracking-[0.12em] text-navy shadow-lg transition-all duration-200 hover:scale-105 bg-gold hover:bg-gold-light sm:w-auto sm:px-10"
                style={{ fontFamily: "var(--font-oswald), 'Arial Narrow', Arial, sans-serif" }}
              >
                {primaryCta.label}
              </Link>
            )}
            {secondaryCta && (
              <Link
                href={secondaryCta.href}
                className="w-full rounded border-2 border-white/80 px-8 py-4 text-center text-sm font-bold uppercase tracking-[0.12em] text-white transition-all duration-200 hover:border-gold hover:text-gold sm:w-auto sm:px-10"
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
            className="mt-10 text-xs uppercase text-white/50 sm:mt-12 sm:text-sm"
            style={{ fontFamily: "var(--font-inter), Arial, sans-serif", letterSpacing: "0.16em" }}
          >
            {scripture}
          </motion.p>
        )}

        <motion.div
          custom={showLogo ? 6 : 5}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-10 grid gap-3 sm:mt-12 sm:grid-cols-3"
        >
          {[
            "Sports ministry and discipleship",
            "Family support and outreach",
            "Leadership rooted in faith",
          ].map((item) => (
            <div
              key={item}
              className="rounded-[1.4rem] border border-white/12 bg-white/7 px-4 py-3.5 backdrop-blur-sm"
            >
              <p
                className="text-[0.7rem] uppercase text-white/74 sm:text-xs"
                style={{
                  fontFamily: "var(--font-inter), Arial, sans-serif",
                  letterSpacing: "0.14em",
                }}
              >
                {item}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade to content */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-navy/60 to-transparent" />
    </section>
  );
}
