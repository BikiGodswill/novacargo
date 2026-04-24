import Link from "next/link";
import {
  Package,
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  ArrowRight,
} from "lucide-react";

const footerLinks = {
  Company: [
    { label: "About Us",           href: "/about" },
    { label: "Careers",            href: "/careers" },
    { label: "Press & Media",      href: "/press" },
    { label: "Investor Relations", href: "/investors" },
    { label: "Sustainability",     href: "/sustainability" },
  ],
  Services: [
    { label: "Express Delivery",      href: "/services/express" },
    { label: "International Air",     href: "/services/international-air" },
    { label: "Freight Services",      href: "/services/freight" },
    { label: "Warehousing",           href: "/services/warehousing" },
    { label: "E-Commerce Logistics",  href: "/services/ecommerce" },
  ],
  Support: [
    { label: "Track a Parcel",  href: "/track" },
    { label: "File a Claim",    href: "/support/claim" },
    { label: "FAQ",             href: "/support/faq" },
    { label: "Contact Us",      href: "/contact" },
    { label: "Service Alerts",  href: "/support/alerts" },
  ],
  Legal: [
    { label: "Privacy Policy",  href: "/legal/privacy" },
    { label: "Terms of Service",href: "/legal/terms" },
    { label: "Cookie Policy",   href: "/legal/cookies" },
    { label: "Accessibility",   href: "/legal/accessibility" },
  ],
};

const socialLinks = [
  { Icon: Facebook, href: "#", label: "Facebook" },
  { Icon: Twitter, href: "#", label: "Twitter" },
  { Icon: Instagram, href: "#", label: "Instagram" },
  { Icon: Linkedin, href: "#", label: "LinkedIn" },
  { Icon: Youtube, href: "#", label: "YouTube" },
];

/**
 * Footer
 * Full-width dark footer with columns, contact, social links, and newsletter signup.
 */
export default function Footer() {
  return (
    <footer className="bg-[#060E1A] border-t border-white/5">
      {/* ── Main footer content ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-12 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-2.5 w-fit">
              <div className="w-9 h-9 bg-amber-500 rounded-lg flex items-center justify-center">
                <Package className="w-5 h-5 text-[#060E1A]" strokeWidth={2.5} />
              </div>
              <span
                className="text-white font-bold text-xl"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                NOVA<span className="text-amber-400">CARGO</span>
              </span>
            </Link>

            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              Connecting businesses and people worldwide through fast, reliable,
              and secure logistics solutions since 2018.
            </p>

            {/* Contact info */}
            <div className="space-y-3">
              <a
                href="tel:+18001234567"
                className="flex items-center gap-3 text-white/50 hover:text-amber-400 transition-colors text-sm"
              >
                <Phone className="w-4 h-4 text-amber-500/70 flex-shrink-0" />
                +1 (800) 123-4567
              </a>
              <a
                href="mailto:support@novacargo.com"
                className="flex items-center gap-3 text-white/50 hover:text-amber-400 transition-colors text-sm"
              >
                <Mail className="w-4 h-4 text-amber-500/70 flex-shrink-0" />
                support@novacargo.com
              </a>
              <div className="flex items-start gap-3 text-white/50 text-sm">
                <MapPin className="w-4 h-4 text-amber-500/70 flex-shrink-0 mt-0.5" />
                <span>
                  NovaCargo HQ, Schiphol Blvd 401,
                  <br />
                  Amsterdam, Netherlands
                </span>
              </div>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-2">
              {socialLinks.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-amber-500/20 flex items-center justify-center text-white/40 hover:text-amber-400 transition-all duration-200"
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="space-y-4">
              <h4 className="text-white font-semibold text-sm tracking-wide">
                {category}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-white/45 hover:text-white/80 text-sm transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Newsletter ── */}
        <div className="mt-12 p-6 bg-white/[0.03] border border-white/[0.06] rounded-2xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h4 className="text-white font-semibold text-base">
                Stay updated with NovaCargo
              </h4>
              <p className="text-white/45 text-sm mt-1">
                Get shipping news, service alerts, and exclusive offers.
              </p>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-64 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 text-sm focus:outline-none focus:border-amber-400/50 transition-colors"
              />
              <button className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-[#060E1A] font-semibold text-sm rounded-xl transition-all duration-200 hover:shadow-glow flex items-center gap-1.5 whitespace-nowrap">
                Subscribe <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="mt-10 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs text-center sm:text-left">
            © 2024 NovaCargo B.V. All rights reserved. Registered in the Netherlands.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-white/20 text-xs">🔒 256-bit SSL Encrypted</span>
            <span className="text-white/20 text-xs">ISO 9001 Certified</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
