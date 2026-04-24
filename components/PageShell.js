import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

/**
 * PageShell
 * Shared layout wrapper for all interior pages.
 * Provides Navbar, hero header, breadcrumb, content area, and Footer.
 *
 * @param {object}          props
 * @param {string}          props.label        - Small eyebrow label (e.g. "Company")
 * @param {string}          props.title        - Large page headline
 * @param {string}          props.subtitle     - Hero subtext
 * @param {React.ReactNode} props.children     - Page content
 * @param {Array}           props.breadcrumbs  - [{label, href}] — last item is current
 * @param {string}          props.accentColor  - Tailwind color for section label dot
 * @param {React.ReactNode} props.heroExtra    - Optional extra content in hero (e.g. stats row)
 */
export default function PageShell({
  label,
  title,
  subtitle,
  children,
  breadcrumbs = [],
  heroExtra,
}) {
  return (
    <div className="min-h-screen bg-white dark:bg-[#060E1A]">
      <Navbar />

      {/* ── Hero header ── */}
      <div className="bg-[#060E1A] pt-24 pb-14 relative overflow-hidden">
        {/* Grid bg */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
        {/* Glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 70% at 20% 50%, rgba(245,158,11,0.08), transparent 70%)",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          {breadcrumbs.length > 0 && (
            <nav className="flex items-center gap-1.5 mb-6 flex-wrap">
              <Link href="/" className="text-white/30 hover:text-white/60 text-xs transition-colors">
                Home
              </Link>
              {breadcrumbs.map((crumb, i) => (
                <span key={crumb.label} className="flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-white/20" />
                  {i === breadcrumbs.length - 1 ? (
                    <span className="text-white/60 text-xs">{crumb.label}</span>
                  ) : (
                    <Link href={crumb.href} className="text-white/30 hover:text-white/60 text-xs transition-colors">
                      {crumb.label}
                    </Link>
                  )}
                </span>
              ))}
            </nav>
          )}

          {/* Label */}
          {label && (
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-amber-400/80 text-xs font-semibold uppercase tracking-widest">
                {label}
              </span>
            </div>
          )}

          {/* Title */}
          <h1
            className="text-white font-black leading-none mb-4"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: "clamp(36px, 5vw, 64px)",
            }}
          >
            {title}
          </h1>

          {/* Subtitle */}
          {subtitle && (
            <p className="text-white/45 text-lg max-w-2xl leading-relaxed">
              {subtitle}
            </p>
          )}

          {/* Hero extra (stats, CTAs, etc.) */}
          {heroExtra && <div className="mt-8">{heroExtra}</div>}
        </div>
      </div>

      {/* ── Page content ── */}
      <main className="bg-gray-50 dark:bg-[#060E1A]">{children}</main>

      <Footer />
    </div>
  );
}
