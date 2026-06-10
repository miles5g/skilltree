/**
 * Boss Fight screen — loads fixture JSON, renders dynamic skill tree.
 * PEMDAS Tier 1 integration. See docs/NOTES/frontend-screens.md.
 */
import { Link } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';

import { SkillTreeCanvas } from '../components/SkillTreeCanvas';
import { useSkillTreeStore } from '../store/useSkillTreeStore';
import type { SkillTree } from '../types/skillTree';
import { loadPemdasTree } from '../utils/loadTree';

export default function BossFightScreen() {
  const [tree, setTree] = useState<SkillTree | null>(null);
  const [error, setError] = useState<string | null>(null);
  const initFromTree = useSkillTreeStore((s) => s.initFromTree);
  const project = useSkillTreeStore((s) => s.project);

  useEffect(() => {
    loadPemdasTree()
      .then((loaded) => {
        setTree(loaded);
        initFromTree(loaded);
      })
      .catch((err: Error) => setError(err.message));
  }, [initFromTree]);

  const nodes = useMemo(() => {
    if (!tree) return [];
    return tree.branches.flatMap((b) => b.nodes);
  }, [tree]);

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Failed to load tree: {error}</Text>
      </View>
    );
  }

  if (!tree) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color="#4f8cff" size="large" />
        <Text style={styles.loading}>Loading PEMDAS tree…</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.badge}>Boss Fight</Text>
        <Text style={styles.title}>{project}</Text>
        <Text style={styles.subtitle}>
          Mark prerequisites as Tested & Working to unlock advanced nodes.
        </Text>
        <Link href="/pemdas" asChild>
          <Pressable style={styles.link}>
            <Text style={styles.linkText}>View PEMDAS demo →</Text>
          </Pressable>
        </Link>
      </View>
      <SkillTreeCanvas nodes={nodes} height={520} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#0f1117',
  },
  center: {
    flex: 1,
    backgroundColor: '#0f1117',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  header: {
    padding: 20,
    paddingBottom: 8,
  },
  badge: {
    color: '#5eead4',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  title: {
    color: '#f0f4ff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#8b92a8',
    fontSize: 13,
    marginTop: 6,
  },
  link: {
    marginTop: 10,
  },
  linkText: {
    color: '#4f8cff',
    fontSize: 13,
  },
  loading: {
    color: '#8b92a8',
  },
  error: {
    color: '#f87171',
    padding: 20,
    textAlign: 'center',
  },
});
