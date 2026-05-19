import HeroSection from "@/components/HeroSection";
import LeaderCard from "@/components/LeaderCard";
import { team } from "@/lib/team";

export const metadata = {
  title: "Leadership | CP3 Family Legacy Foundation",
};

export default function LeadershipPage() {
  return (
    <>
      <HeroSection
        heading="Meet Our Leadership"
        subheading="Dedicated men and women of faith committed to connecting families through purpose, sports, and community."
        minHeight="min-h-[50vh]"
        overlayClass="from-navy/95 via-navy/80 to-navy-mid/60"
      />

      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {team.map((member, i) => (
              <LeaderCard key={member.slug} member={member} index={i} />
            ))}
          </div>

          {/* Board responsibilities */}
          <div className="mt-16 max-w-3xl mx-auto bg-navy rounded-2xl p-10 text-center">
            <h3 className="font-heading text-2xl text-gold uppercase tracking-widest mb-4">
              Board Responsibilities
            </h3>
            <p className="font-body text-white/80 text-lg leading-relaxed">
              Our board members provide strategic guidance, support organizational governance,
              and contribute to board initiatives that advance the CP3 Family Legacy Foundation&apos;s
              mission of connecting people, potential, and purpose in families across Hampton Roads.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
