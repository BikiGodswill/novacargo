/**
 * NovaCargo — Database Query Layer
 * All shipment data is fetched from / written to Supabase.
 * Falls back to empty arrays if Supabase is not configured.
 */

import { supabase } from "./supabase";

// ─── Column map: DB snake_case → JS camelCase ─────────────────────────────────
function mapShipment(row) {
  if (!row) return null;
  return {
    id: row.id,
    trackingNumber: row.tracking_number,
    status: row.status,
    service: row.service,
    weight: row.weight,
    dimensions: row.dimensions,
    description: row.description,
    sender: {
      name: row.sender_name,
      city: row.sender_city,
      country: row.sender_country,
    },
    receiver: {
      name: row.receiver_name,
      city: row.receiver_city,
      country: row.receiver_country,
    },
    origin: row.origin,
    destination: row.destination,
    currentLocation: row.current_location,
    // Map coordinates
    originLat: parseFloat(row.origin_lat) || null,
    originLng: parseFloat(row.origin_lng) || null,
    destinationLat: parseFloat(row.destination_lat) || null,
    destinationLng: parseFloat(row.destination_lng) || null,
    currentLat: parseFloat(row.current_lat) || null,
    currentLng: parseFloat(row.current_lng) || null,
    // Dates
    shippedDate: row.shipped_date,
    estimatedDelivery: row.estimated_delivery,
    actualDelivery: row.actual_delivery,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    // Timeline injected separately
    timeline: [],
  };
}

function mapEvent(row) {
  if (!row) return null;
  return {
    id: row.id,
    shipmentId: row.shipment_id,
    status: row.status,
    description: row.description,
    location: row.location,
    lat: parseFloat(row.lat) || null,
    lng: parseFloat(row.lng) || null,
    date: row.event_date,
    completed: row.completed,
    isAlert: row.is_alert,
    sortOrder: row.sort_order,
  };
}

// ─── Read: find one shipment by tracking number (with timeline) ───────────────
export async function findShipment(trackingNumber) {
  const { data: shipRow, error } = await supabase
    .from("shipments")
    .select("*")
    .ilike("tracking_number", trackingNumber.trim())
    .maybeSingle();

  if (error || !shipRow) return null;

  const shipment = mapShipment(shipRow);

  const { data: events } = await supabase
    .from("timeline_events")
    .select("*")
    .eq("shipment_id", shipRow.id)
    .order("sort_order", { ascending: true });

  shipment.timeline = (events || []).map(mapEvent);
  return shipment;
}

// ─── Read: all shipments (dashboard) ─────────────────────────────────────────
export async function getAllShipments() {
  const { data, error } = await supabase
    .from("shipments")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !data) return [];
  return data.map(mapShipment);
}

// ─── Read: dashboard stats ────────────────────────────────────────────────────
export async function getStats() {
  const { data, error } = await supabase.from("shipments").select("status");

  if (error || !data)
    return {
      total: 0,
      delivered: 0,
      inTransit: 0,
      pending: 0,
      delayed: 0,
      outForDelivery: 0,
    };

  const total = data.length;
  const delivered = data.filter((s) => s.status === "Delivered").length;
  const inTransit = data.filter((s) => s.status === "In Transit").length;
  const pending = data.filter((s) =>
    ["Pending", "Processing"].includes(s.status),
  ).length;
  const delayed = data.filter((s) => s.status === "Delayed").length;
  const outForDelivery = data.filter(
    (s) => s.status === "Out for Delivery",
  ).length;
  return { total, delivered, inTransit, pending, delayed, outForDelivery };
}

// ─── Write: insert a new shipment + its timeline events ───────────────────────
export async function insertShipment(formData) {
  // Generate tracking number
  const trackingNumber =
    "NC" +
    Array.from({ length: 10 }, () => Math.floor(Math.random() * 10)).join("");

  const origin = `${formData.senderCity}, ${formData.senderCountry}`;
  const destination = `${formData.receiverCity}, ${formData.receiverCountry}`;

  // Build coordinate defaults from known cities (simple fallback)
  const coordMap = CITY_COORDS;
  const oKey = formData.senderCity;
  const dKey = formData.receiverCity;
  const oc = coordMap[oKey] || coordMap["Default"];
  const dc = coordMap[dKey] || coordMap["Default"];

  // Current location = origin for new shipments
  const { data: shipRow, error: shipErr } = await supabase
    .from("shipments")
    .insert({
      tracking_number: trackingNumber,
      status: formData.status,
      service: formData.service,
      weight: formData.weight,
      dimensions: formData.dimensions,
      description: formData.description,
      sender_name: formData.senderName,
      sender_city: formData.senderCity,
      sender_country: formData.senderCountry,
      receiver_name: formData.receiverName,
      receiver_city: formData.receiverCity,
      receiver_country: formData.receiverCountry,
      origin,
      destination,
      current_location: formData.currentLocation,
      origin_lat: oc[0],
      origin_lng: oc[1],
      destination_lat: dc[0],
      destination_lng: dc[1],
      current_lat: formData.currentLat || oc[0],
      current_lng: formData.currentLng || oc[1],
      shipped_date: formData.shippedDate,
      estimated_delivery: formData.estimatedDelivery,
    })
    .select()
    .single();

  if (shipErr || !shipRow) {
    console.error("Insert shipment error:", shipErr);
    return { success: false, error: shipErr?.message };
  }

  // Build and insert timeline
  const timeline = buildTimeline(
    formData.status,
    origin,
    destination,
    formData.shippedDate,
    oc,
    dc,
  );
  if (timeline.length) {
    await supabase.from("timeline_events").insert(
      timeline.map((ev, i) => ({
        shipment_id: shipRow.id,
        status: ev.status,
        description: ev.description,
        location: ev.location,
        lat: ev.lat,
        lng: ev.lng,
        event_date: ev.date,
        completed: ev.completed,
        is_alert: ev.isAlert || false,
        sort_order: i + 1,
      })),
    );
  }

  return { success: true, shipment: mapShipment(shipRow), trackingNumber };
}

// ─── Timeline builder ─────────────────────────────────────────────────────────
function buildTimeline(status, origin, destination, shippedDate, oc, dc) {
  const today = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
  const fmt = (daysAgo) => {
    const d = new Date();
    d.setDate(d.getDate() - daysAgo);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };

  const events = [];

  events.push({
    status: "Order Received",
    description: `Shipment booked at ${origin} facility`,
    location: origin,
    lat: oc[0],
    lng: oc[1],
    date: `${fmt(0)} 09:00 AM`,
    completed: true,
  });

  const pastStatuses = [
    "Processing",
    "In Transit",
    "Out for Delivery",
    "Delivered",
    "Delayed",
  ];
  if (pastStatuses.includes(status)) {
    events.push({
      status: "Package Picked Up",
      description: "Package collected from sender and processed",
      location: origin,
      lat: oc[0],
      lng: oc[1],
      date: `${fmt(0)} 02:00 PM`,
      completed: true,
    });
  }
  if (
    ["In Transit", "Out for Delivery", "Delivered", "Delayed"].includes(status)
  ) {
    events.push({
      status: "In Transit",
      description: "Package cleared customs — en route to destination",
      location: "International Hub",
      lat: (oc[0] + dc[0]) / 2,
      lng: (oc[1] + dc[1]) / 2,
      date: `${fmt(0)} 11:00 PM`,
      completed: true,
    });
  }
  if (["Out for Delivery", "Delivered"].includes(status)) {
    events.push({
      status: "Out for Delivery",
      description: "Package loaded onto delivery vehicle",
      location: destination,
      lat: dc[0],
      lng: dc[1],
      date: `${today} 08:00 AM`,
      completed: true,
    });
  }
  if (status === "Delivered") {
    events.push({
      status: "Delivered",
      description: "Package successfully delivered to recipient",
      location: destination,
      lat: dc[0],
      lng: dc[1],
      date: `${today} 01:00 PM`,
      completed: true,
    });
  }
  if (status === "Delayed") {
    events.push({
      status: "Delivery Delayed",
      description: "Delay encountered — rescheduled",
      location: "Regional Depot",
      lat: (oc[0] + dc[0]) / 2,
      lng: (oc[1] + dc[1]) / 2,
      date: `${today} 03:00 PM`,
      completed: false,
      isAlert: true,
    });
  }
  if (status === "Returned") {
    events.push({
      status: "Return Initiated",
      description: "Delivery failed — package returned to sender",
      location: destination,
      lat: dc[0],
      lng: dc[1],
      date: `${today} 10:00 AM`,
      completed: false,
      isAlert: true,
    });
  }

  return events;
}

// ─── Simple city → [lat, lng] lookup ─────────────────────────────────────────
const CITY_COORDS = {
  Amsterdam: [52.3676, 4.9041],
  London: [51.5074, -0.1278],
  Paris: [48.8566, 2.3522],
  Frankfurt: [50.1109, 8.6821],
  Berlin: [52.52, 13.405],
  Munich: [48.1351, 11.582],
  Rotterdam: [51.9244, 4.4777],
  Brussels: [50.8503, 4.3517],
  Vienna: [48.2082, 16.3738],
  Stockholm: [59.3293, 18.0686],
  Oslo: [59.9139, 10.7522],
  Copenhagen: [55.6761, 12.5683],
  Helsinki: [60.1699, 24.9384],
  Warsaw: [52.2297, 21.0122],
  Prague: [50.0755, 14.4378],
  Zurich: [47.3769, 8.5417],
  Geneva: [46.2044, 6.1432],
  Milan: [45.4642, 9.19],
  Rome: [41.9028, 12.4964],
  Florence: [43.7696, 11.2558],
  Madrid: [40.4168, -3.7038],
  Barcelona: [41.3851, 2.1734],
  Lisbon: [38.7223, -9.1393],
  Athens: [37.9838, 23.7275],
  Istanbul: [41.0082, 28.9784],
  Moscow: [55.7558, 37.6173],
  Dubai: [25.2048, 55.2708],
  "Abu Dhabi": [24.4539, 54.3773],
  Riyadh: [24.6877, 46.7219],
  Mumbai: [19.076, 72.8777],
  Delhi: [28.6139, 77.209],
  Bangalore: [12.9716, 77.5946],
  Singapore: [1.3521, 103.8198],
  "Kuala Lumpur": [3.139, 101.6869],
  Bangkok: [13.7563, 100.5018],
  Jakarta: [6.2088, 106.8456],
  Manila: [14.5995, 120.9842],
  Tokyo: [35.6762, 139.6503],
  Seoul: [37.5665, 126.978],
  Shanghai: [31.2304, 121.4737],
  Shenzhen: [22.5431, 114.0579],
  Beijing: [39.9042, 116.4074],
  Guangzhou: [23.1291, 113.2644],
  "Hong Kong": [22.3193, 114.1694],
  Sydney: [-33.8688, 151.2093],
  Melbourne: [-37.8136, 144.9631],
  Auckland: [-36.8485, 174.7633],
  "New York": [40.7128, -74.006],
  "Los Angeles": [34.0522, -118.2437],
  Chicago: [41.8781, -87.6298],
  Houston: [29.7604, -95.3698],
  Miami: [25.7617, -80.1918],
  Seattle: [47.6062, -122.3321],
  "San Francisco": [37.7749, -122.4194],
  Toronto: [43.6532, -79.3832],
  Vancouver: [49.2827, -123.1207],
  "Mexico City": [19.4326, -99.1332],
  "São Paulo": [-23.5505, -46.6333],
  "Rio de Janeiro": [-22.9068, -43.1729],
  "Buenos Aires": [-34.6037, -58.3816],
  Lima: [-12.0464, -77.0428],
  Bogotá: [4.711, -74.0721],
  Cairo: [30.0444, 31.2357],
  Nairobi: [-1.2921, 36.8219],
  Lagos: [6.5244, 3.3792],
  Johannesburg: [-26.2041, 28.0473],
  "Cape Town": [-33.9249, 18.4241],
  Casablanca: [33.5731, -7.5898],
  Accra: [5.6037, -0.187],
  Tallinn: [59.437, 24.7536],
  Default: [48.8566, 2.3522],
};

export { CITY_COORDS };

// ─── Status / service constants (for UI dropdowns) ────────────────────────────
export const STATUS = {
  PENDING: "Pending",
  PROCESSING: "Processing",
  IN_TRANSIT: "In Transit",
  OUT_FOR_DELIVERY: "Out for Delivery",
  DELIVERED: "Delivered",
  DELAYED: "Delayed",
  RETURNED: "Returned",
};

export const STATUS_COLORS = {
  Pending: { bg: "bg-slate-100", text: "text-slate-700", dot: "bg-slate-400" },
  Processing: { bg: "bg-blue-100", text: "text-blue-700", dot: "bg-blue-500" },
  "In Transit": {
    bg: "bg-amber-100",
    text: "text-amber-700",
    dot: "bg-amber-500",
  },
  "Out for Delivery": {
    bg: "bg-orange-100",
    text: "text-orange-700",
    dot: "bg-orange-500",
  },
  Delivered: {
    bg: "bg-green-100",
    text: "text-green-700",
    dot: "bg-green-500",
  },
  Delayed: { bg: "bg-red-100", text: "text-red-700", dot: "bg-red-500" },
  Returned: {
    bg: "bg-purple-100",
    text: "text-purple-700",
    dot: "bg-purple-500",
  },
};

export const SERVICE_TYPES = [
  "Express Delivery",
  "Standard Shipping",
  "International Air",
  "Freight Services",
  "Same-Day Delivery",
  "Economy Shipping",
];
