"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Package, X, AlertCircle } from "lucide-react";

/**
 * TrackingForm
 * Reusable tracking input with validation.
 * On submit, navigates to /track?id=<trackingNumber>
 *
 * @param {object} props
 * @param {'hero'|'page'} props.variant - Visual variant
 * @param {string} props.initialValue - Pre-fill the input
 */
export default function TrackingForm({ variant = "page", initialValue = "" }) {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState("");
  const router = useRouter();

  const isHero = variant === "hero";

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) {
      setError("Please enter a tracking number.");
      return;
    }
    if (trimmed.length < 8) {
      setError("Tracking numbers are at least 8 characters long.");
      return;
    }
    setError("");
    router.push(`/track?id=${encodeURIComponent(trimmed)}`);
  };

  const clearInput = () => {
    setValue("");
    setError("");
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className={`relative flex ${isHero ? "flex-col sm:flex-row" : "flex-row"} gap-3`}>
        {/* ── Input group ── */}
        <div className="relative flex-1">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
            <Package className={`${isHero ? "w-5 h-5 text-white/40" : "w-4.5 h-4.5 text-gray-400"}`} />
          </div>

          <input
            type="text"
            value={value}
            onChange={(e) => { setValue(e.target.value); setError(""); }}
            placeholder="Enter tracking number (e.g. NC7841203648)"
            aria-label="Tracking number"
            className={`w-full pl-11 pr-10 transition-all duration-200 focus:outline-none ${
              isHero
                ? "py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/40 rounded-xl focus:bg-white/15 focus:border-amber-400/60 focus:ring-2 focus:ring-amber-400/20 text-base"
                : "py-3.5 bg-white dark:bg-[#0D1F35] border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/30 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-transparent text-sm shadow-sm"
            } ${error ? "border-red-400 focus:ring-red-300" : ""}`}
          />

          {value && (
            <button
              type="button"
              onClick={clearInput}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded text-white/30 hover:text-white/70 transition-colors"
              aria-label="Clear"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* ── Submit button ── */}
        <button
          type="submit"
          className={`flex items-center justify-center gap-2 font-semibold transition-all duration-200 whitespace-nowrap ${
            isHero
              ? "px-8 py-4 bg-amber-500 hover:bg-amber-400 text-[#060E1A] rounded-xl text-base hover:shadow-glow hover:-translate-y-0.5 active:translate-y-0"
              : "px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-[#060E1A] rounded-xl text-sm hover:shadow-glow"
          }`}
        >
          <Search className="w-4 h-4" />
          Track Parcel
        </button>
      </div>

      {/* ── Error message ── */}
      {error && (
        <div className="mt-2 flex items-center gap-2 text-red-400 text-sm animate-fade-in">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {error}
        </div>
      )}

      {/* ── Sample tracking numbers ── */}
      {isHero && (
        <p className="mt-3 text-white/35 text-xs">
          Try:{" "}
          {["NC7841203648", "NC5293817402", "NC3827461092"].map((id, i) => (
            <span key={id}>
              <button
                type="button"
                onClick={() => setValue(id)}
                className="text-amber-400/70 hover:text-amber-300 underline underline-offset-2 transition-colors"
              >
                {id}
              </button>
              {i < 2 && <span className="mx-1.5 text-white/20">·</span>}
            </span>
          ))}
        </p>
      )}
    </form>
  );
}
