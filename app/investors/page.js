import PageShell from "@/components/PageShell";
import { TrendingUp, Download, Mail, Shield } from "lucide-react";

const financials = [
  { label:"Annual Revenue (2023)","value":"€380M","change":"+67% YoY" },
  { label:"Gross Margin","value":"38.4%","change":"+6.2pp YoY" },
  { label:"Active Customers","value":"50,400","change":"+42% YoY" },
  { label:"Parcels Processed","value":"12.1M","change":"+88% YoY" },
  { label:"Countries Served","value":"220+","change":"+68 new" },
  { label:"Employee Count","value":"4,200","change":"+1,400 hired" },
];

const investors = [
  { name:"Sequoia Capital Europe", role:"Series B & C Lead", since:"2021" },
  { name:"Accel Partners", role:"Series B Co-Lead", since:"2021" },
  { name:"Index Ventures", role:"Series A Lead", since:"2020" },
  { name:"Lakestar", role:"Seed & Series A", since:"2019" },
  { name:"LocalGlobe", role:"Seed", since:"2018" },
];

const reports = [
  { title:"Annual Report 2023", size:"4.2 MB" },
  { title:"Q4 2023 Investor Letter", size:"1.1 MB" },
  { title:"Q3 2023 Investor Letter", size:"0.9 MB" },
  { title:"ESG Report 2023", size:"3.5 MB" },
  { title:"Series C Deck (Public)", size:"2.8 MB" },
];

export const metadata = { title:"Investor Relations — NovaCargo" };

export default function InvestorsPage() {
  return (
    <PageShell label="Company" title="INVESTOR RELATIONS" subtitle="NovaCargo is a privately held company. We are transparent with our investors and publish select financial highlights for stakeholders." breadcrumbs={[{label:"Investor Relations",href:"/investors"}]}>

      {/* Key metrics */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-center gap-2 mb-3"><span className="w-4 h-0.5 bg-amber-500"/><span className="text-amber-500 text-sm font-semibold uppercase tracking-widest">2023 Highlights</span></div>
        <h2 className="text-gray-900 dark:text-white font-black text-4xl mb-10" style={{fontFamily:"'Barlow Condensed',sans-serif"}}>STRONG GROWTH ACROSS ALL METRICS</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {financials.map(f=>(
            <div key={f.label} className="bg-white dark:bg-[#0D1F35] rounded-2xl p-6 border border-gray-100 dark:border-white/[0.06] shadow-sm">
              <p className="text-gray-400 dark:text-white/35 text-xs uppercase tracking-wider mb-2">{f.label}</p>
              <p className="text-gray-900 dark:text-white font-black text-3xl" style={{fontFamily:"'Barlow Condensed',sans-serif"}}>{f.value}</p>
              <span className="inline-flex items-center gap-1 mt-2 px-2 py-0.5 bg-green-100 dark:bg-green-400/10 text-green-700 dark:text-green-400 text-xs font-semibold rounded-full">
                <TrendingUp className="w-3 h-3"/>{f.change}
              </span>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Investors */}
          <div>
            <h2 className="text-gray-900 dark:text-white font-black text-3xl mb-6" style={{fontFamily:"'Barlow Condensed',sans-serif"}}>OUR INVESTORS</h2>
            <div className="space-y-3">
              {investors.map(inv=>(
                <div key={inv.name} className="bg-white dark:bg-[#0D1F35] rounded-2xl px-5 py-4 border border-gray-100 dark:border-white/[0.06] shadow-sm flex items-center justify-between">
                  <div>
                    <p className="text-gray-900 dark:text-white font-semibold text-sm">{inv.name}</p>
                    <p className="text-gray-400 dark:text-white/35 text-xs mt-0.5">{inv.role}</p>
                  </div>
                  <span className="text-amber-500 text-xs font-semibold">Since {inv.since}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Reports & Contact */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-[#0D1F35] rounded-2xl p-6 border border-gray-100 dark:border-white/[0.06] shadow-sm">
              <h3 className="text-gray-900 dark:text-white font-bold text-base mb-5">Financial Reports</h3>
              {reports.map(r=>(
                <div key={r.title} className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-white/[0.05] last:border-0 group cursor-pointer">
                  <span className="text-gray-700 dark:text-white/60 text-sm group-hover:text-amber-500 transition-colors">{r.title}</span>
                  <div className="flex items-center gap-1.5 text-gray-400 dark:text-white/25 text-xs"><Download className="w-3.5 h-3.5"/>{r.size}</div>
                </div>
              ))}
            </div>
            <div className="bg-white dark:bg-[#0D1F35] rounded-2xl p-6 border border-gray-100 dark:border-white/[0.06] shadow-sm">
              <h3 className="text-gray-900 dark:text-white font-bold text-base mb-3">Investor Contact</h3>
              <p className="text-gray-500 dark:text-white/45 text-sm mb-4">For institutional investor enquiries and partnership discussions:</p>
              <p className="text-gray-900 dark:text-white font-semibold text-sm">Thomas Kuiper</p>
              <p className="text-gray-400 dark:text-white/35 text-xs mb-3">Head of Investor Relations</p>
              <a href="mailto:ir@novacargo.com" className="flex items-center gap-2 text-amber-500 hover:underline text-sm"><Mail className="w-4 h-4"/>ir@novacargo.com</a>
            </div>
            <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-400/10 border border-blue-200 dark:border-blue-400/20 rounded-xl">
              <Shield className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0"/>
              <p className="text-blue-800 dark:text-blue-300 text-xs leading-relaxed">All financial figures are unaudited and for informational purposes only. NovaCargo B.V. is registered in the Netherlands (KvK 78234901).</p>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
