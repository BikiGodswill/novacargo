import PageShell from "@/components/PageShell";
import Link from "next/link";
import {
  Users,
  Globe2,
  Award,
  TrendingUp,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

const timeline = [
  {
    year: "2018",
    title: "Founded in Amsterdam",
    desc: "NovaCargo was established by three logistics veterans with a mission to modernise global parcel delivery through technology.",
  },
  {
    year: "2019",
    title: "First 10 Countries",
    desc: "Rapid expansion across Western Europe with our own fleet of 240 vehicles and partnerships with 12 regional carriers.",
  },
  {
    year: "2020",
    title: "Pandemic Resilience",
    desc: "While others struggled, NovaCargo scaled operations by 310% to meet surging e-commerce demand, delivering 4M+ parcels.",
  },
  {
    year: "2021",
    title: "Series B — €120M",
    desc: "Closed a €120M funding round led by Sequoia and Accel, enabling infrastructure investment across Asia and the Americas.",
  },
  {
    year: "2022",
    title: "100 Countries Reached",
    desc: "Crossed the 100-country milestone with the launch of our Singapore and São Paulo hubs, completing a global air network.",
  },
  {
    year: "2023",
    title: "AI-Powered Routing",
    desc: "Launched NovaSmart™ — our proprietary AI routing engine that cut average delivery times by 22% and fuel costs by 18%.",
  },
  {
    year: "2024",
    title: "220+ Countries & 12M+ Parcels",
    desc: "Today NovaCargo is one of Europe's fastest-growing logistics companies, serving 50,000+ businesses in 220+ countries.",
  },
];

const leaders = [
  {
    name: "Arjan de Vries",
    role: "Chief Executive Officer",
    bio: "Former VP of Operations at DHL Express. 20 years building global logistics networks.",
    initials: "AV",
    color: "#F59E0B",
  },
  {
    name: "Priya Nair",
    role: "Chief Technology Officer",
    bio: "Ex-Amazon Senior Director of Engineering. Led delivery algorithm teams across EMEA.",
    initials: "PN",
    color: "#3B82F6",
  },
  {
    name: "Marcus Bellamy",
    role: "Chief Operating Officer",
    bio: "20-year FedEx veteran. Oversaw 85-country freight operations expansion.",
    initials: "MB",
    color: "#10B981",
  },
  {
    name: "Lena Rousseau",
    role: "Chief Financial Officer",
    bio: "Former Goldman Sachs Managing Director. Architected NovaCargo's Series A–C financing.",
    initials: "LR",
    color: "#8B5CF6",
  },
  {
    name: "Khalid Al Rashidi",
    role: "VP, Middle East & Africa",
    bio: "Built Aramex's UAE network from 3 to 40 depots over 12 years.",
    initials: "KR",
    color: "#EC4899",
  },
  {
    name: "Yuna Park",
    role: "VP, Asia Pacific",
    desc: "Led Coupang Logistics scaling from Korea to 8 APAC markets.",
    initials: "YP",
    color: "#F97316",
  },
];

const values = [
  {
    title: "Speed Without Compromise",
    desc: "We obsess over every hour shaved from delivery times — without ever cutting corners on care or compliance.",
  },
  {
    title: "Radical Transparency",
    desc: "Every shipment is visible in real time. No black boxes. No excuses. Just honest, live data.",
  },
  {
    title: "Global Citizenship",
    desc: "We invest in the communities we operate in — from job creation to carbon offset programmes.",
  },
  {
    title: "Engineered Reliability",
    desc: "Our 99.2% on-time rate isn't an accident. It's the result of rigorous systems, redundancy, and accountability.",
  },
];

export const metadata = { title: "About Us — NovaCargo" };

export default function AboutPage() {
  return (
    <PageShell
      label="Company"
      title="WE MOVE THE WORLD'S COMMERCE"
      subtitle="Founded in Amsterdam in 2018, NovaCargo has grown from a 12-person startup to a global logistics platform operating in 220+ countries — powered by technology, driven by people."
      breadcrumbs={[{ label: "About Us", href: "/about" }]}
      heroExtra={
        <div className="flex flex-wrap gap-8 mt-2">
          {[
            ["12M+", "Parcels delivered"],
            ["220+", "Countries served"],
            ["50K+", "Business clients"],
            ["4,200+", "Team members"],
          ].map(([v, l]) => (
            <div key={l}>
              <p
                className="text-amber-400 font-black text-3xl"
                style={{ fontFamily: "'Barlow Condensed',sans-serif" }}
              >
                {v}
              </p>
              <p className="text-white/40 text-sm mt-0.5">{l}</p>
            </div>
          ))}
        </div>
      }
    >
      {/* Mission */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-4 h-0.5 bg-amber-500" />
              <span className="text-amber-500 text-sm font-semibold uppercase tracking-widest">
                Our Mission
              </span>
            </div>
            <h2
              className="text-gray-900 dark:text-white font-black text-4xl mb-6"
              style={{ fontFamily: "'Barlow Condensed',sans-serif" }}
            >
              CONNECTING PEOPLE,
              <br />
              BUSINESSES &amp; POSSIBILITIES
            </h2>
            <p className="text-gray-600 dark:text-white/55 text-lg leading-relaxed mb-6">
              We believe that fast, reliable logistics shouldn't be the
              exclusive domain of large corporations. NovaCargo was built to
              give every business — from a solo artisan to a global retailer —
              access to world-class shipping infrastructure.
            </p>
            <p className="text-gray-600 dark:text-white/55 leading-relaxed mb-8">
              Our technology platform handles the complexity — customs
              clearance, route optimisation, last-mile delivery — so our
              customers can focus entirely on growing their business.
            </p>
            <ul className="space-y-3">
              {[
                "ISO 9001:2015 Quality Certified",
                "Carbon-neutral delivery options across EU",
                "GDPR compliant & SOC 2 Type II certified",
                "24/7 customer operations in 18 languages",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-gray-600 dark:text-white/55 text-sm"
                >
                  <CheckCircle className="w-4 h-4 text-amber-500 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {values.map((v) => (
              <div
                key={v.title}
                className="bg-white dark:bg-[#0D1F35] rounded-2xl p-5 border border-gray-100 dark:border-white/[0.06] shadow-sm"
              >
                <h4 className="text-gray-900 dark:text-white font-bold text-sm mb-2">
                  {v.title}
                </h4>
                <p className="text-gray-500 dark:text-white/40 text-xs leading-relaxed">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-[#060E1A] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="w-4 h-0.5 bg-amber-500" />
              <span className="text-amber-500 text-sm font-semibold uppercase tracking-widest">
                Our Journey
              </span>
              <span className="w-4 h-0.5 bg-amber-500" />
            </div>
            <h2
              className="text-white font-black text-4xl"
              style={{ fontFamily: "'Barlow Condensed',sans-serif" }}
            >
              FROM STARTUP TO GLOBAL CARRIER
            </h2>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-white/[0.06] hidden lg:block" />
            <div className="space-y-8">
              {timeline.map((item, i) => (
                <div
                  key={item.year}
                  className={`flex flex-col lg:flex-row items-start lg:items-center gap-6 ${i % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
                >
                  <div className="lg:w-1/2 flex-shrink-0">
                    <div
                      className={`bg-[#0D1F35] border border-white/[0.06] rounded-2xl p-6 ${i % 2 === 1 ? "lg:ml-8" : "lg:mr-8"}`}
                    >
                      <span
                        className="text-amber-400 font-black text-lg"
                        style={{ fontFamily: "'Barlow Condensed',sans-serif" }}
                      >
                        {item.year}
                      </span>
                      <h3 className="text-white font-bold text-base mt-1 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-white/45 text-sm leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                  <div className="hidden lg:flex w-8 h-8 rounded-full bg-amber-500 items-center justify-center flex-shrink-0 z-10 shadow-glow">
                    <span className="w-3 h-3 rounded-full bg-[#060E1A]" />
                  </div>
                  <div className="lg:w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="w-4 h-0.5 bg-amber-500" />
            <span className="text-amber-500 text-sm font-semibold uppercase tracking-widest">
              Leadership
            </span>
            <span className="w-4 h-0.5 bg-amber-500" />
          </div>
          <h2
            className="text-gray-900 dark:text-white font-black text-4xl"
            style={{ fontFamily: "'Barlow Condensed',sans-serif" }}
          >
            THE TEAM BEHIND NOVACARGO
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {leaders.map((l) => (
            <div
              key={l.name}
              className="bg-white dark:bg-[#0D1F35] rounded-2xl p-6 border border-gray-100 dark:border-white/[0.06] shadow-sm hover:shadow-md transition-shadow"
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-black text-lg mb-4"
                style={{
                  backgroundColor: l.color,
                  fontFamily: "'Barlow Condensed',sans-serif",
                }}
              >
                {l.initials}
              </div>
              <h3 className="text-gray-900 dark:text-white font-bold text-base">
                {l.name}
              </h3>
              <p className="text-amber-500 text-xs font-semibold mt-0.5 mb-3">
                {l.role}
              </p>
              <p className="text-gray-500 dark:text-white/40 text-sm leading-relaxed">
                {l.bio}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#060E1A] py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2
            className="text-white font-black text-4xl mb-4"
            style={{ fontFamily: "'Barlow Condensed',sans-serif" }}
          >
            READY TO SHIP WITH US?
          </h2>
          <p className="text-white/45 mb-8">
            Join 50,000+ businesses that trust NovaCargo with their most
            important shipments.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/track"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-[#060E1A] font-bold rounded-xl transition-all hover:shadow-glow text-sm"
            >
              Track a Shipment <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-white/15 hover:bg-white/5 text-white font-bold rounded-xl transition-all text-sm"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
