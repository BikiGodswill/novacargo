"use client";

import { useEffect, useRef } from "react";

/**
 * LiveMap
 * Leaflet-powered interactive map showing origin → current → destination.
 * Dynamically imported (no SSR) to avoid window-is-not-defined errors.
 *
 * @param {object} props
 * @param {number} props.originLat
 * @param {number} props.originLng
 * @param {string} props.originLabel
 * @param {number} props.destinationLat
 * @param {number} props.destinationLng
 * @param {string} props.destinationLabel
 * @param {number} props.currentLat
 * @param {number} props.currentLng
 * @param {string} props.currentLabel
 * @param {string} props.status
 */
export default function LiveMap({
  originLat, originLng, originLabel,
  destinationLat, destinationLng, destinationLabel,
  currentLat, currentLng, currentLabel,
  status,
}) {
  const mapRef     = useRef(null);
  const instanceRef = useRef(null);

  useEffect(() => {
    if (instanceRef.current) return; // already initialised
    if (!mapRef.current) return;

    // Validate coords
    const hasOrigin      = originLat      && originLng;
    const hasDest        = destinationLat && destinationLng;
    const hasCurrent     = currentLat     && currentLng;
    if (!hasOrigin && !hasDest) return;

    // Dynamically import Leaflet (client-side only)
    import("leaflet").then((L) => {
      // Fix default marker icon paths (webpack/Next.js issue)
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl:       "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl:     "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      // ── Init map ────────────────────────────────────────────────────────
      const map = L.map(mapRef.current, {
        zoomControl: true,
        attributionControl: true,
      });
      instanceRef.current = map;

      // OpenStreetMap tile layer (free, no API key needed)
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 18,
      }).addTo(map);

      // ── Custom SVG icons ────────────────────────────────────────────────
      const makeIcon = (color, size = 14) => L.divIcon({
        className: "",
        iconAnchor: [size/2, size/2],
        html: `<div style="
          width:${size}px;height:${size}px;border-radius:50%;
          background:${color};border:3px solid white;
          box-shadow:0 2px 8px rgba(0,0,0,0.4);
        "></div>`,
      });

      const pulsingIcon = (color) => L.divIcon({
        className: "",
        iconAnchor: [12, 12],
        html: `
          <div style="position:relative;width:24px;height:24px;">
            <div style="
              position:absolute;inset:0;border-radius:50%;
              background:${color};opacity:0.3;
              animation:ncping 1.5s ease-out infinite;
            "></div>
            <div style="
              position:absolute;inset:4px;border-radius:50%;
              background:${color};border:2.5px solid white;
              box-shadow:0 2px 10px rgba(0,0,0,0.5);
            "></div>
          </div>
          <style>
            @keyframes ncping {
              0%{transform:scale(1);opacity:0.6}
              100%{transform:scale(2.8);opacity:0}
            }
          </style>
        `,
      });

      const deliveredIcon = L.divIcon({
        className: "",
        iconAnchor: [12, 12],
        html: `<div style="
          width:24px;height:24px;border-radius:50%;
          background:#22c55e;border:3px solid white;
          box-shadow:0 2px 10px rgba(34,197,94,0.6);
          display:flex;align-items:center;justify-content:center;
        ">✓</div>`,
      });

      const points = [];

      // ── Origin marker ───────────────────────────────────────────────────
      if (hasOrigin) {
        const m = L.marker([originLat, originLng], { icon: makeIcon("#22c55e", 14) }).addTo(map);
        m.bindPopup(
          `<div style="font-family:system-ui;font-size:12px;min-width:140px;">
            <div style="font-weight:700;color:#166534;margin-bottom:3px;">📦 Origin</div>
            <div style="color:#374151;">${originLabel}</div>
          </div>`,
          { closeButton: false }
        );
        points.push([originLat, originLng]);
      }

      // ── Destination marker ──────────────────────────────────────────────
      if (hasDest) {
        const icon = status === "Delivered" ? deliveredIcon : makeIcon("#94a3b8", 12);
        const m = L.marker([destinationLat, destinationLng], { icon }).addTo(map);
        m.bindPopup(
          `<div style="font-family:system-ui;font-size:12px;min-width:140px;">
            <div style="font-weight:700;color:#1e40af;margin-bottom:3px;">🏁 Destination</div>
            <div style="color:#374151;">${destinationLabel}</div>
            ${status === "Delivered" ? '<div style="color:#16a34a;font-weight:600;margin-top:4px;">✓ Delivered</div>' : ""}
          </div>`,
          { closeButton: false }
        );
        points.push([destinationLat, destinationLng]);
      }

      // ── Route line (dashed, origin → destination) ───────────────────────
      if (hasOrigin && hasDest) {
        // Curved dashed line using intermediate points for great-circle approximation
        const steps     = 12;
        const routeCoords = [];
        for (let i = 0; i <= steps; i++) {
          const t  = i / steps;
          const lat = originLat + (destinationLat - originLat) * t;
          const lng = originLng + (destinationLng - originLng) * t;
          routeCoords.push([lat, lng]);
        }
        L.polyline(routeCoords, {
          color: "#94a3b8",
          weight: 2,
          opacity: 0.5,
          dashArray: "8, 8",
        }).addTo(map);
      }

      // ── Completed route segment ─────────────────────────────────────────
      if (hasOrigin && hasCurrent && status !== "Pending") {
        L.polyline([[originLat, originLng], [currentLat, currentLng]], {
          color: "#f59e0b",
          weight: 3.5,
          opacity: 0.9,
        }).addTo(map);
      }

      // ── Current location marker (animated pulse) ────────────────────────
      if (hasCurrent && status !== "Delivered" && status !== "Pending") {
        const alertColor = status === "Delayed" ? "#ef4444" : "#f59e0b";
        const m = L.marker([currentLat, currentLng], { icon: pulsingIcon(alertColor), zIndexOffset: 1000 }).addTo(map);
        m.bindPopup(
          `<div style="font-family:system-ui;font-size:12px;min-width:160px;">
            <div style="font-weight:700;color:${alertColor === "#ef4444" ? "#b91c1c" : "#92400e"};margin-bottom:3px;">
              ${status === "Delayed" ? "⚠️ Delayed" : "📍 Current Location"}
            </div>
            <div style="color:#374151;">${currentLabel}</div>
            <div style="color:#6b7280;margin-top:4px;font-size:11px;">Updated just now</div>
          </div>`,
          { closeButton: false }
        );
        m.openPopup();
        points.push([currentLat, currentLng]);
      }

      // ── Fit map to all markers ──────────────────────────────────────────
      if (points.length === 1) {
        map.setView(points[0], 8);
      } else if (points.length > 1) {
        map.fitBounds(L.latLngBounds(points), { padding: [40, 40], maxZoom: 10 });
      }
    });

    // Cleanup on unmount
    return () => {
      if (instanceRef.current) {
        instanceRef.current.remove();
        instanceRef.current = null;
      }
    };
  }, [originLat, originLng, destinationLat, destinationLng, currentLat, currentLng, status]);

  return (
    <div className="relative w-full h-72 sm:h-80 rounded-2xl overflow-hidden border border-gray-200 dark:border-white/[0.08]">
      {/* Leaflet CSS */}
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
      />
      <div ref={mapRef} className="w-full h-full" />

      {/* Legend overlay */}
      <div className="absolute bottom-3 left-3 z-[1000] flex flex-col gap-1.5 bg-white/90 dark:bg-[#0D1F35]/90 backdrop-blur-sm rounded-xl px-3 py-2.5 border border-gray-200 dark:border-white/10 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-green-500 border-2 border-white shadow-sm flex-shrink-0"/>
          <span className="text-gray-600 dark:text-white/60 text-[10px] font-medium">Origin</span>
        </div>
        {status !== "Pending" && status !== "Delivered" && (
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-amber-400 border-2 border-white shadow-sm flex-shrink-0"/>
            <span className="text-gray-600 dark:text-white/60 text-[10px] font-medium">Current</span>
          </div>
        )}
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-slate-400 border-2 border-white shadow-sm flex-shrink-0"/>
          <span className="text-gray-600 dark:text-white/60 text-[10px] font-medium">Destination</span>
        </div>
        {status !== "Pending" && (
          <div className="flex items-center gap-2">
            <div className="w-6 h-0 border-t-2 border-amber-400 flex-shrink-0"/>
            <span className="text-gray-600 dark:text-white/60 text-[10px] font-medium">Route covered</span>
          </div>
        )}
      </div>
    </div>
  );
}
