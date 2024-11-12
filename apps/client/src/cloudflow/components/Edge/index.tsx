import { AnchorType, Dimension, Node } from '@cloudflow/types';
import { calculateAnchorPoints } from '@cloudflow/utils';
import { useTheme } from '@mui/material';
import { memo } from 'react';

//TODO: Edge 타입 병합 필요
type NewEdge = {
    id: string;
    source: Node & { anchorType: AnchorType };
    target: Node & { anchorType: AnchorType };
};

type Props = {
    edge: NewEdge;
    dimension: Dimension;
};
export default memo(
    ({ edge, dimension }: Props) => {
        const { id, source, target } = edge;
        const theme = useTheme();
        const color =
            theme.palette.mode === 'dark'
                ? theme.palette.grey[200]
                : theme.palette.grey[800];

        const sourceAnchors = calculateAnchorPoints(source.point, dimension);
        const targetAnchors = calculateAnchorPoints(target.point, dimension);

        const sourcePoint = sourceAnchors[source.anchorType];
        const targetPoint = targetAnchors[target.anchorType];

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
    },
    (prevProps, nextProps) => {
        const { edge: prevEdge } = prevProps;
        const { edge: nextEdge } = nextProps;
        const { source: prevSource, target: prevTarget } = prevEdge;
        const { source: nextSource, target: nextTarget } = nextEdge;
        return (
            prevSource.point.x === nextSource.point.x &&
            prevSource.point.y === nextSource.point.y &&
            prevTarget.point.x === nextTarget.point.x &&
            prevTarget.point.y === nextTarget.point.y
        );
    },
);
