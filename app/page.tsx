"use client";

import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import HeroSection from "@/components/HeroSection";
import EventCard from "@/components/EventCard";
import SponsorGrid from "@/components/SponsorGrid";
import ScriptureQuote from "@/components/ScriptureQuote";
import { events } from "@/lib/events";
import { ministries } from "@/lib/ministries";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export default function HomePage() {
  const featuredEvents = events.filter((e) => e.status === "upcoming").slice(0, 3);

  return (
    <>
      {/* HERO */}
      <HeroSection
        heading="Connecting People, Potential & Purpose in Families"
        subheading="Faith-based sports ministry serving Hampton Roads and Suffolk, VA — building champions on and off the field."
        primaryCta={{ label: "Get Involved", href: "/contact" }}
        secondaryCta={{ label: "Our Story", href: "/about/leadership" }}
        scripture="For the love of Christ compels us — 2 Corinthians 5:14"
        bgVideo
        showLogo
      />

      {/* MISSION STRIP */}
      <div className="bg-navy py-6">
        <p className="font-heading text-center text-gold uppercase tracking-[0.25em] text-lg">
          Connecting People · Potential · Purpose
        </p>
      </div>

      {/* FEATURED EVENTS */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-4xl text-navy uppercase tracking-widest mb-3">
              Upcoming Events
            </h2>
            <div className="w-16 h-1 bg-gold mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredEvents.map((event, i) => (
              <EventCard key={event.slug} event={event} index={i} />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 font-ui text-sm text-navy hover:text-gold font-semibold border-b-2 border-gold pb-0.5 transition-colors"
            >
              Contact Us for More Info →
            </Link>
          </div>
        </div>
      </section>

      {/* OUR MINISTRIES */}
      <section className="py-20 bg-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-4xl text-white uppercase tracking-widest mb-3">
              Our Ministries
            </h2>
            <div className="w-16 h-1 bg-gold mx-auto" />
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {ministries.slice(0, 4).map((m, i) => (
              <motion.div
                key={m.slug}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
              >
                <div className="block bg-navy-mid border border-white/10 rounded-xl p-6 text-center h-full">
                  <div className="w-10 h-0.5 bg-gold mx-auto mb-4" />
                  <h3 className="font-heading text-lg text-white uppercase tracking-wide mb-2">
                    {m.title}
                  </h3>
                  <p className="font-body text-sm text-white/60 leading-relaxed">{m.tagline}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SCRIPTURE */}
      <div className="bg-cream">
        <ScriptureQuote
          verse="For the love of Christ compels us, because we judge thus: that if One died for all, then all died."
          reference="2 Corinthians 5:14"
        />
      </div>

      {/* GET INVOLVED */}
      <section className="py-24 bg-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <p className="text-gold text-xs font-medium tracking-[0.3em] uppercase mb-3"
              style={{ fontFamily: "var(--font-inter), Arial, sans-serif" }}>
              Join the Mission
            </p>
            <h2 className="text-white uppercase mb-4 leading-none"
              style={{
                fontFamily: "var(--font-oswald), 'Arial Narrow', Arial, sans-serif",
                fontWeight: 700,
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                letterSpacing: "0.05em",
              }}>
              Get Involved
            </h2>
            <div className="w-20 h-1 bg-gold mx-auto mb-6" />
            <p className="text-white/65 text-base max-w-xl mx-auto leading-relaxed"
              style={{ fontFamily: "var(--font-inter), Arial, sans-serif" }}>
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
                <Link
                  href="/contact"
                  className="group flex flex-col items-center text-center bg-navy-mid hover:bg-gold border border-white/10 hover:border-gold rounded-xl p-8 transition-all duration-300 h-full"
                >
                  <div className="w-10 h-[3px] bg-gold group-hover:bg-navy mb-5 transition-colors" />
                  <h3 className="text-white group-hover:text-navy uppercase mb-3 transition-colors"
                    style={{
                      fontFamily: "var(--font-oswald), 'Arial Narrow', Arial, sans-serif",
                      fontWeight: 700,
                      fontSize: "1.4rem",
                      letterSpacing: "0.08em",
                    }}>
                    {card.title}
                  </h3>
                  <p className="text-white/60 group-hover:text-navy/75 text-sm leading-relaxed mb-6 flex-1 transition-colors"
                    style={{ fontFamily: "var(--font-inter), Arial, sans-serif" }}>
                    {card.desc}
                  </p>
                  <span className="text-xs font-semibold tracking-widest uppercase text-gold group-hover:text-navy transition-colors"
                    style={{ fontFamily: "var(--font-inter), Arial, sans-serif" }}>
                    {card.cta} →
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SPONSORS */}
      <SponsorGrid />

      {/* CONTACT / SOCIAL STRIP */}
      <div className="bg-navy py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <p className="font-heading text-gold uppercase tracking-widest text-sm mb-2">Follow Us</p>
            <p className="font-ui text-white/80 text-sm">
              @1Died4All on{" "}
              <a href="https://www.facebook.com/1Died4All" target="_blank" rel="noopener noreferrer" className="text-gold hover:text-gold-light transition-colors">Facebook</a>
              {" "}and{" "}
              <a href="https://www.instagram.com/1Died4All" target="_blank" rel="noopener noreferrer" className="text-gold hover:text-gold-light transition-colors">Instagram</a>
            </p>
          </div>
          <div>
            <p className="font-heading text-gold uppercase tracking-widest text-sm mb-2">Contact Us</p>
            <p className="font-ui text-white/80 text-sm">Cam Pittman · <a href="tel:757-535-9539" className="hover:text-gold-light transition-colors">757-535-9539</a></p>
            <p className="font-ui text-white/80 text-sm">Paul Pittman · <a href="tel:757-217-5427" className="hover:text-gold-light transition-colors">757-217-5427</a></p>
          </div>
          <Link
            href="/contact"
            className="px-8 py-3 bg-gold hover:bg-gold-light text-navy font-heading font-bold uppercase tracking-wider rounded-lg transition-colors"
          >
            Get In Touch →
          </Link>
        </div>
      </div>
    </>
  );
}
