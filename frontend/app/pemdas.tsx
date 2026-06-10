/**
 * PEMDAS Nodes 2 & 3 demo — 3 static circles, parent checkbox unlocks child.
 */
import { Link } from 'expo-router';
import { useEffect, useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { SkillTreeCanvas } from '../components/SkillTreeCanvas';
import { useSkillTreeStore } from '../store/useSkillTreeStore';
import type { SkillTree } from '../types/skillTree';

/** Static 3-node demo for PEMDAS Nodes 2 & 3. */
const DEMO_TREE: SkillTree = {
  project: 'PEMDAS Demo — Visual Graphing & Lock',
  branches: [
    {
      id: 'demo',
      name: 'Demo',
      nodes: [
        {
          id: 'demo-top',
          tier: 1,
          title: 'Parent Node',
          instruction: 'Click Tested & Working to unlock the child node below.',
          prerequisites: [],
          tested: false,
          x: 200,
          y: 80,
        },
        {
          id: 'demo-mid',
          tier: 1,
          title: 'Middle Node',
          instruction: 'Static middle node connected to the chain.',
          prerequisites: ['demo-top'],
          tested: false,
          x: 120,
          y: 200,
        },
        {
          id: 'demo-bot',
          tier: 1,
          title: 'Child Node',
          instruction: 'This node unlocks when the parent is tested.',
          prerequisites: ['demo-top'],
          tested: false,
          x: 280,
          y: 320,
        },
      ],
    },
  ],
};

export default function PemdasDemoScreen() {
  const initFromTree = useSkillTreeStore((s) => s.initFromTree);

  useEffect(() => {
    initFromTree(DEMO_TREE);
  }, [initFromTree]);

  const nodes = useMemo(() => DEMO_TREE.branches.flatMap((b) => b.nodes), []);

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.badge}>Nodes 2 & 3</Text>
        <Text style={styles.title}>Visual Graphing + Lock</Text>
        <Text style={styles.subtitle}>
          Three static circles. The bottom node stays locked until prerequisites are tested.
        </Text>
        <Link href="/" asChild>
          <Pressable style={styles.link}>
            <Text style={styles.linkText}>← Boss Fight integration</Text>
          </Pressable>
        </Link>
      </View>
      <SkillTreeCanvas
        nodes={nodes}
        height={480}
        extraEdges={[
          { from: 'demo-top', to: 'demo-mid' },
          { from: 'demo-mid', to: 'demo-bot' },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#0f1117',
  },
  header: {
    padding: 20,
    paddingBottom: 8,
  },
  badge: {
    color: '#f59e0b',
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
});
