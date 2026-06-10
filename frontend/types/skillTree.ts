/**
 * TypeScript types mirroring schemas/skill-tree.schema.json.
 * Keep in sync with backend/app/models/skill_tree.py — see docs/NOTES/schema-contract.md.
 */

export interface SkillNode {
  id: string;
  tier: number;
  title: string;
  instruction: string;
  prerequisites: string[];
  tested: boolean;
  x?: number;
  y?: number;
}

export interface Branch {
  id: string;
  name: string;
  nodes: SkillNode[];
}

export interface SkillTree {
  project: string;
  branches: Branch[];
}

export interface NodePosition {
  id: string;
  x: number;
  y: number;
}
