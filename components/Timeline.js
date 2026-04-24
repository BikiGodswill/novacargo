import {
  CheckCircle2,
  Clock,
  AlertTriangle,
  MapPin,
  Package,
  Truck,
  Home,
  RefreshCw,
} from "lucide-react";

/**
 * Get icon for timeline event status label
 */
function getEventIcon(status) {
  const s = status.toLowerCase();
  if (s.includes("received") || s.includes("booked")) return Package;
  if (s.includes("picked up") || s.includes("processed")) return Package;
  if (s.includes("transit") || s.includes("hub") || s.includes("arrived")) return Truck;
  if (s.includes("delivery") && !s.includes("out")) return Home;
  if (s.includes("out for delivery")) return Truck;
  if (s.includes("delivered")) return CheckCircle2;
  if (s.includes("delayed") || s.includes("hold")) return AlertTriangle;
  if (s.includes("return")) return RefreshCw;
  return MapPin;
}

/**
 * Timeline
 * Vertical track of shipping events with icons and timestamps.
 *
 * @param {object} props
 * @param {Array} props.events - Array of timeline event objects
 * @param {boolean} props.compact - Compact mode (fewer details)
 */
export default function Timeline({ events = [], compact = false }) {
  if (!events.length) {
    return (
      <div className="py-8 text-center text-gray-400 dark:text-white/30 text-sm">
        No tracking events available yet.
      </div>
    );
  }

  // Find the last completed event index to determine "current" step
  const lastCompleted = events.reduce((acc, ev, i) => (ev.completed ? i : acc), -1);

  return (
    <div className="relative">
      {events.map((event, index) => {
        const Icon = getEventIcon(event.status);
        const isLast = index === events.length - 1;
        const isCurrent = index === lastCompleted && !events[index + 1]?.completed;
        const isFuture = !event.completed;

        return (
          <div key={event.id} className="relative flex gap-4">
            {/* ── Vertical line ── */}
            {!isLast && (
              <div
                className={`absolute left-[19px] top-10 bottom-0 w-0.5 ${
                  event.completed
                    ? "bg-amber-400"
                    : "bg-gray-200 dark:bg-white/10"
                }`}
                style={{ height: "calc(100% - 20px)" }}
              />
            )}

            {/* ── Icon node ── */}
            <div className="flex-shrink-0 relative z-10">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  event.isAlert
                    ? "bg-red-100 dark:bg-red-900/30 border-2 border-red-400"
                    : event.completed
                    ? isCurrent
                      ? "bg-amber-400 shadow-glow scale-110"
                      : "bg-amber-500"
                    : "bg-gray-100 dark:bg-white/5 border-2 border-dashed border-gray-300 dark:border-white/15"
                }`}
              >
                <Icon
                  className={`${compact ? "w-4 h-4" : "w-4.5 h-4.5"} ${
                    event.isAlert
                      ? "text-red-500"
                      : event.completed
                      ? "text-[#060E1A]"
                      : "text-gray-400 dark:text-white/30"
                  }`}
                />

                {/* Pulsing ring for current event */}
                {isCurrent && !event.isAlert && (
                  <span className="absolute inset-0 rounded-full bg-amber-400 animate-ping opacity-30" />
                )}
              </div>
            </div>

            {/* ── Event content ── */}
            <div className={`flex-1 ${isLast ? "pb-2" : "pb-6"}`}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p
                    className={`font-semibold text-sm ${
                      event.isAlert
                        ? "text-red-500"
                        : isFuture
                        ? "text-gray-400 dark:text-white/30"
                        : "text-gray-900 dark:text-white"
                    }`}
                  >
                    {event.status}
                    {isCurrent && (
                      <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-amber-100 dark:bg-amber-400/15 text-amber-700 dark:text-amber-400">
                        Current
                      </span>
                    )}
                  </p>

                  {!compact && (
                    <p
                      className={`text-xs mt-0.5 ${
                        isFuture
                          ? "text-gray-300 dark:text-white/20"
                          : "text-gray-500 dark:text-white/50"
                      }`}
                    >
                      {event.description}
                    </p>
                  )}

                  {event.location && (
                    <div
                      className={`flex items-center gap-1 mt-1 text-xs ${
                        isFuture
                          ? "text-gray-300 dark:text-white/20"
                          : "text-gray-400 dark:text-white/35"
                      }`}
                    >
                      <MapPin className="w-3 h-3" />
                      {event.location}
                    </div>
                  )}
                </div>

                {/* Date */}
                <div className="text-right flex-shrink-0">
                  {event.date ? (
                    <div className="flex items-center gap-1 text-xs text-gray-400 dark:text-white/30">
                      <Clock className="w-3 h-3" />
                      <span className="whitespace-nowrap">{event.date}</span>
                    </div>
                  ) : (
                    <span className="text-xs text-gray-300 dark:text-white/20 italic">Pending</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
