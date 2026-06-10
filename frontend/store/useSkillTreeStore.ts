/**
 * Zustand store — anti-creep lock/unlock bones (Node 3).
 *
 * isUnlocked: all prerequisites must be tested.
 * isEdgeLit: prerequisite edge lights when parent is tested.
 * See docs/NOTES/frontend-store.md and store/NOTES.md.
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { SkillNode, SkillTree } from '../types/skillTree';

interface SkillTreeState {
  project: string;
  nodes: Record<string, SkillNode>;
  initFromTree: (tree: SkillTree) => void;
  setTested: (nodeId: string, tested: boolean) => void;
  isUnlocked: (nodeId: string) => boolean;
  isEdgeLit: (fromId: string, toId: string) => boolean;
}

/** Convert branch-nested tree into id-keyed map for O(1) lookup. */
function flattenNodes(tree: SkillTree): Record<string, SkillNode> {
  const nodes: Record<string, SkillNode> = {};
  for (const branch of tree.branches) {
    for (const node of branch.nodes) {
      nodes[node.id] = { ...node };
    }
  }
  return nodes;
}

export const useSkillTreeStore = create<SkillTreeState>()(
  persist(
    (set, get) => ({
      project: '',
      nodes: {},

      initFromTree: (tree) => {
        set({
          project: tree.project,
          nodes: flattenNodes(tree),
        });
      },

      setTested: (nodeId, tested) => {
        set((state) => {
          const node = state.nodes[nodeId];
          if (!node) return state;
          return {
            nodes: {
              ...state.nodes,
              [nodeId]: { ...node, tested },
            },
          };
        });
      },

      isUnlocked: (nodeId) => {
        const node = get().nodes[nodeId];
        if (!node) return false;
        if (node.prerequisites.length === 0) return true;
        return node.prerequisites.every((id) => get().nodes[id]?.tested === true);
      },

      isEdgeLit: (fromId, toId) => {
        const toNode = get().nodes[toId];
        if (!toNode) return false;
        return toNode.prerequisites.includes(fromId) && get().nodes[fromId]?.tested === true;
      },
    }),
    {
      name: 'skilltree-state',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ project: state.project, nodes: state.nodes }),
    },
  ),
);
