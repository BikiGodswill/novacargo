"use client";

export const dynamic = "force-dynamic";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import nextDynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TrackingForm from "@/components/TrackingForm";
import Timeline from "@/components/Timeline";
import { StatusBadge } from "@/components/ShipmentCard";
import { findShipment } from "@/lib/db";
import {
  Package, MapPin, Calendar, Clock, Weight, Ruler,
  User, ArrowRight, AlertCircle, RefreshCw, Share2,
  Printer, ChevronRight, Home, Truck,
} from "lucide-react";

// Dynamically import LiveMap — no SSR (Leaflet needs window)
const LiveMap = nextDynamic(() => import("@/components/LiveMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-72 bg-gray-100 dark:bg-white/5 rounded-2xl flex items-center justify-center border border-gray-200 dark:border-white/[0.08]">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-amber-500/30 border-t-amber-500 rounded-full animate-spin"/>
        <p className="text-gray-400 dark:text-white/30 text-xs">Loading live map…</p>
      </div>
    </div>
  ),
});

// ── Sub-components ─────────────────────────────────────────────────────────────

function DetailRow({ icon: Icon, label, value, mono = false }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 bg-amber-50 dark:bg-amber-400/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
        <Icon className="w-4 h-4 text-amber-500" />
      </div>
      <div>
        <p className="text-xs text-gray-400 dark:text-white/30 uppercase tracking-wide font-medium">{label}</p>
        <p className={`text-sm font-medium text-gray-900 dark:text-white mt-0.5 ${mono ? "font-mono" : ""}`}>{value}</p>
      </div>
    </div>
  );
}

function SkeletonLoader() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-8 bg-gray-200 dark:bg-white/10 rounded-xl w-1/3"/>
      <div className="h-20 bg-gray-100 dark:bg-white/5 rounded-2xl"/>
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 h-80 bg-gray-100 dark:bg-white/5 rounded-2xl"/>
        <div className="h-80 bg-gray-100 dark:bg-white/5 rounded-2xl"/>
      </div>
      <div className="h-72 bg-gray-100 dark:bg-white/5 rounded-2xl"/>
    </div>
  );
}

function NotFound({ trackingNumber }) {
  const samples = ["NC7841203648","NC5293817402","NC3827461092","NC9481703265"];
  return (
    <div className="text-center py-16 bg-white dark:bg-[#0D1F35] rounded-2xl border border-gray-100 dark:border-white/5 p-8">
      <div className="w-20 h-20 bg-red-50 dark:bg-red-400/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
        <AlertCircle className="w-10 h-10 text-red-400"/>
      </div>
      <h2 className="text-gray-900 dark:text-white font-black text-3xl mb-3" style={{fontFamily:"'Barlow Condensed',sans-serif"}}>
        TRACKING NUMBER NOT FOUND
      </h2>
      <p className="text-gray-500 dark:text-white/40 text-base mb-2">
        No shipment matches{" "}
        <span className="font-mono font-semibold text-gray-700 dark:text-white/70 bg-gray-100 dark:bg-white/10 px-2 py-0.5 rounded">
          {trackingNumber}
        </span>
      </p>
      <p className="text-gray-400 dark:text-white/30 text-sm mb-8">Double-check the number or try one of the samples below.</p>
      <div className="flex flex-wrap gap-2 justify-center">
        {samples.map(id => (
          <a key={id} href={`/track?id=${id}`}
            className="font-mono text-xs bg-white dark:bg-white/10 border border-amber-200 dark:border-white/10 text-amber-700 dark:text-amber-400 px-3 py-1.5 rounded-lg hover:bg-amber-50 dark:hover:bg-white/5 transition-colors">
            {id}
          </a>
        ))}
      </div>
    </div>
  );
}

function ShipmentDetail({ shipment }) {
  const isDelivered = shipment.status === "Delivered";
  const hasCoords   = shipment.originLat && shipment.destinationLat;

  return (
    <div className="space-y-6">
      {/* ── Status bar ── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 bg-white dark:bg-[#0D1F35] rounded-2xl border border-gray-100 dark:border-white/[0.06] shadow-card">
        <div>
          <p className="text-xs text-gray-400 dark:text-white/30 uppercase tracking-wider font-medium mb-1">Tracking Number</p>
          <p className="font-mono font-bold text-2xl text-gray-900 dark:text-white tracking-wide">{shipment.trackingNumber}</p>
          <p className="text-sm text-gray-500 dark:text-white/40 mt-1">
            {shipment.service} · {shipment.weight} · Shipped {shipment.shippedDate}
          </p>
        </div>
        <div className="flex flex-col items-end gap-3">
          <StatusBadge status={shipment.status}/>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-gray-500 dark:text-white/40 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition-colors">
              <Share2 className="w-3.5 h-3.5"/> Share
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-gray-500 dark:text-white/40 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition-colors">
              <Printer className="w-3.5 h-3.5"/> Print
            </button>
          </div>
        </div>
      </div>

      {/* ── Status banner ── */}
      {!isDelivered ? (
        <div className="p-5 bg-amber-50 dark:bg-amber-400/[0.08] border border-amber-200 dark:border-amber-400/20 rounded-2xl flex items-start gap-4">
          <div className="w-10 h-10 bg-amber-400/20 rounded-xl flex items-center justify-center flex-shrink-0">
            <Truck className="w-5 h-5 text-amber-600 dark:text-amber-400"/>
          </div>
          <div>
            <p className="font-semibold text-amber-800 dark:text-amber-300 text-sm">
              Estimated delivery: <span className="font-mono">{shipment.estimatedDelivery}</span>
            </p>
            <p className="text-amber-700/70 dark:text-amber-400/60 text-xs mt-0.5">
              Currently at <strong>{shipment.currentLocation}</strong>
            </p>
          </div>
        </div>
      ) : (
        <div className="p-5 bg-green-50 dark:bg-green-400/[0.08] border border-green-200 dark:border-green-400/20 rounded-2xl flex items-start gap-4">
          <div className="w-10 h-10 bg-green-400/20 rounded-xl flex items-center justify-center flex-shrink-0">
            <Home className="w-5 h-5 text-green-600 dark:text-green-400"/>
          </div>
          <div>
            <p className="font-semibold text-green-800 dark:text-green-300 text-sm">
              Delivered on {shipment.actualDelivery || shipment.estimatedDelivery}
            </p>
            <p className="text-green-700/70 dark:text-green-400/60 text-xs mt-0.5">
              Successfully delivered to {shipment.receiver.name} at {shipment.destination}.
            </p>
          </div>
        </div>
      )}

      {/* ── Main grid: timeline + details ── */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Timeline */}
        <div className="lg:col-span-2 bg-white dark:bg-[#0D1F35] rounded-2xl border border-gray-100 dark:border-white/[0.06] shadow-card p-6">
          <h3 className="font-bold text-gray-900 dark:text-white text-base mb-6 flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-500"/> Tracking History
          </h3>
          <Timeline events={shipment.timeline}/>
        </div>

        {/* Shipment details */}
        <div className="space-y-5">
          <div className="bg-white dark:bg-[#0D1F35] rounded-2xl border border-gray-100 dark:border-white/[0.06] shadow-card p-5">
            <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-4">Shipment Details</h3>
            <div className="space-y-3.5">
              <DetailRow icon={Package}  label="Contents"     value={shipment.description}/>
              <DetailRow icon={Weight}   label="Weight"       value={shipment.weight}/>
              <DetailRow icon={Ruler}    label="Dimensions"   value={shipment.dimensions}/>
              <DetailRow icon={Calendar} label="Shipped"      value={shipment.shippedDate}/>
              <DetailRow icon={Calendar} label="Est. Delivery" value={shipment.estimatedDelivery}/>
            </div>
          </div>

          <div className="bg-white dark:bg-[#0D1F35] rounded-2xl border border-gray-100 dark:border-white/[0.06] shadow-card p-5">
            <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-4">Route Information</h3>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-400 dark:text-white/30 uppercase tracking-wide mb-1.5">Sender</p>
                <div className="flex items-start gap-2.5">
                  <User className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0"/>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{shipment.sender.name}</p>
                    <p className="text-xs text-gray-400 dark:text-white/35 mt-0.5 flex items-center gap-1">
                      <MapPin className="w-3 h-3"/>{shipment.sender.city}, {shipment.sender.country}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-0.5 bg-gray-100 dark:bg-white/10 rounded"/>
                <ArrowRight className="w-4 h-4 text-amber-500 flex-shrink-0"/>
                <div className="flex-1 h-0.5 bg-gray-100 dark:bg-white/10 rounded"/>
              </div>
              <div>
                <p className="text-xs text-gray-400 dark:text-white/30 uppercase tracking-wide mb-1.5">Recipient</p>
                <div className="flex items-start gap-2.5">
                  <User className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0"/>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{shipment.receiver.name}</p>
                    <p className="text-xs text-gray-400 dark:text-white/35 mt-0.5 flex items-center gap-1">
                      <MapPin className="w-3 h-3"/>{shipment.receiver.city}, {shipment.receiver.country}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Live Map ── */}
      <div className="bg-white dark:bg-[#0D1F35] rounded-2xl border border-gray-100 dark:border-white/[0.06] shadow-card p-5">
        <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-4 flex items-center gap-2">
          <MapPin className="w-4 h-4 text-amber-500"/>
          Live Route Map
          <span className="flex items-center gap-1.5 ml-2 px-2 py-0.5 bg-green-100 dark:bg-green-400/10 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"/>
            <span className="text-green-700 dark:text-green-400 text-[10px] font-semibold">Live</span>
          </span>
        </h3>

        {hasCoords ? (
          <LiveMap
            originLat={shipment.originLat}
            originLng={shipment.originLng}
            originLabel={shipment.origin}
            destinationLat={shipment.destinationLat}
            destinationLng={shipment.destinationLng}
            destinationLabel={shipment.destination}
            currentLat={shipment.currentLat || shipment.originLat}
            currentLng={shipment.currentLng || shipment.originLng}
            currentLabel={shipment.currentLocation}
            status={shipment.status}
          />
        ) : (
          <div className="h-48 bg-gray-50 dark:bg-white/5 rounded-xl flex items-center justify-center text-gray-400 dark:text-white/25 text-sm">
            Map coordinates not available for this shipment.
          </div>
        )}

        <div className="mt-3 flex items-center justify-between text-xs text-gray-400 dark:text-white/30">
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3 h-3 text-amber-500"/> {shipment.currentLocation}
          </span>
          <span>Last updated: just now</span>
        </div>
      </div>
    </div>
  );
}

// ── Main page content ─────────────────────────────────────────────────────────

function TrackPageContent() {
  const searchParams = useSearchParams();
  const queryId      = searchParams.get("id") || "";

  const [shipment, setShipment] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    if (!queryId) { setShipment(null); setNotFound(false); setSearched(false); return; }

    setLoading(true);
    setSearched(true);

    (async () => {
      const found = await findShipment(queryId);
      if (found) { setShipment(found); setNotFound(false); }
      else        { setShipment(null); setNotFound(true);  }
      setLoading(false);
    })();
  }, [queryId]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#060E1A]">
      <Navbar/>

      {/* Header */}
      <div className="bg-[#060E1A] pt-24 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage:"linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)",
          backgroundSize:"40px 40px",
        }}/>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-white/30 text-xs mb-6">
            <a href="/" className="hover:text-white/60 transition-colors">Home</a>
            <ChevronRight className="w-3 h-3"/>
            <span className="text-white/60">Track Parcel</span>
            {queryId && <><ChevronRight className="w-3 h-3"/><span className="font-mono text-amber-400/70">{queryId}</span></>}
          </nav>
          <h1 className="text-white font-black text-4xl sm:text-5xl mb-3" style={{fontFamily:"'Barlow Condensed',sans-serif"}}>
            TRACK YOUR PARCEL
          </h1>
          <p className="text-white/40 text-base mb-8">
            Real-time shipment status and live map — powered by NovaCargo.
          </p>
          <TrackingForm variant="hero" initialValue={queryId}/>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {loading  && <SkeletonLoader/>}
        {!loading && searched && notFound && <NotFound trackingNumber={queryId}/>}
        {!loading && shipment && <ShipmentDetail shipment={shipment}/>}

        {!searched && !loading && (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-amber-50 dark:bg-amber-400/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Package className="w-10 h-10 text-amber-500"/>
            </div>
            <h3 className="text-gray-900 dark:text-white font-black text-2xl mb-2" style={{fontFamily:"'Barlow Condensed',sans-serif"}}>
              ENTER A TRACKING NUMBER ABOVE
            </h3>
            <p className="text-gray-400 dark:text-white/30 text-sm max-w-sm mx-auto mb-8">
              NovaCargo tracking numbers start with &ldquo;NC&rdquo; followed by 10 digits.
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              <p className="w-full text-gray-400 dark:text-white/25 text-xs mb-1">Sample tracking IDs:</p>
              {["NC7841203648","NC5293817402","NC1047382915","NC3827461092","NC4729381056","NC2047391856"].map(id => (
                <a key={id} href={`/track?id=${id}`}
                  className="font-mono text-xs bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-600 dark:text-white/50 px-3 py-1.5 rounded-lg hover:border-amber-300 dark:hover:border-amber-400/40 hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                  {id}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer/>
    </div>
  );
}

export default function TrackPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#060E1A]"/>}>
      <TrackPageContent/>
    </Suspense>
  );
}
