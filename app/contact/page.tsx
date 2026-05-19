"use client";

import { useState } from "react";
import HeroSection from "@/components/HeroSection";

const contacts = [
  { name: "Cam Pittman", title: "Board Director", phone: "757-535-9539", role: "Camp Registration & General Inquiries" },
  { name: "Ben Stanley", title: "Board Member · Director of Operations, 1Died4All", phone: "443-630-3695", role: "Operations & Partnerships" },
  { name: "Paul Pittman", title: "Founder & Board President", phone: "757-217-5427", role: "Foundation Leadership" },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  const fieldCls = "w-full px-4 py-3 rounded-lg border border-gray-light bg-white font-body text-sm text-navy placeholder-gray-mid focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition";

  return (
    <>
      <HeroSection
        heading="Contact Us"
        subheading="We'd love to hear from you. Reach out to a board member or send us a message."
        minHeight="min-h-[40vh]"
        overlayClass="from-navy/95 via-navy/80 to-navy-mid/60"
      />

      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Contact cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {contacts.map((c) => (
              <div key={c.name} className="bg-navy rounded-2xl p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-4 text-gold font-heading font-bold text-xl">
                  {c.name.split(" ").slice(0, 2).map((n) => n[0]).join("")}
                </div>
                <h3 className="font-heading text-xl text-white uppercase tracking-wide mb-1">{c.name}</h3>
                <p className="font-ui text-gold text-sm mb-2">{c.title}</p>
                <p className="font-body text-white/60 text-sm mb-4">{c.role}</p>
                <a
                  href={`tel:${c.phone}`}
                  className="inline-block px-6 py-2.5 bg-gold hover:bg-gold-light text-navy font-heading font-bold text-sm uppercase tracking-wider rounded-lg transition-colors"
                >
                  {c.phone}
                </a>
              </div>
            ))}
          </div>

          {/* Social */}
          <div className="text-center mb-16">
            <p className="font-heading text-navy uppercase tracking-widest text-sm mb-3">Follow Us</p>
            <p className="font-ui text-gray-mid">
              @1Died4All on{" "}
              <a href="https://www.facebook.com/1Died4All" target="_blank" rel="noopener noreferrer" className="text-gold hover:text-navy transition-colors font-semibold">Facebook</a>
              {" "}and{" "}
              <a href="https://www.instagram.com/1Died4All" target="_blank" rel="noopener noreferrer" className="text-gold hover:text-navy transition-colors font-semibold">Instagram</a>
            </p>
          </div>

          {/* Contact form */}
          <div className="max-w-2xl mx-auto">
            <h2 className="font-heading text-3xl text-navy uppercase tracking-widest text-center mb-2">Send a Message</h2>
            <div className="w-16 h-1 bg-gold mx-auto mb-10" />

            {status === "sent" ? (
              <div className="text-center py-12">
                <div className="w-12 h-1 bg-gold mx-auto mb-6" />
                <h3 className="font-heading text-2xl text-navy uppercase tracking-wide mb-2">Message Sent!</h3>
                <p className="font-body text-gray-mid">Thank you for reaching out. We'll get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block font-ui text-sm font-semibold text-navy mb-1.5">Name *</label>
                    <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={fieldCls} placeholder="Your full name" />
                  </div>
                  <div>
                    <label className="block font-ui text-sm font-semibold text-navy mb-1.5">Email *</label>
                    <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={fieldCls} placeholder="your@email.com" />
                  </div>
                </div>
                <div>
                  <label className="block font-ui text-sm font-semibold text-navy mb-1.5">Subject *</label>
                  <input required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className={fieldCls} placeholder="What is this about?" />
                </div>
                <div>
                  <label className="block font-ui text-sm font-semibold text-navy mb-1.5">Message *</label>
                  <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className={fieldCls} placeholder="Your message…" />
                </div>
                {status === "error" && (
                  <p className="text-red-accent text-sm font-ui text-center bg-red-accent/10 rounded-lg p-3">
                    Something went wrong. Please call 757-535-9539 directly.
                  </p>
                )}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full py-4 bg-gold hover:bg-gold-light disabled:opacity-60 text-navy font-heading font-bold uppercase tracking-widest text-lg rounded-xl transition-all duration-200 hover:scale-[1.01]"
                >
                  {status === "sending" ? "Sending…" : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
