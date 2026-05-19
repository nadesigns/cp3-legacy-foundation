"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Event } from "@/lib/events";

interface EventCardProps {
  event: Event;
  index?: number;
}

export default function EventCard({ event, index = 0 }: EventCardProps) {
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
            src="/images/baseball-camp-flyer.png"
            alt="1Died4All Baseball Camp"
            fill
            className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
          />
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
          <Link
            href="/contact"
            className="inline-block w-full text-center py-2.5 bg-gold hover:bg-gold-light text-navy font-heading text-sm font-bold uppercase tracking-wider rounded transition-colors duration-200"
          >
            {event.registration ? "Register Now" : "Learn More"}
          </Link>
        )}
      </div>
    </motion.div>
  );
}
