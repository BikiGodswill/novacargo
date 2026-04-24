import PageShell from "@/components/PageShell";
import { CheckCircle, AlertCircle, Mail } from "lucide-react";

const features = [
  { done:true, item:"Semantic HTML5 elements (nav, main, header, footer, article)" },
  { done:true, item:"ARIA labels and roles for all interactive components" },
  { done:true, item:"Keyboard navigation support across all pages and modals" },
  { done:true, item:"Focus indicators visible at ≥ 3:1 contrast ratio" },
  { done:true, item:"Colour contrast ratio ≥ 4.5:1 for all body text (WCAG AA)" },
  { done:true, item:"Alt text on all informational images" },
  { done:true, item:"Form field labels associated with inputs" },
  { done:true, item:"Error messages programmatically linked to form fields" },
  { done:true, item:"Skip-to-content link at top of every page" },
  { done:true, item:"Responsive design functional from 320px viewport width" },
  { done:false, item:"WCAG 2.1 AAA colour contrast on secondary text (in progress)" },
  { done:false, item:"Live tracking map with full screen-reader alternative (Q3 2025)" },
  { done:false, item:"Full captions on all video content (Q2 2025)" },
];

export const metadata = { title:"Accessibility — NovaCargo" };

export default function AccessibilityPage() {
  return (
    <PageShell label="Legal" title="ACCESSIBILITY STATEMENT" subtitle="NovaCargo is committed to making our website and services accessible to everyone, including people with disabilities." breadcrumbs={[{label:"Legal",href:"#"},{label:"Accessibility",href:"/legal/accessibility"}]}>
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
        {[
          { title:"Our Commitment", body:"NovaCargo strives to ensure our digital services are accessible to all users, including those with visual, auditory, motor, and cognitive disabilities. We aim to meet the Web Content Accessibility Guidelines (WCAG) 2.1 at Level AA, as referenced in the European Accessibility Act (EAA) and EN 301 549." },
          { title:"Standard We Target", body:"We target WCAG 2.1 Level AA compliance across all public-facing web pages and our iOS/Android mobile applications. Our current conformance status is Partially Conformant — most content meets AA standards, with known exceptions listed below." },
        ].map(s=>(
          <div key={s.title} className="bg-white dark:bg-[#0D1F35] rounded-2xl p-6 border border-gray-100 dark:border-white/[0.06]">
            <h2 className="text-gray-900 dark:text-white font-black text-xl mb-3" style={{fontFamily:"'Barlow Condensed',sans-serif"}}>{s.title}</h2>
            <p className="text-gray-600 dark:text-white/55 text-sm leading-relaxed">{s.body}</p>
          </div>
        ))}

        <div className="bg-white dark:bg-[#0D1F35] rounded-2xl p-6 border border-gray-100 dark:border-white/[0.06]">
          <h2 className="text-gray-900 dark:text-white font-black text-xl mb-4" style={{fontFamily:"'Barlow Condensed',sans-serif"}}>ACCESSIBILITY FEATURES</h2>
          <div className="space-y-2.5">
            {features.map(f=>(
              <div key={f.item} className="flex items-start gap-3 text-sm">
                {f.done
                  ? <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5"/>
                  : <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5"/>
                }
                <span className={f.done ? "text-gray-600 dark:text-white/55" : "text-amber-700 dark:text-amber-400/70"}>{f.item}</span>
              </div>
            ))}
          </div>
        </div>

        {[
          { title:"Assistive Technology Tested", body:"We regularly test our website with NVDA (Windows), VoiceOver (macOS/iOS), TalkBack (Android), JAWS, and Dragon NaturallySpeaking. We also conduct automated testing using Axe-core integrated into our CI/CD pipeline on every deployment." },
          { title:"Known Limitations", body:"Our live map tracking widget does not currently provide a full screen-reader accessible alternative. We are developing a text-based timeline-only view as a complete fallback, targeted for Q3 2025. All other tracking information is accessible via our standard tracking page." },
          { title:"Physical Accessibility", body:"Our customer service team can provide shipment booking and tracking assistance by phone in 18 languages for users who find our web interface inaccessible. Call +1 (800) 123-4567, 24 hours a day, 7 days a week." },
        ].map(s=>(
          <div key={s.title} className="bg-white dark:bg-[#0D1F35] rounded-2xl p-6 border border-gray-100 dark:border-white/[0.06]">
            <h2 className="text-gray-900 dark:text-white font-black text-xl mb-3" style={{fontFamily:"'Barlow Condensed',sans-serif"}}>{s.title}</h2>
            <p className="text-gray-600 dark:text-white/55 text-sm leading-relaxed">{s.body}</p>
          </div>
        ))}

        <div className="bg-amber-50 dark:bg-amber-400/10 border border-amber-200 dark:border-amber-400/20 rounded-2xl p-6">
          <h2 className="text-amber-800 dark:text-amber-300 font-black text-xl mb-3" style={{fontFamily:"'Barlow Condensed',sans-serif"}}>REPORT AN ACCESSIBILITY ISSUE</h2>
          <p className="text-amber-700/80 dark:text-amber-400/70 text-sm leading-relaxed mb-4">If you encounter any accessibility barriers, please contact us. We aim to respond within 5 business days and resolve all issues within 30 days.</p>
          <a href="mailto:accessibility@novacargo.com" className="inline-flex items-center gap-2 text-amber-600 dark:text-amber-400 font-semibold text-sm hover:underline">
            <Mail className="w-4 h-4"/>accessibility@novacargo.com
          </a>
          <p className="text-amber-700/60 dark:text-amber-400/50 text-xs mt-3">Last reviewed: 22 April 2025 · Next review: October 2025</p>
        </div>
      </section>
    </PageShell>
  );
}
