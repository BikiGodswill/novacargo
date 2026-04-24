import PageShell from "@/components/PageShell";
import Link from "next/link";
import { Warehouse, Zap, BarChart3, Shield, Globe2, Thermometer, ArrowRight, CheckCircle } from "lucide-react";

const services = [
  { icon:Warehouse, title:"Pick, Pack & Fulfil", desc:"Orders received before 2 PM are picked, packed, and dispatched same day from our automated fulfilment centres." },
  { icon:Zap, title:"Returns Management", desc:"Branded returns portals, automated re-grading, and rapid restocking get your returned goods back on sale within 48 hours." },
  { icon:Thermometer, title:"Cold Chain Storage", desc:"Temperature-controlled storage from −20°C to +15°C for pharmaceuticals, food, and perishable goods at 12 locations." },
  { icon:Shield, title:"Bonded Warehousing", desc:"Customs-bonded facilities at Amsterdam, Dubai, and Singapore for duty-deferred storage of international goods." },
  { icon:BarChart3, title:"Real-Time Inventory", desc:"Cloud-based Warehouse Management System (WMS) syncs with Shopify, WooCommerce, Amazon, and 40+ other platforms." },
  { icon:Globe2, title:"20 Global Locations", desc:"Strategic warehousing in Europe, Middle East, APAC and Americas — store your inventory close to your customers." },
];

const locations = [
  { city:"Amsterdam", sqm:"48,000 m²", type:"Fulfilment + Cold Chain", markets:"EU Primary" },
  { city:"Rotterdam", sqm:"62,000 m²", type:"Port Freight + Bonded", markets:"EU Import/Export" },
  { city:"Dubai", sqm:"35,000 m²", type:"Fulfilment + Bonded", markets:"MEA" },
  { city:"Singapore", sqm:"28,000 m²", type:"Fulfilment + Cold Chain", markets:"APAC" },
  { city:"Frankfurt", sqm:"40,000 m²", type:"Fulfilment + Returns", markets:"DACH" },
  { city:"London (Heathrow)", sqm:"22,000 m²", type:"Air Express Fulfilment", markets:"UK" },
];

export const metadata = { title:"Warehousing — NovaCargo" };

export default function WarehousingPage() {
  return (
    <PageShell label="Services" title="WAREHOUSING & FULFILLMENT" subtitle="Store smarter, ship faster. NovaCargo's 20 global fulfilment centres put your inventory within 1,000 km of 4 billion consumers — ready to ship the moment an order lands." breadcrumbs={[{label:"Services",href:"#"},{label:"Warehousing",href:"/services/warehousing"}]}>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid sm:grid-cols-4 gap-5 mb-16">
          {[["20","Global Locations"],["780K m²","Total Warehouse Space"],["99.97%","Inventory Accuracy"],["Same-Day","Order Dispatch"]].map(([v,l])=>(
            <div key={l} className="bg-white dark:bg-[#0D1F35] rounded-2xl p-5 border border-gray-100 dark:border-white/[0.06] shadow-sm text-center">
              <p className="text-amber-500 font-black text-2xl" style={{fontFamily:"'Barlow Condensed',sans-serif"}}>{v}</p>
              <p className="text-gray-500 dark:text-white/40 text-xs mt-1">{l}</p>
            </div>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {services.map(s=>{const Icon=s.icon;return(<div key={s.title} className="bg-white dark:bg-[#0D1F35] rounded-2xl p-6 border border-gray-100 dark:border-white/[0.06] shadow-sm hover:-translate-y-1 transition-transform"><div className="w-11 h-11 bg-amber-50 dark:bg-amber-400/10 rounded-xl flex items-center justify-center mb-4"><Icon className="w-5 h-5 text-amber-500"/></div><h3 className="text-gray-900 dark:text-white font-bold text-base mb-2">{s.title}</h3><p className="text-gray-500 dark:text-white/40 text-sm leading-relaxed">{s.desc}</p></div>);})}
        </div>

        <div className="flex items-center gap-2 mb-4"><span className="w-4 h-0.5 bg-amber-500"/><span className="text-amber-500 text-sm font-semibold uppercase tracking-widest">Our Locations</span></div>
        <h2 className="text-gray-900 dark:text-white font-black text-4xl mb-8" style={{fontFamily:"'Barlow Condensed',sans-serif"}}>STRATEGIC FULFILMENT NETWORK</h2>
        <div className="bg-white dark:bg-[#0D1F35] rounded-2xl border border-gray-100 dark:border-white/[0.06] shadow-sm overflow-hidden mb-12">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-gray-100 dark:border-white/[0.06] bg-gray-50 dark:bg-white/[0.02]">
              {["Facility","Size","Type","Markets Served"].map(h=><th key={h} className="text-left px-6 py-4 text-xs font-semibold text-gray-400 dark:text-white/30 uppercase tracking-wider">{h}</th>)}
            </tr></thead>
            <tbody className="divide-y divide-gray-50 dark:divide-white/[0.03]">
              {locations.map(l=>(
                <tr key={l.city} className="hover:bg-gray-50 dark:hover:bg-white/[0.02]">
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white text-sm">{l.city}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-white/50 text-sm">{l.sqm}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-white/50 text-sm">{l.type}</td>
                  <td className="px-6 py-4"><span className="px-2.5 py-1 bg-amber-100 dark:bg-amber-400/10 text-amber-700 dark:text-amber-400 text-xs font-semibold rounded-full">{l.markets}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-[#060E1A] rounded-2xl p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div><h3 className="text-white font-black text-2xl mb-2" style={{fontFamily:"'Barlow Condensed',sans-serif"}}>TALK TO OUR WAREHOUSING TEAM</h3><p className="text-white/45 text-sm">Get a custom quote based on your SKU count, order volume, and target markets.</p></div>
          <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-[#060E1A] font-bold text-sm rounded-xl transition-all hover:shadow-glow flex-shrink-0">Get Custom Quote <ArrowRight className="w-4 h-4"/></Link>
        </div>
      </section>
    </PageShell>
  );
}
