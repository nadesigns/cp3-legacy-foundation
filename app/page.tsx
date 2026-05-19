"use client";

import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import HeroSection from "@/components/HeroSection";
import EventCard from "@/components/EventCard";
import SponsorGrid from "@/components/SponsorGrid";
import ScriptureQuote from "@/components/ScriptureQuote";
import LeaderCard from "@/components/LeaderCard";
import { events } from "@/lib/events";
import { ministries } from "@/lib/ministries";
import { team } from "@/lib/team";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const H2 = ({ children, light = false }: { children: React.ReactNode; light?: boolean }) => (
  <h2
    className={`uppercase leading-none mb-4 ${light ? "text-white" : "text-navy"}`}
    style={{
      fontFamily: "var(--font-oswald), 'Arial Narrow', Arial, sans-serif",
      fontWeight: 700,
      fontSize: "clamp(1.9rem, 4vw, 3rem)",
      letterSpacing: "0.05em",
    }}
  >
    {children}
  </h2>
);

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <p
    className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-3"
    style={{ fontFamily: "var(--font-inter), Arial, sans-serif" }}
  >
    {children}
  </p>
);

export default function HomePage() {
  const featuredEvents = events.filter((e) => e.status === "upcoming").slice(0, 3);

  // Contact form state
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [contactStatus, setContactStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleContact = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setContactStatus("sent");
    } catch {
      setContactStatus("error");
    }
  };

  const fieldCls = "w-full px-4 py-3 rounded border border-gray-light bg-white text-sm text-navy placeholder-gray-mid focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition";
  const labelCls = "block text-xs font-semibold tracking-wider uppercase text-navy mb-1.5";

  return (
    <>
      {/* ─── HERO ─────────────────────────────────────────── */}
      <section id="hero">
        <HeroSection
          heading="Connecting People, Potential & Purpose in Families"
          subheading="Faith-based sports ministry serving Hampton Roads and Suffolk, VA — building champions on and off the field."
          primaryCta={{ label: "Get Involved", href: "#get-involved" }}
          secondaryCta={{ label: "Our Story", href: "#about" }}
          scripture="For the love of Christ compels us — 2 Corinthians 5:14"
          bgVideo
          showLogo
        />
      </section>

      {/* ─── MISSION STRIP ────────────────────────────────── */}
      <div className="bg-navy py-5">
        <p
          className="text-center text-gold uppercase tracking-[0.22em] text-base"
          style={{ fontFamily: "var(--font-oswald), 'Arial Narrow', Arial, sans-serif", fontWeight: 600 }}
        >
          Connecting People · Potential · Purpose
        </p>
      </div>

      {/* ─── EVENTS ───────────────────────────────────────── */}
      <section id="events" className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <Eyebrow>On the Field</Eyebrow>
            <H2>Upcoming Events</H2>
            <div className="w-16 h-1 bg-gold mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredEvents.map((event, i) => (
              <EventCard key={event.slug} event={event} index={i} />
            ))}
          </div>

          <div className="text-center mt-10">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-sm text-navy hover:text-gold font-semibold border-b-2 border-gold pb-0.5 transition-colors"
              style={{ fontFamily: "var(--font-inter), Arial, sans-serif" }}
            >
              Contact Us for More Info →
            </a>
          </div>
        </div>
      </section>

      {/* ─── MINISTRIES ───────────────────────────────────── */}
      <section id="ministries" className="py-20 bg-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <Eyebrow>What We Do</Eyebrow>
            <H2 light>Our Ministries</H2>
            <div className="w-16 h-1 bg-gold mx-auto" />
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {ministries.slice(0, 4).map((m, i) => (
              <motion.div
                key={m.slug}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                className="bg-navy-mid border border-white/10 rounded-xl p-6 text-center"
              >
                <div className="w-8 h-[3px] bg-gold mx-auto mb-4" />
                <h3
                  className="text-white uppercase mb-2"
                  style={{
                    fontFamily: "var(--font-oswald), 'Arial Narrow', Arial, sans-serif",
                    fontWeight: 600,
                    fontSize: "1rem",
                    letterSpacing: "0.06em",
                  }}
                >
                  {m.title}
                </h3>
                <p
                  className="text-white/55 text-xs leading-relaxed"
                  style={{ fontFamily: "var(--font-inter), Arial, sans-serif" }}
                >
                  {m.tagline}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SCRIPTURE ────────────────────────────────────── */}
      <div className="bg-cream">
        <ScriptureQuote
          verse="For the love of Christ compels us, because we judge thus: that if One died for all, then all died."
          reference="2 Corinthians 5:14"
        />
      </div>

      {/* ─── ABOUT / LEADERSHIP ───────────────────────────── */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <Eyebrow>The Team</Eyebrow>
            <H2>Meet Our Leadership</H2>
            <div className="w-16 h-1 bg-gold mx-auto mb-4" />
            <p
              className="text-gray-mid text-base max-w-2xl mx-auto leading-relaxed"
              style={{ fontFamily: "var(--font-inter), Arial, sans-serif" }}
            >
              Dedicated men and women of faith committed to connecting families through
              purpose, sports, and community across Hampton Roads.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {team.map((member, i) => (
              <LeaderCard key={member.slug} member={member} index={i} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-14 max-w-3xl mx-auto bg-navy rounded-2xl p-10 text-center"
          >
            <h3
              className="text-gold uppercase mb-4"
              style={{
                fontFamily: "var(--font-oswald), 'Arial Narrow', Arial, sans-serif",
                fontWeight: 700,
                fontSize: "1.4rem",
                letterSpacing: "0.08em",
              }}
            >
              Board Responsibilities
            </h3>
            <p
              className="text-white/75 text-base leading-relaxed"
              style={{ fontFamily: "var(--font-inter), Arial, sans-serif" }}
            >
              Our board members provide strategic guidance, support organizational governance,
              and contribute to initiatives that advance the CP3 Family Legacy Foundation&apos;s
              mission of connecting people, potential, and purpose in families across Hampton Roads.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── GET INVOLVED ─────────────────────────────────── */}
      <section id="get-involved" className="py-24 bg-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <Eyebrow>Join the Mission</Eyebrow>
            <H2 light>Get Involved</H2>
            <div className="w-20 h-1 bg-gold mx-auto mb-6" />
            <p
              className="text-white/60 text-base max-w-xl mx-auto leading-relaxed"
              style={{ fontFamily: "var(--font-inter), Arial, sans-serif" }}
            >
              Step up for your community. Volunteer your time, fuel the mission with a donation,
              or partner with us as a sponsor.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { title: "Volunteer", desc: "Show up and make an impact on the field and in the community.", cta: "Sign Up" },
              { title: "Donate", desc: "Every dollar goes directly to programs that change young lives.", cta: "Give Now" },
              { title: "Sponsor", desc: "Align your brand with a mission that matters.", cta: "Partner With Us" },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <a
                  href="#contact"
                  className="group flex flex-col items-center text-center bg-navy-mid hover:bg-gold border border-white/10 hover:border-gold rounded-xl p-8 transition-all duration-300 h-full"
                >
                  <div className="w-10 h-[3px] bg-gold group-hover:bg-navy mb-5 transition-colors" />
                  <h3
                    className="text-white group-hover:text-navy uppercase mb-3 transition-colors"
                    style={{
                      fontFamily: "var(--font-oswald), 'Arial Narrow', Arial, sans-serif",
                      fontWeight: 700,
                      fontSize: "1.4rem",
                      letterSpacing: "0.08em",
                    }}
                  >
                    {card.title}
                  </h3>
                  <p
                    className="text-white/60 group-hover:text-navy/75 text-sm leading-relaxed mb-6 flex-1 transition-colors"
                    style={{ fontFamily: "var(--font-inter), Arial, sans-serif" }}
                  >
                    {card.desc}
                  </p>
                  <span
                    className="text-xs font-semibold tracking-widest uppercase text-gold group-hover:text-navy transition-colors"
                    style={{ fontFamily: "var(--font-inter), Arial, sans-serif" }}
                  >
                    {card.cta} →
                  </span>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SPONSORS ─────────────────────────────────────── */}
      <section id="sponsors">
        <SponsorGrid />
      </section>

      {/* ─── CONTACT ──────────────────────────────────────── */}
      <section id="contact" className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <Eyebrow>Reach Out</Eyebrow>
            <H2>Contact Us</H2>
            <div className="w-16 h-1 bg-gold mx-auto" />
          </motion.div>

          {/* Contact cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
            {[
              { name: "Cam Pittman", title: "Board Director", phone: "757-535-9539", role: "Camp Registration & General Inquiries" },
              { name: "Ben Stanley", title: "Director of Operations, 1Died4All", phone: "443-630-3695", role: "Operations & Partnerships" },
              { name: "Paul Pittman", title: "Founder & Board President", phone: "757-217-5427", role: "Foundation Leadership" },
            ].map((c, i) => (
              <motion.div
                key={c.name}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="bg-navy rounded-2xl p-8 text-center"
              >
                <div className="w-14 h-14 rounded-full bg-gold/15 border border-gold/30 flex items-center justify-center mx-auto mb-4">
                  <span
                    className="text-gold font-bold text-lg"
                    style={{ fontFamily: "var(--font-oswald), 'Arial Narrow', Arial, sans-serif" }}
                  >
                    {c.name.split(" ").slice(0, 2).map((n) => n[0]).join("")}
                  </span>
                </div>
                <h3
                  className="text-white uppercase mb-1"
                  style={{
                    fontFamily: "var(--font-oswald), 'Arial Narrow', Arial, sans-serif",
                    fontWeight: 600,
                    fontSize: "1.1rem",
                    letterSpacing: "0.06em",
                  }}
                >
                  {c.name}
                </h3>
                <p className="text-gold text-xs font-medium mb-1" style={{ fontFamily: "var(--font-inter), Arial, sans-serif" }}>{c.title}</p>
                <p className="text-white/50 text-xs mb-5" style={{ fontFamily: "var(--font-inter), Arial, sans-serif" }}>{c.role}</p>
                <a
                  href={`tel:${c.phone}`}
                  className="inline-block px-5 py-2 bg-gold hover:bg-gold-light text-navy text-sm font-bold rounded transition-colors"
                  style={{ fontFamily: "var(--font-oswald), 'Arial Narrow', Arial, sans-serif", letterSpacing: "0.05em" }}
                >
                  {c.phone}
                </a>
              </motion.div>
            ))}
          </div>

          {/* Social + contact form side by side */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 max-w-5xl mx-auto">
            {/* Social */}
            <div className="lg:col-span-2 flex flex-col justify-center">
              <h3
                className="text-navy uppercase mb-3"
                style={{
                  fontFamily: "var(--font-oswald), 'Arial Narrow', Arial, sans-serif",
                  fontWeight: 700,
                  fontSize: "1.2rem",
                  letterSpacing: "0.08em",
                }}
              >
                Follow Us
              </h3>
              <div className="w-10 h-[3px] bg-gold mb-5" />
              <p className="text-gray-mid text-sm mb-4" style={{ fontFamily: "var(--font-inter), Arial, sans-serif" }}>
                @1Died4All on Facebook and Instagram for the latest updates, events, and stories from the field.
              </p>
              <div className="flex gap-4">
                <a href="https://www.facebook.com/1Died4All" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-navy text-white text-xs font-semibold rounded hover:bg-navy-mid transition-colors"
                  style={{ fontFamily: "var(--font-inter), Arial, sans-serif" }}>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  Facebook
                </a>
                <a href="https://www.instagram.com/1Died4All" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-navy text-white text-xs font-semibold rounded hover:bg-navy-mid transition-colors"
                  style={{ fontFamily: "var(--font-inter), Arial, sans-serif" }}>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                  Instagram
                </a>
              </div>
            </div>

            {/* Contact form */}
            <div className="lg:col-span-3">
              {contactStatus === "sent" ? (
                <div className="text-center py-12">
                  <div className="w-12 h-1 bg-gold mx-auto mb-6" />
                  <h3
                    className="text-navy uppercase mb-2"
                    style={{
                      fontFamily: "var(--font-oswald), 'Arial Narrow', Arial, sans-serif",
                      fontWeight: 700,
                      fontSize: "1.4rem",
                    }}
                  >
                    Message Sent!
                  </h3>
                  <p className="text-gray-mid" style={{ fontFamily: "var(--font-inter), Arial, sans-serif" }}>
                    Thank you — we&apos;ll be in touch shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleContact} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls} style={{ fontFamily: "var(--font-inter), Arial, sans-serif" }}>Name *</label>
                      <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={fieldCls} placeholder="Your name" style={{ fontFamily: "var(--font-inter), Arial, sans-serif" }} />
                    </div>
                    <div>
                      <label className={labelCls} style={{ fontFamily: "var(--font-inter), Arial, sans-serif" }}>Email *</label>
                      <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={fieldCls} placeholder="your@email.com" style={{ fontFamily: "var(--font-inter), Arial, sans-serif" }} />
                    </div>
                  </div>
                  <div>
                    <label className={labelCls} style={{ fontFamily: "var(--font-inter), Arial, sans-serif" }}>Subject *</label>
                    <input required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className={fieldCls} placeholder="What can we help with?" style={{ fontFamily: "var(--font-inter), Arial, sans-serif" }} />
                  </div>
                  <div>
                    <label className={labelCls} style={{ fontFamily: "var(--font-inter), Arial, sans-serif" }}>Message *</label>
                    <textarea required rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className={fieldCls} placeholder="Your message..." style={{ fontFamily: "var(--font-inter), Arial, sans-serif" }} />
                  </div>
                  {contactStatus === "error" && (
                    <p className="text-red-accent text-sm bg-red-accent/10 rounded p-3" style={{ fontFamily: "var(--font-inter), Arial, sans-serif" }}>
                      Something went wrong. Please call 757-535-9539 directly.
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={contactStatus === "sending"}
                    className="w-full py-4 bg-navy hover:bg-gold disabled:opacity-60 text-white hover:text-navy font-bold uppercase tracking-widest text-sm rounded transition-all duration-200"
                    style={{ fontFamily: "var(--font-oswald), 'Arial Narrow', Arial, sans-serif", letterSpacing: "0.1em" }}
                  >
                    {contactStatus === "sending" ? "Sending..." : "Send Message"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
