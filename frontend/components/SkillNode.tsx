/**
 * Single skill node — active (vibrant) vs locked (grey, no tap).
 * SkillNodeCheckbox overlay provides accessible "Tested & Working" control.
 */
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Circle, G, Text as SvgText } from 'react-native-svg';

import { tokens } from '../theme/tokens';
import type { SkillNode as SkillNodeType } from '../types/skillTree';

interface SkillNodeProps {
  node: SkillNodeType;
  x: number;
  y: number;
  unlocked: boolean;
  onPress: () => void;
  onToggleTested: () => void;
}

const R = tokens.node.radius;

export function SkillNode({
  node,
  x,
  y,
  unlocked,
  onPress,
  onToggleTested,
}: SkillNodeProps) {
  const fill = unlocked ? tokens.colors.active : tokens.colors.lockedFill;
  const stroke = unlocked ? tokens.colors.activeGlow : tokens.colors.locked;
  const opacity = unlocked ? 1 : 0.45;

  return (
    <G opacity={opacity}>
      <Circle
        cx={x}
        cy={y}
        r={R}
        fill={fill}
        stroke={stroke}
        strokeWidth={tokens.node.strokeWidth}
        onPress={unlocked ? onPress : undefined}
      />
      <SvgText
        x={x}
        y={y - 6}
        fill={tokens.colors.text}
        fontSize={11}
        fontWeight="bold"
        textAnchor="middle"
      >
        {node.title.length > 14 ? `${node.title.slice(0, 12)}…` : node.title}
      </SvgText>
      <SvgText
        x={x}
        y={y + 10}
        fill={tokens.colors.tierBadge}
        fontSize={10}
        textAnchor="middle"
      >
        L{node.tier}
      </SvgText>
      {!unlocked && (
        <SvgText x={x} y={y + 24} fill={tokens.colors.textMuted} fontSize={14} textAnchor="middle">
          🔒
        </SvgText>
      )}
      {unlocked && (
        <ForeignCheckboxOverlay
          x={x}
          y={y + R + 14}
          tested={node.tested}
          onToggle={onToggleTested}
        />
      )}
    </G>
  );
}

function ForeignCheckboxOverlay({
  x,
  y,
  tested,
  onToggle,
}: {
  x: number;
  y: number;
  tested: boolean;
  onToggle: () => void;
}) {
  return (
    <G>
      <Circle
        cx={x - 52}
        cy={y}
        r={8}
        fill={tested ? tokens.colors.success : 'transparent'}
        stroke={tokens.colors.textMuted}
        strokeWidth={1.5}
        onPress={onToggle}
      />
      {tested && (
        <SvgText x={x - 52} y={y + 4} fill={tokens.colors.text} fontSize={10} textAnchor="middle">
          ✓
        </SvgText>
      )}
      <SvgText
        x={x - 38}
        y={y + 4}
        fill={tokens.colors.textMuted}
        fontSize={9}
        onPress={onToggle}
      >
        Tested
      </SvgText>
    </G>
  );
}

interface SkillNodeOverlayProps {
  node: SkillNodeType;
  x: number;
  y: number;
  unlocked: boolean;
  onPress: () => void;
  onToggleTested: () => void;
}

/** HTML/React Native overlay for accessible checkbox (used on web + native). */
export function SkillNodeCheckbox({
  node,
  x,
  y,
  unlocked,
  onToggleTested,
}: SkillNodeOverlayProps) {
  if (!unlocked) return null;

  return (
    <Pressable
      style={[
        styles.checkbox,
        {
          left: x - 80,
          top: y + R + 2,
        },
      ]}
      onPress={onToggleTested}
    >
      <View style={[styles.box, node.tested && styles.boxChecked]}>
        {node.tested && <Text style={styles.check}>✓</Text>}
      </View>
      <Text style={styles.label}>Tested & Working</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  checkbox: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    zIndex: 10,
  },
  box: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: tokens.colors.textMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxChecked: {
    backgroundColor: tokens.colors.success,
    borderColor: tokens.colors.success,
  },
  check: {
    color: tokens.colors.text,
    fontSize: 12,
    fontWeight: 'bold',
  },
  label: {
    color: tokens.colors.textMuted,
    fontSize: 11,
  },
});
