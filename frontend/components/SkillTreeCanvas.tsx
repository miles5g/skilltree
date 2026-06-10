/**
 * SVG skill tree canvas — edges behind nodes, checkboxes on top (Node 2 bones).
 * See docs/NOTES/frontend-components.md.
 */
import { useMemo, useState } from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import Svg from 'react-native-svg';

import { useSkillTreeStore } from '../store/useSkillTreeStore';
import type { SkillNode as SkillNodeType } from '../types/skillTree';
import { buildEdges, getNodePosition } from '../utils/layout';
import { InstructionModal } from './InstructionModal';
import { SkillNode, SkillNodeCheckbox } from './SkillNode';
import { UnlockEdge } from './UnlockEdge';

interface Edge {
  from: string;
  to: string;
}

interface SkillTreeCanvasProps {
  nodes: SkillNodeType[];
  height?: number;
  extraEdges?: Edge[];
}

export function SkillTreeCanvas({ nodes, height = 480, extraEdges = [] }: SkillTreeCanvasProps) {
  const { width } = useWindowDimensions();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const isUnlocked = useSkillTreeStore((s) => s.isUnlocked);
  const isEdgeLit = useSkillTreeStore((s) => s.isEdgeLit);
  const setTested = useSkillTreeStore((s) => s.setTested);
  const storeNodes = useSkillTreeStore((s) => s.nodes);

  const positioned = useMemo(
    () =>
      nodes.map((node, index) => ({
        node: storeNodes[node.id] ?? node,
        position: getNodePosition(node, index),
      })),
    [nodes, storeNodes],
  );

  const edges = useMemo(() => {
    const prereqEdges = buildEdges(nodes);
    const keys = new Set(prereqEdges.map((e) => `${e.from}-${e.to}`));
    const merged = [...prereqEdges];
    for (const edge of extraEdges) {
      const key = `${edge.from}-${edge.to}`;
      if (!keys.has(key)) {
        merged.push(edge);
        keys.add(key);
      }
    }
    return merged;
  }, [nodes, extraEdges]);
  const selectedNode = selectedId ? (storeNodes[selectedId] ?? null) : null;

  return (
    <View style={[styles.container, { height }]}>
      <Svg width={width} height={height}>
        {edges.map((edge) => {
          const from = positioned.find((p) => p.node.id === edge.from);
          const to = positioned.find((p) => p.node.id === edge.to);
          if (!from || !to) return null;
          return (
            <UnlockEdge
              key={`${edge.from}-${edge.to}`}
              x1={from.position.x}
              y1={from.position.y}
              x2={to.position.x}
              y2={to.position.y}
              lit={isEdgeLit(edge.from, edge.to)}
            />
          );
        })}
        {positioned.map(({ node, position }) => (
          <SkillNode
            key={node.id}
            node={node}
            x={position.x}
            y={position.y}
            unlocked={isUnlocked(node.id)}
            onPress={() => setSelectedId(node.id)}
            onToggleTested={() => setTested(node.id, !node.tested)}
          />
        ))}
      </Svg>
      {positioned.map(({ node, position }) => (
        <SkillNodeCheckbox
          key={`cb-${node.id}`}
          node={node}
          x={position.x}
          y={position.y}
          unlocked={isUnlocked(node.id)}
          onPress={() => setSelectedId(node.id)}
          onToggleTested={() => setTested(node.id, !node.tested)}
        />
      ))}
      <InstructionModal
        node={selectedNode}
        visible={selectedId !== null}
        onClose={() => setSelectedId(null)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'relative',
  },
});
