import { ArrowRight } from "lucide-react";

/**
 * ServiceCard
 * Landing page card for showcasing logistics services.
 *
 * @param {object} props
 * @param {React.ElementType} props.icon - Lucide icon
 * @param {string} props.title - Service name
 * @param {string} props.description - Short description
 * @param {string} props.tag - Optional tag label
 * @param {string} props.gradient - CSS gradient string for icon bg
 */
export default function ServiceCard({ icon: Icon, title, description, tag, gradient }) {
  return (
    <div className="group relative bg-white dark:bg-[#0D1F35] rounded-2xl p-6 border border-gray-100 dark:border-white/[0.06] shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden">
      {/* Hover gradient overlay */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
        style={{ background: "linear-gradient(135deg, rgba(245,158,11,0.03) 0%, rgba(245,158,11,0) 100%)" }}
      />

      {/* Decorative corner accent */}
      <div className="absolute top-0 right-0 w-24 h-24 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: "radial-gradient(circle at top right, rgba(245,158,11,0.08), transparent 70%)",
        }}
      />

      {/* Icon */}
      <div
        className="relative w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
        style={{ background: gradient || "linear-gradient(135deg, #F59E0B22, #F59E0B11)" }}
      >
        <Icon className="w-6 h-6 text-amber-500" />
      </div>

      {/* Tag */}
      {tag && (
        <span className="inline-block mb-2 px-2.5 py-0.5 bg-amber-100 dark:bg-amber-400/10 text-amber-700 dark:text-amber-400 text-xs font-medium rounded-full">
          {tag}
        </span>
      )}

      {/* Content */}
      <h3 className="text-gray-900 dark:text-white font-semibold text-base mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
        {title}
      </h3>
      <p className="text-gray-500 dark:text-white/45 text-sm leading-relaxed">
        {description}
      </p>

      {/* CTA */}
      <div className="mt-4 flex items-center gap-1 text-amber-500 text-sm font-medium opacity-0 group-hover:opacity-100 translate-x-0 group-hover:translate-x-0 transition-all duration-300">
        Learn more <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  );
}
