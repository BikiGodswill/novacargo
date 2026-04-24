import Link from "next/link";
import { Package, MapPin, Calendar, ArrowRight } from "lucide-react";
import { STATUS_COLORS } from "@/lib/mockData";

/**
 * StatusBadge
 * Inline status indicator with colored dot.
 */
export function StatusBadge({ status }) {
  const colors = STATUS_COLORS[status] || {
    bg: "bg-gray-100",
    text: "text-gray-600",
    dot: "bg-gray-400",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${colors.bg} ${colors.text}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${colors.dot}`} />
      {status}
    </span>
  );
}

/**
 * ShipmentCard
 * Card-style shipment summary used in search results or grids.
 *
 * @param {object} props
 * @param {object} props.shipment - Shipment data object
 */
export default function ShipmentCard({ shipment }) {
  return (
    <Link
      href={`/track?id=${shipment.trackingNumber}`}
      className="block bg-white dark:bg-[#0D1F35] rounded-2xl p-5 border border-gray-100 dark:border-white/5 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-0.5 group"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-50 dark:bg-amber-400/10 rounded-xl flex items-center justify-center flex-shrink-0">
            <Package className="w-5 h-5 text-amber-500" />
          </div>
          <div>
            <p className="font-semibold text-gray-900 dark:text-white text-sm font-mono">
              {shipment.trackingNumber}
            </p>
            <p className="text-xs text-gray-400 dark:text-white/35 mt-0.5">
              {shipment.service}
            </p>
          </div>
        </div>
        <StatusBadge status={shipment.status} />
      </div>

      {/* Route */}
      <div className="flex items-center gap-2 mb-3">
        <div className="flex-1 text-xs text-gray-600 dark:text-white/60">
          <p className="font-medium text-gray-800 dark:text-white/80">
            {shipment.sender.city}, {shipment.sender.country}
          </p>
          <p className="text-gray-400 dark:text-white/30 text-[10px]">Origin</p>
        </div>
        <div className="flex-shrink-0 flex flex-col items-center gap-1">
          <div className="w-12 h-0.5 bg-gradient-to-r from-gray-200 via-amber-300 to-gray-200 dark:from-white/10 dark:via-amber-400/50 dark:to-white/10 rounded-full" />
          <ArrowRight className="w-3 h-3 text-amber-500 -mt-1" />
        </div>
        <div className="flex-1 text-right text-xs text-gray-600 dark:text-white/60">
          <p className="font-medium text-gray-800 dark:text-white/80">
            {shipment.receiver.city}, {shipment.receiver.country}
          </p>
          <p className="text-gray-400 dark:text-white/30 text-[10px]">Destination</p>
        </div>
      </div>

      {/* Footer details */}
      <div className="pt-3 border-t border-gray-100 dark:border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-1 text-xs text-gray-400 dark:text-white/30">
          <MapPin className="w-3 h-3" />
          <span className="truncate max-w-[120px]">{shipment.currentLocation}</span>
        </div>
        <div className="flex items-center gap-1 text-xs text-gray-400 dark:text-white/30">
          <Calendar className="w-3 h-3" />
          <span>Est. {shipment.estimatedDelivery}</span>
        </div>
      </div>
    </Link>
  );
}
