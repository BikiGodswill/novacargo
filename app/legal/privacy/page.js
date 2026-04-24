import PageShell from "@/components/PageShell";

const sections = [
  {
    title: "1. Who We Are",
    body: `NovaCargo B.V. ("NovaCargo", "we", "our", or "us") is a private limited company incorporated in the Netherlands (KvK: 78234901), with registered offices at Schiphol Blvd 401, 1118 BJ Schiphol, Netherlands. We operate a global logistics platform accessible at novacargo.com and through our mobile applications.

For data protection purposes, NovaCargo B.V. is the data controller of personal data collected through our services. Our Data Protection Officer can be reached at dpo@novacargo.com.`,
  },
  {
    title: "2. What Data We Collect",
    body: `We collect the following categories of personal data:

Account & Identity Data: Name, email address, phone number, company name, job title, and login credentials when you register or create a business account.

Shipping Data: Sender and recipient names, addresses (including postal codes and countries), contact phone numbers, and package descriptions necessary to fulfil shipment contracts.

Payment Data: Credit/debit card details (processed and tokenised by our PCI-DSS compliant payment partner, Stripe), billing address, and transaction history. We do not store full card numbers.

Technical Data: IP address, browser type and version, device identifiers, operating system, referring URLs, pages visited, session duration, and click-stream data collected via cookies and similar technologies.

Communications Data: Records of your correspondence with our customer support team, including chat transcripts, emails, and call recordings (where you are notified in advance).

Location Data: Approximate location data derived from IP address. For mobile app users who grant permission, precise GPS location to enable real-time delivery tracking on your device.`,
  },
  {
    title: "3. How We Use Your Data",
    body: `We use your personal data for the following purposes, relying on the legal bases indicated:

Contract Performance: To process bookings, arrange collections, manage deliveries, issue invoices, handle claims, and provide customer support — all necessary to perform our contract with you.

Legitimate Interests: To improve our services, prevent fraud, secure our platform, conduct analytics, send service-related communications, and enforce our terms.

Consent: To send marketing emails, personalised offers, and newsletters — only where you have opted in. You may withdraw this consent at any time.

Legal Obligation: To comply with customs, tax, anti-money laundering, and export control regulations, and to respond to lawful requests from public authorities.`,
  },
  {
    title: "4. Data Sharing",
    body: `We share personal data with:

Carrier Partners: We share the minimum necessary shipping data (names, addresses, contact details) with our network of 850+ carrier partners to complete deliveries.

Customs Authorities: Mandatory sharing of shipper, consignee, and goods data with customs and border agencies in origin and destination countries.

Technology Providers: Trusted sub-processors including Stripe (payments), AWS (cloud infrastructure), Google Analytics (analytics), Zendesk (customer support), and others — all bound by data processing agreements.

Group Companies: Within the NovaCargo group of companies for operational and administrative purposes.

We do not sell your personal data to third parties for marketing purposes.`,
  },
  {
    title: "5. International Data Transfers",
    body: `As a global logistics operator, we necessarily transfer personal data internationally. Transfers outside the European Economic Area (EEA) are protected by:

— EU Standard Contractual Clauses (SCCs) with all non-EEA recipients;
— Adequacy decisions where applicable (e.g. UK, Switzerland, Israel);
— Binding Corporate Rules within the NovaCargo group.

You may request a copy of the safeguards in place for your data by contacting dpo@novacargo.com.`,
  },
  {
    title: "6. Data Retention",
    body: `We retain personal data only as long as necessary for the purposes collected:

Shipment Records: 7 years (required for customs and tax compliance in most jurisdictions).
Account Data: Duration of account plus 2 years after closure.
Marketing Preferences: Until withdrawn, plus 1 year.
Support Records: 3 years from last interaction.
Technical Logs: 12 months.

When data is no longer required, it is securely deleted or anonymised.`,
  },
  {
    title: "7. Your Rights",
    body: `Under the GDPR and applicable local laws, you have the right to:

— Access: Request a copy of the personal data we hold about you.
— Rectification: Correct inaccurate or incomplete data.
— Erasure: Request deletion of your data ("right to be forgotten") where no legal obligation requires retention.
— Restriction: Restrict processing in certain circumstances.
— Portability: Receive your data in a structured, machine-readable format.
— Objection: Object to processing based on legitimate interests or for direct marketing.
— Withdrawal of Consent: Withdraw consent for marketing at any time via unsubscribe links or account settings.

To exercise any right, email dpo@novacargo.com with your full name and email address. We respond within 30 days. You also have the right to lodge a complaint with your national supervisory authority (in the Netherlands: the Autoriteit Persoonsgegevens — autoriteitpersoonsgegevens.nl).`,
  },
  {
    title: "8. Cookies",
    body: `We use cookies and similar technologies. Please see our Cookie Policy for full details. In summary:

Strictly Necessary: Essential for the website to function (e.g. session cookies, CSRF tokens). Cannot be disabled.
Performance: Analytics cookies (Google Analytics 4) to understand how visitors use our site. Anonymised.
Functional: Remember your preferences (language, theme, tracking history).
Marketing: Used only with your consent to personalise advertising on third-party platforms.`,
  },
  {
    title: "9. Security",
    body: `We implement industry-standard technical and organisational measures to protect your data, including:

— AES-256 encryption at rest and TLS 1.3 in transit
— Multi-factor authentication for all admin access
— Annual penetration testing by independent security firms
— SOC 2 Type II certification
— ISO 27001 certified data centres (AWS eu-west-1, ap-southeast-1)
— 24/7 security operations monitoring

Despite these measures, no system is completely secure. If you believe your account has been compromised, contact us immediately at security@novacargo.com.`,
  },
  {
    title: "10. Changes to This Policy",
    body: `We may update this Privacy Policy periodically. We will notify registered users of material changes by email at least 30 days before they take effect, and will update the "Last Updated" date below. Continued use of our services after changes constitutes acceptance.`,
  },
  {
    title: "11. Contact",
    body: `For any privacy questions, subject access requests, or complaints:

Data Protection Officer
NovaCargo B.V.
Schiphol Blvd 401, 1118 BJ Schiphol, Netherlands
Email: dpo@novacargo.com
Phone: +31 20 800 1234`,
  },
];

export const metadata = { title: "Privacy Policy — NovaCargo" };

export default function PrivacyPage() {
  return (
    <PageShell
      label="Legal"
      title="PRIVACY POLICY"
      subtitle="We take your privacy seriously. This policy explains what personal data we collect, why we collect it, and how we protect it."
      breadcrumbs={[{ label: "Legal", href: "#" }, { label: "Privacy Policy", href: "/legal/privacy" }]}
    >
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Meta bar */}
        <div className="flex flex-wrap gap-4 mb-10 p-5 bg-blue-50 dark:bg-blue-400/10 border border-blue-200 dark:border-blue-400/20 rounded-2xl text-sm">
          <div><span className="text-blue-600 dark:text-blue-400 font-semibold">Effective:</span> <span className="text-blue-800 dark:text-blue-300">1 January 2024</span></div>
          <div><span className="text-blue-600 dark:text-blue-400 font-semibold">Last Updated:</span> <span className="text-blue-800 dark:text-blue-300">22 April 2025</span></div>
          <div><span className="text-blue-600 dark:text-blue-400 font-semibold">Governing Law:</span> <span className="text-blue-800 dark:text-blue-300">GDPR (EU) 2016/679</span></div>
          <div><span className="text-blue-600 dark:text-blue-400 font-semibold">Controller:</span> <span className="text-blue-800 dark:text-blue-300">NovaCargo B.V., Netherlands</span></div>
        </div>

        <div className="prose-sm max-w-none">
          {sections.map(s => (
            <div key={s.title} className="mb-10">
              <h2 className="text-gray-900 dark:text-white font-black text-xl mb-4" style={{ fontFamily: "'Barlow Condensed',sans-serif" }}>
                {s.title}
              </h2>
              <div className="text-gray-600 dark:text-white/55 text-sm leading-relaxed whitespace-pre-line bg-white dark:bg-[#0D1F35] rounded-2xl p-6 border border-gray-100 dark:border-white/[0.06]">
                {s.body}
              </div>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
