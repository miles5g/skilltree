/**
 * RPG visual tokens — single palette for active/locked/lit states.
 * Bones: consistent colors before custom themes.
 */
export const tokens = {
  colors: {
    background: '#0f1117',
    surface: '#1a1d27',
    active: '#4f8cff',
    activeGlow: '#7eb0ff',
    locked: '#4a4f5e',
    lockedFill: '#2a2e3a',
    edge: '#3d4455',
    edgeLit: '#5eead4',
    text: '#f0f4ff',
    textMuted: '#8b92a8',
    tierBadge: '#f59e0b',
    success: '#22c55e',
  },
  node: {
    radius: 36,
    strokeWidth: 3,
  },
} as const;
