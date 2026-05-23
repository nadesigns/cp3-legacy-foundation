"use client";

import { motion } from "framer-motion";
import { sponsors } from "@/lib/sponsors";

export default function SponsorGrid() {
  return (
    <section className="py-16 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-3xl text-navy uppercase tracking-widest mb-3">
            Our Partners
          </h2>
          <div className="w-16 h-1 bg-gold mx-auto" />
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {sponsors.map((sponsor, i) => (
            <motion.div
              key={sponsor.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              whileHover={{ scale: 1.05 }}
              className="group flex flex-col items-center justify-center p-6 bg-white rounded-xl border border-gray-light hover:border-gold hover:shadow-lg transition-all duration-300 min-h-[120px]"
            >
              <div className="mb-4 h-[3px] w-10 bg-gold transition-all duration-300 group-hover:w-14" />
              <p className="font-heading text-sm uppercase tracking-[0.08em] text-center text-navy group-hover:text-gold transition-colors duration-300 leading-snug">
                {sponsor.name}
              </p>
              {sponsor.contact && (
                <p className="font-ui text-xs text-center text-gray-mid/60 mt-1">{sponsor.contact}</p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
