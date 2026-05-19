"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface NavChild {
  label: string;
  href: string;
  live?: boolean;
}

interface NavLink {
  label: string;
  href: string;
  live?: boolean;
  children?: NavChild[];
}

const navLinks: NavLink[] = [
  { label: "Home", href: "#hero", live: true },
  {
    label: "About",
    href: "#about",
    live: true,
    children: [
      { label: "Leadership", href: "#about", live: true },
      { label: "Our Story", href: "#", live: false },
    ],
  },
  {
    label: "Ministries",
    href: "#ministries",
    live: true,
    children: [
      { label: "Navigator Ministry", href: "#", live: false },
      { label: "1Died4All", href: "#", live: false },
      { label: "Fatherhood Award", href: "#", live: false },
      { label: "Widow Ministry", href: "#", live: false },
      { label: "Kenya Mission Trip", href: "#", live: false },
    ],
  },
  {
    label: "Sports Events",
    href: "#events",
    live: true,
    children: [
      { label: "1Died4All Baseball — June 16–18", href: "#", live: false },
      { label: "MVP Baseball — July TBA", href: "#", live: false },
      { label: "Basketball (Coming Soon)", href: "#", live: false },
    ],
  },
  { label: "Mental Health", href: "#", live: false },
  { label: "Outreach", href: "#", live: false },
  {
    label: "Get Involved",
    href: "#get-involved",
    live: true,
    children: [
      { label: "Volunteer", href: "#", live: false },
      { label: "Donate", href: "#", live: false },
      { label: "Sponsor", href: "#", live: false },
      { label: "Register", href: "#", live: false },
    ],
  },
  { label: "Contact", href: "#contact", live: true },
];

const navLinkCls = "var(--font-inter), Arial, sans-serif";
const headingCls = "var(--font-oswald), 'Arial Narrow', Arial, sans-serif";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => {
    setMobileOpen(false);
    setOpenDropdown(null);
  };

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        backgroundColor: scrolled ? "#0D1B3E" : "rgba(13,27,62,0.93)",
        backdropFilter: "blur(8px)",
        boxShadow: scrolled ? "0 2px 24px rgba(0,0,0,0.45)" : "none",
        transition: "background-color 0.3s, box-shadow 0.3s",
      }}
    >
      {/* Gold accent line */}
      <div className="h-[3px] bg-gradient-to-r from-transparent via-gold to-transparent opacity-70" />

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-[76px]">

        {/* Logo */}
        <a href="#hero" onClick={close} className="shrink-0 flex items-center" style={{ marginTop: "-8px", marginBottom: "-8px" }}>
          <Image
            src="/images/cp3logo.png"
            alt="CP3 Family Legacy Foundation"
            width={120}
            height={120}
            className="object-contain"
            style={{ width: "120px", height: "120px" }}
            priority
          />
        </a>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center">
          {navLinks.map((link) => (
            <li key={link.label} className="relative group">
              {link.children ? (
                <>
                  {/* Parent button — scrolls to section if live */}
                  {link.live ? (
                    <a
                      href={link.href}
                      className="flex items-center gap-0.5 px-2.5 py-2 text-[11px] font-medium tracking-widest uppercase text-white/85 hover:text-gold-light transition-colors whitespace-nowrap cursor-pointer"
                      style={{ fontFamily: navLinkCls }}
                      onMouseEnter={() => setOpenDropdown(link.label)}
                      onMouseLeave={() => setOpenDropdown(null)}
                    >
                      {link.label}
                      <svg className="w-2.5 h-2.5 opacity-50 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 011.06 0L10 11.94l3.72-3.72a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.22 9.28a.75.75 0 010-1.06z" clipRule="evenodd" />
                      </svg>
                    </a>
                  ) : (
                    <button
                      className="flex items-center gap-0.5 px-2.5 py-2 text-[11px] font-medium tracking-widest uppercase text-white/40 cursor-default whitespace-nowrap select-none"
                      style={{ fontFamily: navLinkCls }}
                      onMouseEnter={() => setOpenDropdown(link.label)}
                      onMouseLeave={() => setOpenDropdown(null)}
                    >
                      {link.label}
                      <svg className="w-2.5 h-2.5 opacity-40 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 011.06 0L10 11.94l3.72-3.72a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.22 9.28a.75.75 0 010-1.06z" clipRule="evenodd" />
                      </svg>
                    </button>
                  )}
                  {link.live && (
                    <span className="absolute bottom-0 left-2.5 right-2.5 h-[2px] bg-gold scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200" />
                  )}
                  <AnimatePresence>
                    {openDropdown === link.label && (
                      <motion.ul
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 mt-1 w-56 bg-navy rounded-md shadow-2xl overflow-hidden border border-white/10"
                        onMouseEnter={() => setOpenDropdown(link.label)}
                        onMouseLeave={() => setOpenDropdown(null)}
                      >
                        {link.children.map((child) =>
                          child.live ? (
                            <li key={child.label}>
                              <a
                                href={child.href}
                                onClick={close}
                                className="block px-4 py-2.5 text-[11px] tracking-wider uppercase text-white/75 hover:text-gold-light hover:bg-white/5 transition-colors"
                                style={{ fontFamily: navLinkCls }}
                              >
                                {child.label}
                              </a>
                            </li>
                          ) : (
                            <li key={child.label}>
                              <span className="flex items-center justify-between px-4 py-2.5 text-[11px] tracking-wider uppercase text-white/30 cursor-default select-none" style={{ fontFamily: navLinkCls }}>
                                {child.label}
                                <span className="text-[9px] text-white/20">Soon</span>
                              </span>
                            </li>
                          )
                        )}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </>
              ) : link.live ? (
                <>
                  <a
                    href={link.href}
                    onClick={close}
                    className="block px-2.5 py-2 text-[11px] font-medium tracking-widest uppercase text-white/85 hover:text-gold-light transition-colors whitespace-nowrap"
                    style={{ fontFamily: navLinkCls }}
                  >
                    {link.label}
                  </a>
                  <span className="absolute bottom-0 left-2.5 right-2.5 h-[2px] bg-gold scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200" />
                </>
              ) : (
                <span className="block px-2.5 py-2 text-[11px] tracking-widest uppercase text-white/35 cursor-default select-none whitespace-nowrap" style={{ fontFamily: navLinkCls }}>
                  {link.label}
                </span>
              )}
            </li>
          ))}
        </ul>

        {/* Donate CTA + mobile toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#contact"
            onClick={close}
            className="hidden sm:inline-flex items-center px-4 py-2 bg-gold hover:bg-gold-light text-navy text-[11px] font-bold tracking-widest uppercase rounded transition-colors duration-200 whitespace-nowrap"
            style={{ fontFamily: headingCls }}
          >
            Donate
          </a>
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile slide-in */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.25 }}
            className="fixed inset-0 top-[79px] bg-navy z-40 overflow-y-auto lg:hidden"
          >
            <ul className="p-6 space-y-1">
              {navLinks.map((link) => (
                <li key={link.label}>
                  {link.children ? (
                    <details className="group">
                      <summary className="flex items-center justify-between py-3 text-sm font-semibold tracking-widest uppercase text-white cursor-pointer list-none border-b border-white/10" style={{ fontFamily: navLinkCls }}>
                        {link.live ? link.label : <span className="text-white/35">{link.label}</span>}
                        <svg className="w-4 h-4 opacity-50 group-open:rotate-180 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 011.06 0L10 11.94l3.72-3.72a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.22 9.28a.75.75 0 010-1.06z" clipRule="evenodd" />
                        </svg>
                      </summary>
                      <ul className="pl-4 mt-1 space-y-1">
                        {link.children.map((child) =>
                          child.live ? (
                            <li key={child.label}>
                              <a href={child.href} onClick={close} className="block py-2.5 text-xs tracking-wider uppercase text-white/65 hover:text-gold-light" style={{ fontFamily: navLinkCls }}>
                                {child.label}
                              </a>
                            </li>
                          ) : (
                            <li key={child.label}>
                              <span className="flex items-center justify-between py-2.5 text-xs tracking-wider uppercase text-white/25 cursor-default" style={{ fontFamily: navLinkCls }}>
                                {child.label}
                                <span className="text-[9px] text-white/20">Soon</span>
                              </span>
                            </li>
                          )
                        )}
                      </ul>
                    </details>
                  ) : link.live ? (
                    <a href={link.href} onClick={close} className="block py-3 text-sm font-semibold tracking-widest uppercase text-white border-b border-white/10 hover:text-gold-light" style={{ fontFamily: navLinkCls }}>
                      {link.label}
                    </a>
                  ) : (
                    <div className="flex items-center justify-between py-3 border-b border-white/10">
                      <span className="text-sm font-semibold tracking-widest uppercase text-white/30 cursor-default" style={{ fontFamily: navLinkCls }}>{link.label}</span>
                      <span className="text-[9px] text-white/20 uppercase tracking-wider">Soon</span>
                    </div>
                  )}
                </li>
              ))}
              <li className="pt-4">
                <a href="#contact" onClick={close} className="block text-center py-3 bg-gold hover:bg-gold-light text-navy text-sm font-bold tracking-widest uppercase rounded" style={{ fontFamily: headingCls }}>
                  Contact Us
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
