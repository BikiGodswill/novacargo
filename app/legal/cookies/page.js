"use client";
import { useState } from "react";
import PageShell from "@/components/PageShell";
import { CheckCircle, X } from "lucide-react";

const cookieTypes = [
  {
    name: "Strictly Necessary",
    required: true,
    enabled: true,
    desc: "These cookies are essential for the website to function. They include session management, security tokens (CSRF protection), and remembering your login state. They cannot be disabled.",
    examples: ["session_id","csrf_token","novacargo-theme","novacargo-admin-session"],
    duration: "Session – 8 hours",
  },
  {
    name: "Performance & Analytics",
    required: false,
    desc: "We use Google Analytics 4 to understand how visitors interact with our website — which pages are visited most, how long visitors stay, and where they come from. All data is anonymised and aggregated. No personal data is shared.",
    examples: ["_ga","_ga_XXXXXXXX","_gid"],
    duration: "Up to 2 years",
  },
  {
    name: "Functional",
    required: false,
    desc: "These cookies remember your preferences to enhance your experience — including your preferred language, dark/light mode setting, and recent tracking numbers.",
    examples: ["novacargo-theme","lang-pref","recent-tracks"],
    duration: "12 months",
  },
  {
    name: "Marketing & Advertising",
    required: false,
    desc: "Used (only with your consent) to deliver relevant advertisements on third-party platforms such as LinkedIn, Google, and Meta. These cookies track your browsing behaviour across websites.",
    examples: ["_fbp","_gcl_au","li_fat_id"],
    duration: "Up to 3 months",
  },
];

export default function CookiesPage() {
  const [prefs, setPrefs] = useState({ Performance: true, Functional: true, Marketing: false });

  return (
    <PageShell label="Legal" title="COOKIE POLICY" subtitle="We use cookies and similar technologies to run our website, analyse usage, and — with your permission — personalise your experience." breadcrumbs={[{label:"Legal",href:"#"},{label:"Cookie Policy",href:"/legal/cookies"}]}>
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Meta */}
        <div className="flex flex-wrap gap-4 mb-10 p-5 bg-green-50 dark:bg-green-400/10 border border-green-200 dark:border-green-400/20 rounded-2xl text-sm">
          <div><span className="text-green-600 dark:text-green-400 font-semibold">Last Updated:</span> <span className="text-green-800 dark:text-green-300">22 April 2025</span></div>
          <div><span className="text-green-600 dark:text-green-400 font-semibold">Framework:</span> <span className="text-green-800 dark:text-green-300">EU Cookie Directive & GDPR</span></div>
        </div>

        <div className="bg-white dark:bg-[#0D1F35] rounded-2xl p-6 border border-gray-100 dark:border-white/[0.06] mb-8 text-gray-600 dark:text-white/55 text-sm leading-relaxed">
          A cookie is a small text file stored on your device by a website you visit. Cookies serve many purposes — keeping you logged in, remembering your preferences, and helping us understand how our site is used. You can control non-essential cookies using the preference centre below.
        </div>

        {/* Cookie types */}
        <div className="space-y-5 mb-12">
          {cookieTypes.map(ct => (
            <div key={ct.name} className="bg-white dark:bg-[#0D1F35] rounded-2xl border border-gray-100 dark:border-white/[0.06] shadow-sm overflow-hidden">
              <div className="flex items-start justify-between gap-4 p-6">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-gray-900 dark:text-white font-bold text-base">{ct.name}</h3>
                    {ct.required && <span className="px-2 py-0.5 bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-white/40 text-xs rounded-full">Always On</span>}
                  </div>
                  <p className="text-gray-500 dark:text-white/45 text-sm leading-relaxed mb-4">{ct.desc}</p>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {ct.examples.map(e => <code key={e} className="px-2 py-0.5 bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-white/40 text-xs rounded-lg font-mono">{e}</code>)}
                  </div>
                  <p className="text-gray-400 dark:text-white/25 text-xs">Retention: {ct.duration}</p>
                </div>
                {/* Toggle */}
                {ct.required ? (
                  <div className="w-12 h-6 bg-amber-500 rounded-full flex items-center justify-end px-1 flex-shrink-0 mt-1">
                    <div className="w-4 h-4 bg-white rounded-full" />
                  </div>
                ) : (
                  <button
                    onClick={() => setPrefs(p => ({ ...p, [ct.name.split(" ")[0]]: !p[ct.name.split(" ")[0]] }))}
                    className={`w-12 h-6 rounded-full flex items-center px-1 transition-all flex-shrink-0 mt-1 ${prefs[ct.name.split(" ")[0]] ? "bg-amber-500 justify-end" : "bg-gray-200 dark:bg-white/10 justify-start"}`}
                  >
                    <div className="w-4 h-4 bg-white rounded-full shadow" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Save prefs */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 bg-amber-50 dark:bg-amber-400/10 border border-amber-200 dark:border-amber-400/20 rounded-2xl mb-10">
          <p className="text-amber-800 dark:text-amber-300 text-sm font-medium">Your preferences are saved automatically in your browser.</p>
          <div className="flex gap-3">
            <button className="px-5 py-2 border border-amber-300 dark:border-amber-400/30 text-amber-700 dark:text-amber-400 text-sm font-medium rounded-xl hover:bg-amber-100 dark:hover:bg-amber-400/10 transition-colors">Reject All Optional</button>
            <button className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-[#060E1A] text-sm font-bold rounded-xl transition-all hover:shadow-glow">Save Preferences</button>
          </div>
        </div>

        <div className="bg-white dark:bg-[#0D1F35] rounded-2xl p-6 border border-gray-100 dark:border-white/[0.06] text-gray-600 dark:text-white/55 text-sm leading-relaxed">
          <strong className="text-gray-900 dark:text-white">How to manage cookies in your browser:</strong> Most browsers allow you to control cookies through their settings. Visit your browser's help documentation for instructions on blocking or deleting cookies. Note that blocking strictly necessary cookies will affect website functionality.
          <br /><br />
          For questions about our use of cookies, contact us at <a href="mailto:privacy@novacargo.com" className="text-amber-500 hover:underline">privacy@novacargo.com</a>.
        </div>
      </section>
    </PageShell>
  );
}
