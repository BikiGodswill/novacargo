"use client";

import { useState } from "react";
import { insertShipment, CITY_COORDS, STATUS, SERVICE_TYPES } from "@/lib/db";
import {
  X, Package, User, MapPin, Calendar, Weight, Ruler,
  Truck, ChevronDown, CheckCircle2, AlertCircle, Loader2,
} from "lucide-react";

const ALLOWED_STATUSES = Object.values(STATUS);

const COUNTRIES = [
  "Australia","Austria","Belgium","Brazil","Canada","China","Colombia",
  "Denmark","Egypt","Estonia","Finland","France","Germany","Ghana",
  "Hong Kong","India","Indonesia","Italy","Japan","Kenya","Malaysia",
  "Mexico","Netherlands","Nigeria","Norway","Peru","Poland","Portugal",
  "Saudi Arabia","Singapore","South Africa","South Korea","Spain",
  "Sweden","Switzerland","Thailand","Turkey","UAE","United Kingdom",
  "United States","Vietnam",
];

const CITIES = Object.keys(CITY_COORDS).filter(c => c !== "Default").sort();

function today() { return new Date().toISOString().split("T")[0]; }

const DEFAULT = {
  service:"Express Delivery", description:"", weight:"", dimensions:"",
  status:"Pending",
  senderName:"", senderCity:"Amsterdam", senderCountry:"Netherlands",
  receiverName:"", receiverCity:"London", receiverCountry:"United Kingdom",
  shippedDate:today(), estimatedDelivery:"", currentLocation:"",
};

function FieldLabel({ children, required }) {
  return (
    <label className="block text-xs font-semibold text-gray-500 dark:text-white/40 uppercase tracking-wider mb-1.5">
      {children} {required && <span className="text-amber-500">*</span>}
    </label>
  );
}

function InputField({ error, className="", ...props }) {
  return (
    <input {...props}
      className={`w-full px-3.5 py-2.5 bg-gray-50 dark:bg-white/[0.04] border rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/20 text-sm focus:outline-none transition-all duration-200 ${
        error ? "border-red-400 focus:border-red-400 focus:ring-1 focus:ring-red-400/30"
              : "border-gray-200 dark:border-white/10 focus:border-amber-400 focus:ring-1 focus:ring-amber-400/20"
      } ${className}`}
    />
  );
}

function SelectField({ error, children, ...props }) {
  return (
    <div className="relative">
      <select {...props}
        className={`w-full px-3.5 py-2.5 bg-gray-50 dark:bg-white/[0.04] border rounded-xl text-gray-900 dark:text-white text-sm focus:outline-none appearance-none cursor-pointer transition-all duration-200 ${
          error ? "border-red-400 focus:border-red-400 focus:ring-1 focus:ring-red-400/30"
                : "border-gray-200 dark:border-white/10 focus:border-amber-400 focus:ring-1 focus:ring-amber-400/20"
        }`}
      >{children}</select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-white/30 pointer-events-none"/>
    </div>
  );
}

function SectionHeader({ icon: Icon, title, subtitle }) {
  return (
    <div className="flex items-start gap-3 mb-4">
      <div className="w-8 h-8 bg-amber-50 dark:bg-amber-400/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
        <Icon className="w-4 h-4 text-amber-500"/>
      </div>
      <div>
        <p className="text-sm font-bold text-gray-900 dark:text-white">{title}</p>
        {subtitle && <p className="text-xs text-gray-400 dark:text-white/30 mt-0.5">{subtitle}</p>}
      </div>
    </div>
  );
}

function FieldError({ msg }) {
  if (!msg) return null;
  return (
    <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
      <AlertCircle className="w-3 h-3"/> {msg}
    </p>
  );
}

/**
 * AddShipmentModal
 * Saves to Supabase via insertShipment().
 * On success: calls onAdd(trackingNumber) so dashboard can refresh.
 */
export default function AddShipmentModal({ open, onClose, onAdd }) {
  const [form,    setForm]    = useState(DEFAULT);
  const [errors,  setErrors]  = useState({});
  const [saving,  setSaving]  = useState(false);
  const [success, setSuccess] = useState(false);
  const [dbError, setDbError] = useState("");

  if (!open) return null;

  const set = (key, val) => {
    setForm(f => ({ ...f, [key]: val }));
    setErrors(e => ({ ...e, [key]: "" }));
    setDbError("");
  };

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
    if (form.weight && !/\d/.test(form.weight)) e.weight = "Must include a number (e.g. 2.4 kg)";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSaving(true);
    setDbError("");

    const result = await insertShipment(form);

    if (!result.success) {
      setDbError(result.error || "Failed to save shipment. Check your Supabase connection.");
      setSaving(false);
      return;
    }

    setSaving(false);
    setSuccess(true);

    setTimeout(() => {
      onAdd(result.trackingNumber);
      setForm(DEFAULT);
      setErrors({});
      setSuccess(false);
      onClose();
    }, 1400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-white dark:bg-[#0D1F35] rounded-2xl shadow-2xl border border-gray-200 dark:border-white/[0.08] flex flex-col overflow-hidden animate-fade-up"
        onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 dark:border-white/[0.06] flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-amber-50 dark:bg-amber-400/10 rounded-xl flex items-center justify-center">
              <Package className="w-5 h-5 text-amber-500"/>
            </div>
            <div>
              <h2 className="text-gray-900 dark:text-white font-black text-lg" style={{fontFamily:"'Barlow Condensed',sans-serif"}}>
                ADD NEW SHIPMENT
              </h2>
              <p className="text-gray-400 dark:text-white/30 text-xs">Saved directly to Supabase</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg text-gray-400 dark:text-white/30 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">
            <X className="w-5 h-5"/>
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
          <div className="px-6 py-6 space-y-8">

            {/* DB error */}
            {dbError && (
              <div className="flex items-start gap-3 px-4 py-3 bg-red-50 dark:bg-red-400/10 border border-red-200 dark:border-red-400/20 rounded-xl">
                <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0"/>
                <div>
                  <p className="text-red-700 dark:text-red-400 text-sm font-semibold">Database error</p>
                  <p className="text-red-600/80 dark:text-red-400/70 text-xs mt-0.5">{dbError}</p>
                  <p className="text-red-500/60 text-xs mt-1">Ensure your Supabase .env.local is configured and queries.sql has been run.</p>
                </div>
              </div>
            )}

            {/* Service & Status */}
            <div>
              <SectionHeader icon={Truck} title="Service & Status" subtitle="Select shipping service and current status"/>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <FieldLabel required>Service Type</FieldLabel>
                  <SelectField value={form.service} onChange={e=>set("service",e.target.value)}>
                    {SERVICE_TYPES.map(s=><option key={s} value={s} className="bg-white dark:bg-[#0D1F35]">{s}</option>)}
                  </SelectField>
                </div>
                <div>
                  <FieldLabel required>Current Status</FieldLabel>
                  <SelectField value={form.status} onChange={e=>set("status",e.target.value)}>
                    {ALLOWED_STATUSES.map(s=><option key={s} value={s} className="bg-white dark:bg-[#0D1F35]">{s}</option>)}
                  </SelectField>
                </div>
              </div>
            </div>

            {/* Package */}
            <div>
              <SectionHeader icon={Package} title="Package Details" subtitle="Describe the shipment contents and physical specs"/>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-3">
                  <FieldLabel required>Contents / Description</FieldLabel>
                  <InputField type="text" value={form.description} onChange={e=>set("description",e.target.value)}
                    placeholder="e.g. Consumer Electronics, Medical Equipment…" error={errors.description}/>
                  <FieldError msg={errors.description}/>
                </div>
                <div>
                  <FieldLabel required>Weight</FieldLabel>
                  <div className="relative">
                    <Weight className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-white/25 pointer-events-none"/>
                    <InputField type="text" value={form.weight} onChange={e=>set("weight",e.target.value)}
                      placeholder="e.g. 2.4 kg" error={errors.weight} className="pl-9"/>
                  </div>
                  <FieldError msg={errors.weight}/>
                </div>
                <div className="sm:col-span-2">
                  <FieldLabel required>Dimensions (L × W × H)</FieldLabel>
                  <div className="relative">
                    <Ruler className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-white/25 pointer-events-none"/>
                    <InputField type="text" value={form.dimensions} onChange={e=>set("dimensions",e.target.value)}
                      placeholder="e.g. 35 × 22 × 14 cm" error={errors.dimensions} className="pl-9"/>
                  </div>
                  <FieldError msg={errors.dimensions}/>
                </div>
              </div>
            </div>

            {/* Sender */}
            <div>
              <SectionHeader icon={User} title="Sender Details" subtitle="Who is sending this shipment?"/>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-3">
                  <FieldLabel required>Sender Name / Company</FieldLabel>
                  <InputField type="text" value={form.senderName} onChange={e=>set("senderName",e.target.value)}
                    placeholder="e.g. Apex Electronics Ltd." error={errors.senderName}/>
                  <FieldError msg={errors.senderName}/>
                </div>
                <div>
                  <FieldLabel required>City</FieldLabel>
                  <SelectField value={form.senderCity} onChange={e=>set("senderCity",e.target.value)} error={errors.senderCity}>
                    {CITIES.map(c=><option key={c} value={c} className="bg-white dark:bg-[#0D1F35]">{c}</option>)}
                  </SelectField>
                  <FieldError msg={errors.senderCity}/>
                </div>
                <div className="sm:col-span-2">
                  <FieldLabel>Country</FieldLabel>
                  <SelectField value={form.senderCountry} onChange={e=>set("senderCountry",e.target.value)}>
                    {COUNTRIES.map(c=><option key={c} value={c} className="bg-white dark:bg-[#0D1F35]">{c}</option>)}
                  </SelectField>
                </div>
              </div>
            </div>

            {/* Receiver */}
            <div>
              <SectionHeader icon={MapPin} title="Recipient Details" subtitle="Who is this shipment going to?"/>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-3">
                  <FieldLabel required>Recipient Name / Company</FieldLabel>
                  <InputField type="text" value={form.receiverName} onChange={e=>set("receiverName",e.target.value)}
                    placeholder="e.g. Marcus Bellamy" error={errors.receiverName}/>
                  <FieldError msg={errors.receiverName}/>
                </div>
                <div>
                  <FieldLabel required>City</FieldLabel>
                  <SelectField value={form.receiverCity} onChange={e=>set("receiverCity",e.target.value)} error={errors.receiverCity}>
                    {CITIES.map(c=><option key={c} value={c} className="bg-white dark:bg-[#0D1F35]">{c}</option>)}
                  </SelectField>
                  <FieldError msg={errors.receiverCity}/>
                </div>
                <div className="sm:col-span-2">
                  <FieldLabel>Country</FieldLabel>
                  <SelectField value={form.receiverCountry} onChange={e=>set("receiverCountry",e.target.value)}>
                    {COUNTRIES.map(c=><option key={c} value={c} className="bg-white dark:bg-[#0D1F35]">{c}</option>)}
                  </SelectField>
                </div>
              </div>
            </div>

            {/* Dates & Location */}
            <div>
              <SectionHeader icon={Calendar} title="Dates & Current Location" subtitle="Shipment timeline and current whereabouts"/>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <FieldLabel required>Shipped Date</FieldLabel>
                  <InputField type="date" value={form.shippedDate} onChange={e=>set("shippedDate",e.target.value)} error={errors.shippedDate}/>
                  <FieldError msg={errors.shippedDate}/>
                </div>
                <div>
                  <FieldLabel required>Estimated Delivery Date</FieldLabel>
                  <InputField type="date" value={form.estimatedDelivery} onChange={e=>set("estimatedDelivery",e.target.value)}
                    error={errors.estimatedDelivery} min={form.shippedDate || today()}/>
                  <FieldError msg={errors.estimatedDelivery}/>
                </div>
                <div className="sm:col-span-2">
                  <FieldLabel required>Current Location</FieldLabel>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-white/25 pointer-events-none"/>
                    <InputField type="text" value={form.currentLocation} onChange={e=>set("currentLocation",e.target.value)}
                      placeholder="e.g. Singapore International Hub" error={errors.currentLocation} className="pl-9"/>
                  </div>
                  <FieldError msg={errors.currentLocation}/>
                </div>
              </div>
            </div>

          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-gray-100 dark:border-white/[0.06] flex items-center justify-between gap-4 flex-shrink-0 bg-gray-50 dark:bg-white/[0.02]">
            <p className="text-xs text-gray-400 dark:text-white/25">
              Tracking number auto-generated · Data saved to Supabase
            </p>
            <div className="flex items-center gap-3">
              <button type="button" onClick={onClose} disabled={saving}
                className="px-5 py-2.5 border border-gray-200 dark:border-white/10 text-gray-600 dark:text-white/50 hover:bg-gray-100 dark:hover:bg-white/5 font-medium text-sm rounded-xl transition-colors disabled:opacity-40">
                Cancel
              </button>
              <button type="submit" disabled={saving || success}
                className={`flex items-center gap-2 px-6 py-2.5 font-bold text-sm rounded-xl transition-all duration-200 ${
                  success ? "bg-green-500 text-white"
                          : "bg-amber-500 hover:bg-amber-400 text-[#060E1A] hover:shadow-glow hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
                }`}>
                {saving  ? <><Loader2 className="w-4 h-4 animate-spin"/> Saving to Supabase…</>
                : success ? <><CheckCircle2 className="w-4 h-4"/> Shipment Added!</>
                :           <><Package className="w-4 h-4"/> Add Shipment</>}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
