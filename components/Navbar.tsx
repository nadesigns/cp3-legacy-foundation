"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "Mission Statement", href: "#story" },
  { label: "Featured Events", href: "#events" },
  { label: "About Us", href: "#about" },
  { label: "Get Involved", href: "#get-involved" },
  { label: "Sponsors", href: "#sponsors" },
  { label: "Contact", href: "#contact" },
];

const bodyFont = "var(--font-inter), Arial, sans-serif";
const displayFont = "var(--font-oswald), 'Arial Narrow', Arial, sans-serif";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMobileOpen(false);

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50"
      animate={{
        backgroundColor: scrolled ? "rgba(8, 18, 46, 0.96)" : "rgba(9, 23, 58, 0.82)",
        boxShadow: scrolled ? "0 18px 44px rgba(3, 10, 29, 0.28)" : "0 0 0 rgba(0, 0, 0, 0)",
      }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      style={{ backdropFilter: "blur(18px)" }}
    >
      <div className="h-px bg-gradient-to-r from-transparent via-gold/80 to-transparent" />

      <div className="hidden border-b border-white/10 lg:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 text-[11px] tracking-[0.26em] text-white/65 uppercase">
          <p style={{ fontFamily: bodyFont }}>Serving Hampton Roads and Suffolk, Virginia</p>
          <div className="flex items-center gap-6" style={{ fontFamily: bodyFont }}>
            <a href="tel:7572175427" className="transition-colors hover:text-gold-light">
              Call 757.217.5427
            </a>
          </div>
        </div>
      </div>

      <nav className="mx-auto flex h-[82px] max-w-7xl items-center justify-between px-4 sm:h-[86px] sm:px-6 lg:px-6">
        <a href="#hero" onClick={closeMenu} className="flex items-center">
          <Image
            src="/images/cp3logo.png"
            alt="CP3 Family Legacy Foundation"
            width={120}
            height={120}
            className="h-[88px] w-[88px] object-contain sm:h-[104px] sm:w-[104px]"
            priority
          />
        </a>

        <div className="hidden items-center gap-6 lg:flex">
          <ul className="flex items-center">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="px-3 py-2 text-[0.82rem] font-medium text-white/84 transition-colors duration-200 hover:text-white"
                  style={{ fontFamily: bodyFont, letterSpacing: "0.03em" }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#get-involved"
            className="inline-flex items-center rounded-full border border-gold/60 bg-gold px-5 py-3 text-[0.82rem] font-bold uppercase text-navy transition-all duration-200 hover:-translate-y-0.5 hover:bg-gold-light"
            style={{ fontFamily: displayFont, letterSpacing: "0.12em" }}
          >
            Support the Mission
          </a>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/6 text-white transition-colors hover:bg-white/10 lg:hidden"
          onClick={() => setMobileOpen((open) => !open)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? (
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18 18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          )}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="border-t border-white/10 bg-navy/98 lg:hidden"
          >
            <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6">
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={closeMenu}
                      className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/4 px-4 py-3.5 text-base text-white/88 transition-all duration-200 hover:border-gold/40 hover:bg-white/8"
                      style={{ fontFamily: bodyFont }}
                    >
                      <span>{link.label}</span>
                      <span className="flex items-center gap-2 text-gold-light/80 transition-transform duration-200 group-hover:translate-x-1">
                        <span className="h-px w-5 bg-gold/70" />
                        <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m9 6 6 6-6 6" />
                        </svg>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>

              <a
                href="#get-involved"
                onClick={closeMenu}
                className="mt-5 block rounded-full bg-gold px-5 py-3 text-center text-sm font-bold uppercase text-navy"
                style={{ fontFamily: displayFont, letterSpacing: "0.12em" }}
              >
                Support the Mission
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
