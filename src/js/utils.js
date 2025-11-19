// utils.js - small helpers
export function clamp(v, a, b) {
  if (v < a) return a;
  if (v > b) return b;
  return v;
}

export function length(x, y) {
  return Math.hypot(x, y);
}
