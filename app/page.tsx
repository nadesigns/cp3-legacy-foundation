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
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const storyPillars = [
  {
    title: "Faith-First Leadership",
    text: "Every camp, outreach effort, and family initiative begins with discipleship, prayer, and biblical encouragement.",
  },
  {
    title: "Sports With Purpose",
    text: "Athletics give us a trusted front door to mentorship, character formation, and long-term relationships with young people.",
  },
  {
    title: "Whole-Family Care",
    text: "The mission reaches beyond events by strengthening fathers, encouraging widows, and building healthier homes.",
  },
];

const impactStats = [
  { value: "5+", label: "Active ministry lanes" },
  { value: "3", label: "Featured 2026 events" },
  { value: "7", label: "Board and leadership voices" },
  { value: "1", label: "Shared mission across every program" },
];

const trustPoints = [
  {
    title: "Executive-Level Leadership",
    text: "Board members bring backgrounds in nonprofit leadership, counseling, college athletics, and community building.",
  },
  {
    title: "Programs Families Recognize",
    text: "From 1Died4All sports ministry to the Fatherhood Award and widow outreach, every initiative has a distinct purpose.",
  },
  {
    title: "Built for Partnerships",
    text: "The foundation is structured to work with churches, sponsors, mentors, and volunteers who want to make a visible impact.",
  },
];

const testimonials = [
  {
    quote: "CP3 creates the kind of environment where faith, discipline, and family support are all visible at the same time.",
    attribution: "Community Partner Perspective",
  },
  {
    quote: "This foundation feels personal. It does not just host events. It stays focused on building people.",
    attribution: "Volunteer Perspective",
  },
  {
    quote: "The mission is clear from the first impression: serve families well, lead with character, and keep Christ at the center.",
    attribution: "Supporter Perspective",
  },
];

const H2 = ({ children, light = false }: { children: React.ReactNode; light?: boolean }) => (
  <h2
    className={`mb-4 uppercase leading-none ${light ? "text-white" : "text-navy"}`}
    style={{
      fontFamily: "var(--font-oswald), 'Arial Narrow', Arial, sans-serif",
      fontWeight: 700,
      fontSize: "clamp(2.1rem, 4vw, 3.4rem)",
      letterSpacing: "0.05em",
    }}
  >
    {children}
  </h2>
);

const Eyebrow = ({ children, light = false }: { children: React.ReactNode; light?: boolean }) => (
  <p
    className={`mb-3 text-xs font-semibold uppercase tracking-[0.3em] ${light ? "text-gold-light" : "text-gold"}`}
    style={{ fontFamily: "var(--font-inter), Arial, sans-serif" }}
  >
    {children}
  </p>
);

export default function HomePage() {
  const featuredEvents = events.filter((event) => event.status === "upcoming").slice(0, 3);
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

      if (!res.ok) {
        throw new Error("Unable to send contact form");
      }

      setContactStatus("sent");
    } catch {
      setContactStatus("error");
    }
  };

  const fieldCls =
    "w-full rounded-2xl border border-gray-light bg-white px-4 py-3 text-sm text-navy placeholder-gray-mid transition focus:border-transparent focus:outline-none focus:ring-2 focus:ring-gold";
  const labelCls = "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-navy";

  return (
    <>
      <section id="hero">
        <HeroSection
          heading="Connecting People, Potential & Purpose in Families"
          subheading="A faith-based foundation serving Hampton Roads and Suffolk, Virginia through sports ministry, mentorship, family support, and gospel-centered community outreach."
          primaryCta={{ label: "Get Involved", href: "#get-involved" }}
          secondaryCta={{ label: "Explore the Mission", href: "#story" }}
          scripture="For the love of Christ compels us — 2 Corinthians 5:14"
          bgVideo
          showLogo
        />
      </section>

      <section className="relative overflow-hidden bg-navy py-5">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-4 text-center">
          {[
            "Faith-Based Family Foundation",
            "Sports Ministry and Outreach",
            "Serving Hampton Roads and Suffolk, VA",
          ].map((item) => (
            <p
              key={item}
              className="text-sm uppercase tracking-[0.25em] text-gold-light sm:text-base"
              style={{ fontFamily: "var(--font-oswald), 'Arial Narrow', Arial, sans-serif", fontWeight: 500 }}
            >
              {item}
            </p>
          ))}
        </div>
      </section>

      <section id="story" className="relative overflow-hidden bg-[linear-gradient(180deg,#f4f1ec_0%,#f8f5f0_45%,#ffffff_100%)] py-24">
        <div className="absolute left-0 top-24 h-56 w-56 rounded-full bg-gold/10 blur-3xl" />
        <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-navy/6 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Eyebrow>Our Story</Eyebrow>
              <H2>A Refined One-Page Home for a Mission-Driven Foundation</H2>
              <p
                className="mb-6 max-w-2xl text-lg leading-relaxed text-navy/72"
                style={{ fontFamily: "var(--font-inter), Arial, sans-serif" }}
              >
                CP3 Family Legacy Foundation exists to connect families through faith, mentorship, athletics, and practical support. The work is not limited to events. It is an ongoing commitment to discipleship, leadership, and community care.
              </p>
              <p
                className="max-w-2xl text-base leading-relaxed text-navy/62"
                style={{ fontFamily: "var(--font-inter), Arial, sans-serif" }}
              >
                This page now reads more like a premium nonprofit landing experience: stronger hierarchy, clearer story flow, and dedicated sections that help visitors understand the mission, trust the leadership, and know exactly where to engage.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="rounded-[2rem] border border-navy/10 bg-white p-8 shadow-[0_30px_80px_rgba(13,27,62,0.1)]"
            >
              <p
                className="mb-3 text-[0.7rem] uppercase tracking-[0.3em] text-gold"
                style={{ fontFamily: "var(--font-inter), Arial, sans-serif" }}
              >
                Mission Focus
              </p>
              <h3
                className="mb-5 text-3xl uppercase text-navy"
                style={{ fontFamily: "var(--font-oswald), 'Arial Narrow', Arial, sans-serif", letterSpacing: "0.06em" }}
              >
                Built Like a First-Class Ministry Brand
              </h3>
              <div className="space-y-4">
                {storyPillars.map((pillar) => (
                  <div key={pillar.title} className="rounded-2xl bg-cream px-5 py-4">
                    <p
                      className="mb-1 text-sm uppercase tracking-[0.16em] text-navy"
                      style={{ fontFamily: "var(--font-oswald), 'Arial Narrow', Arial, sans-serif", fontWeight: 600 }}
                    >
                      {pillar.title}
                    </p>
                    <p className="text-sm leading-relaxed text-navy/66" style={{ fontFamily: "var(--font-inter), Arial, sans-serif" }}>
                      {pillar.text}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {impactStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                custom={index}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                className="rounded-[1.75rem] border border-navy/10 bg-white px-6 py-7 shadow-[0_20px_50px_rgba(13,27,62,0.08)]"
              >
                <p
                  className="text-4xl uppercase text-navy"
                  style={{ fontFamily: "var(--font-oswald), 'Arial Narrow', Arial, sans-serif", letterSpacing: "0.04em" }}
                >
                  {stat.value}
                </p>
                <p className="mt-2 text-sm uppercase tracking-[0.18em] text-gray-mid" style={{ fontFamily: "var(--font-inter), Arial, sans-serif" }}>
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="events" className="bg-cream py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <Eyebrow>On the Field</Eyebrow>
            <H2>Upcoming Events</H2>
            <div className="mx-auto h-1 w-16 bg-gold" />
          </motion.div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {featuredEvents.map((event, index) => (
              <EventCard key={event.slug} event={event} index={index} />
            ))}
          </div>

          <div className="mt-10 text-center">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 border-b-2 border-gold pb-0.5 text-sm font-semibold text-navy transition-colors hover:text-gold"
              style={{ fontFamily: "var(--font-inter), Arial, sans-serif" }}
            >
              Contact the team for event details →
            </a>
          </div>
        </div>
      </section>

      <section id="ministries" className="relative overflow-hidden bg-navy py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(201,162,39,0.22),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08),transparent_22%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <Eyebrow light>What We Do</Eyebrow>
            <H2 light>Our Ministries</H2>
            <div className="mx-auto h-1 w-16 bg-gold" />
          </motion.div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {ministries.map((ministry, index) => (
              <motion.div
                key={ministry.slug}
                custom={index}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                className="rounded-[1.8rem] border border-white/10 bg-white/6 p-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-sm"
              >
                <div className="mb-5 flex items-center justify-between">
                  <div className="h-[3px] w-10 bg-gold" />
                  <span
                    className="text-[0.64rem] uppercase tracking-[0.24em] text-white/42"
                    style={{ fontFamily: "var(--font-inter), Arial, sans-serif" }}
                  >
                    Ministry
                  </span>
                </div>
                <h3
                  className="mb-3 text-xl uppercase text-white"
                  style={{ fontFamily: "var(--font-oswald), 'Arial Narrow', Arial, sans-serif", letterSpacing: "0.06em" }}
                >
                  {ministry.title}
                </h3>
                <p className="mb-4 text-sm leading-relaxed text-white/74" style={{ fontFamily: "var(--font-inter), Arial, sans-serif" }}>
                  {ministry.description}
                </p>
                <ul className="space-y-2">
                  {ministry.details.slice(0, 3).map((detail) => (
                    <li key={detail} className="flex items-start gap-2 text-sm text-white/60" style={{ fontFamily: "var(--font-inter), Arial, sans-serif" }}>
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-gold shrink-0" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="bg-cream">
        <ScriptureQuote
          verse="For the love of Christ compels us, because we judge thus: that if One died for all, then all died."
          reference="2 Corinthians 5:14"
        />
      </div>

      <section id="impact" className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <Eyebrow>Why It Connects</Eyebrow>
            <H2>Trust, Leadership, and Visible Impact</H2>
            <div className="mx-auto mb-5 h-1 w-16 bg-gold" />
            <p
              className="mx-auto max-w-2xl text-base leading-relaxed text-gray-mid"
              style={{ fontFamily: "var(--font-inter), Arial, sans-serif" }}
            >
              Premium nonprofit sites earn trust by making the organization feel established, human, and clear. This section does that with proof points, leadership visibility, and concise social trust content.
            </p>
          </motion.div>

          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="space-y-5">
              {trustPoints.map((point, index) => (
                <motion.div
                  key={point.title}
                  custom={index}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="rounded-[1.75rem] border border-navy/10 bg-cream p-7"
                >
                  <p
                    className="mb-2 text-sm uppercase tracking-[0.16em] text-navy"
                    style={{ fontFamily: "var(--font-oswald), 'Arial Narrow', Arial, sans-serif", fontWeight: 600 }}
                  >
                    {point.title}
                  </p>
                  <p className="text-sm leading-relaxed text-navy/66" style={{ fontFamily: "var(--font-inter), Arial, sans-serif" }}>
                    {point.text}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="rounded-[2rem] bg-navy p-8 text-white shadow-[0_32px_80px_rgba(13,27,62,0.18)]">
              <p
                className="mb-3 text-[0.7rem] uppercase tracking-[0.3em] text-gold-light/90"
                style={{ fontFamily: "var(--font-inter), Arial, sans-serif" }}
              >
                Community Voice
              </p>
              <div className="space-y-4">
                {testimonials.map((testimonial, index) => (
                  <motion.blockquote
                    key={testimonial.attribution}
                    custom={index}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5"
                  >
                    <p className="text-base leading-relaxed text-white/82" style={{ fontFamily: "var(--font-inter), Arial, sans-serif" }}>
                      “{testimonial.quote}”
                    </p>
                    <footer
                      className="mt-3 text-[0.7rem] uppercase tracking-[0.22em] text-gold-light/78"
                      style={{ fontFamily: "var(--font-inter), Arial, sans-serif" }}
                    >
                      {testimonial.attribution}
                    </footer>
                  </motion.blockquote>
                ))}
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.45 }}
            className="mt-14 rounded-[2rem] border border-navy/10 bg-[linear-gradient(135deg,#0d1b3e_0%,#14285c_68%,#c9a227_180%)] px-8 py-10 text-center shadow-[0_28px_60px_rgba(13,27,62,0.16)]"
          >
            <p
              className="mb-3 text-[0.72rem] uppercase tracking-[0.32em] text-gold-light/82"
              style={{ fontFamily: "var(--font-inter), Arial, sans-serif" }}
            >
              Ready to Serve With Us
            </p>
            <h3
              className="mx-auto mb-4 max-w-3xl text-3xl uppercase text-white"
              style={{ fontFamily: "var(--font-oswald), 'Arial Narrow', Arial, sans-serif", letterSpacing: "0.06em" }}
            >
              A Stronger Site Should Lead Visitors to a Stronger Next Step
            </h3>
            <p className="mx-auto max-w-2xl text-white/72" style={{ fontFamily: "var(--font-inter), Arial, sans-serif" }}>
              Whether someone wants to volunteer, sponsor an event, or ask a question, the path forward should feel immediate and well organized.
            </p>
            <div className="mt-7 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="#get-involved"
                className="inline-flex items-center rounded-full bg-gold px-7 py-3 text-sm font-bold uppercase text-navy transition-colors hover:bg-gold-light"
                style={{ fontFamily: "var(--font-oswald), 'Arial Narrow', Arial, sans-serif", letterSpacing: "0.1em" }}
              >
                Get Involved
              </a>
              <a
                href="#contact"
                className="inline-flex items-center rounded-full border border-white/30 px-7 py-3 text-sm font-bold uppercase text-white transition-colors hover:border-gold hover:text-gold"
                style={{ fontFamily: "var(--font-oswald), 'Arial Narrow', Arial, sans-serif", letterSpacing: "0.1em" }}
              >
                Contact the Foundation
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="leadership" className="bg-white pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <Eyebrow>The Team</Eyebrow>
            <H2>Meet Our Leadership</H2>
            <div className="mx-auto mb-4 h-1 w-16 bg-gold" />
            <p
              className="mx-auto max-w-2xl text-base leading-relaxed text-gray-mid"
              style={{ fontFamily: "var(--font-inter), Arial, sans-serif" }}
            >
              Dedicated leaders of faith committed to family, purpose, athletic mentorship, and community impact across Hampton Roads.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {team.map((member, index) => (
              <LeaderCard key={member.slug} member={member} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section id="get-involved" className="bg-navy py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-14 text-center"
          >
            <Eyebrow light>Join the Mission</Eyebrow>
            <H2 light>Get Involved</H2>
            <div className="mx-auto mb-6 h-1 w-20 bg-gold" />
            <p
              className="mx-auto max-w-xl text-base leading-relaxed text-white/60"
              style={{ fontFamily: "var(--font-inter), Arial, sans-serif" }}
            >
              Step into the mission as a volunteer, donor, or sponsor. Each option below now reads as a clearer conversion point for a one-page site.
            </p>
          </motion.div>

          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-3">
            {[
              { title: "Volunteer", desc: "Show up on the field, during events, and in the community with practical support.", cta: "Serve With Us" },
              { title: "Donate", desc: "Help fund camps, outreach efforts, and ministry programs that directly serve young people and families.", cta: "Give to the Mission" },
              { title: "Sponsor", desc: "Partner your church, company, or family name with visible community impact and gospel-centered work.", cta: "Become a Partner" },
            ].map((card, index) => (
              <motion.div
                key={card.title}
                custom={index}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <a
                  href="#contact"
                  className="group flex h-full flex-col rounded-[1.8rem] border border-white/10 bg-white/6 p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:bg-gold hover:text-navy"
                >
                  <div className="mb-5 h-[3px] w-12 bg-gold transition-colors group-hover:bg-navy" />
                  <h3
                    className="mb-3 text-2xl uppercase text-white transition-colors group-hover:text-navy"
                    style={{ fontFamily: "var(--font-oswald), 'Arial Narrow', Arial, sans-serif", letterSpacing: "0.07em" }}
                  >
                    {card.title}
                  </h3>
                  <p
                    className="mb-6 flex-1 text-sm leading-relaxed text-white/66 transition-colors group-hover:text-navy/76"
                    style={{ fontFamily: "var(--font-inter), Arial, sans-serif" }}
                  >
                    {card.desc}
                  </p>
                  <span
                    className="text-xs font-semibold uppercase tracking-[0.2em] text-gold transition-colors group-hover:text-navy"
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

      <section id="sponsors">
        <SponsorGrid />
      </section>

      <section id="contact" className="bg-cream py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-14 text-center"
          >
            <Eyebrow>Reach Out</Eyebrow>
            <H2>Contact Us</H2>
            <div className="mx-auto h-1 w-16 bg-gold" />
          </motion.div>

          <div className="mb-14 grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              { name: "Cam Pittman", title: "Board Director", phone: "757-535-9539", role: "Camp registration and general inquiries" },
              { name: "Ben Stanley", title: "Director of Operations, 1Died4All", phone: "443-630-3695", role: "Operations and partnerships" },
              { name: "Paul Pittman", title: "Founder and Board President", phone: "757-217-5427", role: "Foundation leadership" },
            ].map((contact, index) => (
              <motion.div
                key={contact.name}
                custom={index}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="rounded-[1.8rem] bg-navy p-8 text-center shadow-[0_24px_54px_rgba(13,27,62,0.14)]"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-gold/30 bg-gold/15">
                  <span
                    className="text-lg font-bold text-gold"
                    style={{ fontFamily: "var(--font-oswald), 'Arial Narrow', Arial, sans-serif" }}
                  >
                    {contact.name
                      .split(" ")
                      .slice(0, 2)
                      .map((part) => part[0])
                      .join("")}
                  </span>
                </div>
                <h3
                  className="mb-1 text-lg uppercase text-white"
                  style={{
                    fontFamily: "var(--font-oswald), 'Arial Narrow', Arial, sans-serif",
                    fontWeight: 600,
                    letterSpacing: "0.06em",
                  }}
                >
                  {contact.name}
                </h3>
                <p className="mb-1 text-xs font-medium text-gold" style={{ fontFamily: "var(--font-inter), Arial, sans-serif" }}>
                  {contact.title}
                </p>
                <p className="mb-5 text-xs text-white/50" style={{ fontFamily: "var(--font-inter), Arial, sans-serif" }}>
                  {contact.role}
                </p>
                <a
                  href={`tel:${contact.phone}`}
                  className="inline-block rounded-full bg-gold px-5 py-2 text-sm font-bold text-navy transition-colors hover:bg-gold-light"
                  style={{ fontFamily: "var(--font-oswald), 'Arial Narrow', Arial, sans-serif", letterSpacing: "0.05em" }}
                >
                  {contact.phone}
                </a>
              </motion.div>
            ))}
          </div>

          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 lg:grid-cols-5">
            <div className="flex flex-col justify-center lg:col-span-2">
              <h3
                className="mb-3 text-navy uppercase"
                style={{
                  fontFamily: "var(--font-oswald), 'Arial Narrow', Arial, sans-serif",
                  fontWeight: 700,
                  fontSize: "1.2rem",
                  letterSpacing: "0.08em",
                }}
              >
                Follow the Work
              </h3>
              <div className="mb-5 h-[3px] w-10 bg-gold" />
              <p className="mb-4 text-sm text-gray-mid" style={{ fontFamily: "var(--font-inter), Arial, sans-serif" }}>
                Find the latest stories, event updates, and field highlights from 1Died4All on Facebook and Instagram.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://www.facebook.com/1Died4All"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-full bg-navy px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-navy-mid"
                  style={{ fontFamily: "var(--font-inter), Arial, sans-serif" }}
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  Facebook
                </a>
                <a
                  href="https://www.instagram.com/1Died4All"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-full bg-navy px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-navy-mid"
                  style={{ fontFamily: "var(--font-inter), Arial, sans-serif" }}
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                  Instagram
                </a>
              </div>
            </div>

            <div className="lg:col-span-3">
              {contactStatus === "sent" ? (
                <div className="py-12 text-center">
                  <div className="mx-auto mb-6 h-1 w-12 bg-gold" />
                  <h3
                    className="mb-2 text-navy uppercase"
                    style={{
                      fontFamily: "var(--font-oswald), 'Arial Narrow', Arial, sans-serif",
                      fontWeight: 700,
                      fontSize: "1.4rem",
                    }}
                  >
                    Message Sent
                  </h3>
                  <p className="text-gray-mid" style={{ fontFamily: "var(--font-inter), Arial, sans-serif" }}>
                    Thank you. The foundation team will be in touch shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleContact} className="space-y-4 rounded-[2rem] bg-white p-7 shadow-[0_28px_64px_rgba(13,27,62,0.08)]">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className={labelCls} style={{ fontFamily: "var(--font-inter), Arial, sans-serif" }}>
                        Name *
                      </label>
                      <input
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className={fieldCls}
                        placeholder="Your name"
                        style={{ fontFamily: "var(--font-inter), Arial, sans-serif" }}
                      />
                    </div>
                    <div>
                      <label className={labelCls} style={{ fontFamily: "var(--font-inter), Arial, sans-serif" }}>
                        Email *
                      </label>
                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className={fieldCls}
                        placeholder="your@email.com"
                        style={{ fontFamily: "var(--font-inter), Arial, sans-serif" }}
                      />
                    </div>
                  </div>
                  <div>
                    <label className={labelCls} style={{ fontFamily: "var(--font-inter), Arial, sans-serif" }}>
                      Subject *
                    </label>
                    <input
                      required
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className={fieldCls}
                      placeholder="What can we help with?"
                      style={{ fontFamily: "var(--font-inter), Arial, sans-serif" }}
                    />
                  </div>
                  <div>
                    <label className={labelCls} style={{ fontFamily: "var(--font-inter), Arial, sans-serif" }}>
                      Message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className={fieldCls}
                      placeholder="Your message..."
                      style={{ fontFamily: "var(--font-inter), Arial, sans-serif" }}
                    />
                  </div>
                  {contactStatus === "error" && (
                    <p className="rounded-2xl bg-red-accent/10 p-3 text-sm text-red-accent" style={{ fontFamily: "var(--font-inter), Arial, sans-serif" }}>
                      Something went wrong. Please call 757-535-9539 directly.
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={contactStatus === "sending"}
                    className="w-full rounded-full bg-navy py-4 text-sm font-bold uppercase tracking-[0.16em] text-white transition-all duration-200 hover:bg-gold hover:text-navy disabled:opacity-60"
                    style={{ fontFamily: "var(--font-oswald), 'Arial Narrow', Arial, sans-serif" }}
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
