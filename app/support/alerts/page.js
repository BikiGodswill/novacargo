import PageShell from "@/components/PageShell";
import { AlertTriangle, CheckCircle, Clock, Info, Globe2 } from "lucide-react";

const alerts = [
  {
    level: "warning",
    region: "Middle East",
    title: "Red Sea Shipping Disruptions",
    desc: "Due to ongoing security concerns in the Red Sea and Gulf of Aden, ocean freight shipments transiting this corridor are being rerouted via the Cape of Good Hope. Expect 8–12 additional transit days for affected lanes (Europe–Asia, Europe–East Africa). Air freight is unaffected.",
    updated: "Apr 22, 2025",
    affected: ["EU → India", "EU → Southeast Asia", "EU → East Africa"],
  },
  {
    level: "info",
    region: "United Kingdom",
    title: "Post-Brexit Customs Processing — Delays at Felixstowe",
    desc: "Increased customs inspection rates at Felixstowe port are causing 24–48 hour delays for EU–UK road freight shipments. Our customs brokers are proactively submitting enhanced pre-arrival declarations to minimise impact. Express air shipments via Heathrow are unaffected.",
    updated: "Apr 20, 2025",
    affected: ["EU → UK Road Freight"],
  },
  {
    level: "resolved",
    region: "USA",
    title: "East Coast Port Strike — RESOLVED",
    desc: "The ILA dock worker strike affecting East Coast US ports has been resolved following a new collective bargaining agreement. All ports are now operating at normal capacity. Backlog clearance expected within 5–7 business days.",
    updated: "Apr 18, 2025",
    affected: ["USA East Coast Ocean"],
  },
  {
    level: "warning",
    region: "China",
    title: "Golden Week Holiday — Reduced Operations",
    desc: "Chinese factories, warehouses, and customs offices operate at reduced capacity during Golden Week (May 1–7). Expect 3–5 business day delays for shipments originating from mainland China. We recommend booking ahead of April 25 to avoid impact.",
    updated: "Apr 15, 2025",
    affected: ["China Exports (All Modes)"],
  },
  {
    level: "resolved",
    region: "Germany",
    title: "Frankfurt Airport IT Outage — RESOLVED",
    desc: "A 6-hour IT system outage at Frankfurt Airport's cargo terminal on April 10 caused delays to approximately 340 NovaCargo shipments. All affected parcels have been cleared and are on their way to recipients. Affected customers received an email apology and €20 account credit.",
    updated: "Apr 11, 2025",
    affected: ["Frankfurt Air Freight"],
  },
  {
    level: "info",
    region: "India",
    title: "New Customs Regulations Effective May 1",
    desc: "India's Central Board of Indirect Taxes has updated import documentation requirements effective May 1, 2025. All commercial shipments to India must now include an enhanced CDSCO declaration for certain product categories. Our customs team will handle this automatically for all NovaCargo shipments.",
    updated: "Apr 10, 2025",
    affected: ["All imports into India"],
  },
];

const levelConfig = {
  warning: { icon: AlertTriangle, color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-400/10", border: "border-amber-200 dark:border-amber-400/20", badge: "bg-amber-100 dark:bg-amber-400/15 text-amber-700 dark:text-amber-400", label: "Active Alert" },
  info:    { icon: Info,          color: "text-blue-600 dark:text-blue-400",  bg: "bg-blue-50 dark:bg-blue-400/10",   border: "border-blue-200 dark:border-blue-400/20",   badge: "bg-blue-100 dark:bg-blue-400/15 text-blue-700 dark:text-blue-400",   label: "Advisory" },
  resolved:{ icon: CheckCircle,   color: "text-green-600 dark:text-green-400",bg: "bg-green-50 dark:bg-green-400/10", border: "border-green-200 dark:border-green-400/20", badge: "bg-green-100 dark:bg-green-400/15 text-green-700 dark:text-green-400", label: "Resolved" },
};

export const metadata = { title: "Service Alerts — NovaCargo" };

export default function AlertsPage() {
  const active   = alerts.filter(a => a.level !== "resolved");
  const resolved = alerts.filter(a => a.level === "resolved");

  return (
    <PageShell
      label="Support"
      title="SERVICE ALERTS"
      subtitle="Real-time updates on disruptions, weather events, customs delays, and operational issues that may affect your shipments."
      breadcrumbs={[{ label: "Support", href: "#" }, { label: "Service Alerts", href: "/support/alerts" }]}
      heroExtra={
        <div className="flex items-center gap-3 mt-2">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-white/50 text-sm">{active.length} active alert{active.length !== 1 ? "s" : ""} · Last updated Apr 22, 2025</span>
        </div>
      }
    >
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Active */}
        <div className="flex items-center gap-2 mb-4">
          <span className="w-4 h-0.5 bg-amber-500" />
          <span className="text-amber-500 text-sm font-semibold uppercase tracking-widest">Active Alerts</span>
        </div>
        <h2 className="text-gray-900 dark:text-white font-black text-3xl mb-8" style={{ fontFamily: "'Barlow Condensed',sans-serif" }}>
          CURRENT DISRUPTIONS
        </h2>
        <div className="space-y-5 mb-16">
          {active.map(alert => {
            const cfg = levelConfig[alert.level];
            const Icon = cfg.icon;
            return (
              <div key={alert.title} className={`rounded-2xl p-6 border ${cfg.bg} ${cfg.border}`}>
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                  <div className="flex items-start gap-3">
                    <Icon className={`w-5 h-5 ${cfg.color} mt-0.5 flex-shrink-0`} />
                    <div>
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${cfg.badge}`}>{cfg.label}</span>
                        <span className="flex items-center gap-1 text-gray-400 dark:text-white/30 text-xs">
                          <Globe2 className="w-3 h-3" />{alert.region}
                        </span>
                      </div>
                      <h3 className="text-gray-900 dark:text-white font-bold text-base">{alert.title}</h3>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-gray-400 dark:text-white/30 text-xs flex-shrink-0">
                    <Clock className="w-3 h-3" />Updated {alert.updated}
                  </div>
                </div>
                <p className="text-gray-600 dark:text-white/55 text-sm leading-relaxed mb-4 ml-8">{alert.desc}</p>
                <div className="ml-8 flex flex-wrap gap-2">
                  <span className="text-gray-400 dark:text-white/30 text-xs">Affected routes:</span>
                  {alert.affected.map(r => (
                    <span key={r} className="px-2 py-0.5 bg-white/60 dark:bg-white/10 text-gray-600 dark:text-white/50 text-xs rounded-lg">{r}</span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Resolved */}
        <div className="flex items-center gap-2 mb-4">
          <span className="w-4 h-0.5 bg-green-500" />
          <span className="text-green-600 dark:text-green-400 text-sm font-semibold uppercase tracking-widest">Recently Resolved</span>
        </div>
        <h2 className="text-gray-900 dark:text-white font-black text-3xl mb-8" style={{ fontFamily: "'Barlow Condensed',sans-serif" }}>
          RESOLVED INCIDENTS
        </h2>
        <div className="space-y-4 mb-16">
          {resolved.map(alert => {
            const cfg = levelConfig[alert.level];
            const Icon = cfg.icon;
            return (
              <div key={alert.title} className={`rounded-2xl p-5 border ${cfg.bg} ${cfg.border} opacity-80`}>
                <div className="flex items-start gap-3">
                  <Icon className={`w-5 h-5 ${cfg.color} mt-0.5 flex-shrink-0`} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-3 flex-wrap mb-1">
                      <div className="flex items-center gap-2">
                        <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${cfg.badge}`}>{cfg.label}</span>
                        <span className="text-gray-400 dark:text-white/30 text-xs">{alert.region}</span>
                      </div>
                      <span className="text-gray-400 dark:text-white/30 text-xs">{alert.updated}</span>
                    </div>
                    <h3 className="text-gray-700 dark:text-white/70 font-semibold text-sm mb-1">{alert.title}</h3>
                    <p className="text-gray-500 dark:text-white/40 text-xs leading-relaxed">{alert.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Subscribe */}
        <div className="bg-[#060E1A] rounded-2xl p-8 text-center">
          <h3 className="text-white font-black text-2xl mb-2" style={{ fontFamily: "'Barlow Condensed',sans-serif" }}>
            SUBSCRIBE TO ALERTS
          </h3>
          <p className="text-white/45 text-sm mb-6">Get instant email and SMS notifications for disruptions affecting your routes.</p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input type="email" placeholder="your@email.com" className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/25 text-sm focus:outline-none focus:border-amber-400/50 transition-colors" />
            <button className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-[#060E1A] font-bold text-sm rounded-xl transition-all hover:shadow-glow whitespace-nowrap">Subscribe</button>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
