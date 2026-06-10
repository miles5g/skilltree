/**
 * Node positioning and edge derivation from prerequisites.
 * Uses x/y from JSON when present; falls back to grid layout.
 */
import type { SkillNode } from '../types/skillTree';

const DEFAULT_POSITIONS: Record<string, { x: number; y: number }> = {
  'demo-top': { x: 200, y: 80 },
  'demo-mid': { x: 200, y: 200 },
  'demo-bot': { x: 200, y: 320 },
};

export function getNodePosition(node: SkillNode, index: number): { x: number; y: number } {
  if (node.x != null && node.y != null) {
    return { x: node.x, y: node.y };
  }
  if (DEFAULT_POSITIONS[node.id]) {
    return DEFAULT_POSITIONS[node.id];
  }
  return { x: 120 + (index % 3) * 120, y: 80 + Math.floor(index / 3) * 140 };
}

export function buildEdges(nodes: SkillNode[]): Array<{ from: string; to: string }> {
  const edges: Array<{ from: string; to: string }> = [];
  for (const node of nodes) {
    for (const prereq of node.prerequisites) {
      edges.push({ from: prereq, to: node.id });
    }
  }
  return edges;
}
