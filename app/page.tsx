"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import HeroSection from "@/components/HeroSection";
import EventCard from "@/components/EventCard";
import SponsorGrid from "@/components/SponsorGrid";
import { events } from "@/lib/events";

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

const aboutCards = [
  {
    name: "Cam Pittman",
    title: "Board Director",
    phone: "757-535-9539",
    image: "/images/IMG_2501.jpeg",
    role: "Camp registration and general inquiries.",
  },
  {
    name: "Ben Stanley",
    title: "Director of Operations, 1Died4All",
    phone: "443-630-3695",
    image: "/images/IMG_2631.jpeg",
    role: "Operations and partnerships.",
  },
  {
    name: "Paul Pittman",
    title: "Founder and Board President",
    phone: "757-217-5427",
    role: "Foundation leadership.",
  },
  {
    name: 'Pastor Ronnie "Mack" McAdoo',
    title: "Board Member · Spiritual Advisor",
    image: "/images/IMG_2498.jpeg",
    role: "Provides strategic guidance, supports organizational governance, and contributes to board initiatives. Founder and CEO of 1Died4All Sports Ministry.",
  },
  {
    name: "Janet McAdoo",
    title: "Board Member · Founder and CEO",
    image: "/images/IMG_2499.jpeg",
    role: "Dedicates her life to faith, family, and ministry through 1Died4All alongside her husband, Mack.",
  },
  {
    name: "Mannie Upton",
    title: "Board Member",
    image: "/images/IMG_2500.jpeg",
    role: "Father of former Major League Baseball All-Stars BJ and Justin Upton, the only two brothers in professional sports drafted first and second overall. NSU baseball and football alumni standout athlete.",
  },
  {
    name: "Lee Banks",
    title: "Board Director",
    role: "Legendary Tidewater Phillies and Grassfield High School coach Lee Banks has been a respected name in travel baseball for 25+ years, helping develop former MLB stars like David Wright, B. J. Upton, and Justin Upton while impacting generations of players across Virginia. His most recent players include Carson Demartini (VT, Phillies), Ethan Anderson (UVA, Orioles), Fenwick Trimble (JMU, Marlins), Cam Pittman (VT), and more.",
  },
];

const partnerWebsites = [
  {
    title: "MVP Baseball Foundation",
    subtitle: "Baseball foundation partner",
    description:
      "Follow the MVP Baseball Foundation for event details, baseball development opportunities, and foundation updates.",
    href: "https://www.viableprospects.org/blank",
    cta: "Visit MVP Baseball",
  },
  {
    title: "1Died4All",
    subtitle: "Sports ministry partner",
    description:
      "Learn more about the faith-based sports ministry connected to CP3 camps, outreach events, and athlete mentorship.",
    href: "https://www.1died4all.com/",
    cta: "Visit 1Died4All",
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
  const featuredEvents = events.filter((event) => event.status === "upcoming").slice(0, 4);
  const baseballCamp = events.find((event) => event.slug === "baseball-camp");
  const campAddress = baseballCamp?.address ?? "3301 Nansemond Parkway, Suffolk, VA 23434";
  const campMapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(campAddress)}`;
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
          primaryCta={{ label: "Camp Details", href: "#camp-registration" }}
          secondaryCta={{ label: "Explore the Mission", href: "#story" }}
          bgVideo
          showLogo
        />
      </section>

      <section className="relative overflow-hidden bg-navy py-4 sm:py-5">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-6 gap-y-2 px-4 text-center sm:gap-x-8 sm:gap-y-3">
          {[
            "Faith-Based Family Foundation",
            "Sports Ministry and Outreach",
            "Serving Hampton Roads and Suffolk, VA",
          ].map((item) => (
            <p
              key={item}
              className="text-xs uppercase tracking-[0.2em] text-gold-light sm:text-base sm:tracking-[0.25em]"
              style={{ fontFamily: "var(--font-oswald), 'Arial Narrow', Arial, sans-serif", fontWeight: 500 }}
            >
              {item}
            </p>
          ))}
        </div>
      </section>

      <section id="story" className="relative overflow-hidden bg-[linear-gradient(180deg,#f4f1ec_0%,#f8f5f0_45%,#ffffff_100%)] py-18 sm:py-24">
        <div className="absolute left-0 top-24 h-56 w-56 rounded-full bg-gold/10 blur-3xl" />
        <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-navy/6 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <Eyebrow>Mission Statement</Eyebrow>
              <H2>Faith, Family, and Mentorship That Carry Beyond the Field</H2>
              <p
                className="mx-auto mb-6 max-w-3xl text-lg leading-relaxed text-navy/72"
                style={{ fontFamily: "var(--font-inter), Arial, sans-serif" }}
              >
                CP3 Family Legacy Foundation exists to connect families through faith, mentorship, athletics, and practical support. The work is not limited to events. It is an ongoing commitment to discipleship, leadership, and community care.
              </p>
              <p
                className="mx-auto mb-10 max-w-3xl text-base leading-relaxed text-navy/62"
                style={{ fontFamily: "var(--font-inter), Arial, sans-serif" }}
              >
                From youth camps to ongoing outreach, the goal is to create spaces where young people are encouraged, families are supported, and Christ remains at the center of every conversation.
              </p>
              <div className="grid gap-4 text-left md:grid-cols-3">
                {storyPillars.map((pillar) => (
                  <div key={pillar.title} className="rounded-2xl border border-navy/10 bg-white/80 px-4 py-4 shadow-[0_10px_30px_rgba(13,27,62,0.05)] sm:px-5">
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
        </div>
      </section>

      <section id="camp-registration" className="bg-white py-18 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10 text-center sm:mb-14"
          >
            <Eyebrow>Camp Registration</Eyebrow>
            <H2>1Died4All Baseball Camp Registration Is Closed</H2>
            <div className="mx-auto mb-5 h-1 w-16 bg-gold" />
            <p
              className="mx-auto max-w-3xl text-base leading-relaxed text-gray-mid"
              style={{ fontFamily: "var(--font-inter), Arial, sans-serif" }}
            >
              Online and printable registration are no longer accepting submissions. For questions about an existing registration, call the camp team.
            </p>
          </motion.div>

          <div className="grid gap-6 sm:gap-8 xl:grid-cols-[0.88fr_1.12fr] xl:items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              className="xl:sticky xl:top-28"
            >
              <div className="overflow-hidden rounded-[2rem] border border-navy/10 bg-cream shadow-[0_24px_60px_rgba(13,27,62,0.08)]">
                <div className="relative aspect-[4/5] bg-navy/5">
                  <Image
                    src="/images/NewCP3Flyer.PNG"
                    alt="Official baseball camp flyer"
                    fill
                    className="object-cover object-top"
                    sizes="(min-width: 1280px) 32vw, 100vw"
                  />
                </div>
                <div className="p-5 sm:p-7">
                  <p
                    className="mb-2 text-[0.72rem] uppercase tracking-[0.32em] text-gold"
                    style={{ fontFamily: "var(--font-inter), Arial, sans-serif" }}
                  >
                    Camp Snapshot
                  </p>
                  <h3
                    className="mb-4 text-2xl uppercase text-navy"
                    style={{ fontFamily: "var(--font-oswald), 'Arial Narrow', Arial, sans-serif", letterSpacing: "0.06em" }}
                  >
                    Free Admission. Lunch Provided. All Skill Levels Welcome.
                  </h3>
                  <div className="space-y-3 text-sm text-navy/72" style={{ fontFamily: "var(--font-inter), Arial, sans-serif" }}>
                    <p><strong>Date:</strong> {baseballCamp?.date}</p>
                    <p><strong>Time:</strong> {baseballCamp?.time}</p>
                    <p><strong>Location:</strong> {baseballCamp?.location}</p>
                    <p>
                      <strong>Address:</strong>{" "}
                      <a
                        href={campMapsHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-navy underline decoration-gold decoration-2 underline-offset-4 transition-colors hover:text-gold"
                      >
                        {campAddress}
                      </a>
                    </p>
                    <p><strong>Who it&apos;s for:</strong> Boys ages 10 to 16</p>
                  </div>
                  <div className="mt-6 flex flex-col gap-3 sm:flex-row xl:flex-col">
                    <div
                      className="inline-flex items-center justify-center rounded-full bg-navy/10 px-5 py-3 text-center text-sm font-bold uppercase text-navy/60 sm:px-6"
                      style={{ fontFamily: "var(--font-oswald), 'Arial Narrow', Arial, sans-serif", letterSpacing: "0.08em" }}
                    >
                      Registration Closed
                    </div>
                    <a
                      href="tel:757-535-9539"
                      className="inline-flex items-center justify-center rounded-full border border-navy/15 px-5 py-3 text-center text-sm font-bold uppercase text-navy transition-colors hover:border-gold hover:text-gold sm:px-6"
                      style={{ fontFamily: "var(--font-oswald), 'Arial Narrow', Arial, sans-serif", letterSpacing: "0.08em" }}
                    >
                      Questions? Call 757-535-9539
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.05 }}
              className="rounded-[2rem] border border-navy/10 bg-cream/60 p-6 shadow-[0_24px_60px_rgba(13,27,62,0.08)] sm:p-8"
            >
              <div className="flex min-h-80 flex-col justify-center text-center">
                <p
                  className="mb-3 text-[0.72rem] font-semibold uppercase tracking-[0.3em] text-gold"
                  style={{ fontFamily: "var(--font-inter), Arial, sans-serif" }}
                >
                  Registration Status
                </p>
                <h3
                  className="mb-4 text-3xl uppercase text-navy sm:text-4xl"
                  style={{ fontFamily: "var(--font-oswald), 'Arial Narrow', Arial, sans-serif", letterSpacing: "0.06em" }}
                >
                  Registration Closed
                </h3>
                <p
                  className="mx-auto mb-6 max-w-xl text-base leading-relaxed text-navy/68"
                  style={{ fontFamily: "var(--font-inter), Arial, sans-serif" }}
                >
                  We are no longer accepting new registrations for the June 16-18, 2026 baseball camp.
                  Please contact the camp team if you need help with an existing registration.
                </p>
                <a
                  href="tel:757-535-9539"
                  className="mx-auto inline-flex items-center justify-center rounded-full bg-gold px-6 py-3 text-center text-sm font-bold uppercase text-navy transition-colors hover:bg-gold-light"
                  style={{ fontFamily: "var(--font-oswald), 'Arial Narrow', Arial, sans-serif", letterSpacing: "0.08em" }}
                >
                  Call 757-535-9539
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="events" className="bg-cream py-18 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <Eyebrow>On the Field</Eyebrow>
            <H2>Featured Events</H2>
            <div className="mx-auto h-1 w-16 bg-gold" />
          </motion.div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
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

      <section id="partner-sites" className="bg-white py-18 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10 text-center sm:mb-12"
          >
            <Eyebrow>Connected Work</Eyebrow>
            <H2>Partners</H2>
            <div className="mx-auto mb-6 h-1 w-16 bg-gold" />
            <p
              className="mx-auto max-w-3xl text-base leading-relaxed text-gray-mid"
              style={{ fontFamily: "var(--font-inter), Arial, sans-serif" }}
            >
              Visit the partner organizations helping support baseball development, sports ministry, and faith-centered outreach.
            </p>
          </motion.div>

          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
            {partnerWebsites.map((site, index) => (
              <motion.a
                key={site.title}
                href={site.href}
                target="_blank"
                rel="noopener noreferrer"
                custom={index}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="group flex h-full flex-col rounded-[1.8rem] border border-navy/10 bg-cream p-6 shadow-[0_20px_48px_rgba(13,27,62,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-gold/50 sm:p-8"
              >
                <p
                  className="mb-3 text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-gold"
                  style={{ fontFamily: "var(--font-inter), Arial, sans-serif" }}
                >
                  {site.subtitle}
                </p>
                <h3
                  className="mb-3 text-2xl uppercase text-navy transition-colors group-hover:text-gold"
                  style={{ fontFamily: "var(--font-oswald), 'Arial Narrow', Arial, sans-serif", letterSpacing: "0.06em" }}
                >
                  {site.title}
                </h3>
                <p
                  className="mb-6 flex-1 text-sm leading-relaxed text-navy/68"
                  style={{ fontFamily: "var(--font-inter), Arial, sans-serif" }}
                >
                  {site.description}
                </p>
                <span
                  className="inline-flex items-center text-xs font-semibold uppercase tracking-[0.2em] text-navy transition-colors group-hover:text-gold"
                  style={{ fontFamily: "var(--font-inter), Arial, sans-serif" }}
                >
                  {site.cta} →
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="bg-white py-18 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10 text-center sm:mb-14"
          >
            <Eyebrow>About Us</Eyebrow>
            <H2>Leadership and Ministry Partners</H2>
            <div className="mx-auto mb-6 h-1 w-16 bg-gold" />
            <p
              className="mx-auto max-w-3xl text-base leading-relaxed text-gray-mid"
              style={{ fontFamily: "var(--font-inter), Arial, sans-serif" }}
            >
              Meet the people helping guide CP3 Family Legacy Foundation through sports ministry, mentorship, family outreach, and community partnerships.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {aboutCards.map((person, index) => (
              <motion.div
                key={person.name}
                custom={index}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="rounded-[1.8rem] bg-navy p-6 text-center shadow-[0_24px_54px_rgba(13,27,62,0.14)] sm:p-8"
              >
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border-2 border-gold/40 bg-gold/15 shadow-[0_12px_28px_rgba(0,0,0,0.18)]">
                  {person.image ? (
                    <Image
                      src={person.image}
                      alt={person.name}
                      width={80}
                      height={80}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span
                      className="text-lg font-bold text-gold"
                      style={{ fontFamily: "var(--font-oswald), 'Arial Narrow', Arial, sans-serif" }}
                    >
                      {person.name
                        .split(" ")
                        .slice(0, 2)
                        .map((part) => part[0])
                        .join("")}
                    </span>
                  )}
                </div>
                <h3
                  className="mb-1 text-lg uppercase text-white"
                  style={{
                    fontFamily: "var(--font-oswald), 'Arial Narrow', Arial, sans-serif",
                    fontWeight: 600,
                    letterSpacing: "0.06em",
                  }}
                >
                  {person.name}
                </h3>
                <p className="mb-1 text-xs font-medium text-gold" style={{ fontFamily: "var(--font-inter), Arial, sans-serif" }}>
                  {person.title}
                </p>
                <p className="mb-5 text-xs leading-relaxed text-white/50" style={{ fontFamily: "var(--font-inter), Arial, sans-serif" }}>
                  {person.role}
                </p>
                {person.phone && (
                  <a
                    href={`tel:${person.phone}`}
                    className="inline-block rounded-full bg-gold px-5 py-2 text-sm font-bold text-navy transition-colors hover:bg-gold-light"
                    style={{ fontFamily: "var(--font-oswald), 'Arial Narrow', Arial, sans-serif", letterSpacing: "0.05em" }}
                  >
                    {person.phone}
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="get-involved" className="bg-navy py-18 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10 text-center sm:mb-14"
          >
            <Eyebrow light>Join the Mission</Eyebrow>
            <H2 light>Get Involved</H2>
            <div className="mx-auto mb-6 h-1 w-20 bg-gold" />
            <p
              className="mx-auto max-w-xl text-base leading-relaxed text-white/60"
              style={{ fontFamily: "var(--font-inter), Arial, sans-serif" }}
            >
              Step into the mission as a volunteer, donor, or sponsor, with clear ways to support the foundation&apos;s work.
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
                  className="group flex h-full flex-col rounded-[1.8rem] border border-white/10 bg-white/6 p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:bg-gold hover:text-navy sm:p-8"
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

      <section id="contact" className="bg-cream py-18 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10 text-center sm:mb-14"
          >
            <Eyebrow>Reach Out</Eyebrow>
            <H2>Contact Us</H2>
            <div className="mx-auto h-1 w-16 bg-gold" />
          </motion.div>

          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-10">
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
                Follow Us!
        
              </h3>
              <div className="mb-5 h-[3px] w-10 bg-gold" />
              <p className="mb-4 text-sm text-gray-mid" style={{ fontFamily: "var(--font-inter), Arial, sans-serif" }}>
                Find the latest stories, event updates, and field highlights from us on Instagram.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://www.instagram.com/campittman.1"
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
                <form onSubmit={handleContact} className="space-y-4 rounded-[2rem] bg-white p-5 shadow-[0_28px_64px_rgba(13,27,62,0.08)] sm:p-7">
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
