"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Package,
  Menu,
  X,
  Moon,
  Sun,
  Globe,
  ChevronDown,
} from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/track", label: "Track Parcel" },
  { href: "/dashboard", label: "Dashboard" },
];

const serviceLinks = [
  { label: "Express Delivery", desc: "Next-day guaranteed" },
  { label: "International Air", desc: "Global coverage" },
  { label: "Freight Services", desc: "Heavy cargo solutions" },
  { label: "E-Commerce Logistics", desc: "Scale your store" },
];

/**
 * Navbar
 * Sticky top navigation with dark mode toggle, mobile hamburger, and services dropdown.
 */
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();

  // Detect initial theme
  useEffect(() => {
    const saved = localStorage.getItem("novacargo-theme");
    if (saved === "dark" || (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      setIsDark(true);
    }
  }, []);

  // Handle scroll shadow
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("novacargo-theme", next ? "dark" : "light");
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#060E1A]/95 backdrop-blur-lg shadow-lg border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* ── Logo ── */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative w-9 h-9 bg-amber-500 rounded-lg flex items-center justify-center shadow-glow group-hover:bg-amber-400 transition-colors">
              <Package className="w-5 h-5 text-[#060E1A]" strokeWidth={2.5} />
            </div>
            <span
              className="text-white font-bold text-xl tracking-tight"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.02em" }}
            >
              NOVA<span className="text-amber-400">CARGO</span>
            </span>
          </Link>

          {/* ── Desktop Nav ── */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  pathname === link.href
                    ? "text-amber-400 bg-white/5"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Services dropdown */}
            <div className="relative">
              <button
                className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 transition-all duration-200"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                Services <ChevronDown className={`w-3.5 h-3.5 transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
              </button>
              {servicesOpen && (
                <div
                  className="absolute top-full left-0 w-60 mt-1 bg-[#0D1F35] border border-white/10 rounded-xl shadow-xl overflow-hidden"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  {serviceLinks.map((s) => (
                    <button
                      key={s.label}
                      className="w-full text-left px-4 py-3 hover:bg-white/5 transition-colors group"
                    >
                      <p className="text-sm font-medium text-white group-hover:text-amber-400 transition-colors">
                        {s.label}
                      </p>
                      <p className="text-xs text-white/40 mt-0.5">{s.desc}</p>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ── Right actions ── */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Dark mode toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition-all duration-200"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
            </button>

            <div className="flex items-center gap-1 text-white/50 text-sm">
              <Globe className="w-3.5 h-3.5" />
              <span>EN</span>
            </div>

            <Link
              href="/track"
              className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-[#060E1A] font-semibold text-sm rounded-lg transition-all duration-200 hover:shadow-glow hover:-translate-y-0.5"
            >
              Track Now
            </Link>
          </div>

          {/* ── Mobile controls ── */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-white/60 hover:text-white transition-colors"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* ── Mobile Menu ── */}
        {isOpen && (
          <div className="lg:hidden pb-4 border-t border-white/5 mt-2 pt-4 animate-fade-in">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    pathname === link.href
                      ? "text-amber-400 bg-white/5"
                      : "text-white/70 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/track"
                onClick={() => setIsOpen(false)}
                className="mt-2 px-4 py-3 bg-amber-500 text-[#060E1A] font-semibold text-sm rounded-xl text-center transition-all hover:bg-amber-400"
              >
                Track Now
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
