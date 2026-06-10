/** Connection line between nodes — dims by default, lights when prerequisite tested. */
import { Line } from 'react-native-svg';

import { tokens } from '../theme/tokens';

interface UnlockEdgeProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  lit: boolean;
}

export function UnlockEdge({ x1, y1, x2, y2, lit }: UnlockEdgeProps) {
  return (
    <Line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={lit ? tokens.colors.edgeLit : tokens.colors.edge}
      strokeWidth={lit ? 4 : 2}
      strokeLinecap="round"
      opacity={lit ? 1 : 0.7}
    />
  );
}
