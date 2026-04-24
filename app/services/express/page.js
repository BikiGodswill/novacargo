import PageShell from "@/components/PageShell";
import Link from "next/link";
import { Zap, Clock, CheckCircle, MapPin, ArrowRight, Shield, BarChart3 } from "lucide-react";

const features = [
  { icon:Clock, title:"Next-Day Delivery", desc:"Guaranteed next-business-day delivery to 40+ major cities across Europe, North America, and Southeast Asia." },
  { icon:Zap, title:"Same-Day in 28 Cities", desc:"Book before 11 AM for same-day delivery within our premium city network, including London, Amsterdam, Dubai, and Singapore." },
  { icon:MapPin, title:"Live GPS Tracking", desc:"Real-time GPS updates every 15 minutes from pickup to doorstep. Share a live link with your customers." },
  { icon:Shield, title:"Full Insurance Included", desc:"All Express shipments include cargo insurance up to €500 at no extra cost. Higher limits available on request." },
  { icon:BarChart3, title:"98.9% On-Time Rate", desc:"Industry-leading punctuality backed by our €50 credit guarantee if your express shipment arrives late." },
  { icon:CheckCircle, title:"Digital Proof of Delivery", desc:"Instant photo and signature capture at delivery, automatically emailed to sender and recipient." },
];

const zones = [
  { zone:"Zone 1 — Within Country", time:"Same-day / Next-day", price:"From €7.90" },
  { zone:"Zone 2 — Adjacent Countries", time:"1–2 Business Days", price:"From €14.50" },
  { zone:"Zone 3 — European Union", time:"2–3 Business Days", price:"From €22.00" },
  { zone:"Zone 4 — USA, Canada, UAE", time:"2–4 Business Days", price:"From €38.00" },
  { zone:"Zone 5 — Asia Pacific", time:"3–5 Business Days", price:"From €45.00" },
  { zone:"Zone 6 — Rest of World", time:"4–6 Business Days", price:"From €52.00" },
];

export const metadata = { title:"Express Delivery — NovaCargo" };

export default function ExpressPage() {
  return (
    <PageShell label="Services" title="EXPRESS DELIVERY" subtitle="When it absolutely must arrive today or tomorrow — NovaCargo Express delivers with a guarantee. Speed you can trust, backed by real-time visibility." breadcrumbs={[{label:"Services",href:"#"},{label:"Express Delivery",href:"/services/express"}]}>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {features.map(f=>{const Icon=f.icon; return(
            <div key={f.title} className="bg-white dark:bg-[#0D1F35] rounded-2xl p-6 border border-gray-100 dark:border-white/[0.06] shadow-sm hover:-translate-y-1 transition-transform">
              <div className="w-11 h-11 bg-amber-50 dark:bg-amber-400/10 rounded-xl flex items-center justify-center mb-4"><Icon className="w-5 h-5 text-amber-500"/></div>
              <h3 className="text-gray-900 dark:text-white font-bold text-base mb-2">{f.title}</h3>
              <p className="text-gray-500 dark:text-white/40 text-sm leading-relaxed">{f.desc}</p>
            </div>
          );})}
        </div>

        <div className="flex items-center gap-2 mb-4"><span className="w-4 h-0.5 bg-amber-500"/><span className="text-amber-500 text-sm font-semibold uppercase tracking-widest">Pricing Zones</span></div>
        <h2 className="text-gray-900 dark:text-white font-black text-4xl mb-8" style={{fontFamily:"'Barlow Condensed',sans-serif"}}>TRANSPARENT, ZONE-BASED PRICING</h2>
        <div className="bg-white dark:bg-[#0D1F35] rounded-2xl border border-gray-100 dark:border-white/[0.06] shadow-sm overflow-hidden mb-12">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-gray-100 dark:border-white/[0.06] bg-gray-50 dark:bg-white/[0.02]">
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 dark:text-white/30 uppercase tracking-wider">Zone</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 dark:text-white/30 uppercase tracking-wider">Transit Time</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 dark:text-white/30 uppercase tracking-wider">Starting Price</th>
            </tr></thead>
            <tbody className="divide-y divide-gray-50 dark:divide-white/[0.03]">
              {zones.map(z=>(
                <tr key={z.zone} className="hover:bg-gray-50 dark:hover:bg-white/[0.02]">
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white text-sm">{z.zone}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-white/50 text-sm">{z.time}</td>
                  <td className="px-6 py-4 text-amber-600 dark:text-amber-400 font-semibold text-sm">{z.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-gray-400 dark:text-white/30 text-xs mb-12">* Prices are for shipments up to 1 kg. Volume discounts available for business accounts. Fuel surcharges may apply.</p>

        <div className="bg-[#060E1A] rounded-2xl p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h3 className="text-white font-black text-2xl mb-2" style={{fontFamily:"'Barlow Condensed',sans-serif"}}>READY TO SEND EXPRESS?</h3>
            <p className="text-white/45 text-sm">Get an instant quote or track an existing express shipment.</p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <Link href="/track" className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-[#060E1A] font-bold text-sm rounded-xl transition-all hover:shadow-glow">Track Shipment <ArrowRight className="w-4 h-4"/></Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
