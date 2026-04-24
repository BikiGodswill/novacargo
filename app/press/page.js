import PageShell from "@/components/PageShell";
import { Download, ExternalLink, Mail } from "lucide-react";

const pressReleases = [
  { date:"Apr 2024", title:"NovaCargo Launches NovaSmart™ AI Routing Engine, Reducing Average Delivery Times by 22%", source:"Press Release" },
  { date:"Mar 2024", title:"NovaCargo Expands to 50 New Countries, Completing Global Air Freight Network", source:"Press Release" },
  { date:"Feb 2024", title:"NovaCargo Partners with Shopify to Offer One-Click Logistics for 1M+ Merchants", source:"Press Release" },
  { date:"Jan 2024", title:"NovaCargo Achieves Carbon Neutrality Across All European Operations", source:"Press Release" },
  { date:"Nov 2023", title:"NovaCargo Closes €240M Series C Funding Round at €1.8B Valuation", source:"Press Release" },
  { date:"Sep 2023", title:"NovaCargo Named #1 Logistics Platform for SMEs in Europe by Logistics Awards 2023", source:"Press Release" },
];

const coverage = [
  { outlet:"Financial Times", headline:"The Amsterdam startup rewriting the rules of global logistics", date:"Mar 2024" },
  { outlet:"TechCrunch", headline:"NovaCargo's AI routing engine is the logistics industry's biggest leap in a decade", date:"Feb 2024" },
  { outlet:"Forbes", headline:"50 Fastest-Growing Companies in Europe — NovaCargo ranks #4", date:"Jan 2024" },
  { outlet:"The Economist", headline:"How NovaCargo is democratising freight access for SMEs worldwide", date:"Dec 2023" },
  { outlet:"Bloomberg", headline:"NovaCargo raises €240M, eyes US expansion in 2025", date:"Nov 2023" },
  { outlet:"Wired", headline:"Inside NovaSmart: the algorithm predicting your parcel's perfect route", date:"Oct 2023" },
];

export const metadata = { title:"Press & Media — NovaCargo" };

export default function PressPage() {
  return (
    <PageShell label="Company" title="PRESS & MEDIA" subtitle="Find the latest NovaCargo news, press releases, media assets, and contact information for journalists and analysts." breadcrumbs={[{label:"Press & Media",href:"/press"}]}>

      {/* Press releases */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <h2 className="text-gray-900 dark:text-white font-black text-3xl mb-8" style={{fontFamily:"'Barlow Condensed',sans-serif"}}>PRESS RELEASES</h2>
            <div className="space-y-4">
              {pressReleases.map(p=>(
                <div key={p.title} className="bg-white dark:bg-[#0D1F35] rounded-2xl p-5 border border-gray-100 dark:border-white/[0.06] shadow-sm flex items-start justify-between gap-4 hover:border-amber-300 dark:hover:border-amber-400/30 transition-all group cursor-pointer">
                  <div>
                    <span className="inline-block px-2 py-0.5 bg-amber-100 dark:bg-amber-400/10 text-amber-700 dark:text-amber-400 text-xs font-semibold rounded-full mb-2">{p.date}</span>
                    <h3 className="text-gray-900 dark:text-white font-semibold text-sm leading-snug group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">{p.title}</h3>
                  </div>
                  <Download className="w-4 h-4 text-gray-300 dark:text-white/20 group-hover:text-amber-500 transition-colors flex-shrink-0 mt-1"/>
                </div>
              ))}
            </div>

            <h2 className="text-gray-900 dark:text-white font-black text-3xl mt-14 mb-8" style={{fontFamily:"'Barlow Condensed',sans-serif"}}>IN THE NEWS</h2>
            <div className="space-y-4">
              {coverage.map(c=>(
                <div key={c.headline} className="bg-white dark:bg-[#0D1F35] rounded-2xl p-5 border border-gray-100 dark:border-white/[0.06] shadow-sm flex items-start justify-between gap-4 hover:border-amber-300 dark:hover:border-amber-400/30 transition-all group cursor-pointer">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-amber-500 font-bold text-xs">{c.outlet}</span>
                      <span className="text-gray-300 dark:text-white/20 text-xs">{c.date}</span>
                    </div>
                    <h3 className="text-gray-700 dark:text-white/70 text-sm leading-snug group-hover:text-gray-900 dark:group-hover:text-white transition-colors">{c.headline}</h3>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-300 dark:text-white/20 group-hover:text-amber-500 transition-colors flex-shrink-0 mt-1"/>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-[#0D1F35] rounded-2xl p-6 border border-gray-100 dark:border-white/[0.06] shadow-sm">
              <h3 className="text-gray-900 dark:text-white font-bold text-base mb-4">Media Contact</h3>
              <p className="text-gray-500 dark:text-white/45 text-sm mb-4">For press enquiries, interview requests, and image permissions:</p>
              <div className="space-y-2">
                <p className="text-gray-900 dark:text-white font-semibold text-sm">Sophie van der Berg</p>
                <p className="text-gray-400 dark:text-white/35 text-xs">Head of Communications</p>
                <a href="mailto:press@novacargo.com" className="flex items-center gap-2 text-amber-500 hover:underline text-sm mt-3"><Mail className="w-4 h-4"/>press@novacargo.com</a>
              </div>
            </div>
            <div className="bg-white dark:bg-[#0D1F35] rounded-2xl p-6 border border-gray-100 dark:border-white/[0.06] shadow-sm">
              <h3 className="text-gray-900 dark:text-white font-bold text-base mb-4">Brand Assets</h3>
              <p className="text-gray-500 dark:text-white/45 text-sm mb-5">Download our logo, brand guidelines, and executive headshots for editorial use.</p>
              {[["Logo Pack (SVG/PNG)","2.4 MB"],["Brand Guidelines PDF","8.1 MB"],["Executive Headshots","12.3 MB"],["Product Screenshots","5.7 MB"]].map(([n,s])=>(
                <div key={n} className="flex items-center justify-between py-2.5 border-b border-gray-100 dark:border-white/[0.05] last:border-0 group cursor-pointer">
                  <span className="text-gray-700 dark:text-white/60 text-sm group-hover:text-amber-500 transition-colors">{n}</span>
                  <div className="flex items-center gap-1.5 text-gray-400 dark:text-white/25 text-xs"><Download className="w-3.5 h-3.5"/>{s}</div>
                </div>
              ))}
            </div>
            <div className="bg-amber-50 dark:bg-amber-400/10 border border-amber-200 dark:border-amber-400/20 rounded-2xl p-5">
              <h4 className="text-amber-800 dark:text-amber-300 font-bold text-sm mb-2">Fast Facts</h4>
              <ul className="space-y-1.5">
                {[["Founded","2018, Amsterdam"],["Employees","4,200+"],["Countries","220+"],["Parcels delivered","12M+"],["Valuation","€1.8B (2023)"]].map(([k,v])=>(
                  <li key={k} className="flex justify-between text-xs"><span className="text-amber-700/70 dark:text-amber-400/60">{k}</span><span className="text-amber-800 dark:text-amber-300 font-semibold">{v}</span></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
