// ==========================================
// App Color Palette — Premium Soft Minimalism Theme
// Navy / Gold-Orange / Soft Gradient Backgrounds
// Smart Local Service Orchestrator
// ==========================================

const colors = {
  // Backgrounds
  background: "#0EA5E9",
  backgroundAlt: "#38BDF8",
  surface: "#F8FCFF",
  card: "#FFFFFF",
  cardAlt: "#EFF9FF",

  // Gradient (Deep Navy Theme matching Splash Screen)
  gradientStart: "#0F2027",
  gradientMid: "#1C4E6E",
  gradientEnd: "#0F2A44",

  chatGradientStart: "#0C4A6E",
  chatGradientMid: "#075985",
  chatGradientEnd: "#0369A1",

  // ---- Brand ----
  primary: "#173B5E",                 // navy (headers, nav active, buttons)
  primaryLight: "#1E4D78",            // lighter navy
  primaryDark: "#0F2A44",             // darker navy
  screenBackground: "#0F2A44", // unified background for screens (except Chat)
  accent: "#F9A826",                  // gold-orange (CTA, highlights, ratings)
  accentLight: "#FBBD5E",             // lighter gold
  accentDark: "#E09520",              // deeper gold
  emergency: "#EF4444",               // emergency badge red

  // ---- Text ----
  textPrimary: "#1F2937",             // main text (dark charcoal)
  textSecondary: "#7B8794",           // muted body text
  textMuted: "#94A3B8",              // light grey for hints/placeholders
  textOnPrimary: "#FFFFFF",           // text on navy buttons
  textOnAccent: "#FFFFFF",            // text on orange buttons

  // ---- Chat ----
  userBubble: "#F9A826",              // orange user bubble
  botBubble: "#FFFFFF",               // white bot bubble
  userBubbleText: "#FFFFFF",          // white text on orange
  botBubbleText: "#1F2937",           // dark text on white
  chatBackground: "#173B5E",          // navy chat bg

  // ---- Status / Badges ----
  success: "#22C55E",                 // green (confirmed badge)
  successBg: "#E6F9ED",              // green background tint
  warning: "#F9A826",                 // amber/gold
  warningBg: "#FFF8E8",              // gold background tint
  error: "#EF4444",                   // red
  errorBg: "#FEF2F2",                // red background tint
  info: "#3B82F6",                    // blue

  // ---- Agent status step colors ----
  stepActive: "#F9A826",              // current step dot
  stepComplete: "#22C55E",            // completed step
  stepPending: "#CBD5E1",             // future step

  // ---- Stars ----
  starFilled: "#F9A826",
  starEmpty: "#E2E8F0",

  // ---- Misc ----
  border: "#E8ECF1",                  // card/input borders (softer)
  borderLight: "#F1F5F9",
  inputBackground: "#FFFFFF",
  shadow: "rgba(18, 38, 63, 0.08)",   // premium soft shadow
  shadowDark: "rgba(18, 38, 63, 0.12)",
  overlay: "rgba(23, 59, 94, 0.5)",
  divider: "#E8ECF1",

  // ---- Bottom Tab (Floating) ----
  tabActive: "#F9A826",               // orange active indicator
  tabInactive: "#94A3B8",
  tabBarBg: "#FFFFFF",
  fabBg: "#F9A826",                   // orange FAB

  // ---- Verified Badge ----
  verified: "#3B82F6",
  verifiedBg: "#EFF6FF",

  // ---- Decorative Blobs ----
  blobOrange: "rgba(249, 168, 38, 0.08)",
  blobBlue: "rgba(23, 59, 94, 0.06)",
};

export default colors;
