"use client";

import { useState } from "react";
import {
  X,
  Package,
  User,
  MapPin,
  Calendar,
  Weight,
  Ruler,
  Truck,
  ChevronDown,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { STATUS, SERVICE_TYPES } from "@/lib/mockData";

// ─── Status options (exclude terminal edge cases for new shipments) ────────────
const ALLOWED_STATUSES = [
  STATUS.PENDING,
  STATUS.PROCESSING,
  STATUS.IN_TRANSIT,
  STATUS.OUT_FOR_DELIVERY,
  STATUS.DELIVERED,
  STATUS.DELAYED,
  STATUS.RETURNED,
];

// ─── Countries list (shortened but representative) ────────────────────────────
const COUNTRIES = [
  "Australia", "Austria", "Belgium", "Brazil", "Canada", "China", "Colombia",
  "Denmark", "Egypt", "Estonia", "Finland", "France", "Germany", "Ghana",
  "Hong Kong", "India", "Indonesia", "Italy", "Japan", "Kenya", "Malaysia",
  "Mexico", "Netherlands", "Nigeria", "Norway", "Peru", "Poland", "Portugal",
  "Saudi Arabia", "Singapore", "South Africa", "South Korea", "Spain",
  "Sweden", "Switzerland", "Thailand", "Turkey", "UAE", "United Kingdom",
  "United States", "Vietnam",
];

// ─── Generate tracking ID ─────────────────────────────────────────────────────
function generateTrackingNumber() {
  const digits = Array.from({ length: 10 }, () =>
    Math.floor(Math.random() * 10)
  ).join("");
  return `NC${digits}`;
}

// ─── Today's date as YYYY-MM-DD ───────────────────────────────────────────────
function today() {
  return new Date().toISOString().split("T")[0];
}

// ─── Default form state ───────────────────────────────────────────────────────
const DEFAULT = {
  // Service & package
  service: SERVICE_TYPES[0],
  description: "",
  weight: "",
  dimensions: "",
  status: STATUS.PENDING,
  // Sender
  senderName: "",
  senderCity: "",
  senderCountry: "United States",
  // Receiver
  receiverName: "",
  receiverCity: "",
  receiverCountry: "United Kingdom",
  // Dates & location
  shippedDate: today(),
  estimatedDelivery: "",
  currentLocation: "",
};

// ─── Reusable form field wrappers ─────────────────────────────────────────────
function FieldLabel({ children, required }) {
  return (
    <label className="block text-xs font-semibold text-gray-500 dark:text-white/40 uppercase tracking-wider mb-1.5">
      {children} {required && <span className="text-amber-500">*</span>}
    </label>
  );
}

function InputField({ error, ...props }) {
  return (
    <input
      {...props}
      className={`w-full px-3.5 py-2.5 bg-gray-50 dark:bg-white/[0.04] border rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/20 text-sm focus:outline-none transition-all duration-200 ${
        error
          ? "border-red-400 focus:border-red-400 focus:ring-1 focus:ring-red-400/30"
          : "border-gray-200 dark:border-white/10 focus:border-amber-400 focus:ring-1 focus:ring-amber-400/20"
      }`}
    />
  );
}

function SelectField({ error, children, ...props }) {
  return (
    <div className="relative">
      <select
        {...props}
        className={`w-full px-3.5 py-2.5 bg-gray-50 dark:bg-white/[0.04] border rounded-xl text-gray-900 dark:text-white text-sm focus:outline-none appearance-none cursor-pointer transition-all duration-200 ${
          error
            ? "border-red-400 focus:border-red-400 focus:ring-1 focus:ring-red-400/30"
            : "border-gray-200 dark:border-white/10 focus:border-amber-400 focus:ring-1 focus:ring-amber-400/20"
        }`}
      >
        {children}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-white/30 pointer-events-none" />
    </div>
  );
}

function SectionHeader({ icon: Icon, title, subtitle }) {
  return (
    <div className="flex items-start gap-3 mb-4">
      <div className="w-8 h-8 bg-amber-50 dark:bg-amber-400/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
        <Icon className="w-4 h-4 text-amber-500" />
      </div>
      <div>
        <p className="text-sm font-bold text-gray-900 dark:text-white">{title}</p>
        {subtitle && (
          <p className="text-xs text-gray-400 dark:text-white/30 mt-0.5">{subtitle}</p>
        )}
      </div>
    </div>
  );
}

/**
 * AddShipmentModal
 * Full-screen modal form to add a new shipment with all fields.
 *
 * @param {object}   props
 * @param {boolean}  props.open        - Whether modal is visible
 * @param {Function} props.onClose     - Close handler
 * @param {Function} props.onAdd       - Called with new shipment object on success
 */
export default function AddShipmentModal({ open, onClose, onAdd }) {
  const [form, setForm]       = useState(DEFAULT);
  const [errors, setErrors]   = useState({});
  const [saving, setSaving]   = useState(false);
  const [success, setSuccess] = useState(false);

  if (!open) return null;

  // ── Field helpers ──────────────────────────────────────────────────────────
  const set = (key, val) => {
    setForm((f) => ({ ...f, [key]: val }));
    setErrors((e) => ({ ...e, [key]: "" }));
  };

  // ── Validation ─────────────────────────────────────────────────────────────
  const validate = () => {
    const e = {};
    if (!form.senderName.trim())      e.senderName      = "Required";
    if (!form.senderCity.trim())      e.senderCity      = "Required";
    if (!form.receiverName.trim())    e.receiverName    = "Required";
    if (!form.receiverCity.trim())    e.receiverCity    = "Required";
    if (!form.description.trim())     e.description     = "Required";
    if (!form.weight.trim())          e.weight          = "Required";
    if (!form.dimensions.trim())      e.dimensions      = "Required";
    if (!form.shippedDate)            e.shippedDate     = "Required";
    if (!form.estimatedDelivery)      e.estimatedDelivery = "Required";
    if (!form.currentLocation.trim()) e.currentLocation = "Required";

    // Weight format hint
    if (form.weight && !/\d/.test(form.weight)) {
      e.weight = "Must include a number (e.g. 2.4 kg)";
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // ── Submit ─────────────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSaving(true);
    await new Promise((r) => setTimeout(r, 700)); // Simulate save

    const trackingNumber = generateTrackingNumber();
    const origin      = `${form.senderCity}, ${form.senderCountry}`;
    const destination = `${form.receiverCity}, ${form.receiverCountry}`;

    // Build timeline based on chosen status
    const baseEvents = [
      {
        id: 1,
        status: "Order Received",
        description: `Shipment booked at ${origin} facility`,
        location: origin,
        date: `${form.shippedDate} 09:00 AM`,
        completed: true,
      },
    ];

    if (
      [STATUS.PROCESSING, STATUS.IN_TRANSIT, STATUS.OUT_FOR_DELIVERY,
       STATUS.DELIVERED, STATUS.DELAYED].includes(form.status)
    ) {
      baseEvents.push({
        id: 2,
        status: "Package Picked Up",
        description: "Package collected and processed at sorting hub",
        location: origin,
        date: `${form.shippedDate} 02:30 PM`,
        completed: true,
      });
    }

    if (
      [STATUS.IN_TRANSIT, STATUS.OUT_FOR_DELIVERY, STATUS.DELIVERED,
       STATUS.DELAYED].includes(form.status)
    ) {
      baseEvents.push({
        id: 3,
        status: "In Transit",
        description: "Package en route to destination",
        location: "International Hub",
        date: `${form.shippedDate} 11:00 PM`,
        completed: true,
      });
    }

    if ([STATUS.OUT_FOR_DELIVERY, STATUS.DELIVERED].includes(form.status)) {
      baseEvents.push({
        id: 4,
        status: "Out for Delivery",
        description: "Package loaded onto delivery vehicle",
        location: destination,
        date: `${form.estimatedDelivery} 08:00 AM`,
        completed: true,
      });
    }

    if (form.status === STATUS.DELIVERED) {
      baseEvents.push({
        id: 5,
        status: "Delivered",
        description: "Package successfully delivered to recipient",
        location: destination,
        date: `${form.estimatedDelivery} 01:00 PM`,
        completed: true,
      });
    }

    if (form.status === STATUS.DELAYED) {
      baseEvents.push({
        id: 4,
        status: "Delivery Delayed",
        description: "Delay encountered — rescheduled",
        location: "Regional Depot",
        date: `${form.estimatedDelivery} 03:00 PM`,
        completed: false,
        isAlert: true,
      });
    }

    const newShipment = {
      id:              `NC-USR-${Date.now()}`,
      trackingNumber,
      status:          form.status,
      service:         form.service,
      weight:          form.weight,
      dimensions:      form.dimensions,
      sender: {
        name:    form.senderName,
        city:    form.senderCity,
        country: form.senderCountry,
      },
      receiver: {
        name:    form.receiverName,
        city:    form.receiverCity,
        country: form.receiverCountry,
      },
      origin,
      destination,
      currentLocation:   form.currentLocation,
      estimatedDelivery: form.estimatedDelivery,
      actualDelivery:    form.status === STATUS.DELIVERED ? form.estimatedDelivery : null,
      shippedDate:       form.shippedDate,
      description:       form.description,
      timeline:          baseEvents,
      _userAdded: true,
    };

    setSaving(false);
    setSuccess(true);

    // Brief success flash, then close
    setTimeout(() => {
      onAdd(newShipment);
      setForm(DEFAULT);
      setErrors({});
      setSuccess(false);
      onClose();
    }, 1200);
  };

  const handleBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={handleBackdrop}
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] bg-white dark:bg-[#0D1F35] rounded-2xl shadow-2xl border border-gray-200 dark:border-white/[0.08] flex flex-col overflow-hidden animate-fade-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Header ── */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 dark:border-white/[0.06] flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-amber-50 dark:bg-amber-400/10 rounded-xl flex items-center justify-center">
              <Package className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <h2
                className="text-gray-900 dark:text-white font-black text-lg"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                ADD NEW SHIPMENT
              </h2>
              <p className="text-gray-400 dark:text-white/30 text-xs">
                Fill in all shipment details below
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-gray-400 dark:text-white/30 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ── Scrollable body ── */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
          <div className="px-6 py-6 space-y-8">

            {/* ── Service & Status ── */}
            <div>
              <SectionHeader
                icon={Truck}
                title="Service & Status"
                subtitle="Select the shipping service and current status"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <FieldLabel required>Service Type</FieldLabel>
                  <SelectField
                    value={form.service}
                    onChange={(e) => set("service", e.target.value)}
                  >
                    {SERVICE_TYPES.map((s) => (
                      <option key={s} value={s} className="bg-white dark:bg-[#0D1F35]">{s}</option>
                    ))}
                  </SelectField>
                </div>
                <div>
                  <FieldLabel required>Current Status</FieldLabel>
                  <SelectField
                    value={form.status}
                    onChange={(e) => set("status", e.target.value)}
                  >
                    {ALLOWED_STATUSES.map((s) => (
                      <option key={s} value={s} className="bg-white dark:bg-[#0D1F35]">{s}</option>
                    ))}
                  </SelectField>
                </div>
              </div>
            </div>

            {/* ── Package Details ── */}
            <div>
              <SectionHeader
                icon={Package}
                title="Package Details"
                subtitle="Describe the shipment contents and physical specs"
              />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-3">
                  <FieldLabel required>Contents / Description</FieldLabel>
                  <InputField
                    type="text"
                    value={form.description}
                    onChange={(e) => set("description", e.target.value)}
                    placeholder="e.g. Consumer Electronics, Medical Equipment…"
                    error={errors.description}
                  />
                  {errors.description && (
                    <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.description}
                    </p>
                  )}
                </div>
                <div>
                  <FieldLabel required>Weight</FieldLabel>
                  <div className="relative">
                    <Weight className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-white/25 pointer-events-none" />
                    <InputField
                      type="text"
                      value={form.weight}
                      onChange={(e) => set("weight", e.target.value)}
                      placeholder="e.g. 2.4 kg"
                      error={errors.weight}
                      className="pl-9"
                      style={{ paddingLeft: "2.25rem" }}
                    />
                  </div>
                  {errors.weight && (
                    <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.weight}
                    </p>
                  )}
                </div>
                <div className="sm:col-span-2">
                  <FieldLabel required>Dimensions (L × W × H)</FieldLabel>
                  <div className="relative">
                    <Ruler className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-white/25 pointer-events-none" />
                    <InputField
                      type="text"
                      value={form.dimensions}
                      onChange={(e) => set("dimensions", e.target.value)}
                      placeholder="e.g. 35 × 22 × 14 cm"
                      error={errors.dimensions}
                      style={{ paddingLeft: "2.25rem" }}
                    />
                  </div>
                  {errors.dimensions && (
                    <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.dimensions}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* ── Sender ── */}
            <div>
              <SectionHeader
                icon={User}
                title="Sender Details"
                subtitle="Who is sending this shipment?"
              />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-3">
                  <FieldLabel required>Sender Name / Company</FieldLabel>
                  <InputField
                    type="text"
                    value={form.senderName}
                    onChange={(e) => set("senderName", e.target.value)}
                    placeholder="e.g. Apex Electronics Ltd."
                    error={errors.senderName}
                  />
                  {errors.senderName && (
                    <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.senderName}
                    </p>
                  )}
                </div>
                <div>
                  <FieldLabel required>City</FieldLabel>
                  <InputField
                    type="text"
                    value={form.senderCity}
                    onChange={(e) => set("senderCity", e.target.value)}
                    placeholder="e.g. Shenzhen"
                    error={errors.senderCity}
                  />
                  {errors.senderCity && (
                    <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.senderCity}
                    </p>
                  )}
                </div>
                <div className="sm:col-span-2">
                  <FieldLabel>Country</FieldLabel>
                  <SelectField
                    value={form.senderCountry}
                    onChange={(e) => set("senderCountry", e.target.value)}
                  >
                    {COUNTRIES.map((c) => (
                      <option key={c} value={c} className="bg-white dark:bg-[#0D1F35]">{c}</option>
                    ))}
                  </SelectField>
                </div>
              </div>
            </div>

            {/* ── Receiver ── */}
            <div>
              <SectionHeader
                icon={MapPin}
                title="Recipient Details"
                subtitle="Who is this shipment going to?"
              />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-3">
                  <FieldLabel required>Recipient Name / Company</FieldLabel>
                  <InputField
                    type="text"
                    value={form.receiverName}
                    onChange={(e) => set("receiverName", e.target.value)}
                    placeholder="e.g. Marcus Bellamy"
                    error={errors.receiverName}
                  />
                  {errors.receiverName && (
                    <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.receiverName}
                    </p>
                  )}
                </div>
                <div>
                  <FieldLabel required>City</FieldLabel>
                  <InputField
                    type="text"
                    value={form.receiverCity}
                    onChange={(e) => set("receiverCity", e.target.value)}
                    placeholder="e.g. London"
                    error={errors.receiverCity}
                  />
                  {errors.receiverCity && (
                    <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.receiverCity}
                    </p>
                  )}
                </div>
                <div className="sm:col-span-2">
                  <FieldLabel>Country</FieldLabel>
                  <SelectField
                    value={form.receiverCountry}
                    onChange={(e) => set("receiverCountry", e.target.value)}
                  >
                    {COUNTRIES.map((c) => (
                      <option key={c} value={c} className="bg-white dark:bg-[#0D1F35]">{c}</option>
                    ))}
                  </SelectField>
                </div>
              </div>
            </div>

            {/* ── Dates & Location ── */}
            <div>
              <SectionHeader
                icon={Calendar}
                title="Dates & Current Location"
                subtitle="Shipment timeline and current whereabouts"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <FieldLabel required>Shipped Date</FieldLabel>
                  <InputField
                    type="date"
                    value={form.shippedDate}
                    onChange={(e) => set("shippedDate", e.target.value)}
                    error={errors.shippedDate}
                  />
                  {errors.shippedDate && (
                    <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.shippedDate}
                    </p>
                  )}
                </div>
                <div>
                  <FieldLabel required>Estimated Delivery Date</FieldLabel>
                  <InputField
                    type="date"
                    value={form.estimatedDelivery}
                    onChange={(e) => set("estimatedDelivery", e.target.value)}
                    error={errors.estimatedDelivery}
                    min={form.shippedDate || today()}
                  />
                  {errors.estimatedDelivery && (
                    <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.estimatedDelivery}
                    </p>
                  )}
                </div>
                <div className="sm:col-span-2">
                  <FieldLabel required>Current Location</FieldLabel>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-white/25 pointer-events-none" />
                    <InputField
                      type="text"
                      value={form.currentLocation}
                      onChange={(e) => set("currentLocation", e.target.value)}
                      placeholder="e.g. Singapore International Hub"
                      error={errors.currentLocation}
                      style={{ paddingLeft: "2.25rem" }}
                    />
                  </div>
                  {errors.currentLocation && (
                    <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.currentLocation}
                    </p>
                  )}
                </div>
              </div>
            </div>

          </div>

          {/* ── Footer / Actions ── */}
          <div className="px-6 py-4 border-t border-gray-100 dark:border-white/[0.06] flex items-center justify-between gap-4 flex-shrink-0 bg-gray-50 dark:bg-white/[0.02]">
            <p className="text-xs text-gray-400 dark:text-white/25">
              A tracking number will be auto-generated.
            </p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                disabled={saving}
                className="px-5 py-2.5 border border-gray-200 dark:border-white/10 text-gray-600 dark:text-white/50 hover:bg-gray-100 dark:hover:bg-white/5 font-medium text-sm rounded-xl transition-colors disabled:opacity-40"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving || success}
                className={`flex items-center gap-2 px-6 py-2.5 font-bold text-sm rounded-xl transition-all duration-200 ${
                  success
                    ? "bg-green-500 text-white"
                    : "bg-amber-500 hover:bg-amber-400 text-[#060E1A] hover:shadow-glow hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
                }`}
              >
                {saving ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Saving…</>
                ) : success ? (
                  <><CheckCircle2 className="w-4 h-4" /> Shipment Added!</>
                ) : (
                  <><Package className="w-4 h-4" /> Add Shipment</>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
