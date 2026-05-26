"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Event } from "@/lib/events";

interface EventCardProps {
  event: Event;
  index?: number;
}

const titleCardStyles: Record<string, { kicker: string; accent: string; gradient: string }> = {
  "fatherhood-award": {
    kicker: "Legacy Honor",
    accent: "FATHERHOOD",
    gradient: "from-[#0d1b3e] via-[#1d315f] to-[#b88a2d]",
  },
  "mvp-baseball": {
    kicker: "Summer Event",
    accent: "BASEBALL",
    gradient: "from-[#10243f] via-[#17466a] to-[#d29b2d]",
  },
  "kenya-mission": {
    kicker: "Mission Trip",
    accent: "OUTREACH",
    gradient: "from-[#0d1b3e] via-[#214636] to-[#c48b2c]",
  },
};

export default function EventCard({ event, index = 0 }: EventCardProps) {
  const titleCard = titleCardStyles[event.slug];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ scale: 1.02, boxShadow: "0 8px 40px rgba(0,0,0,0.3)" }}
      className="group relative bg-navy-mid border border-white/10 rounded-xl overflow-hidden transition-all duration-200"
    >
      {/* Gold top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gold z-10" />

      {/* Card image */}
      <div className="relative h-52 overflow-hidden">
        {event.slug === "baseball-camp" ? (
          <Image
            src="/images/NewCP3Flyer.PNG"
            alt="1Died4All Baseball Camp"
            fill
            className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
          />
        ) : titleCard ? (
          <div className={`relative flex h-full items-end bg-gradient-to-br ${titleCard.gradient} p-5`}>
            <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full border border-white/15" />
            <div className="absolute -bottom-14 -left-10 h-40 w-40 rounded-full bg-gold/20 blur-2xl transition-transform duration-500 group-hover:scale-125" />
            <div className="absolute inset-x-0 top-9 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
            <div className="relative">
              <p className="mb-2 font-ui text-[0.64rem] font-semibold uppercase tracking-[0.34em] text-gold-light/90">
                {titleCard.kicker}
              </p>
              <p className="mb-3 font-heading text-[0.68rem] uppercase tracking-[0.28em] text-white/45">
                {titleCard.accent}
              </p>
              <h3 className="max-w-[13rem] font-heading text-3xl uppercase leading-[0.95] tracking-[0.04em] text-white drop-shadow-sm transition-colors duration-300 group-hover:text-gold-light">
                {event.title}
              </h3>
            </div>
          </div>
        ) : (
          <div className="h-full bg-gradient-to-br from-navy to-navy-mid" />
        )}
      </div>

      <div className="p-6">
        {/* Status badge */}
        {event.status === "coming-soon" ? (
          <span className="inline-block px-2.5 py-0.5 bg-gray-mid/30 text-white/60 font-ui text-xs rounded uppercase tracking-wider mb-3">
            Coming Soon
          </span>
        ) : (
          <span className="inline-block px-2.5 py-0.5 bg-gold/20 text-gold font-ui text-xs rounded uppercase tracking-wider mb-3">
            Upcoming
          </span>
        )}

        <h3 className="font-heading text-xl text-white uppercase tracking-wide mb-2 group-hover:text-gold-light transition-colors">
          {event.title}
        </h3>

        <p className="font-ui text-sm text-gold mb-1">{event.date}</p>
        {event.time && <p className="font-ui text-xs text-white/50 mb-1">{event.time}</p>}
        {event.location && <p className="font-ui text-xs text-white/50 mb-4">{event.location}</p>}

        <p className="font-body text-sm text-white/70 mb-5 leading-relaxed">{event.description}</p>

        {/* Tags */}
        {event.tags && (
          <div className="flex flex-wrap gap-2 mb-5">
            {event.tags.map((tag) => (
              <span key={tag} className="px-2 py-0.5 bg-gold/10 text-gold font-ui text-xs rounded">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* CTA */}
        {event.status !== "coming-soon" && (
          event.externalUrl ? (
            <a
              href={event.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-full text-center py-2.5 bg-gold hover:bg-gold-light text-navy font-heading text-sm font-bold uppercase tracking-wider rounded transition-colors duration-200"
            >
              {event.externalCta ?? "Learn More"}
            </a>
          ) : (
            <Link
              href={event.registration ? "#camp-registration" : "#contact"}
              className="inline-block w-full text-center py-2.5 bg-gold hover:bg-gold-light text-navy font-heading text-sm font-bold uppercase tracking-wider rounded transition-colors duration-200"
            >
              {event.registration ? "Register Now" : "Learn More"}
            </Link>
          )
        )}
      </div>
    </motion.div>
  );
}
