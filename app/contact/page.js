import PageShell from "@/components/PageShell";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  Users,
  Truck,
} from "lucide-react";

const offices = [
  {
    city: "Amsterdam (HQ)",
    address: "Schiphol Blvd 401, 1118 BJ Schiphol",
    phone: "+31 20 800 1234",
    email: "amsterdam@novacargo.com",
  },
  {
    city: "Dubai",
    address: "DIFC Gate Building, Level 14, Dubai",
    phone: "+971 4 800 5678",
    email: "dubai@novacargo.com",
  },
  {
    city: "Singapore",
    address: "One Raffles Quay, #20-01, Singapore 048583",
    phone: "+65 6800 9012",
    email: "singapore@novacargo.com",
  },
  {
    city: "New York",
    address: "1 World Trade Center, Suite 8500, NY 10007",
    phone: "+1 (212) 800-3456",
    email: "newyork@novacargo.com",
  },
];

const channels = [
  {
    icon: MessageSquare,
    title: "Live Chat",
    desc: "Chat with our support team instantly — average response time under 90 seconds.",
    hours: "24/7",
    cta: "Start Chat",
    href: "#",
  },
  {
    icon: Phone,
    title: "Phone Support",
    desc: "Speak to a real person immediately. Available in English, Dutch, Arabic, and 15 other languages.",
    hours: "24/7",
    cta: "Call Now",
    href: "tel:+18001234567",
  },
  {
    icon: Mail,
    title: "Email Support",
    desc: "Detailed queries handled within 4 hours by our specialist team.",
    hours: "Response in < 4 hrs",
    cta: "Send Email",
    href: "mailto:support@novacargo.com",
  },
  {
    icon: Users,
    title: "Business Sales",
    desc: "Custom pricing, SLAs, and dedicated account management for high-volume shippers.",
    hours: "Mon–Fri 9–6 CET",
    cta: "Talk to Sales",
    href: "mailto:sales@novacargo.com",
  },
];

export const metadata = { title: "Contact Us — NovaCargo" };

export default function ContactPage() {
  return (
    <PageShell
      label="Support"
      title="CONTACT US"
      subtitle="We're here whenever you need us — 24 hours a day, 7 days a week, in 18 languages. Pick the channel that works best for you."
      breadcrumbs={[{ label: "Contact Us", href: "/contact" }]}
    >
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Channels */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
          {channels.map((c) => {
            const Icon = c.icon;
            return (
              <div
                key={c.title}
                className="bg-white dark:bg-[#0D1F35] rounded-2xl p-6 border border-gray-100 dark:border-white/[0.06] shadow-sm flex flex-col"
              >
                <div className="w-11 h-11 bg-amber-50 dark:bg-amber-400/10 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-amber-500" />
                </div>
                <h3 className="text-gray-900 dark:text-white font-bold text-base mb-1">
                  {c.title}
                </h3>
                <div className="flex items-center gap-1.5 mb-3">
                  <Clock className="w-3 h-3 text-green-500" />
                  <span className="text-green-600 dark:text-green-400 text-xs font-medium">
                    {c.hours}
                  </span>
                </div>
                <p className="text-gray-500 dark:text-white/40 text-sm leading-relaxed flex-1 mb-5">
                  {c.desc}
                </p>
                <a
                  href={c.href}
                  className="block text-center py-2.5 bg-amber-500 hover:bg-amber-400 text-[#060E1A] font-bold text-sm rounded-xl transition-all hover:shadow-glow"
                >
                  {c.cta}
                </a>
              </div>
            );
          })}
        </div>

        {/* Contact form + offices */}
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="bg-white dark:bg-[#0D1F35] rounded-2xl p-8 border border-gray-100 dark:border-white/[0.06] shadow-sm">
            <h2
              className="text-gray-900 dark:text-white font-black text-2xl mb-6"
              style={{ fontFamily: "'Barlow Condensed',sans-serif" }}
            >
              SEND US A MESSAGE
            </h2>
            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  ["First Name", "Jane"],
                  ["Last Name", "Smith"],
                ].map(([l, p]) => (
                  <div key={l}>
                    <label className="text-gray-500 dark:text-white/40 text-xs uppercase tracking-wider font-semibold block mb-1.5">
                      {l}
                    </label>
                    <input
                      type="text"
                      placeholder={p}
                      className="w-full px-4 py-2.5 bg-gray-50 dark:bg-white/[0.04] border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/20 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
                    />
                  </div>
                ))}
              </div>
              {[
                ["Email Address", "jane@company.com", "email"],
                ["Subject", "How can we help?", "text"],
              ].map(([l, p, t]) => (
                <div key={l}>
                  <label className="text-gray-500 dark:text-white/40 text-xs uppercase tracking-wider font-semibold block mb-1.5">
                    {l}
                  </label>
                  <input
                    type={t}
                    placeholder={p}
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-white/[0.04] border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/20 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
                  />
                </div>
              ))}
              <div>
                <label className="text-gray-500 dark:text-white/40 text-xs uppercase tracking-wider font-semibold block mb-1.5">
                  Message
                </label>
                <textarea
                  rows={5}
                  placeholder="Tell us how we can help you…"
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-white/[0.04] border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/20 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all resize-none"
                />
              </div>
              <button className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-[#060E1A] font-bold text-sm rounded-xl transition-all hover:shadow-glow">
                Send Message
              </button>
            </div>
          </div>

          <div>
            <h2
              className="text-gray-900 dark:text-white font-black text-2xl mb-6"
              style={{ fontFamily: "'Barlow Condensed',sans-serif" }}
            >
              OUR OFFICES
            </h2>
            <div className="space-y-4">
              {offices.map((o) => (
                <div
                  key={o.city}
                  className="bg-white dark:bg-[#0D1F35] rounded-2xl p-5 border border-gray-100 dark:border-white/[0.06] shadow-sm"
                >
                  <p className="text-gray-900 dark:text-white font-bold text-sm mb-3">
                    {o.city}
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2.5 text-gray-500 dark:text-white/40 text-xs">
                      <MapPin className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-amber-500" />
                      {o.address}
                    </div>
                    <a
                      href={`tel:${o.phone}`}
                      className="flex items-center gap-2.5 text-gray-500 dark:text-white/40 text-xs hover:text-amber-500 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 flex-shrink-0 text-amber-500" />
                      {o.phone}
                    </a>
                    <a
                      href={`mailto:${o.email}`}
                      className="flex items-center gap-2.5 text-gray-500 dark:text-white/40 text-xs hover:text-amber-500 transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5 flex-shrink-0 text-amber-500" />
                      {o.email}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
