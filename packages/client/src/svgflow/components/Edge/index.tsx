import { useTheme } from '@mui/material';
import { useNodeContext } from '@svgflow/contexts/NodeContext';
import { Dimension, Edge } from '@svgflow/types';
import { calculateAnchorPoints } from '@svgflow/utils';
import { memo, useMemo } from 'react';

type Props = {
    edge: Edge;
    dimension: Dimension;
};
export default memo(({ edge, dimension }: Props) => {
    const { id, sourceId, targetId, sourceAnchorType, targetAnchorType } = edge;
    const {
        state: { nodes },
    } = useNodeContext();
    const theme = useTheme();
    const color =
        theme.palette.mode === 'dark'
            ? theme.palette.grey[200]
            : theme.palette.grey[800];

    const [sourceNode, targetNode] = useMemo(() => {
        const source = nodes.find((node) => node.id === sourceId);
        const target = nodes.find((node) => node.id === targetId);
        return [source, target];
    }, [sourceId, targetId, nodes]);

    if (!sourceNode || !targetNode) return null;

    const sourceAnchors = calculateAnchorPoints(sourceNode.point, dimension);
    const targetAnchors = calculateAnchorPoints(targetNode.point, dimension);

    const sourcePoint = sourceAnchors[sourceAnchorType];
    const targetPoint = targetAnchors[targetAnchorType];

    const linePathD = `M ${sourcePoint.x} ${sourcePoint.y} L ${targetPoint.x} ${targetPoint.y}`;

    return (
        <g id={id}>
            <defs>
                <marker
                    id="arrowhead"
                    markerWidth="5"
                    markerHeight="5"
                    refX="5"
                    refY="2.5"
                    orient="auto"
                >
                    <path d="M 0 0 L 5 2.5 L 0 5 Z" fill={color} />
                </marker>
            </defs>
            <path
                d={linePathD}
                stroke={color}
                fill="none"
                strokeWidth={2}
                markerEnd="url(#arrowhead)"
            />
        </g>
    );
});
