const PROCESS_COLORS = [
  { bg: "#3B82F6", light: "#93C5FD", dark: "#1D4ED8", name: "Blue" },
  { bg: "#EF4444", light: "#FCA5A5", dark: "#B91C1C", name: "Red" },
  { bg: "#10B981", light: "#6EE7B7", dark: "#047857", name: "Green" },
  { bg: "#F59E0B", light: "#FCD34D", dark: "#B45309", name: "Amber" },
  { bg: "#8B5CF6", light: "#C4B5FD", dark: "#6D28D9", name: "Violet" },
  { bg: "#EC4899", light: "#F9A8D4", dark: "#BE185D", name: "Pink" },
  { bg: "#06B6D4", light: "#67E8F9", dark: "#0E7490", name: "Cyan" },
  { bg: "#F97316", light: "#FDBA74", dark: "#C2410C", name: "Orange" },
  { bg: "#14B8A6", light: "#5EEAD4", dark: "#0F766E", name: "Teal" },
  { bg: "#6366F1", light: "#A5B4FC", dark: "#4338CA", name: "Indigo" },
  { bg: "#84CC16", light: "#BEF264", dark: "#4D7C0F", name: "Lime" },
  { bg: "#E11D48", light: "#FDA4AF", dark: "#9F1239", name: "Rose" },
  { bg: "#0EA5E9", light: "#7DD3FC", dark: "#0369A1", name: "Sky" },
  { bg: "#D946EF", light: "#E879F9", dark: "#A21CAF", name: "Fuchsia" },
  { bg: "#78716C", light: "#D6D3D1", dark: "#44403C", name: "Stone" },
];

export const getProcessColor = (index) =>
  PROCESS_COLORS[index % PROCESS_COLORS.length];

export const IDLE_COLOR = {
  bg: "#374151",
  light: "#6B7280",
  dark: "#1F2937",
  name: "Idle",
};

export default PROCESS_COLORS;