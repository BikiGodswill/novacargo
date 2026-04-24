import PageShell from "@/components/PageShell";
import { AlertCircle, Clock, CheckCircle, FileText, Phone, Mail } from "lucide-react";

const steps = [
  { n:"01", icon:FileText, title:"Gather Your Documents", desc:"You'll need your tracking number, proof of value (invoice/receipt), photos of damage if applicable, and your delivery confirmation." },
  { n:"02", icon:AlertCircle, title:"Submit Your Claim", desc:"Complete the claim form below or email us at claims@novacargo.com. Claims must be submitted within 30 days of the delivery date." },
  { n:"03", icon:Clock, title:"We Investigate", desc:"Our claims team reviews your case within 3 business days and may request additional information or photos." },
  { n:"04", icon:CheckCircle, title:"Resolution & Payment", desc:"Approved claims are settled within 10 business days via bank transfer or credit to your NovaCargo account." },
];

const claimTypes = [
  { type:"Lost Parcel", cover:"Up to declared value (max €500 standard / €2,500 premium)", timeLimit:"30 days from estimated delivery" },
  { type:"Damaged Goods", cover:"Cost of repair or replacement up to declared value", timeLimit:"7 days from delivery date" },
  { type:"Late Delivery (Express)", cover:"€50 NovaCargo credit per guaranteed shipment", timeLimit:"14 days from delivery" },
  { type:"Missing Items", cover:"Pro-rata value of missing items", timeLimit:"7 days from delivery date" },
];

export const metadata = { title:"File a Claim — NovaCargo" };

export default function ClaimPage() {
  return (
    <PageShell label="Support" title="FILE A CLAIM" subtitle="Something went wrong with your shipment? We're sorry. Our claims process is straightforward, fair, and resolved quickly." breadcrumbs={[{label:"Support",href:"#"},{label:"File a Claim",href:"/support/claim"}]}>
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Process */}
        <div className="flex items-center gap-2 mb-4"><span className="w-4 h-0.5 bg-amber-500"/><span className="text-amber-500 text-sm font-semibold uppercase tracking-widest">How It Works</span></div>
        <h2 className="text-gray-900 dark:text-white font-black text-4xl mb-10" style={{fontFamily:"'Barlow Condensed',sans-serif"}}>4-STEP CLAIMS PROCESS</h2>
        <div className="grid sm:grid-cols-2 gap-5 mb-16">
          {steps.map(s=>{const Icon=s.icon;return(<div key={s.n} className="bg-white dark:bg-[#0D1F35] rounded-2xl p-6 border border-gray-100 dark:border-white/[0.06] shadow-sm flex gap-4"><div className="w-9 h-9 bg-amber-500/10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"><Icon className="w-4.5 h-4.5 text-amber-500"/></div><div><span className="text-amber-400 text-xs font-black" style={{fontFamily:"'Barlow Condensed',sans-serif"}}>{s.n}</span><h3 className="text-gray-900 dark:text-white font-bold text-sm mt-0.5 mb-1.5">{s.title}</h3><p className="text-gray-500 dark:text-white/40 text-sm leading-relaxed">{s.desc}</p></div></div>);})}
        </div>

        {/* Coverage table */}
        <div className="flex items-center gap-2 mb-4"><span className="w-4 h-0.5 bg-amber-500"/><span className="text-amber-500 text-sm font-semibold uppercase tracking-widest">What's Covered</span></div>
        <h2 className="text-gray-900 dark:text-white font-black text-4xl mb-8" style={{fontFamily:"'Barlow Condensed',sans-serif"}}>CLAIM TYPES &amp; COVERAGE</h2>
        <div className="bg-white dark:bg-[#0D1F35] rounded-2xl border border-gray-100 dark:border-white/[0.06] shadow-sm overflow-hidden mb-14">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-gray-100 dark:border-white/[0.06] bg-gray-50 dark:bg-white/[0.02]">
              {["Claim Type","Coverage","Submit Within"].map(h=><th key={h} className="text-left px-6 py-4 text-xs font-semibold text-gray-400 dark:text-white/30 uppercase tracking-wider">{h}</th>)}
            </tr></thead>
            <tbody className="divide-y divide-gray-50 dark:divide-white/[0.03]">
              {claimTypes.map(c=><tr key={c.type} className="hover:bg-gray-50 dark:hover:bg-white/[0.02]"><td className="px-6 py-4 font-semibold text-gray-900 dark:text-white text-sm">{c.type}</td><td className="px-6 py-4 text-gray-600 dark:text-white/50 text-sm">{c.cover}</td><td className="px-6 py-4 text-amber-600 dark:text-amber-400 text-sm font-medium">{c.timeLimit}</td></tr>)}
            </tbody>
          </table>
        </div>

        {/* Claim form */}
        <div className="bg-white dark:bg-[#0D1F35] rounded-2xl p-8 border border-gray-100 dark:border-white/[0.06] shadow-sm mb-10">
          <h3 className="text-gray-900 dark:text-white font-black text-2xl mb-6" style={{fontFamily:"'Barlow Condensed',sans-serif"}}>SUBMIT YOUR CLAIM</h3>
          <div className="grid sm:grid-cols-2 gap-5">
            {[["Tracking Number","NC7841203648","text"],["Full Name","Your name","text"],["Email Address","your@email.com","email"],["Phone Number","+1 (800) 000-0000","tel"],["Claim Type","","select"],["Shipment Value","e.g. €250","text"]].map(([l,p,t])=>(
              <div key={l}>
                <label className="text-gray-500 dark:text-white/40 text-xs uppercase tracking-wider font-semibold block mb-1.5">{l}</label>
                {t==="select"
                  ? <select className="w-full px-4 py-2.5 bg-gray-50 dark:bg-white/[0.04] border border-gray-200 dark:border-white/10 rounded-xl text-gray-700 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent appearance-none"><option>Lost Parcel</option><option>Damaged Goods</option><option>Late Delivery</option><option>Missing Items</option></select>
                  : <input type={t} placeholder={p} className="w-full px-4 py-2.5 bg-gray-50 dark:bg-white/[0.04] border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/20 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"/>
                }
              </div>
            ))}
            <div className="sm:col-span-2">
              <label className="text-gray-500 dark:text-white/40 text-xs uppercase tracking-wider font-semibold block mb-1.5">Description of Issue</label>
              <textarea rows={4} placeholder="Please describe what happened in as much detail as possible..." className="w-full px-4 py-3 bg-gray-50 dark:bg-white/[0.04] border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/20 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all resize-none"/>
            </div>
          </div>
          <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-gray-400 dark:text-white/25 text-xs">You may also email your claim to <a href="mailto:claims@novacargo.com" className="text-amber-500 hover:underline">claims@novacargo.com</a></p>
            <button className="px-8 py-3 bg-amber-500 hover:bg-amber-400 text-[#060E1A] font-bold text-sm rounded-xl transition-all hover:shadow-glow">Submit Claim</button>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <a href="tel:+18001234567" className="flex items-center gap-4 bg-white dark:bg-[#0D1F35] rounded-2xl p-5 border border-gray-100 dark:border-white/[0.06] shadow-sm hover:border-amber-300 dark:hover:border-amber-400/30 transition-all">
            <div className="w-10 h-10 bg-amber-50 dark:bg-amber-400/10 rounded-xl flex items-center justify-center"><Phone className="w-5 h-5 text-amber-500"/></div>
            <div><p className="text-gray-900 dark:text-white font-semibold text-sm">Call Claims Team</p><p className="text-gray-400 dark:text-white/35 text-xs">+1 (800) 123-4567 · 24/7</p></div>
          </a>
          <a href="mailto:claims@novacargo.com" className="flex items-center gap-4 bg-white dark:bg-[#0D1F35] rounded-2xl p-5 border border-gray-100 dark:border-white/[0.06] shadow-sm hover:border-amber-300 dark:hover:border-amber-400/30 transition-all">
            <div className="w-10 h-10 bg-amber-50 dark:bg-amber-400/10 rounded-xl flex items-center justify-center"><Mail className="w-5 h-5 text-amber-500"/></div>
            <div><p className="text-gray-900 dark:text-white font-semibold text-sm">Email Claims Team</p><p className="text-gray-400 dark:text-white/35 text-xs">claims@novacargo.com</p></div>
          </a>
        </div>
      </section>
    </PageShell>
  );
}
