/**
 * Tree loading — fixture first (no hallucination), optional live API.
 * EXPO_PUBLIC_USE_LIVE_API=true switches to backend /trees/pemdas.
 */
import pemdasFixture from '../data/pemdas-tree.json';
import type { SkillTree } from '../types/skillTree';

const API_URL = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:8000';
const USE_LIVE_API = process.env.EXPO_PUBLIC_USE_LIVE_API === 'true';

export async function loadPemdasTree(): Promise<SkillTree> {
  if (USE_LIVE_API) {
    const response = await fetch(`${API_URL}/trees/pemdas`);
    if (!response.ok) {
      throw new Error(`Failed to load tree: ${response.status}`);
    }
    return (await response.json()) as SkillTree;
  }
  return pemdasFixture as SkillTree;
}

export function getStaticPemdasNodes(): SkillTree {
  return pemdasFixture as SkillTree;
}
