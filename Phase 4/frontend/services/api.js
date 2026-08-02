// ==========================================
// Mock Data Service — Phase 1 Hardcoded Orchestrator
// Pure local mock data operations matching Phase 1 DB
// ==========================================

import { mockProviders, mockBookings } from "../data/mockData";

/**
 * Mock Health Status
 */
export const checkHealth = async () => {
  return { online: true, status: "MOCK_PHASE1_DB_ACTIVE" };
};

/**
 * Intelligent Mock Orchestrate Query
 * Searches all 50 Phase 1 seed providers based on user intent keywords
 */
export const orchestrateQuery = async (queryText) => {
  const lower = queryText.toLowerCase();

  // Intent keyword mapping
  const serviceKeywords = [
    { key: "electric", type: "Electrician" },
    { key: "wiring", type: "Electrician" },
    { key: "plumb", type: "Plumber" },
    { key: "leak", type: "Plumber" },
    { key: "pipe", type: "Plumber" },
    { key: "tutor", type: "Tutor" },
    { key: "teach", type: "Tutor" },
    { key: "math", type: "Tutor" },
    { key: "ac", type: "AC Technician" },
    { key: "cool", type: "AC Technician" },
    { key: "carpent", type: "Carpenter" },
    { key: "wood", type: "Carpenter" },
    { key: "door", type: "Carpenter" },
    { key: "paint", type: "Painter" },
    { key: "wall", type: "Painter" },
    { key: "clean", type: "Cleaner" },
    { key: "wash", type: "Cleaner" },
    { key: "mechanic", type: "Auto Mechanic" },
    { key: "car", type: "Auto Mechanic" },
    { key: "engine", type: "Auto Mechanic" },
    { key: "cctv", type: "CCTV Security" },
    { key: "camera", type: "CCTV Security" },
    { key: "security", type: "CCTV Security" },
    { key: "internet", type: "Internet & IT" },
    { key: "wifi", type: "Internet & IT" },
    { key: "router", type: "Internet & IT" },
  ];

  let matchedType = "Electrician"; // default fallback
  const found = serviceKeywords.find((sk) => lower.includes(sk.key));
  if (found) {
    matchedType = found.type;
  }

  // Filter matching providers by service type
  let matches = mockProviders.filter(
    (p) => p.service_type.toLowerCase() === matchedType.toLowerCase()
  );

  // Preference matching based on location
  const locations = ["gulshan", "johar", "clifton", "pechs", "nazimabad", "dha", "malir", "korangi", "bahadurabad"];
  let matchedLocation = null;
  locations.forEach(loc => {
    if (lower.includes(loc)) {
      matchedLocation = loc;
    }
  });

  if (matchedLocation) {
    matches.sort((a, b) => {
      const aMatch = a.location.toLowerCase().includes(matchedLocation) ? 1 : 0;
      const bMatch = b.location.toLowerCase().includes(matchedLocation) ? 1 : 0;
      return bMatch - aMatch;
    });
  }

  // Preference matching based on price
  if (lower.includes("cheap") || lower.includes("affordable") || lower.includes("low price") || lower.includes("budget")) {
    matches.sort((a, b) => {
      const priceA = parseInt(a.service_price.replace(/\D/g, '')) || 0;
      const priceB = parseInt(b.service_price.replace(/\D/g, '')) || 0;
      return priceA - priceB;
    });
  }

  // If "best", "top", "highly rated"
  if (lower.includes("best") || lower.includes("top") || lower.includes("highly rated")) {
    matches.sort((a, b) => b.rating - a.rating);
  }

  const matchedProvider = matches.length > 0 ? matches[0] : mockProviders[0];

  return {
    success: true,
    isLiveDB: false,
    intent: {
      service: matchedProvider.service_type,
      location: matchedProvider.location,
    },
    provider: matchedProvider,
    matchedProviders: matches.length > 0 ? matches : mockProviders,
    explanation:
      matchedProvider.explanation ||
      `Top-ranked ${matchedProvider.service_type} in ${matchedProvider.location} matching your preferences.`,
  };
};

/**
 * Mock Bookings fetch from Phase 1 Seed
 */
export const fetchMyBookings = async () => {
  return {
    success: true,
    bookings: mockBookings.map((b) => ({
      booking_id: b.id,
      status: b.status,
      provider_name: b.providerName,
      service_type: b.serviceType,
      date: b.date,
      location: b.location,
    })),
  };
};

/**
 * Mock Create Booking
 */
export const createBookingDB = async (bookingData) => {
  return {
    success: true,
    isSimulated: true,
    data: {
      booking_id: Math.floor(Math.random() * 900) + 100,
      status: "Pending",
      created_at: new Date().toISOString(),
    },
  };
};
