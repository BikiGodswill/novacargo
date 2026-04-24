import PageShell from "@/components/PageShell";
import Link from "next/link";
import { Truck, Ship, Train, Package, ArrowRight, CheckCircle } from "lucide-react";

const modes = [
  { icon:Truck, title:"Road Freight", desc:"Full truckload (FTL) and less-than-truckload (LTL) services across Europe, with 2,400 owned trucks and 6,000+ partner vehicles.", tags:["FTL","LTL","Groupage","Temperature-Controlled"] },
  { icon:Ship, title:"Ocean Freight", desc:"FCL and LCL container shipping on major trade lanes worldwide. We work with 28 ocean carriers to guarantee competitive rates.", tags:["FCL","LCL","Breakbulk","Project Cargo"] },
  { icon:Train, title:"Rail Freight", desc:"Fast, low-emission rail corridors connecting China to Europe via Central Asia — up to 40% faster than ocean, 70% cheaper than air.", tags:["China–Europe","Intermodal","Block Train"] },
  { icon:Package, title:"Breakbulk & Project Cargo", desc:"Oversized, heavy, and non-standard cargo — from wind turbines to oil rigs. Our project cargo team handles the impossible.", tags:["Oversized","Heavy Lift","Out-of-Gauge"] },
];

const capabilities = [
  "Shipments from 50 kg to 50,000+ tonnes","Dangerous goods (ADR/IMDG/IATA certified)","Temperature-controlled cold chain","Bonded warehousing at all major ports","Real-time container and trailer tracking","Multimodal end-to-end solutions","Customs brokerage in 90+ countries","24/7 operations control centre",
];

export const metadata = { title:"Freight Services — NovaCargo" };

export default function FreightPage() {
  return (
    <PageShell label="Services" title="FREIGHT SERVICES" subtitle="From a single pallet to a full container ship — NovaCargo moves the world's heavy, oversized, and high-volume cargo with precision and care." breadcrumbs={[{label:"Services",href:"#"},{label:"Freight Services",href:"/services/freight"}]}>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="space-y-6 mb-20">
          {modes.map(m=>{const Icon=m.icon;return(
            <div key={m.title} className="bg-white dark:bg-[#0D1F35] rounded-2xl p-7 border border-gray-100 dark:border-white/[0.06] shadow-sm flex flex-col sm:flex-row gap-6 hover:border-amber-300 dark:hover:border-amber-400/30 transition-all group">
              <div className="w-14 h-14 bg-amber-50 dark:bg-amber-400/10 rounded-2xl flex items-center justify-center flex-shrink-0"><Icon className="w-7 h-7 text-amber-500"/></div>
              <div>
                <h3 className="text-gray-900 dark:text-white font-bold text-lg mb-2">{m.title}</h3>
                <p className="text-gray-500 dark:text-white/45 text-sm leading-relaxed mb-4">{m.desc}</p>
                <div className="flex flex-wrap gap-2">{m.tags.map(t=><span key={t} className="px-2.5 py-1 bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-white/50 text-xs font-medium rounded-lg">{t}</span>)}</div>
              </div>
            </div>
          );})}
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-4"><span className="w-4 h-0.5 bg-amber-500"/><span className="text-amber-500 text-sm font-semibold uppercase tracking-widest">Our Capabilities</span></div>
            <h2 className="text-gray-900 dark:text-white font-black text-4xl mb-8" style={{fontFamily:"'Barlow Condensed',sans-serif"}}>BUILT FOR COMPLEX CARGO</h2>
            <div className="space-y-3">
              {capabilities.map(c=><div key={c} className="flex items-center gap-3 text-gray-600 dark:text-white/55 text-sm"><CheckCircle className="w-4 h-4 text-amber-500 flex-shrink-0"/>{c}</div>)}
            </div>
          </div>
          <div className="bg-[#060E1A] rounded-2xl p-8">
            <h3 className="text-white font-black text-2xl mb-6" style={{fontFamily:"'Barlow Condensed',sans-serif"}}>REQUEST A FREIGHT QUOTE</h3>
            <div className="space-y-4">
              {[["Origin","e.g. Shanghai, China"],["Destination","e.g. Rotterdam, Netherlands"],["Cargo Weight","e.g. 2,400 kg"],["Cargo Type","e.g. Industrial Machinery"]].map(([l,p])=>(
                <div key={l}><label className="text-white/40 text-xs uppercase tracking-wider font-semibold block mb-1.5">{l}</label>
                <input type="text" placeholder={p} className="w-full px-4 py-2.5 bg-white/[0.06] border border-white/10 rounded-xl text-white placeholder-white/20 text-sm focus:outline-none focus:border-amber-400/60 focus:ring-1 focus:ring-amber-400/20 transition-all"/></div>
              ))}
              <button className="w-full mt-2 py-3 bg-amber-500 hover:bg-amber-400 text-[#060E1A] font-bold rounded-xl transition-all hover:shadow-glow text-sm">Get Freight Quote</button>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
