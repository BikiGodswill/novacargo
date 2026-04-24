import PageShell from "@/components/PageShell";

const sections = [
  { title:"1. Definitions", body:`In these Terms of Service:

"NovaCargo" means NovaCargo B.V. and its subsidiaries and affiliated entities.
"Services" means all logistics, shipping, tracking, warehousing, fulfilment, and related services provided by NovaCargo.
"Customer" means any individual or organisation that uses our Services.
"Shipment" means any parcel, package, freight consignment, or goods accepted by NovaCargo for carriage.
"Carrier" means NovaCargo or any sub-contractor carrier engaged by NovaCargo to perform carriage.` },
  { title:"2. Acceptance of Terms", body:`By booking a shipment, creating an account, or using any NovaCargo Service, you agree to be bound by these Terms of Service, our Privacy Policy, Cookie Policy, and any service-specific terms applicable to the service you use.

If you are using our Services on behalf of a business, you represent that you have the authority to bind that business to these Terms.

We may amend these Terms at any time. We will notify registered users of material changes. Continued use of our Services after changes are posted constitutes acceptance.` },
  { title:"3. Prohibited Goods", body:`You must not tender the following goods for carriage under any circumstances:

a) Cash, coins, bank notes, or negotiable instruments;
b) Illegal narcotics, psychotropic substances, or counterfeit goods;
c) Live animals, insects, or biological specimens (unless specifically authorised);
d) Human remains, ashes, or body parts;
e) Firearms, ammunition, explosives, or weapons (without valid permits and prior written approval);
f) Radioactive materials;
g) Perishable goods requiring temperature control (unless NovaCargo Cold Chain service is selected);
h) Goods prohibited by the law of the origin or destination country.

Tendering prohibited goods may result in immediate cancellation, forfeiture of fees, and referral to law enforcement.` },
  { title:"4. Liability Limitations", body:`4.1 Standard Liability: NovaCargo's liability for loss, damage, or delay is limited to the lesser of: (a) the declared value of the shipment; or (b) €100 per shipment for standard parcels.

4.2 Extended Liability: Where Customers declare a higher value and pay the applicable insurance premium, NovaCargo's liability is limited to the declared value, subject to a maximum of €50,000 per shipment.

4.3 Consequential Loss: NovaCargo shall not be liable for indirect, consequential, special, or punitive losses, including but not limited to loss of profits, revenue, business, or opportunity.

4.4 Force Majeure: NovaCargo shall not be liable for failure or delay caused by events beyond its reasonable control, including natural disasters, war, pandemics, government actions, strikes, or infrastructure failures.

4.5 International Carriage: For international carriage, liability may be further limited by applicable international conventions including the Montreal Convention (air), CMR Convention (road), and Hague-Visby Rules (sea).` },
  { title:"5. Payment Terms", body:`5.1 Fees are due at the time of booking unless you hold a credit account with agreed payment terms.

5.2 Business account holders with approved credit terms must pay invoices within 30 days of invoice date.

5.3 Late payments accrue interest at 8% per annum above the European Central Bank base rate.

5.4 NovaCargo reserves the right to suspend services to accounts with overdue balances exceeding 14 days.

5.5 All prices are exclusive of VAT and applicable taxes unless stated otherwise.` },
  { title:"6. Claims Procedure", body:`6.1 All claims for loss, damage, or delay must be submitted in writing to claims@novacargo.com within the following time limits:

— Damage visible at delivery: 7 days from delivery date
— Damage discovered after delivery: 14 days from delivery date
— Loss or non-delivery: 30 days from estimated delivery date
— Late delivery (Express guaranteed): 14 days from delivery date

6.2 Failure to submit a claim within the applicable time limit extinguishes all rights to compensation.

6.3 Claims must include the tracking number, proof of value (original invoice), photographs of damage, and the original packaging for inspection if requested.` },
  { title:"7. Governing Law", body:`These Terms are governed by the laws of the Netherlands. Any disputes arising from or relating to these Terms or our Services shall be subject to the exclusive jurisdiction of the courts of Amsterdam, Netherlands, without regard to conflict-of-law principles.

Customers in the European Union retain the right to bring claims in their country of residence under mandatory consumer protection laws.` },
  { title:"8. Contact", body:`NovaCargo B.V.
Legal Department
Schiphol Blvd 401, 1118 BJ Schiphol, Netherlands
legal@novacargo.com` },
];

export const metadata = { title:"Terms of Service — NovaCargo" };

export default function TermsPage() {
  return (
    <PageShell label="Legal" title="TERMS OF SERVICE" subtitle="These terms govern your use of NovaCargo's shipping, logistics, and tracking services. Please read them carefully." breadcrumbs={[{label:"Legal",href:"#"},{label:"Terms of Service",href:"/legal/terms"}]}>
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-wrap gap-4 mb-10 p-5 bg-amber-50 dark:bg-amber-400/10 border border-amber-200 dark:border-amber-400/20 rounded-2xl text-sm">
          <div><span className="text-amber-600 dark:text-amber-400 font-semibold">Effective:</span> <span className="text-amber-800 dark:text-amber-300">1 January 2024</span></div>
          <div><span className="text-amber-600 dark:text-amber-400 font-semibold">Last Updated:</span> <span className="text-amber-800 dark:text-amber-300">22 April 2025</span></div>
          <div><span className="text-amber-600 dark:text-amber-400 font-semibold">Jurisdiction:</span> <span className="text-amber-800 dark:text-amber-300">Netherlands (Amsterdam Courts)</span></div>
        </div>
        {sections.map(s=>(
          <div key={s.title} className="mb-10">
            <h2 className="text-gray-900 dark:text-white font-black text-xl mb-4" style={{fontFamily:"'Barlow Condensed',sans-serif"}}>{s.title}</h2>
            <div className="text-gray-600 dark:text-white/55 text-sm leading-relaxed whitespace-pre-line bg-white dark:bg-[#0D1F35] rounded-2xl p-6 border border-gray-100 dark:border-white/[0.06]">{s.body}</div>
          </div>
        ))}
      </section>
    </PageShell>
  );
}
