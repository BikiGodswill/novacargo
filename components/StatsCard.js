import { TrendingUp, TrendingDown } from "lucide-react";

/**
 * StatsCard
 * Dashboard metric card with icon, value, label, and trend.
 *
 * @param {object} props
 * @param {React.ElementType} props.icon - Lucide icon component
 * @param {string} props.label - Metric label
 * @param {string|number} props.value - Main metric value
 * @param {string} props.trend - e.g. "+12%" or "-3%"
 * @param {boolean} props.trendUp - Whether trend is positive
 * @param {string} props.accent - Tailwind color class for icon bg
 * @param {string} props.iconColor - Tailwind color class for icon
 */
export default function StatsCard({
  icon: Icon,
  label,
  value,
  trend,
  trendUp = true,
  accent = "bg-amber-50 dark:bg-amber-400/10",
  iconColor = "text-amber-600 dark:text-amber-400",
}) {
  return (
    <div className="bg-white dark:bg-[#0D1F35] rounded-2xl p-6 border border-gray-100 dark:border-white/5 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-0.5">
      <div className="flex items-start justify-between">
        {/* Icon */}
        <div className={`w-11 h-11 rounded-xl ${accent} flex items-center justify-center`}>
          <Icon className={`w-5 h-5 ${iconColor}`} />
        </div>

        {/* Trend badge */}
        {trend && (
          <div
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
              trendUp
                ? "bg-green-50 dark:bg-green-400/10 text-green-600 dark:text-green-400"
                : "bg-red-50 dark:bg-red-400/10 text-red-600 dark:text-red-400"
            }`}
          >
            {trendUp ? (
              <TrendingUp className="w-3 h-3" />
            ) : (
              <TrendingDown className="w-3 h-3" />
            )}
            {trend}
          </div>
        )}
      </div>

      <div className="mt-4">
        <p className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
          {value}
        </p>
        <p className="mt-1 text-sm text-gray-500 dark:text-white/50 font-medium">
          {label}
        </p>
      </div>
    </div>
  );
}
