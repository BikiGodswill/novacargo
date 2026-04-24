"use client";
import { useState } from "react";
import PageShell from "@/components/PageShell";
import { ChevronDown, Search } from "lucide-react";

const faqs = [
  { cat:"Tracking", q:"How do I track my parcel?", a:"Go to novacargo.com/track and enter your tracking number (starts with 'NC'). You'll see real-time status, location history, and estimated delivery. You can also sign up for SMS/email alerts from the tracking page." },
  { cat:"Tracking", q:"My tracking shows 'no information found'. What does that mean?", a:"Tracking information typically becomes available 2–4 hours after the shipment is physically collected. If it's been more than 24 hours, please contact our support team with your booking reference number." },
  { cat:"Tracking", q:"Can I share my tracking link with someone else?", a:"Yes. On the tracking page, click the 'Share' button to copy a direct link. The recipient doesn't need a NovaCargo account to view the status." },
  { cat:"Delivery", q:"What happens if I'm not home for delivery?", a:"Our driver will attempt delivery up to 3 times. After the first failed attempt, you'll receive an SMS/email with options to: reschedule, redirect to a pickup point, or authorise leave-safe delivery." },
  { cat:"Delivery", q:"Can I change my delivery address after shipping?", a:"Address changes may be possible if the parcel hasn't left the origin country. Contact support immediately with your tracking number. Additional charges may apply for international redirections." },
  { cat:"Delivery", q:"What are your delivery hours?", a:"Standard residential deliveries occur Monday–Saturday, 8 AM–8 PM local time. Business addresses receive deliveries Monday–Friday, 9 AM–6 PM. Express same-day deliveries run until 9 PM in supported cities." },
  { cat:"Shipping", q:"What items can I NOT ship with NovaCargo?", a:"Prohibited items include: cash and negotiable instruments, live animals, human remains, narcotics, counterfeit goods, unpackaged lithium batteries, and items banned in the destination country. See our full prohibited items list for details." },
  { cat:"Shipping", q:"What's the maximum weight and size I can ship?", a:"Standard parcels: up to 30 kg and 150 cm longest side. For heavier or oversized shipments, use our Freight Services. Our freight team handles cargo up to 50,000 tonnes with no upper size limit for project cargo." },
  { cat:"Shipping", q:"Do you offer packaging materials?", a:"Yes. NovaCargo-branded boxes, bubble wrap, tape, and our reusable NovaBox are available to purchase at checkout or from any of our retail partner locations." },
  { cat:"Customs & Duties", q:"Who pays customs duties and taxes?", a:"By default, duties and taxes are the responsibility of the recipient (Delivered Duty Unpaid – DDU). We also offer DDP (Delivered Duty Paid) shipping where the sender pre-pays all import charges — recommended for a better customer experience." },
  { cat:"Customs & Duties", q:"How do I fill in the customs declaration?", a:"When booking online, our system guides you through the commercial invoice and HS code classification. For complex shipments, our in-house customs brokers can complete the documentation for a small fee." },
  { cat:"Customs & Duties", q:"My parcel is held at customs. What should I do?", a:"Contact our Customs Support team at customs@novacargo.com with your tracking number. We'll identify the reason for the hold and guide you on next steps — usually resolving within 1–3 business days." },
  { cat:"Payments & Billing", q:"What payment methods do you accept?", a:"We accept all major credit/debit cards (Visa, Mastercard, Amex), PayPal, SEPA bank transfer, and NovaCargo Account Credit. Business accounts can pay on 30-day invoice terms." },
  { cat:"Payments & Billing", q:"Can I get a VAT invoice?", a:"Yes. VAT invoices are automatically generated for all shipments and available in your account dashboard under 'Billing'. Business accounts receive consolidated monthly invoices." },
  { cat:"Payments & Billing", q:"Do you offer volume discounts?", a:"Yes. Business accounts shipping 50+ parcels/month automatically qualify for tiered discounts of 10–30% off standard rates. Contact our Business Sales team to discuss custom pricing for higher volumes." },
];

const categories = ["All", ...new Set(faqs.map(f=>f.cat))];

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 dark:border-white/[0.06] last:border-0">
      <button onClick={()=>setOpen(o=>!o)} className="w-full flex items-center justify-between gap-4 py-5 text-left">
        <span className="text-gray-900 dark:text-white font-semibold text-sm pr-4">{q}</span>
        <ChevronDown className={`w-4 h-4 text-amber-500 flex-shrink-0 transition-transform ${open?"rotate-180":""}`}/>
      </button>
      {open&&<p className="text-gray-500 dark:text-white/50 text-sm leading-relaxed pb-5 pr-8">{a}</p>}
    </div>
  );
}

export default function FAQPage() {
  const [cat, setCat] = useState("All");
  const [search, setSearch] = useState("");
  const visible = faqs.filter(f=>(cat==="All"||f.cat===cat)&&(!search||f.q.toLowerCase().includes(search.toLowerCase())||f.a.toLowerCase().includes(search.toLowerCase())));

  return (
    <PageShell label="Support" title="FREQUENTLY ASKED QUESTIONS" subtitle="Quick answers to the most common questions about shipping, tracking, customs, and billing." breadcrumbs={[{label:"Support",href:"#"},{label:"FAQ",href:"/support/faq"}]}>
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-20">
        {/* Search */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-white/30"/>
          <input value={search} onChange={e=>setSearch(e.target.value)} type="text" placeholder="Search questions…" className="w-full pl-11 pr-4 py-3 bg-white dark:bg-[#0D1F35] border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/25 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent shadow-sm transition-all"/>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map(c=><button key={c} onClick={()=>{setCat(c);setSearch("");}} className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${cat===c?"bg-amber-500 text-[#060E1A]":"bg-white dark:bg-[#0D1F35] border border-gray-200 dark:border-white/10 text-gray-600 dark:text-white/50 hover:border-amber-300 dark:hover:border-amber-400/30"}`}>{c}</button>)}
        </div>

        {/* Questions */}
        <div className="bg-white dark:bg-[#0D1F35] rounded-2xl border border-gray-100 dark:border-white/[0.06] shadow-sm px-6 divide-y divide-gray-100 dark:divide-white/[0.06] mb-10">
          {visible.length===0
            ? <p className="text-center py-12 text-gray-400 dark:text-white/30 text-sm">No results found. <button onClick={()=>{setSearch("");setCat("All");}} className="text-amber-500 hover:underline">Clear filters</button></p>
            : visible.map(f=><FAQItem key={f.q} q={f.q} a={f.a}/>)
          }
        </div>

        <div className="text-center bg-amber-50 dark:bg-amber-400/10 border border-amber-200 dark:border-amber-400/20 rounded-2xl p-6">
          <p className="text-amber-800 dark:text-amber-300 font-semibold text-sm mb-1">Still have questions?</p>
          <p className="text-amber-700/70 dark:text-amber-400/60 text-xs mb-4">Our support team is available 24/7 in 18 languages.</p>
          <a href="/contact" className="inline-flex items-center gap-2 px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-[#060E1A] font-bold text-sm rounded-xl transition-all">Contact Support</a>
        </div>
      </section>
    </PageShell>
  );
}
