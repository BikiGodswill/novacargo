import PageShell from "@/components/PageShell";
import Link from "next/link";
import { ShoppingCart, Zap, BarChart3, RefreshCw, Globe2, Shield, ArrowRight, CheckCircle } from "lucide-react";

const integrations = ["Shopify","WooCommerce","Amazon FBA","Magento","BigCommerce","Etsy","PrestaShop","Squarespace","TikTok Shop","Zalando","ASOS Marketplace","eBay"];
const features = [
  { icon:Zap, title:"One-Click Integration", desc:"Connect your store in under 5 minutes. Orders sync automatically — no manual CSV uploads or copy-pasting." },
  { icon:BarChart3, title:"Analytics Dashboard", desc:"Track fulfilment speed, return rates, cost-per-shipment, and customer satisfaction scores from one screen." },
  { icon:RefreshCw, title:"Branded Returns", desc:"Customise the returns experience with your logo, messaging, and a portal your customers will love using." },
  { icon:Globe2, title:"Cross-Border Commerce", desc:"Sell to 220+ countries with automated HS code classification, duties calculation, and customs documentation." },
  { icon:Shield, title:"Fraud Protection", desc:"Address verification, delivery anomaly detection, and signature-required options protect your high-value orders." },
  { icon:ShoppingCart, title:"Multi-Channel Order Routing", desc:"Sell across 10 platforms? Orders from every channel route automatically to the optimal fulfilment location." },
];

export const metadata = { title:"E-Commerce Logistics — NovaCargo" };

export default function EcommercePage() {
  return (
    <PageShell label="Services" title="E-COMMERCE LOGISTICS" subtitle="Built for online sellers who are scaling fast. NovaCargo handles pick, pack, ship, and returns so you can focus entirely on growing your store." breadcrumbs={[{label:"Services",href:"#"},{label:"E-Commerce Logistics",href:"/services/ecommerce"}]}>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Social proof strip */}
        <div className="flex flex-wrap gap-6 mb-16">
          {[["8,000+","Online stores powered"],["2.4M","Orders shipped monthly"],["99.1%","Accuracy rate"],["< 4 hrs","Average pick-to-dispatch"]].map(([v,l])=>(
            <div key={l} className="bg-white dark:bg-[#0D1F35] rounded-2xl px-6 py-4 border border-gray-100 dark:border-white/[0.06] shadow-sm">
              <p className="text-amber-500 font-black text-2xl" style={{fontFamily:"'Barlow Condensed',sans-serif"}}>{v}</p>
              <p className="text-gray-500 dark:text-white/40 text-xs mt-0.5">{l}</p>
            </div>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {features.map(f=>{const Icon=f.icon;return(<div key={f.title} className="bg-white dark:bg-[#0D1F35] rounded-2xl p-6 border border-gray-100 dark:border-white/[0.06] shadow-sm hover:-translate-y-1 transition-transform"><div className="w-11 h-11 bg-amber-50 dark:bg-amber-400/10 rounded-xl flex items-center justify-center mb-4"><Icon className="w-5 h-5 text-amber-500"/></div><h3 className="text-gray-900 dark:text-white font-bold text-base mb-2">{f.title}</h3><p className="text-gray-500 dark:text-white/40 text-sm leading-relaxed">{f.desc}</p></div>);})}
        </div>

        <div className="flex items-center gap-2 mb-6"><span className="w-4 h-0.5 bg-amber-500"/><span className="text-amber-500 text-sm font-semibold uppercase tracking-widest">Integrations</span></div>
        <h2 className="text-gray-900 dark:text-white font-black text-4xl mb-6" style={{fontFamily:"'Barlow Condensed',sans-serif"}}>CONNECT YOUR STORE IN MINUTES</h2>
        <p className="text-gray-500 dark:text-white/45 mb-8 max-w-xl">Native integrations with 40+ e-commerce platforms and marketplaces. If yours isn&apos;t listed, our REST API connects to anything.</p>
        <div className="flex flex-wrap gap-3 mb-16">
          {integrations.map(p=><span key={p} className="px-4 py-2.5 bg-white dark:bg-[#0D1F35] border border-gray-200 dark:border-white/10 rounded-xl text-gray-700 dark:text-white/60 text-sm font-medium shadow-sm hover:border-amber-300 dark:hover:border-amber-400/30 transition-colors cursor-pointer">{p}</span>)}
          <span className="px-4 py-2.5 bg-amber-50 dark:bg-amber-400/10 border border-amber-200 dark:border-amber-400/20 rounded-xl text-amber-700 dark:text-amber-400 text-sm font-medium">+ 28 more via API</span>
        </div>

        {/* Pricing tiers */}
        <div className="flex items-center gap-2 mb-6"><span className="w-4 h-0.5 bg-amber-500"/><span className="text-amber-500 text-sm font-semibold uppercase tracking-widest">Pricing</span></div>
        <h2 className="text-gray-900 dark:text-white font-black text-4xl mb-10" style={{fontFamily:"'Barlow Condensed',sans-serif"}}>PLANS THAT GROW WITH YOU</h2>
        <div className="grid sm:grid-cols-3 gap-6 mb-12">
          {[
            { name:"Starter", price:"€49/mo", orders:"Up to 500 orders/month", features:["2 integrations","EU shipping only","Standard support","Basic analytics"], accent:"border-gray-200 dark:border-white/[0.06]" },
            { name:"Growth", price:"€149/mo", orders:"Up to 2,500 orders/month", features:["Unlimited integrations","Global shipping","Priority support","Full analytics","Branded returns"], accent:"border-amber-400/50 shadow-glow", badge:"Most Popular" },
            { name:"Enterprise", price:"Custom", orders:"Unlimited orders", features:["Dedicated account manager","Custom SLAs","API access","Warehouse network access","White-label portal"], accent:"border-gray-200 dark:border-white/[0.06]" },
          ].map(plan=>(
            <div key={plan.name} className={`bg-white dark:bg-[#0D1F35] rounded-2xl p-7 border-2 shadow-sm relative ${plan.accent}`}>
              {plan.badge&&<span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-amber-500 text-[#060E1A] text-xs font-black rounded-full" style={{fontFamily:"'Barlow Condensed',sans-serif"}}>{plan.badge}</span>}
              <p className="text-gray-400 dark:text-white/35 text-xs uppercase tracking-widest font-semibold mb-1">{plan.name}</p>
              <p className="text-gray-900 dark:text-white font-black text-3xl mb-1" style={{fontFamily:"'Barlow Condensed',sans-serif"}}>{plan.price}</p>
              <p className="text-gray-400 dark:text-white/35 text-xs mb-6">{plan.orders}</p>
              <ul className="space-y-2.5 mb-7">{plan.features.map(f=><li key={f} className="flex items-center gap-2.5 text-sm text-gray-600 dark:text-white/55"><CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0"/>{f}</li>)}</ul>
              <Link href="/contact" className={`block text-center py-2.5 rounded-xl font-bold text-sm transition-all ${plan.badge?"bg-amber-500 hover:bg-amber-400 text-[#060E1A] hover:shadow-glow":"border border-gray-200 dark:border-white/10 text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-white/5"}`}>
                {plan.price==="Custom"?"Talk to Sales":"Get Started"}
              </Link>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
