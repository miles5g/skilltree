/** Modal showing raw instruction prompt for a tapped node — the anti-creep task text. */
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

import { tokens } from '../theme/tokens';
import type { SkillNode } from '../types/skillTree';

interface InstructionModalProps {
  node: SkillNode | null;
  visible: boolean;
  onClose: () => void;
}

export function InstructionModal({ node, visible, onClose }: InstructionModalProps) {
  if (!node) return null;

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable style={styles.card} onPress={(e) => e.stopPropagation()}>
          <Text style={styles.tier}>Tier {node.tier}</Text>
          <Text style={styles.title}>{node.title}</Text>
          <Text style={styles.instruction}>{node.instruction}</Text>
          <Pressable style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>Close</Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  card: {
    backgroundColor: tokens.colors.surface,
    borderRadius: 12,
    padding: 20,
    maxWidth: 400,
    width: '100%',
    borderWidth: 1,
    borderColor: tokens.colors.edge,
  },
  tier: {
    color: tokens.colors.tierBadge,
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
  },
  title: {
    color: tokens.colors.text,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  instruction: {
    color: tokens.colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
  },
  closeButton: {
    marginTop: 16,
    alignSelf: 'flex-end',
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: tokens.colors.active,
    borderRadius: 8,
  },
  closeText: {
    color: tokens.colors.text,
    fontWeight: '600',
  },
});
