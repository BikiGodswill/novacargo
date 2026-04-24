import PageShell from "@/components/PageShell";
import Link from "next/link";
import { Globe2, Plane, Shield, FileText, Clock, BarChart3, ArrowRight, CheckCircle } from "lucide-react";

const features = [
  { icon:Plane, title:"220+ Country Network", desc:"Access to 850+ airline partners and NovaCargo's own air freight capacity on 38 dedicated freighter routes." },
  { icon:FileText, title:"Full Customs Clearance", desc:"Our in-house customs brokers handle all documentation, duties, and compliance in 180+ countries." },
  { icon:Shield, title:"Cargo Insurance", desc:"Comprehensive all-risk marine cargo insurance included on all international air shipments over €100 value." },
  { icon:Clock, title:"Priority Handling", desc:"Temperature-sensitive, high-value, and time-critical cargo handled by trained specialists at every hub." },
  { icon:BarChart3, title:"End-to-End Visibility", desc:"Track your shipment from export clearance through customs to final delivery on one unified dashboard." },
  { icon:Globe2, title:"Dangerous Goods Certified", desc:"IATA-certified dangerous goods handling for batteries, chemicals, and other regulated commodities." },
];

const hubs = [
  { city:"Amsterdam", code:"AMS", role:"European Gateway Hub", weekly:"148 departures/week" },
  { city:"Dubai", code:"DXB", role:"Middle East & Africa Hub", weekly:"96 departures/week" },
  { city:"Singapore", code:"SIN", role:"Asia Pacific Hub", weekly:"112 departures/week" },
  { city:"New York (JFK)", code:"JFK", role:"Americas Hub", weekly:"88 departures/week" },
  { city:"Hong Kong", code:"HKG", role:"China & APAC Gateway", weekly:"104 departures/week" },
  { city:"São Paulo", code:"GRU", role:"Latin America Hub", weekly:"64 departures/week" },
];

export const metadata = { title:"International Air — NovaCargo" };

export default function InternationalAirPage() {
  return (
    <PageShell label="Services" title="INTERNATIONAL AIR FREIGHT" subtitle="Move goods across the world in days, not weeks. NovaCargo's air freight network connects 220+ countries with unmatched speed, customs expertise, and cargo visibility." breadcrumbs={[{label:"Services",href:"#"},{label:"International Air",href:"/services/international-air"}]}>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {features.map(f=>{const Icon=f.icon;return(<div key={f.title} className="bg-white dark:bg-[#0D1F35] rounded-2xl p-6 border border-gray-100 dark:border-white/[0.06] shadow-sm hover:-translate-y-1 transition-transform"><div className="w-11 h-11 bg-blue-50 dark:bg-blue-400/10 rounded-xl flex items-center justify-center mb-4"><Icon className="w-5 h-5 text-blue-500 dark:text-blue-400"/></div><h3 className="text-gray-900 dark:text-white font-bold text-base mb-2">{f.title}</h3><p className="text-gray-500 dark:text-white/40 text-sm leading-relaxed">{f.desc}</p></div>);})}
        </div>

        <div className="flex items-center gap-2 mb-4"><span className="w-4 h-0.5 bg-amber-500"/><span className="text-amber-500 text-sm font-semibold uppercase tracking-widest">Our Hub Network</span></div>
        <h2 className="text-gray-900 dark:text-white font-black text-4xl mb-10" style={{fontFamily:"'Barlow Condensed',sans-serif"}}>STRATEGIC GLOBAL AIR HUBS</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
          {hubs.map(h=>(
            <div key={h.city} className="bg-white dark:bg-[#0D1F35] rounded-2xl p-5 border border-gray-100 dark:border-white/[0.06] shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="font-black text-2xl text-amber-400" style={{fontFamily:"'Barlow Condensed',sans-serif"}}>{h.code}</span>
                <Plane className="w-5 h-5 text-gray-300 dark:text-white/20"/>
              </div>
              <p className="text-gray-900 dark:text-white font-bold text-sm">{h.city}</p>
              <p className="text-gray-500 dark:text-white/40 text-xs mt-0.5">{h.role}</p>
              <p className="text-amber-500 text-xs font-semibold mt-2">{h.weekly}</p>
            </div>
          ))}
        </div>

        <div className="bg-white dark:bg-[#0D1F35] rounded-2xl p-8 border border-gray-100 dark:border-white/[0.06] shadow-sm mb-10">
          <h3 className="text-gray-900 dark:text-white font-black text-2xl mb-6" style={{fontFamily:"'Barlow Condensed',sans-serif"}}>WHAT&apos;S INCLUDED IN EVERY SHIPMENT</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {["Export customs declaration","Import customs clearance","IATA airway bill (AWB)","Real-time flight tracking","Cargo insurance up to €2,000","Delivery to final address","Digital proof of delivery","Dedicated account manager for 10+ kg"].map(item=>(
              <div key={item} className="flex items-center gap-3 text-gray-600 dark:text-white/55 text-sm">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0"/>{item}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#060E1A] rounded-2xl p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div><h3 className="text-white font-black text-2xl mb-2" style={{fontFamily:"'Barlow Condensed',sans-serif"}}>GET AN AIR FREIGHT QUOTE</h3><p className="text-white/45 text-sm">Tell us origin, destination, weight and commodity — get a quote in 60 seconds.</p></div>
          <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-[#060E1A] font-bold text-sm rounded-xl transition-all hover:shadow-glow flex-shrink-0">Request Quote <ArrowRight className="w-4 h-4"/></Link>
        </div>
      </section>
    </PageShell>
  );
}
