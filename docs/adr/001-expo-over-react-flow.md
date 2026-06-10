# ADR 001: Expo over React Flow

## Status

Accepted

## Context

The Skill Tree App needs a visual node-based progression UI. Options considered:

1. **React + React Flow** — mature web graph library
2. **Godot graph UI** — game-engine canvas
3. **Expo (React Native) + react-native-svg** — cross-platform including iOS

The product goal includes iOS-friendliness and a future App Store path.

## Decision

Use **Expo with react-native-svg** for the skill tree canvas.

## Consequences

### Positive

- Single codebase for web, iOS (Expo Go), and future App Store builds via EAS
- PEMDAS MVP only needs a handful of nodes — custom SVG layout is sufficient
- No web-to-native rewrite later

### Negative

- No automatic graph layout (manual x/y coordinates in JSON for now)
- More manual work than React Flow for large trees

### Deferred

- Godot (non-web-first, poor SaaS fit)
- React Flow (web-only without Capacitor wrapper)
