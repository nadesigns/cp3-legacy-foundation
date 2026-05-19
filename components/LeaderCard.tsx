"use client";

import { motion } from "framer-motion";
import type { TeamMember } from "@/lib/team";

interface LeaderCardProps {
  member: TeamMember;
  index?: number;
}

export default function LeaderCard({ member, index = 0 }: LeaderCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 p-8 flex flex-col items-center text-center"
    >
      {/* Avatar placeholder */}
      <div className="w-24 h-24 rounded-full bg-navy-mid flex items-center justify-center mb-5 text-gold font-heading text-2xl font-bold shrink-0">
        {member.name
          .split(" ")
          .slice(0, 2)
          .map((n) => n[0])
          .join("")}
      </div>

      <h3 className="font-heading text-xl text-navy uppercase tracking-wide mb-1">
        {member.name}
      </h3>
      <p className="font-ui text-sm text-gold font-semibold mb-4">{member.title}</p>
      <p className="font-body text-sm text-gray-mid leading-relaxed mb-4">{member.bio}</p>

      {member.phone && (
        <a
          href={`tel:${member.phone}`}
          className="font-ui text-sm text-navy hover:text-gold transition-colors"
        >
          {member.phone}
        </a>
      )}
    </motion.div>
  );
}
