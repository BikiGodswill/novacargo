import PageShell from "@/components/PageShell";
import { Leaf, Zap, Globe2, Recycle, TrendingDown, CheckCircle, Sun } from "lucide-react";

const goals = [
  { icon: Leaf, label:"Carbon Neutral EU Ops", status:"Achieved 2024", done:true },
  { icon: Zap, label:"100% Renewable Energy in Depots", status:"On track — 78% achieved", done:false },
  { icon: Globe2, label:"Net-Zero Global Operations", status:"Target 2030", done:false },
  { icon: Recycle, label:"100% Recyclable Packaging", status:"Achieved 2023", done:true },
];

const initiatives = [
  { icon: Sun, title:"Solar-Powered Depots", desc:"64 of our 90 owned depot facilities now operate on rooftop solar panels, generating 18 GWh of clean energy annually." },
  { icon: Zap, title:"Electric Last-Mile Fleet", desc:"Over 1,400 of our 3,200 last-mile delivery vehicles are now fully electric, with the full fleet transitioning by 2027." },
  { icon: Recycle, title:"Zero-Waste Packaging", desc:"Our NovaBox reusable packaging programme has eliminated 420 tonnes of single-use cardboard since launch in 2022." },
  { icon: Globe2, title:"Carbon Offset Programme", desc:"We invest in certified reforestation projects in Kenya and Colombia, offsetting 110,000 tonnes of CO₂ annually." },
  { icon: Leaf, title:"Green Routing Algorithms", desc:"Our NovaSmart™ AI includes a 'green mode' that selects fuel-efficient routes, reducing per-parcel emissions by up to 14%." },
  { icon: TrendingDown, title:"Scope 3 Emissions Tracking", desc:"We measure and publicly report all upstream and downstream logistics emissions across our supply chain." },
];

export const metadata = { title:"Sustainability — NovaCargo" };

export default function SustainabilityPage() {
  return (
    <PageShell label="Company" title="LOGISTICS FOR A BETTER PLANET" subtitle="We believe that speed and sustainability are not opposites. NovaCargo is committed to building a logistics network that thrives without compromising the future." breadcrumbs={[{label:"Sustainability",href:"/sustainability"}]}>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
          {[["−38%","CO₂ per parcel vs. 2020"],["110K t","Carbon offset annually"],["78%","Depots on renewable energy"],["1,400+","Electric delivery vehicles"]].map(([v,l])=>(
            <div key={l} className="bg-white dark:bg-[#0D1F35] rounded-2xl p-6 border border-gray-100 dark:border-white/[0.06] shadow-sm text-center">
              <p className="text-green-600 dark:text-green-400 font-black text-3xl" style={{fontFamily:"'Barlow Condensed',sans-serif"}}>{v}</p>
              <p className="text-gray-500 dark:text-white/45 text-sm mt-2">{l}</p>
            </div>
          ))}
        </div>

        {/* Goals */}
        <div className="flex items-center gap-2 mb-4"><span className="w-4 h-0.5 bg-green-500"/><span className="text-green-600 dark:text-green-400 text-sm font-semibold uppercase tracking-widest">Our Commitments</span></div>
        <h2 className="text-gray-900 dark:text-white font-black text-4xl mb-8" style={{fontFamily:"'Barlow Condensed',sans-serif"}}>2025–2030 SUSTAINABILITY GOALS</h2>
        <div className="grid sm:grid-cols-2 gap-4 mb-20">
          {goals.map(g=>{const Icon=g.icon; return(
            <div key={g.label} className={`rounded-2xl p-5 border flex items-center gap-4 ${g.done?"bg-green-50 dark:bg-green-400/10 border-green-200 dark:border-green-400/20":"bg-white dark:bg-[#0D1F35] border-gray-100 dark:border-white/[0.06]"}`}>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${g.done?"bg-green-100 dark:bg-green-400/20":"bg-gray-100 dark:bg-white/5"}`}>
                <Icon className={`w-5 h-5 ${g.done?"text-green-600 dark:text-green-400":"text-gray-400 dark:text-white/30"}`}/>
              </div>
              <div>
                <p className="text-gray-900 dark:text-white font-semibold text-sm">{g.label}</p>
                <p className={`text-xs mt-0.5 flex items-center gap-1 ${g.done?"text-green-600 dark:text-green-400":"text-gray-400 dark:text-white/35"}`}>
                  {g.done&&<CheckCircle className="w-3 h-3"/>}{g.status}
                </p>
              </div>
            </div>
          );})}
        </div>

        {/* Initiatives */}
        <div className="flex items-center gap-2 mb-4"><span className="w-4 h-0.5 bg-green-500"/><span className="text-green-600 dark:text-green-400 text-sm font-semibold uppercase tracking-widest">What We're Doing</span></div>
        <h2 className="text-gray-900 dark:text-white font-black text-4xl mb-10" style={{fontFamily:"'Barlow Condensed',sans-serif"}}>GREEN INITIATIVES IN ACTION</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {initiatives.map(ini=>{const Icon=ini.icon; return(
            <div key={ini.title} className="bg-white dark:bg-[#0D1F35] rounded-2xl p-6 border border-gray-100 dark:border-white/[0.06] shadow-sm">
              <div className="w-11 h-11 bg-green-50 dark:bg-green-400/10 rounded-xl flex items-center justify-center mb-4"><Icon className="w-5 h-5 text-green-600 dark:text-green-400"/></div>
              <h3 className="text-gray-900 dark:text-white font-bold text-base mb-2">{ini.title}</h3>
              <p className="text-gray-500 dark:text-white/40 text-sm leading-relaxed">{ini.desc}</p>
            </div>
          );})}
        </div>
      </section>

      <section className="bg-[#060E1A] py-14">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <Leaf className="w-10 h-10 text-green-400 mx-auto mb-4"/>
          <h2 className="text-white font-black text-3xl mb-3" style={{fontFamily:"'Barlow Condensed',sans-serif"}}>DOWNLOAD OUR ESG REPORT</h2>
          <p className="text-white/40 text-sm mb-6">Full transparency on our environmental, social, and governance performance for 2023.</p>
          <button className="inline-flex items-center gap-2 px-8 py-3.5 bg-green-500 hover:bg-green-400 text-white font-bold rounded-xl transition-all text-sm">Download ESG Report 2023</button>
        </div>
      </section>
    </PageShell>
  );
}
