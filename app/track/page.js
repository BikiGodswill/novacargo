"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TrackingForm from "@/components/TrackingForm";
import Timeline from "@/components/Timeline";
import { StatusBadge } from "@/components/ShipmentCard";
import { findShipment, shipments } from "@/lib/mockData";
import {
  Package,
  MapPin,
  Calendar,
  Clock,
  Weight,
  Ruler,
  User,
  ArrowRight,
  AlertCircle,
  RefreshCw,
  Share2,
  Printer,
  ChevronRight,
  Home,
  Truck,
} from "lucide-react";

/**
 * DetailRow
 * Small labeled info row inside shipment detail card.
 */
function DetailRow({ icon: Icon, label, value, mono = false }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 bg-amber-50 dark:bg-amber-400/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
        <Icon className="w-4 h-4 text-amber-500" />
      </div>
      <div>
        <p className="text-xs text-gray-400 dark:text-white/30 uppercase tracking-wide font-medium">
          {label}
        </p>
        <p className={`text-sm font-medium text-gray-900 dark:text-white mt-0.5 ${mono ? "font-mono" : ""}`}>
          {value}
        </p>
      </div>
    </div>
  );
}

/**
 * SkeletonLoader
 * Shown while searching.
 */
function SkeletonLoader() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-8 bg-gray-200 dark:bg-white/10 rounded-xl w-1/3" />
      <div className="h-48 bg-gray-100 dark:bg-white/5 rounded-2xl" />
      <div className="h-64 bg-gray-100 dark:bg-white/5 rounded-2xl" />
    </div>
  );
}

/**
 * MapPlaceholder
 * Visual map stub (no real maps library needed).
 */
function MapPlaceholder({ origin, destination, currentLocation }) {
  return (
    <div className="relative bg-gradient-to-br from-[#0D1F35] to-[#060E1A] rounded-2xl overflow-hidden h-48 border border-white/[0.06]">
      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Origin dot */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-1">
        <div className="w-3 h-3 bg-green-400 rounded-full shadow-lg shadow-green-400/50" />
        <p className="text-green-400 text-[9px] font-medium whitespace-nowrap">{origin}</p>
      </div>

      {/* Dashed route line */}
      <div
        className="absolute top-1/2 left-14 right-14 -translate-y-1/2 h-0.5 border-t-2 border-dashed border-amber-400/30"
        style={{ maskImage: "linear-gradient(90deg, transparent, #F59E0B44 20%, #F59E0B44 80%, transparent)" }}
      />

      {/* Current location pulse */}
      <div className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1">
        <div className="relative">
          <div className="w-4 h-4 bg-amber-400 rounded-full shadow-glow z-10 relative" />
          <div className="absolute inset-0 rounded-full bg-amber-400 animate-ping opacity-30" />
        </div>
        <div className="bg-[#0D1F35] border border-amber-400/30 px-2 py-0.5 rounded-full">
          <p className="text-amber-400 text-[9px] font-medium whitespace-nowrap">
            📍 {currentLocation}
          </p>
        </div>
      </div>

      {/* Destination dot */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-1">
        <div className="w-3 h-3 bg-white/30 rounded-full" />
        <p className="text-white/40 text-[9px] font-medium whitespace-nowrap">{destination}</p>
      </div>

      {/* Label */}
      <div className="absolute bottom-3 left-3">
        <span className="text-white/20 text-[10px] uppercase tracking-widest">Live Route Map</span>
      </div>
    </div>
  );
}

/**
 * NotFound
 * Error state when tracking number is invalid.
 */
function NotFound({ trackingNumber }) {
  return (
    <div className="text-center py-16">
      <div className="w-20 h-20 bg-red-50 dark:bg-red-400/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
        <AlertCircle className="w-10 h-10 text-red-400" />
      </div>
      <h2
        className="text-gray-900 dark:text-white font-black text-3xl mb-3"
        style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
      >
        TRACKING NUMBER NOT FOUND
      </h2>
      <p className="text-gray-500 dark:text-white/40 text-base mb-2">
        We couldn&apos;t find a shipment matching{" "}
        <span className="font-mono font-semibold text-gray-700 dark:text-white/70 bg-gray-100 dark:bg-white/10 px-2 py-0.5 rounded">
          {trackingNumber}
        </span>
      </p>
      <p className="text-gray-400 dark:text-white/30 text-sm mb-8">
        Please double-check the tracking number and try again.
      </p>
      <div className="bg-amber-50 dark:bg-amber-400/10 border border-amber-200 dark:border-amber-400/20 rounded-xl p-4 max-w-sm mx-auto">
        <p className="text-amber-700 dark:text-amber-400 text-sm font-medium mb-2">
          Try a sample tracking number:
        </p>
        <div className="flex flex-wrap gap-2 justify-center">
          {["NC7841203648", "NC5293817402", "NC3827461092", "NC9481703265"].map((id) => (
            <a
              key={id}
              href={`/track?id=${id}`}
              className="font-mono text-xs bg-white dark:bg-white/10 border border-amber-200 dark:border-white/10 text-amber-700 dark:text-amber-400 px-3 py-1.5 rounded-lg hover:bg-amber-50 dark:hover:bg-white/5 transition-colors"
            >
              {id}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * ShipmentDetail
 * Main detail view once a shipment is found.
 */
function ShipmentDetail({ shipment }) {
  const isDelivered = shipment.status === "Delivered";

  return (
    <div className="space-y-6">
      {/* ── Top status bar ── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 bg-white dark:bg-[#0D1F35] rounded-2xl border border-gray-100 dark:border-white/[0.06] shadow-card">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <p className="text-xs text-gray-400 dark:text-white/30 uppercase tracking-wider font-medium">
              Tracking Number
            </p>
          </div>
          <p className="font-mono font-bold text-2xl text-gray-900 dark:text-white tracking-wide">
            {shipment.trackingNumber}
          </p>
          <p className="text-sm text-gray-500 dark:text-white/40 mt-1">
            {shipment.service} · {shipment.weight} · Shipped {shipment.shippedDate}
          </p>
        </div>
        <div className="flex flex-col items-end gap-3">
          <StatusBadge status={shipment.status} />
          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-gray-500 dark:text-white/40 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition-colors">
              <Share2 className="w-3.5 h-3.5" /> Share
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-gray-500 dark:text-white/40 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition-colors">
              <Printer className="w-3.5 h-3.5" /> Print
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-gray-500 dark:text-white/40 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition-colors">
              <RefreshCw className="w-3.5 h-3.5" /> Refresh
            </button>
          </div>
        </div>
      </div>

      {/* ── Delivery progress summary ── */}
      {!isDelivered && (
        <div className="p-5 bg-amber-50 dark:bg-amber-400/[0.08] border border-amber-200 dark:border-amber-400/20 rounded-2xl flex items-start gap-4">
          <div className="w-10 h-10 bg-amber-400/20 rounded-xl flex items-center justify-center flex-shrink-0">
            <Truck className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <p className="font-semibold text-amber-800 dark:text-amber-300 text-sm">
              Estimated delivery: <span className="font-mono">{shipment.estimatedDelivery}</span>
            </p>
            <p className="text-amber-700/70 dark:text-amber-400/60 text-xs mt-0.5">
              Currently at <strong>{shipment.currentLocation}</strong> — on its way to{" "}
              {shipment.receiver.city}, {shipment.receiver.country}
            </p>
          </div>
        </div>
      )}

      {isDelivered && (
        <div className="p-5 bg-green-50 dark:bg-green-400/[0.08] border border-green-200 dark:border-green-400/20 rounded-2xl flex items-start gap-4">
          <div className="w-10 h-10 bg-green-400/20 rounded-xl flex items-center justify-center flex-shrink-0">
            <Home className="w-5 h-5 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <p className="font-semibold text-green-800 dark:text-green-300 text-sm">
              Delivered on {shipment.actualDelivery}
            </p>
            <p className="text-green-700/70 dark:text-green-400/60 text-xs mt-0.5">
              Package was successfully delivered to {shipment.receiver.name} at{" "}
              {shipment.destination}.
            </p>
          </div>
        </div>
      )}

      {/* ── Main grid ── */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left: timeline (takes 2 cols) */}
        <div className="lg:col-span-2 bg-white dark:bg-[#0D1F35] rounded-2xl border border-gray-100 dark:border-white/[0.06] shadow-card p-6">
          <h3 className="font-bold text-gray-900 dark:text-white text-base mb-6 flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-500" />
            Tracking History
          </h3>
          <Timeline events={shipment.timeline} />
        </div>

        {/* Right: details */}
        <div className="space-y-5">
          {/* Shipment info */}
          <div className="bg-white dark:bg-[#0D1F35] rounded-2xl border border-gray-100 dark:border-white/[0.06] shadow-card p-5">
            <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-4">
              Shipment Details
            </h3>
            <div className="space-y-3.5">
              <DetailRow icon={Package} label="Contents" value={shipment.description} />
              <DetailRow icon={Weight} label="Weight" value={shipment.weight} />
              <DetailRow icon={Ruler} label="Dimensions" value={shipment.dimensions} />
              <DetailRow icon={Calendar} label="Shipped" value={shipment.shippedDate} />
              <DetailRow icon={Calendar} label="Est. Delivery" value={shipment.estimatedDelivery} />
            </div>
          </div>

          {/* Sender & receiver */}
          <div className="bg-white dark:bg-[#0D1F35] rounded-2xl border border-gray-100 dark:border-white/[0.06] shadow-card p-5">
            <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-4">
              Route Information
            </h3>
            <div className="space-y-4">
              {/* Sender */}
              <div>
                <p className="text-xs text-gray-400 dark:text-white/30 uppercase tracking-wide mb-1.5">
                  Sender
                </p>
                <div className="flex items-start gap-2.5">
                  <User className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {shipment.sender.name}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-white/35 mt-0.5 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {shipment.sender.city}, {shipment.sender.country}
                    </p>
                  </div>
                </div>
              </div>

              {/* Arrow */}
              <div className="flex items-center gap-2">
                <div className="flex-1 h-0.5 bg-gray-100 dark:bg-white/10 rounded" />
                <ArrowRight className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <div className="flex-1 h-0.5 bg-gray-100 dark:bg-white/10 rounded" />
              </div>

              {/* Receiver */}
              <div>
                <p className="text-xs text-gray-400 dark:text-white/30 uppercase tracking-wide mb-1.5">
                  Recipient
                </p>
                <div className="flex items-start gap-2.5">
                  <User className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {shipment.receiver.name}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-white/35 mt-0.5 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {shipment.receiver.city}, {shipment.receiver.country}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Map ── */}
      <div className="bg-white dark:bg-[#0D1F35] rounded-2xl border border-gray-100 dark:border-white/[0.06] shadow-card p-5">
        <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-4 flex items-center gap-2">
          <MapPin className="w-4 h-4 text-amber-500" />
          Live Route Map
        </h3>
        <MapPlaceholder
          origin={shipment.origin}
          destination={shipment.destination}
          currentLocation={shipment.currentLocation}
        />
      </div>
    </div>
  );
}

/**
 * TrackPageContent
 * Inner page logic (uses useSearchParams — must be in Suspense).
 */
function TrackPageContent() {
  const searchParams = useSearchParams();
  const queryId = searchParams.get("id") || "";
  const [shipment, setShipment] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    if (!queryId) {
      setShipment(null);
      setNotFound(false);
      setSearched(false);
      return;
    }

    setLoading(true);
    setSearched(true);
    // Simulate API call delay
    const timer = setTimeout(() => {
      const found = findShipment(queryId);
      if (found) {
        setShipment(found);
        setNotFound(false);
      } else {
        setShipment(null);
        setNotFound(true);
      }
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [queryId]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#060E1A]">
      <Navbar />

      {/* ── Page header ── */}
      <div className="bg-[#060E1A] pt-24 pb-12 relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-white/30 text-xs mb-6">
            <a href="/" className="hover:text-white/60 transition-colors">Home</a>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white/60">Track Parcel</span>
            {queryId && (
              <>
                <ChevronRight className="w-3 h-3" />
                <span className="font-mono text-amber-400/70">{queryId}</span>
              </>
            )}
          </div>

          <h1
            className="text-white font-black text-4xl sm:text-5xl mb-3"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            TRACK YOUR PARCEL
          </h1>
          <p className="text-white/40 text-base mb-8">
            Enter your NovaCargo tracking number to get live shipment status.
          </p>

          {/* Tracking form */}
          <TrackingForm variant="hero" initialValue={queryId} />
        </div>
      </div>

      {/* ── Results area ── */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {loading && <SkeletonLoader />}

        {!loading && searched && notFound && (
          <div className="bg-white dark:bg-[#0D1F35] rounded-2xl border border-gray-100 dark:border-white/5 shadow-card p-8">
            <NotFound trackingNumber={queryId} />
          </div>
        )}

        {!loading && shipment && <ShipmentDetail shipment={shipment} />}

        {/* Default state — no search yet */}
        {!searched && !loading && (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-amber-50 dark:bg-amber-400/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Package className="w-10 h-10 text-amber-500" />
            </div>
            <h3
              className="text-gray-900 dark:text-white font-black text-2xl mb-2"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              ENTER A TRACKING NUMBER ABOVE
            </h3>
            <p className="text-gray-400 dark:text-white/30 text-sm max-w-sm mx-auto">
              Your NovaCargo tracking number starts with &ldquo;NC&rdquo; followed by 10 digits.
              You can find it in your confirmation email.
            </p>

            {/* Sample IDs */}
            <div className="mt-8 flex flex-wrap gap-2 justify-center">
              <p className="w-full text-gray-400 dark:text-white/25 text-xs mb-2">
                Sample tracking IDs to try:
              </p>
              {shipments.slice(0, 6).map((s) => (
                <a
                  key={s.trackingNumber}
                  href={`/track?id=${s.trackingNumber}`}
                  className="font-mono text-xs bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-600 dark:text-white/50 px-3 py-1.5 rounded-lg hover:border-amber-300 dark:hover:border-amber-400/40 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                >
                  {s.trackingNumber}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

/**
 * Track Page
 * Wrapped in Suspense because it uses useSearchParams.
 */
export default function TrackPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#060E1A]" />}>
      <TrackPageContent />
    </Suspense>
  );
}
