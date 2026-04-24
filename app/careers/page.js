import PageShell from "@/components/PageShell";
import Link from "next/link";
import {
  MapPin,
  Clock,
  ArrowRight,
  Briefcase,
  Heart,
  Globe2,
  Zap,
  Users,
  TrendingUp,
} from "lucide-react";

const openRoles = [
  {
    title: "Senior Software Engineer — Tracking Platform",
    team: "Engineering",
    location: "Amsterdam, NL",
    type: "Full-time",
    dept: "Tech",
  },
  {
    title: "Product Manager — Last-Mile Delivery",
    team: "Product",
    location: "London, UK",
    type: "Full-time",
    dept: "Product",
  },
  {
    title: "Operations Manager — Southeast Asia",
    team: "Operations",
    location: "Singapore",
    type: "Full-time",
    dept: "Ops",
  },
  {
    title: "Data Scientist — Route Optimisation",
    team: "Engineering",
    location: "Remote (EU)",
    type: "Full-time",
    dept: "Tech",
  },
  {
    title: "Customer Success Manager — Enterprise",
    team: "Customer Success",
    location: "Dubai, UAE",
    type: "Full-time",
    dept: "CS",
  },
  {
    title: "Customs & Compliance Specialist",
    team: "Legal & Compliance",
    location: "Frankfurt, DE",
    type: "Full-time",
    dept: "Legal",
  },
  {
    title: "UX / Product Designer",
    team: "Design",
    location: "Amsterdam, NL",
    type: "Full-time",
    dept: "Design",
  },
  {
    title: "Freight Sales Executive — Americas",
    team: "Sales",
    location: "New York, USA",
    type: "Full-time",
    dept: "Sales",
  },
  {
    title: "Warehouse Automation Engineer",
    team: "Engineering",
    location: "Rotterdam, NL",
    type: "Full-time",
    dept: "Tech",
  },
  {
    title: "Marketing Manager — APAC",
    team: "Marketing",
    location: "Tokyo, JP",
    type: "Full-time",
    dept: "Marketing",
  },
];

const perks = [
  {
    icon: Globe2,
    title: "Work From Anywhere",
    desc: "Flexible remote and hybrid arrangements across all 22 NovaCargo offices worldwide.",
  },
  {
    icon: TrendingUp,
    title: "Equity & Growth",
    desc: "Every employee receives stock options. We grow together — your success is our success.",
  },
  {
    icon: Heart,
    title: "Health & Wellbeing",
    desc: "Comprehensive medical, dental and vision. Plus a €1,200/year wellness allowance.",
  },
  {
    icon: Zap,
    title: "Learning Budget",
    desc: "€2,000/year for courses, conferences, and books. We invest heavily in your development.",
  },
  {
    icon: Users,
    title: "Relocation Support",
    desc: "Full relocation packages for international hires, including visa sponsorship where needed.",
  },
  {
    icon: Briefcase,
    title: "32 Days Paid Leave",
    desc: "Generous time off including public holidays — because rest makes better work.",
  },
];

const deptColors = {
  Tech: "bg-blue-100 dark:bg-blue-400/10 text-blue-700 dark:text-blue-400",
  Product:
    "bg-purple-100 dark:bg-purple-400/10 text-purple-700 dark:text-purple-400",
  Ops: "bg-amber-100 dark:bg-amber-400/10 text-amber-700 dark:text-amber-400",
  CS: "bg-green-100 dark:bg-green-400/10 text-green-700 dark:text-green-400",
  Legal: "bg-slate-100 dark:bg-slate-400/10 text-slate-700 dark:text-slate-400",
  Design: "bg-pink-100 dark:bg-pink-400/10 text-pink-700 dark:text-pink-400",
  Sales:
    "bg-orange-100 dark:bg-orange-400/10 text-orange-700 dark:text-orange-400",
  Marketing: "bg-teal-100 dark:bg-teal-400/10 text-teal-700 dark:text-teal-400",
};

export const metadata = { title: "Careers — NovaCargo" };

export default function CareersPage() {
  return (
    <PageShell
      label="Company"
      title="BUILD THE FUTURE OF LOGISTICS"
      subtitle="Join 4,200+ people across 22 countries who are redefining how the world ships. We're growing fast — and hiring faster."
      breadcrumbs={[{ label: "Careers", href: "/careers" }]}
    >
      {/* Perks */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="w-4 h-0.5 bg-amber-500" />
            <span className="text-amber-500 text-sm font-semibold uppercase tracking-widest">
              Why NovaCargo
            </span>
            <span className="w-4 h-0.5 bg-amber-500" />
          </div>
          <h2
            className="text-gray-900 dark:text-white font-black text-4xl"
            style={{ fontFamily: "'Barlow Condensed',sans-serif" }}
          >
            WORK THAT MOVES THE WORLD
          </h2>
          <p className="text-gray-500 dark:text-white/45 mt-4 max-w-xl mx-auto">
            We offer more than a job. We offer a mission, a community, and the
            tools to do the best work of your career.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {perks.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="bg-white dark:bg-[#0D1F35] rounded-2xl p-6 border border-gray-100 dark:border-white/[0.06] shadow-sm"
              >
                <div className="w-11 h-11 bg-amber-50 dark:bg-amber-400/10 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-amber-500" />
                </div>
                <h3 className="text-gray-900 dark:text-white font-bold text-base mb-2">
                  {p.title}
                </h3>
                <p className="text-gray-500 dark:text-white/40 text-sm leading-relaxed">
                  {p.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Open Roles */}
      <section className="bg-gray-100 dark:bg-[#080E1C] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="w-4 h-0.5 bg-amber-500" />
              <span className="text-amber-500 text-sm font-semibold uppercase tracking-widest">
                Open Positions
              </span>
              <span className="w-4 h-0.5 bg-amber-500" />
            </div>
            <h2
              className="text-gray-900 dark:text-white font-black text-4xl"
              style={{ fontFamily: "'Barlow Condensed',sans-serif" }}
            >
              JOIN OUR TEAM
            </h2>
          </div>
          <div className="space-y-3">
            {openRoles.map((r) => (
              <div
                key={r.title}
                className="bg-white dark:bg-[#0D1F35] rounded-2xl px-6 py-5 border border-gray-100 dark:border-white/[0.06] shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-amber-300 dark:hover:border-amber-400/30 transition-all group cursor-pointer"
              >
                <div>
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${deptColors[r.dept] || ""}`}
                    >
                      {r.team}
                    </span>
                    <span className="text-gray-400 dark:text-white/25 text-xs">
                      {r.type}
                    </span>
                  </div>
                  <h3 className="text-gray-900 dark:text-white font-semibold text-base">
                    {r.title}
                  </h3>
                  <div className="flex items-center gap-1.5 mt-1 text-gray-400 dark:text-white/35 text-xs">
                    <MapPin className="w-3 h-3" />
                    {r.location}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-amber-500 text-sm font-semibold flex-shrink-0 group-hover:gap-3 transition-all">
                  Apply Now <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <p className="text-gray-500 dark:text-white/40 text-sm">
              Don't see your role?{" "}
              <a
                href="mailto:careers@novacargo.com"
                className="text-amber-500 hover:underline font-medium"
              >
                Send us your CV anyway
              </a>{" "}
              — we're always growing.
            </p>
          </div>
        </div>
      </section>

      {/* Culture */}
      <section className="bg-[#060E1A] py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2
            className="text-white font-black text-4xl mb-4"
            style={{ fontFamily: "'Barlow Condensed',sans-serif" }}
          >
            OUR HIRING PROCESS
          </h2>
          <div className="grid sm:grid-cols-4 gap-4 mt-10">
            {[
              ["01", "Apply", "Submit your CV and a short cover note"],
              ["02", "Screen", "30-min call with our recruiter"],
              ["03", "Interview", "2–3 interviews with the team"],
              ["04", "Offer", "Fast decisions — typically within 2 weeks"],
            ].map(([n, t, d]) => (
              <div key={t} className="text-center">
                <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-400/30 flex items-center justify-center mx-auto mb-3">
                  <span
                    className="text-amber-400 font-black text-sm"
                    style={{ fontFamily: "'Barlow Condensed',sans-serif" }}
                  >
                    {n}
                  </span>
                </div>
                <p className="text-white font-semibold text-sm">{t}</p>
                <p className="text-white/35 text-xs mt-1">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
