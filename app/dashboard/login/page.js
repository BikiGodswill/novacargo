"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { login, isAuthenticated } from "@/lib/auth";
import {
  Package,
  Mail,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  Shield,
  ArrowRight,
  Loader2,
} from "lucide-react";

/**
 * Admin Login Page
 * Full-screen login gate for the NovaCargo dashboard.
 * Only info@biki@gmail.com / password123 gains access.
 */
export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw]     = useState(false);
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);
  const [checked, setChecked]   = useState(false);

  // If already logged in, bounce straight to dashboard
  useEffect(() => {
    if (isAuthenticated()) {
      router.replace("/dashboard");
    } else {
      setChecked(true);
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) { setError("Please enter your email address."); return; }
    if (!password)     { setError("Please enter your password.");       return; }

    setLoading(true);
    // Brief artificial delay for UX realism
    await new Promise((r) => setTimeout(r, 800));

    const result = login(email, password);
    if (result.success) {
      router.push("/dashboard");
    } else {
      setError(result.error);
      setLoading(false);
    }
  };

  if (!checked) return null; // avoid flash before auth check

  return (
    <div className="min-h-screen bg-[#060E1A] flex">
      {/* ── Left panel: branding ── */}
      <div className="hidden lg:flex flex-col justify-between w-[45%] bg-gradient-to-br from-[#0A1628] to-[#060E1A] p-12 border-r border-white/[0.06] relative overflow-hidden">
        {/* Background grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        {/* Amber glow */}
        <div
          className="absolute bottom-0 left-0 w-96 h-96 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at bottom left, rgba(245,158,11,0.12), transparent 70%)",
          }}
        />

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center shadow-glow">
            <Package className="w-5 h-5 text-[#060E1A]" strokeWidth={2.5} />
          </div>
          <span
            className="text-white font-black text-2xl"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            NOVA<span className="text-amber-400">CARGO</span>
          </span>
        </div>

        {/* Center quote */}
        <div className="relative z-10 space-y-6">
          <div className="w-12 h-1 bg-amber-500 rounded-full" />
          <h2
            className="text-white font-black text-4xl leading-tight"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            ADMIN
            <br />
            CONTROL
            <br />
            <span className="text-amber-400">CENTRE</span>
          </h2>
          <p className="text-white/40 text-sm leading-relaxed max-w-xs">
            Manage shipments, monitor delivery performance, and oversee global
            logistics operations from a single dashboard.
          </p>

          {/* Feature bullets */}
          <ul className="space-y-3 mt-6">
            {[
              "Real-time shipment monitoring",
              "Add & manage shipment records",
              "Filter by status, service & route",
              "Export data as CSV",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-white/50 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Footer */}
        <div className="relative z-10 flex items-center gap-2 text-white/20 text-xs">
          <Shield className="w-3.5 h-3.5" />
          Restricted access · NovaCargo Admin Portal
        </div>
      </div>

      {/* ── Right panel: form ── */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2.5 mb-10">
            <div className="w-9 h-9 bg-amber-500 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-[#060E1A]" strokeWidth={2.5} />
            </div>
            <span
              className="text-white font-black text-xl"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              NOVA<span className="text-amber-400">CARGO</span>
            </span>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 bg-amber-400/10 border border-amber-400/20 rounded-lg flex items-center justify-center">
                <Shield className="w-3.5 h-3.5 text-amber-400" />
              </div>
              <span className="text-amber-400/70 text-xs font-semibold uppercase tracking-widest">
                Admin Access Only
              </span>
            </div>
            <h1
              className="text-white font-black text-3xl sm:text-4xl"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              SIGN IN TO DASHBOARD
            </h1>
            <p className="text-white/35 text-sm mt-2">
              Use your admin credentials to access the control panel.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-white/50 text-xs font-semibold uppercase tracking-wider">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25 pointer-events-none" />
                <input
                  type="text"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(""); }}
                  placeholder="your@email.com"
                  autoComplete="email"
                  className={`w-full pl-11 pr-4 py-3.5 bg-white/[0.05] border rounded-xl text-white placeholder-white/20 text-sm focus:outline-none transition-all duration-200 ${
                    error
                      ? "border-red-500/50 focus:border-red-400 focus:ring-1 focus:ring-red-400/30"
                      : "border-white/10 focus:border-amber-400/60 focus:ring-1 focus:ring-amber-400/20 hover:border-white/20"
                  }`}
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-white/50 text-xs font-semibold uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25 pointer-events-none" />
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(""); }}
                  placeholder="••••••••••"
                  autoComplete="current-password"
                  className={`w-full pl-11 pr-12 py-3.5 bg-white/[0.05] border rounded-xl text-white placeholder-white/20 text-sm focus:outline-none transition-all duration-200 ${
                    error
                      ? "border-red-500/50 focus:border-red-400 focus:ring-1 focus:ring-red-400/30"
                      : "border-white/10 focus:border-amber-400/60 focus:ring-1 focus:ring-amber-400/20 hover:border-white/20"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/60 transition-colors"
                  tabIndex={-1}
                >
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Error banner */}
            {error && (
              <div className="flex items-start gap-3 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl animate-fade-in">
                <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2.5 py-3.5 bg-amber-500 hover:bg-amber-400 disabled:opacity-60 disabled:cursor-not-allowed text-[#060E1A] font-bold rounded-xl transition-all duration-200 hover:shadow-glow hover:-translate-y-0.5 active:translate-y-0 text-sm mt-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Verifying credentials…
                </>
              ) : (
                <>
                  Sign In to Dashboard
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Back to site */}
          <div className="mt-8 pt-6 border-t border-white/[0.06] text-center">
            <a
              href="/"
              className="text-white/30 hover:text-white/60 text-xs transition-colors"
            >
              ← Back to NovaCargo website
            </a>
          </div>

          {/* Security note */}
          <div className="mt-6 flex items-center justify-center gap-2 text-white/15 text-xs">
            <Shield className="w-3 h-3" />
            Secured · Sessions expire after 8 hours
          </div>
        </div>
      </div>
    </div>
  );
}
