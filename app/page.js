import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TrackingForm from "@/components/TrackingForm";
import ServiceCard from "@/components/ServiceCard";
import {
  Zap,
  Globe2,
  Warehouse,
  Truck,
  ShoppingCart,
  Package,
  Shield,
  Clock,
  Star,
  CheckCircle,
  ArrowRight,
  BarChart3,
  Map,
  Users,
  Award,
} from "lucide-react";

// ─── Services ─────────────────────────────────────────────────────────────────
const services = [
  {
    icon: Zap,
    title: "Express Delivery",
    description:
      "Next-day and same-day delivery for urgent shipments across 220+ countries with guaranteed on-time performance.",
    tag: "Most Popular",
    gradient: "linear-gradient(135deg, #FEF3C7, #FDE68A)",
  },
  {
    icon: Globe2,
    title: "International Shipping",
    description:
      "Seamless cross-border logistics with full customs clearance, documentation, and end-to-end tracking.",
    gradient: "linear-gradient(135deg, #DBEAFE, #BFDBFE)",
  },
  {
    icon: Warehouse,
    title: "Warehousing & Fulfillment",
    description:
      "Strategic storage facilities on 4 continents with automated picking, packing, and same-day dispatch.",
    gradient: "linear-gradient(135deg, #D1FAE5, #A7F3D0)",
  },
  {
    icon: Truck,
    title: "Freight Services",
    description:
      "Heavy cargo and oversized shipments via air, road, rail, and sea freight with dedicated account management.",
    gradient: "linear-gradient(135deg, #EDE9FE, #DDD6FE)",
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce Logistics",
    description:
      "Plug-and-play integrations with Shopify, WooCommerce, and Amazon for automated order fulfillment at scale.",
    tag: "New",
    gradient: "linear-gradient(135deg, #FCE7F3, #FBCFE8)",
  },
  {
    icon: Package,
    title: "Returns Management",
    description:
      "Hassle-free reverse logistics with branded return labels, real-time status, and instant refund processing.",
    gradient: "linear-gradient(135deg, #FEE2E2, #FECACA)",
  },
];

// ─── Steps ────────────────────────────────────────────────────────────────────
const steps = [
  {
    num: "01",
    icon: Package,
    title: "Book Your Shipment",
    desc: "Fill out our quick online form or API — get an instant quote in seconds.",
  },
  {
    num: "02",
    icon: Truck,
    title: "We Pick It Up",
    desc: "Our driver arrives at your door within the scheduled window, fully equipped.",
  },
  {
    num: "03",
    icon: Map,
    title: "Track in Real-Time",
    desc: "Monitor every leg of your shipment's journey on our live tracking dashboard.",
  },
  {
    num: "04",
    icon: CheckCircle,
    title: "Delivered Safely",
    desc: "Recipient gets a digital proof of delivery and you get a confirmation.",
  },
];

// ─── Trusted logos (text-based mock) ─────────────────────────────────────────
const trustedBy = [
  "Amazon",
  "Alibaba",
  "Shopify",
  "Samsung",
  "Unilever",
  "IKEA",
  "Nestlé",
  "Philips",
];

// ─── Features ─────────────────────────────────────────────────────────────────
const features = [
  {
    icon: BarChart3,
    title: "Real-Time Tracking",
    desc: "GPS-level visibility on every shipment, every second of the journey.",
  },
  {
    icon: Shield,
    title: "Secure Logistics",
    desc: "End-to-end encryption, tamper-evident packaging, and cargo insurance.",
  },
  {
    icon: Globe2,
    title: "Global Coverage",
    desc: "Active in 220+ countries with 850+ partner carriers worldwide.",
  },
  {
    icon: Clock,
    title: "Fast Delivery",
    desc: "98.7% on-time delivery rate — industry-leading performance guaranteed.",
  },
  {
    icon: Users,
    title: "Dedicated Support",
    desc: "24/7 live agents and AI-assisted chat in 18 languages.",
  },
  {
    icon: Award,
    title: "Award-Winning Service",
    desc: "Named #1 logistics provider in Europe for 3 consecutive years.",
  },
];

// ─── Testimonials ─────────────────────────────────────────────────────────────
const testimonials = [
  {
    name: "Ayesha Rahman",
    role: "Head of Supply Chain, TechVault Inc.",
    avatar: "AR",
    rating: 5,
    text: "NovaCargo transformed our international fulfillment. Delivery times dropped by 40% and our customers love the live tracking updates. The API integration took less than a day.",
    country: "🇨🇦",
  },
  {
    name: "Lorenzo Marchetti",
    role: "Founder, Artisan Jewels Florence",
    avatar: "LM",
    rating: 5,
    text: "Shipping luxury goods internationally used to be stressful. NovaCargo's white-glove handling and real-time alerts give me complete peace of mind. Simply exceptional.",
    country: "🇮🇹",
  },
  {
    name: "Yuna Park",
    role: "Operations Director, KoreanBeauty Co.",
    avatar: "YP",
    rating: 5,
    text: "We scaled from 200 to 8,000 orders a month without changing our logistics team. NovaCargo's automation handles everything. Truly a game-changer for e-commerce.",
    country: "🇰🇷",
  },
  {
    name: "David Osei",
    role: "CEO, BuildCo Ltd.",
    avatar: "DO",
    rating: 4,
    text: "Freight services for heavy machinery is notoriously difficult. NovaCargo handled our 320kg shipments from China to South Africa without a single incident. Highly recommended.",
    country: "🇿🇦",
  },
];

// ─── Tracking preview steps ───────────────────────────────────────────────────
const previewSteps = [
  { label: "Order Received", done: true },
  { label: "Package Picked Up", done: true },
  { label: "In Transit", done: true, current: true },
  { label: "Out for Delivery", done: false },
  { label: "Delivered", done: false },
];

// ─── Stats ────────────────────────────────────────────────────────────────────
const stats = [
  { value: "12M+", label: "Parcels delivered" },
  { value: "220+", label: "Countries served" },
  { value: "98.7%", label: "On-time rate" },
  { value: "24/7", label: "Customer support" },
];

/**
 * Landing Page
 * Full marketing homepage for NovaCargo logistics platform.
 */
export default function HomePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#060E1A]">
      <Navbar />

      {/* ══════════════════════════════════════════════════════════════════════
          HERO SECTION
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-[#060E1A]">
        {/* Background grid + radial glow */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(245,158,11,0.12) 0%, transparent 70%)",
          }}
        />
        {/* Decorative floating elements */}
        <div className="absolute top-1/4 right-10 lg:right-20 w-64 h-64 opacity-20 animate-float hidden md:block">
          <div
            className="w-full h-full rounded-3xl border border-amber-400/30"
            style={{ transform: "rotate(15deg)" }}
          />
        </div>
        <div className="absolute bottom-1/4 left-10 w-32 h-32 opacity-10 animate-float hidden md:block" style={{ animationDelay: "1.5s" }}>
          <div className="w-full h-full rounded-2xl border border-amber-400/20" style={{ transform: "rotate(-10deg)" }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 pt-40">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-400/10 border border-amber-400/20 rounded-full text-amber-400 text-sm font-medium mb-8 animate-fade-in">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              Now serving 220+ countries worldwide
            </div>

            {/* Headline */}
            <h1
              className="text-white font-black leading-none mb-6 animate-fade-up"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "clamp(52px, 8vw, 96px)",
                letterSpacing: "-0.01em",
              }}
            >
              FAST, RELIABLE
              <br />
              <span
                style={{
                  background: "linear-gradient(90deg, #F59E0B, #FCD34D)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                GLOBAL SHIPPING
              </span>
              <br />
              <span className="text-white/30">&amp; TRACKING</span>
            </h1>

            {/* Subtext */}
            <p className="text-white/55 text-lg lg:text-xl leading-relaxed max-w-xl mb-10 animate-fade-up animate-delay-200">
              NovaCargo connects your business to the world. Express delivery,
              international freight, and real-time tracking — all in one platform
              trusted by 50,000+ businesses.
            </p>

            {/* Tracking form */}
            <div className="animate-fade-up animate-delay-300">
              <TrackingForm variant="hero" />
            </div>

            {/* Social proof */}
            <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-6 animate-fade-up animate-delay-400">
              {/* Avatars */}
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {["#3B82F6", "#10B981", "#F59E0B", "#EF4444"].map((color, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-[#060E1A] flex items-center justify-center text-white text-xs font-bold"
                      style={{ backgroundColor: color }}
                    >
                      {["A", "K", "M", "S"][i]}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-white/40 text-xs mt-0.5">
                    4.9 / 5 from 12,000+ reviews
                  </p>
                </div>
              </div>

              <div className="w-px h-8 bg-white/10 hidden sm:block" />

              {/* Stats pills */}
              <div className="flex flex-wrap gap-3">
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg"
                  >
                    <span className="text-white font-bold text-sm">{s.value}</span>
                    <span className="text-white/40 text-xs ml-1.5">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 inset-x-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block dark:fill-[#060E1A] fill-white">
            <path d="M0,60 C360,0 1080,60 1440,20 L1440,60 Z" />
          </svg>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          TRUSTED BY
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-16 bg-white dark:bg-[#060E1A] border-b border-gray-100 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-400 dark:text-white/25 text-sm font-medium uppercase tracking-widest mb-10">
            Trusted by world-class companies
          </p>
          {/* Marquee */}
          <div className="overflow-hidden relative">
            <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
              style={{ background: "linear-gradient(90deg, white, transparent)" }} />
            <div className="dark:hidden absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
              style={{ background: "linear-gradient(90deg, white, transparent)" }} />
            <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
              style={{ background: "linear-gradient(-90deg, white, transparent)" }} />
            <div className="flex animate-marquee gap-16" style={{ width: "max-content" }}>
              {[...trustedBy, ...trustedBy].map((brand, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 flex items-center justify-center px-4"
                >
                  <span
                    className="text-gray-300 dark:text-white/20 font-black text-xl hover:text-gray-500 dark:hover:text-white/50 transition-colors cursor-default select-none"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.05em" }}
                  >
                    {brand.toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SERVICES
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-gray-50 dark:bg-[#080E1C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="section-label justify-center mb-4">
              <span className="w-4 h-0.5 bg-amber-500" />
              Our Services
              <span className="w-4 h-0.5 bg-amber-500" />
            </div>
            <h2
              className="text-gray-900 dark:text-white font-black text-4xl sm:text-5xl mb-5"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              END-TO-END LOGISTICS SOLUTIONS
            </h2>
            <p className="text-gray-500 dark:text-white/45 text-lg">
              From a single parcel to full freight loads — we handle it all with
              speed, precision, and care.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          HOW IT WORKS
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-[#060E1A] relative overflow-hidden">
        {/* Background grid */}
        <div className="absolute inset-0"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="section-label justify-center mb-4">
              <span className="w-4 h-0.5 bg-amber-500" />
              How It Works
              <span className="w-4 h-0.5 bg-amber-500" />
            </div>
            <h2
              className="text-white font-black text-4xl sm:text-5xl mb-5"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              SHIPPING IN 4 SIMPLE STEPS
            </h2>
            <p className="text-white/45 text-lg">
              From booking to doorstep — our streamlined process makes shipping
              effortless for businesses of any size.
            </p>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.num} className="relative group">
                  {/* Connector line */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-10 left-[calc(50%+40px)] right-0 h-0.5 bg-gradient-to-r from-amber-400/50 to-transparent z-0" />
                  )}

                  <div className="relative z-10 p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] hover:border-amber-400/20 transition-all duration-300 text-center">
                    {/* Number */}
                    <div
                      className="inline-block text-6xl font-black text-white/5 mb-3 leading-none"
                      style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                    >
                      {step.num}
                    </div>

                    {/* Icon */}
                    <div className="w-14 h-14 bg-amber-400/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-400/20 transition-colors">
                      <Icon className="w-7 h-7 text-amber-400" />
                    </div>

                    <h3 className="text-white font-bold text-base mb-2">{step.title}</h3>
                    <p className="text-white/40 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <Link
              href="/track"
              className="inline-flex items-center gap-2 px-8 py-4 bg-amber-500 hover:bg-amber-400 text-[#060E1A] font-bold rounded-xl transition-all duration-200 hover:shadow-glow hover:-translate-y-0.5 text-base"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.05em" }}
            >
              GET STARTED FREE <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          TRACKING PREVIEW
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-white dark:bg-[#060E1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left: copy */}
            <div>
              <div className="section-label mb-4">
                <span className="w-4 h-0.5 bg-amber-500" />
                Live Tracking
              </div>
              <h2
                className="text-gray-900 dark:text-white font-black text-4xl sm:text-5xl mb-6 leading-tight"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                KNOW WHERE YOUR
                <br />
                <span className="text-gradient-amber">SHIPMENT IS</span>
                <br />
                AT ALL TIMES
              </h2>
              <p className="text-gray-500 dark:text-white/45 text-lg mb-8 leading-relaxed">
                Our GPS-linked tracking system updates every 15 minutes so you
                always have the latest location, estimated arrival, and delivery
                confirmation at your fingertips.
              </p>

              <ul className="space-y-3 mb-8">
                {[
                  "Live GPS location updates every 15 minutes",
                  "Instant SMS and email delivery alerts",
                  "Digital proof of delivery with signature",
                  "Estimated delivery window accuracy ±1 hour",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-gray-600 dark:text-white/55 text-sm">
                    <CheckCircle className="w-5 h-5 text-amber-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <Link
                href="/track"
                className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-[#060E1A] font-semibold rounded-xl transition-all duration-200 hover:shadow-glow"
              >
                Track Your Parcel <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Right: mock tracking UI */}
            <div className="relative">
              <div className="absolute inset-0 bg-amber-400/5 rounded-3xl blur-3xl" />
              <div className="relative bg-white dark:bg-[#0D1F35] rounded-2xl shadow-card-hover border border-gray-100 dark:border-white/[0.07] p-6 overflow-hidden">
                {/* Card header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-xs text-gray-400 dark:text-white/30 font-medium uppercase tracking-wider mb-1">
                      Tracking ID
                    </p>
                    <p className="font-mono font-bold text-gray-900 dark:text-white text-lg">
                      NC7841203648
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-100 dark:bg-amber-400/10 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                    <span className="text-amber-700 dark:text-amber-400 text-xs font-semibold">In Transit</span>
                  </div>
                </div>

                {/* Route bar */}
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-white/5 rounded-xl mb-6">
                  <div className="text-center">
                    <p className="text-gray-400 dark:text-white/30 text-[10px] uppercase tracking-wide">From</p>
                    <p className="font-semibold text-gray-900 dark:text-white text-xs mt-0.5">Shenzhen, CN</p>
                  </div>
                  <div className="flex-1 flex items-center justify-center">
                    <div className="w-full h-0.5 bg-gradient-to-r from-gray-200 via-amber-400 to-gray-200 dark:from-white/10 dark:via-amber-400 dark:to-white/10 rounded-full relative">
                      <div className="absolute left-[55%] top-1/2 -translate-y-1/2 w-3 h-3 bg-amber-400 rounded-full shadow-glow animate-pulse" />
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-400 dark:text-white/30 text-[10px] uppercase tracking-wide">To</p>
                    <p className="font-semibold text-gray-900 dark:text-white text-xs mt-0.5">London, UK</p>
                  </div>
                </div>

                {/* Timeline preview */}
                <div className="space-y-0">
                  {previewSteps.map((step, i) => {
                    const isLast = i === previewSteps.length - 1;
                    return (
                      <div key={step.label} className="flex items-start gap-3">
                        {/* Node and line */}
                        <div className="flex flex-col items-center">
                          <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 z-10 ${
                            step.current
                              ? "bg-amber-400 shadow-glow"
                              : step.done
                              ? "bg-amber-500"
                              : "bg-gray-100 dark:bg-white/5 border-2 border-dashed border-gray-200 dark:border-white/10"
                          }`}>
                            {step.done && !step.current ? (
                              <CheckCircle className="w-3.5 h-3.5 text-[#060E1A]" />
                            ) : step.current ? (
                              <span className="w-2.5 h-2.5 rounded-full bg-[#060E1A]" />
                            ) : (
                              <span className="w-2 h-2 rounded-full bg-gray-300 dark:bg-white/20" />
                            )}
                          </div>
                          {!isLast && (
                            <div className={`w-0.5 h-6 ${step.done ? "bg-amber-400" : "bg-gray-200 dark:bg-white/10"}`} />
                          )}
                        </div>
                        {/* Label */}
                        <div className="pb-1 pt-1">
                          <p className={`text-xs font-medium ${
                            step.current
                              ? "text-amber-600 dark:text-amber-400"
                              : step.done
                              ? "text-gray-900 dark:text-white"
                              : "text-gray-300 dark:text-white/25"
                          }`}>
                            {step.label}
                            {step.current && (
                              <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] bg-amber-100 dark:bg-amber-400/15 text-amber-700 dark:text-amber-400">
                                Live
                              </span>
                            )}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* ETA bar */}
                <div className="mt-5 pt-4 border-t border-gray-100 dark:border-white/5 flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 dark:text-white/30 text-[10px] uppercase tracking-wide">Estimated Delivery</p>
                    <p className="text-gray-900 dark:text-white font-semibold text-sm mt-0.5">Today by 6:00 PM</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-400 dark:text-white/30 text-[10px] uppercase tracking-wide">Last Update</p>
                    <p className="text-gray-900 dark:text-white font-semibold text-sm mt-0.5">2 min ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          FEATURES
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-gray-50 dark:bg-[#080E1C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="section-label justify-center mb-4">
              <span className="w-4 h-0.5 bg-amber-500" />
              Why NovaCargo
              <span className="w-4 h-0.5 bg-amber-500" />
            </div>
            <h2
              className="text-gray-900 dark:text-white font-black text-4xl sm:text-5xl mb-5"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              BUILT FOR THE WORLD&apos;S BEST SHIPPERS
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className="bg-white dark:bg-[#0D1F35] rounded-2xl p-6 border border-gray-100 dark:border-white/[0.06] shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 group"
                >
                  <div className="w-11 h-11 bg-amber-50 dark:bg-amber-400/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-5.5 h-5.5 text-amber-500" />
                  </div>
                  <h3 className="text-gray-900 dark:text-white font-semibold text-base mb-2">
                    {f.title}
                  </h3>
                  <p className="text-gray-500 dark:text-white/40 text-sm leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          TESTIMONIALS
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-white dark:bg-[#060E1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="section-label justify-center mb-4">
              <span className="w-4 h-0.5 bg-amber-500" />
              Testimonials
              <span className="w-4 h-0.5 bg-amber-500" />
            </div>
            <h2
              className="text-gray-900 dark:text-white font-black text-4xl sm:text-5xl mb-5"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              LOVED BY 50,000+ BUSINESSES
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="bg-white dark:bg-[#0D1F35] rounded-2xl p-6 border border-gray-100 dark:border-white/[0.06] shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 flex flex-col"
              >
                {/* Stars */}
                <div className="flex items-center gap-0.5 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < t.rating
                          ? "text-amber-400 fill-amber-400"
                          : "text-gray-200 dark:text-white/10"
                      }`}
                    />
                  ))}
                </div>

                {/* Text */}
                <p className="text-gray-600 dark:text-white/55 text-sm leading-relaxed flex-1 mb-5">
                  &ldquo;{t.text}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100 dark:border-white/5">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-[#060E1A] font-bold text-xs flex-shrink-0">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-gray-900 dark:text-white font-semibold text-sm flex items-center gap-1.5">
                      {t.name} <span>{t.country}</span>
                    </p>
                    <p className="text-gray-400 dark:text-white/30 text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          CTA
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-[#060E1A] relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 70% 80% at 50% 50%, rgba(245,158,11,0.1) 0%, transparent 70%)",
          }}
        />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="section-label justify-center mb-6">
            <span className="w-4 h-0.5 bg-amber-500" />
            Get Started Today
            <span className="w-4 h-0.5 bg-amber-500" />
          </div>
          <h2
            className="text-white font-black text-5xl sm:text-6xl mb-6 leading-none"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            START SHIPPING
            <br />
            <span className="text-gradient-amber">WITHOUT LIMITS</span>
          </h2>
          <p className="text-white/45 text-lg mb-10">
            Join 50,000+ businesses that trust NovaCargo with their most
            important shipments. No setup fees. No contracts. No surprises.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/track"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-amber-500 hover:bg-amber-400 text-[#060E1A] font-bold rounded-xl transition-all duration-200 hover:shadow-glow hover:-translate-y-0.5 text-base"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.05em" }}
            >
              TRACK A SHIPMENT <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/dashboard"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/15 hover:bg-white/5 hover:border-white/30 text-white font-bold rounded-xl transition-all duration-200 text-base"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.05em" }}
            >
              VIEW DASHBOARD
            </Link>
          </div>

          <p className="mt-8 text-white/20 text-sm">
            ✓ Free to start &nbsp;·&nbsp; ✓ No credit card required &nbsp;·&nbsp; ✓ 99.9% uptime SLA
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
