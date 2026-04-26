"use client";

export const dynamic = "force-dynamic";

import { useState, useMemo, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StatsCard from "@/components/StatsCard";
import { StatusBadge } from "@/components/ShipmentCard";
import AddShipmentModal from "@/components/AddShipmentModal";
import { getAllShipments, getStats, STATUS } from "@/lib/db";
import { getSession, logout } from "@/lib/auth";
import {
  Package,
  Truck,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Search,
  Filter,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  Download,
  MapPin,
  Calendar,
  LayoutGrid,
  LayoutList,
  X,
  Plus,
  LogOut,
  User,
  Shield,
  Sparkles,
  RefreshCw,
} from "lucide-react";

const ITEMS_PER_PAGE = 10;
const SORT_FIELDS = {
  trackingNumber: "Tracking ID",
  status: "Status",
  service: "Service",
  shippedDate: "Ship Date",
  estimatedDelivery: "Est. Delivery",
};
const STATUS_FILTERS = ["All", ...Object.values(STATUS)];

function SortIcon({ field, sortField, sortDir }) {
  if (sortField !== field)
    return <ChevronDown className="w-3 h-3 text-gray-300 dark:text-white/20" />;
  return sortDir === "asc" ? (
    <ChevronUp className="w-3 h-3 text-amber-500" />
  ) : (
    <ChevronDown className="w-3 h-3 text-amber-500" />
  );
}

export default function DashboardPage() {
  const router = useRouter();

  // ── Auth ───────────────────────────────────────────────────────────────────
  const [authed, setAuthed] = useState(false);
  const [session, setSession] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const s = getSession();
    if (!s) {
      router.replace("/dashboard/login");
    } else {
      setSession(s);
      setAuthed(true);
      setChecking(false);
    }
  }, [router]);

  const handleLogout = () => {
    logout();
    router.push("/dashboard/login");
  };

  // ── Data from Supabase ─────────────────────────────────────────────────────
  const [allShipments, setAllShipments] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    delivered: 0,
    inTransit: 0,
    pending: 0,
    delayed: 0,
  });
  const [loadingData, setLoadingData] = useState(true);
  const [dataError, setDataError] = useState("");

  const fetchData = useCallback(async () => {
    setLoadingData(true);
    setDataError("");
    try {
      const [ships, st] = await Promise.all([getAllShipments(), getStats()]);
      setAllShipments(ships);
      setStats(st);
    } catch (err) {
      setDataError(
        "Could not connect to Supabase. Check your .env.local configuration.",
      );
      console.error(err);
    }
    setLoadingData(false);
  }, []);

  useEffect(() => {
    if (authed) fetchData();
  }, [authed, fetchData]);

  // ── Modal ──────────────────────────────────────────────────────────────────
  const [modalOpen, setModalOpen] = useState(false);

  const handleAddShipment = useCallback(
    async (trackingNumber) => {
      // Refresh data from Supabase to include newly added shipment
      await fetchData();
      // Optionally navigate to the new shipment
      // router.push(`/track?id=${trackingNumber}`);
    },
    [fetchData],
  );

  // ── Filters ────────────────────────────────────────────────────────────────
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [serviceFilter, setServiceFilter] = useState("All");
  const [sortField, setSortField] = useState("shippedDate");
  const [sortDir, setSortDir] = useState("desc");
  const [page, setPage] = useState(1);
  const [viewMode, setViewMode] = useState("table");

  const services = useMemo(
    () => [
      "All",
      ...new Set(allShipments.map((s) => s.service).filter(Boolean)),
    ],
    [allShipments],
  );

  const filtered = useMemo(() => {
    let r = [...allShipments];
    if (search.trim()) {
      const q = search.toLowerCase();
      r = r.filter(
        (s) =>
          (s.trackingNumber || "").toLowerCase().includes(q) ||
          (s.sender?.name || "").toLowerCase().includes(q) ||
          (s.receiver?.name || "").toLowerCase().includes(q) ||
          (s.origin || "").toLowerCase().includes(q) ||
          (s.destination || "").toLowerCase().includes(q) ||
          (s.status || "").toLowerCase().includes(q) ||
          (s.description || "").toLowerCase().includes(q),
      );
    }
    if (statusFilter !== "All") r = r.filter((s) => s.status === statusFilter);
    if (serviceFilter !== "All")
      r = r.filter((s) => s.service === serviceFilter);
    r.sort((a, b) => {
      const av = (a[sortField] || "").toLowerCase();
      const bv = (b[sortField] || "").toLowerCase();
      if (av < bv) return sortDir === "asc" ? -1 : 1;
      if (av > bv) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
    return r;
  }, [allShipments, search, statusFilter, serviceFilter, sortField, sortDir]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  const handleSort = (f) => {
    if (sortField === f) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortField(f);
      setSortDir("asc");
    }
    setPage(1);
  };
  const handleSearch = (v) => {
    setSearch(v);
    setPage(1);
  };
  const handleStatusFilter = (v) => {
    setStatusFilter(v);
    setPage(1);
  };
  const handleServiceFilter = (v) => {
    setServiceFilter(v);
    setPage(1);
  };
  const clearFilters = () => {
    setSearch("");
    setStatusFilter("All");
    setServiceFilter("All");
    setPage(1);
  };
  const hasActiveFilters =
    search || statusFilter !== "All" || serviceFilter !== "All";

  // ── Stats cards ─────────────────────────────────────────────────────────────
  const statsConfig = [
    {
      icon: Package,
      label: "Total Shipments",
      value: stats.total,
      trend: "+8.2%",
      trendUp: true,
      accent: "bg-blue-50 dark:bg-blue-400/10",
      iconColor: "text-blue-600 dark:text-blue-400",
    },
    {
      icon: CheckCircle2,
      label: "Delivered",
      value: stats.delivered,
      trend: "+12%",
      trendUp: true,
      accent: "bg-green-50 dark:bg-green-400/10",
      iconColor: "text-green-600 dark:text-green-400",
    },
    {
      icon: Truck,
      label: "In Transit",
      value: stats.inTransit,
      trend: "+3%",
      trendUp: true,
      accent: "bg-amber-50 dark:bg-amber-400/10",
      iconColor: "text-amber-600 dark:text-amber-400",
    },
    {
      icon: Clock,
      label: "Pending / Processing",
      value: stats.pending,
      trend: "-5%",
      trendUp: false,
      accent: "bg-slate-50 dark:bg-slate-400/10",
      iconColor: "text-slate-600 dark:text-slate-400",
    },
    {
      icon: AlertTriangle,
      label: "Delayed",
      value: stats.delayed,
      trend: "-2%",
      trendUp: false,
      accent: "bg-red-50 dark:bg-red-400/10",
      iconColor: "text-red-600 dark:text-red-400",
    },
  ];

  // ── CSV export ──────────────────────────────────────────────────────────────
  const handleExport = () => {
    const headers = [
      "Tracking Number",
      "Status",
      "Service",
      "Origin",
      "Destination",
      "Sender",
      "Receiver",
      "Shipped",
      "Est. Delivery",
      "Current Location",
    ];
    const rows = allShipments.map((s) => [
      s.trackingNumber,
      s.status,
      s.service,
      s.origin,
      s.destination,
      `${s.sender?.name || ""} (${s.sender?.city || ""})`,
      `${s.receiver?.name || ""} (${s.receiver?.city || ""})`,
      s.shippedDate,
      s.estimatedDelivery,
      s.currentLocation,
    ]);
    const csv = [headers, ...rows]
      .map((r) => r.map((c) => `"${c || ""}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = Object.assign(document.createElement("a"), {
      href: url,
      download: "novacargo-shipments.csv",
    });
    a.click();
    URL.revokeObjectURL(url);
  };

  // ── Auth guard ─────────────────────────────────────────────────────────────
  if (checking || !authed) {
    return (
      <div className="min-h-screen bg-[#060E1A] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-2 border-amber-500/30 border-t-amber-500 rounded-full animate-spin" />
          <p className="text-white/30 text-sm">Verifying session…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#060E1A]">
      <Navbar />

      {/* ── Header ── */}
      <div className="bg-[#060E1A] pt-24 pb-10 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div>
              <p className="text-amber-400/60 text-xs uppercase tracking-widest font-medium mb-2 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5" /> Admin Panel · Supabase
                Connected
              </p>
              <h1
                className="text-white font-black text-4xl sm:text-5xl"
                style={{ fontFamily: "'Barlow Condensed',sans-serif" }}
              >
                SHIPMENT DASHBOARD
              </h1>
              <p className="text-white/40 text-sm mt-1">
                {loadingData
                  ? "Loading from Supabase…"
                  : `${stats.total} shipments · ${stats.delivered} delivered`}
              </p>
            </div>
            <div className="flex flex-col items-start sm:items-end gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white/[0.04] border border-white/[0.08] rounded-xl">
                <div className="w-6 h-6 rounded-full bg-amber-500/20 border border-amber-400/30 flex items-center justify-center">
                  <User className="w-3.5 h-3.5 text-amber-400" />
                </div>
                <span className="text-white/50 text-xs">{session?.email}</span>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={fetchData}
                  disabled={loadingData}
                  className="flex items-center gap-1.5 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white text-sm rounded-lg transition-all disabled:opacity-40"
                >
                  <RefreshCw
                    className={`w-4 h-4 ${loadingData ? "animate-spin" : ""}`}
                  />{" "}
                  Refresh
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 px-4 py-2 bg-white/5 hover:bg-red-500/10 border border-white/10 hover:border-red-500/30 text-white/50 hover:text-red-400 text-sm rounded-lg transition-all"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
                <button
                  onClick={handleExport}
                  disabled={!allShipments.length}
                  className="flex items-center gap-1.5 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white text-sm rounded-lg transition-colors disabled:opacity-40"
                >
                  <Download className="w-4 h-4" /> Export CSV
                </button>
                <button
                  onClick={() => setModalOpen(true)}
                  className="flex items-center gap-1.5 px-5 py-2 bg-amber-500 hover:bg-amber-400 text-[#060E1A] font-bold text-sm rounded-lg transition-all hover:shadow-glow hover:-translate-y-0.5"
                >
                  <Plus className="w-4 h-4" /> Add Shipment
                </button>
              </div>
            </div>
          </div>

          {/* Supabase error banner */}
          {dataError && (
            <div className="mt-5 flex items-start gap-3 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl">
              <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-red-400 text-sm font-semibold">
                  Supabase connection error
                </p>
                <p className="text-red-400/70 text-xs mt-0.5">{dataError}</p>
                <p className="text-red-400/50 text-xs mt-1">
                  Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
                  in .env.local, then run queries.sql in your Supabase SQL
                  Editor.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {statsConfig.map((s) => (
            <StatsCard key={s.label} {...s} />
          ))}
        </div>

        {/* Loading state */}
        {loadingData && (
          <div className="bg-white dark:bg-[#0D1F35] rounded-2xl border border-gray-100 dark:border-white/[0.06] shadow-card p-12 text-center">
            <div className="w-10 h-10 border-2 border-amber-500/30 border-t-amber-500 rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-400 dark:text-white/30 text-sm">
              Loading shipments from Supabase…
            </p>
          </div>
        )}

        {!loadingData && (
          <>
            {/* Filters */}
            <div className="bg-white dark:bg-[#0D1F35] rounded-2xl border border-gray-100 dark:border-white/[0.06] shadow-card p-5">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-white/30" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => handleSearch(e.target.value)}
                    placeholder="Search tracking ID, sender, receiver, route…"
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/25 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
                  />
                  {search && (
                    <button
                      onClick={() => handleSearch("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-white/30 pointer-events-none" />
                  <select
                    value={statusFilter}
                    onChange={(e) => handleStatusFilter(e.target.value)}
                    className="pl-9 pr-8 py-2.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent appearance-none cursor-pointer"
                  >
                    {STATUS_FILTERS.map((s) => (
                      <option
                        key={s}
                        value={s}
                        className="bg-white dark:bg-[#0D1F35]"
                      >
                        {s === "All" ? "All Statuses" : s}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="relative">
                  <select
                    value={serviceFilter}
                    onChange={(e) => handleServiceFilter(e.target.value)}
                    className="px-4 py-2.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent appearance-none cursor-pointer"
                  >
                    {services.map((s) => (
                      <option
                        key={s}
                        value={s}
                        className="bg-white dark:bg-[#0D1F35]"
                      >
                        {s === "All" ? "All Services" : s}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center gap-1 bg-gray-100 dark:bg-white/5 rounded-xl p-1">
                  <button
                    onClick={() => setViewMode("table")}
                    className={`p-2 rounded-lg transition-colors ${viewMode === "table" ? "bg-white dark:bg-white/10 shadow text-gray-900 dark:text-white" : "text-gray-400 dark:text-white/30 hover:text-gray-600"}`}
                  >
                    <LayoutList className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-lg transition-colors ${viewMode === "grid" ? "bg-white dark:bg-white/10 shadow text-gray-900 dark:text-white" : "text-gray-400 dark:text-white/30 hover:text-gray-600"}`}
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                </div>
              </div>
              {hasActiveFilters && (
                <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-gray-100 dark:border-white/5">
                  <span className="text-xs text-gray-400 dark:text-white/30">
                    Filters:
                  </span>
                  {search && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 dark:bg-amber-400/10 text-amber-700 dark:text-amber-400 text-xs rounded-full">
                      &ldquo;{search}&rdquo;{" "}
                      <button onClick={() => handleSearch("")}>
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                  {statusFilter !== "All" && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 dark:bg-blue-400/10 text-blue-700 dark:text-blue-400 text-xs rounded-full">
                      {statusFilter}{" "}
                      <button onClick={() => handleStatusFilter("All")}>
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                  {serviceFilter !== "All" && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-purple-50 dark:bg-purple-400/10 text-purple-700 dark:text-purple-400 text-xs rounded-full">
                      {serviceFilter}{" "}
                      <button onClick={() => handleServiceFilter("All")}>
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                  <button
                    onClick={clearFilters}
                    className="text-xs text-gray-400 dark:text-white/30 hover:text-red-500 transition-colors"
                  >
                    Clear all
                  </button>
                  <span className="ml-auto text-xs text-gray-400 dark:text-white/30">
                    {filtered.length} of {allShipments.length} shipments
                  </span>
                </div>
              )}
            </div>

            {/* TABLE */}
            {viewMode === "table" && (
              <div className="bg-white dark:bg-[#0D1F35] rounded-2xl border border-gray-100 dark:border-white/[0.06] shadow-card overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-100 dark:border-white/[0.06]">
                        {Object.entries(SORT_FIELDS).map(([field, label]) => (
                          <th
                            key={field}
                            onClick={() => handleSort(field)}
                            className="text-left px-4 py-3.5 text-xs font-semibold text-gray-400 dark:text-white/30 uppercase tracking-wider cursor-pointer hover:text-gray-700 dark:hover:text-white/70 select-none whitespace-nowrap"
                          >
                            <div className="flex items-center gap-1">
                              {label}
                              <SortIcon
                                field={field}
                                sortField={sortField}
                                sortDir={sortDir}
                              />
                            </div>
                          </th>
                        ))}
                        <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-400 dark:text-white/30 uppercase tracking-wider">
                          Route
                        </th>
                        <th className="text-right px-4 py-3.5 text-xs font-semibold text-gray-400 dark:text-white/30 uppercase tracking-wider">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 dark:divide-white/[0.03]">
                      {paginated.length === 0 ? (
                        <tr>
                          <td
                            colSpan={7}
                            className="text-center py-16 text-gray-400 dark:text-white/30"
                          >
                            <Package className="w-10 h-10 mx-auto mb-3 opacity-30" />
                            <p className="text-sm">
                              No shipments match your filters.
                            </p>
                          </td>
                        </tr>
                      ) : (
                        paginated.map((s) => (
                          <tr
                            key={s.id}
                            className="group hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors"
                          >
                            <td className="px-4 py-3.5">
                              <span className="font-mono text-xs font-semibold text-gray-900 dark:text-white">
                                {s.trackingNumber}
                              </span>
                              <p className="text-xs text-gray-400 dark:text-white/25 mt-0.5">
                                {s.description}
                              </p>
                            </td>
                            <td className="px-4 py-3.5">
                              <StatusBadge status={s.status} />
                            </td>
                            <td className="px-4 py-3.5">
                              <span className="text-xs text-gray-600 dark:text-white/50 whitespace-nowrap">
                                {s.service}
                              </span>
                            </td>
                            <td className="px-4 py-3.5">
                              <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-white/40 whitespace-nowrap">
                                <Calendar className="w-3.5 h-3.5" />
                                {s.shippedDate}
                              </div>
                            </td>
                            <td className="px-4 py-3.5">
                              <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-white/40 whitespace-nowrap">
                                <Clock className="w-3.5 h-3.5" />
                                {s.estimatedDelivery}
                              </div>
                            </td>
                            <td className="px-4 py-3.5 max-w-[180px]">
                              <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-white/50">
                                <MapPin className="w-3 h-3 text-green-500 flex-shrink-0" />
                                <span className="truncate">{s.origin}</span>
                              </div>
                              <div className="flex items-center gap-1 mt-0.5 text-xs text-gray-600 dark:text-white/50">
                                <MapPin className="w-3 h-3 text-amber-500 flex-shrink-0" />
                                <span className="truncate">
                                  {s.destination}
                                </span>
                              </div>
                            </td>
                            <td className="px-4 py-3.5 text-right">
                              <a
                                href={`/track?id=${s.trackingNumber}`}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 dark:bg-amber-400/10 hover:bg-amber-100 dark:hover:bg-amber-400/20 text-amber-700 dark:text-amber-400 text-xs font-medium rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                              >
                                <Eye className="w-3.5 h-3.5" /> View
                              </a>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                {totalPages > 1 && (
                  <div className="px-5 py-4 border-t border-gray-100 dark:border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-gray-400 dark:text-white/30">
                      Showing {(page - 1) * ITEMS_PER_PAGE + 1}–
                      {Math.min(page * ITEMS_PER_PAGE, filtered.length)} of{" "}
                      {filtered.length}
                    </p>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className="p-2 rounded-lg text-gray-400 dark:text-white/30 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      {[...Array(totalPages)].map((_, i) => {
                        const n = i + 1;
                        if (
                          n !== 1 &&
                          n !== totalPages &&
                          Math.abs(n - page) > 1
                        ) {
                          if (n === 2 || n === totalPages - 1)
                            return (
                              <span
                                key={n}
                                className="px-2 text-gray-300 dark:text-white/20 text-xs"
                              >
                                …
                              </span>
                            );
                          return null;
                        }
                        return (
                          <button
                            key={n}
                            onClick={() => setPage(n)}
                            className={`w-8 h-8 rounded-lg text-xs font-medium transition-colors ${n === page ? "bg-amber-500 text-[#060E1A] font-bold" : "text-gray-500 dark:text-white/40 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white"}`}
                          >
                            {n}
                          </button>
                        );
                      })}
                      <button
                        onClick={() =>
                          setPage((p) => Math.min(totalPages, p + 1))
                        }
                        disabled={page === totalPages}
                        className="p-2 rounded-lg text-gray-400 dark:text-white/30 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* GRID */}
            {viewMode === "grid" && (
              <div>
                {paginated.length === 0 ? (
                  <div className="text-center py-16 bg-white dark:bg-[#0D1F35] rounded-2xl border border-gray-100 dark:border-white/5">
                    <Package className="w-10 h-10 mx-auto mb-3 text-gray-300 dark:text-white/20" />
                    <p className="text-sm text-gray-400 dark:text-white/30">
                      No shipments match.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {paginated.map((s) => (
                        <a
                          key={s.id}
                          href={`/track?id=${s.trackingNumber}`}
                          className="block bg-white dark:bg-[#0D1F35] rounded-2xl p-5 border border-gray-100 dark:border-white/5 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-0.5 group"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <p className="font-mono text-sm font-bold text-gray-900 dark:text-white">
                                {s.trackingNumber}
                              </p>
                              <p className="text-xs text-gray-400 dark:text-white/30 mt-0.5">
                                {s.service}
                              </p>
                            </div>
                            <StatusBadge status={s.status} />
                          </div>
                          <div className="space-y-1.5 mb-3">
                            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-white/40">
                              <MapPin className="w-3 h-3 text-green-500" />
                              {s.origin}
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-white/40">
                              <MapPin className="w-3 h-3 text-amber-500" />
                              {s.destination}
                            </div>
                          </div>
                          <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-white/5">
                            <div className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-white/25">
                              <Calendar className="w-3 h-3" />
                              {s.estimatedDelivery}
                            </div>
                            <span className="text-xs text-amber-500 dark:text-amber-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5">
                              View <Eye className="w-3 h-3" />
                            </span>
                          </div>
                        </a>
                      ))}
                    </div>
                    {totalPages > 1 && (
                      <div className="mt-6 flex items-center justify-center gap-2">
                        <button
                          onClick={() => setPage((p) => Math.max(1, p - 1))}
                          disabled={page === 1}
                          className="flex items-center gap-1.5 px-4 py-2 bg-white dark:bg-[#0D1F35] border border-gray-200 dark:border-white/10 rounded-xl text-sm text-gray-600 dark:text-white/50 hover:border-amber-300 dark:hover:border-amber-400/40 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        >
                          <ChevronLeft className="w-4 h-4" /> Previous
                        </button>
                        <span className="text-sm text-gray-400 dark:text-white/30">
                          Page {page} of {totalPages}
                        </span>
                        <button
                          onClick={() =>
                            setPage((p) => Math.min(totalPages, p + 1))
                          }
                          disabled={page === totalPages}
                          className="flex items-center gap-1.5 px-4 py-2 bg-white dark:bg-[#0D1F35] border border-gray-200 dark:border-white/10 rounded-xl text-sm text-gray-600 dark:text-white/50 hover:border-amber-300 dark:hover:border-amber-400/40 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        >
                          Next <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </>
        )}
      </div>

      <Footer />
      <AddShipmentModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onAdd={handleAddShipment}
      />
    </div>
  );
}
