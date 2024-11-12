import { AnchorType, Dimension, Node, Point } from '@cloudflow/types';
import { calculateAnchorPoints } from '@cloudflow/utils';
import { useTheme } from '@mui/material';
import { memo, MouseEvent } from 'react';

//TODO: Edge 타입 병합 필요
type NewEdge = {
    id: string;
    source: Node & { anchorType: AnchorType };
    target: Node & { anchorType: AnchorType };
};

type Props = {
    edge: NewEdge;
    isSelected: boolean;
    dimension: Dimension;
    onStartSplitEdge: () => void;
    onSelectEdge: (edgeId: string) => void;
};
export default memo(
    ({
        edge,
        dimension,
        isSelected,
        onStartSplitEdge,
        onSelectEdge,
    }: Props) => {
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

        const handleMouseDown = (event: MouseEvent) => {
            event.stopPropagation();
            onStartSplitEdge();
        };

        const handleClick = () => {
            onSelectEdge(edge.id);
        };

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
                <line
                    x1={sourcePoint.x}
                    y1={sourcePoint.y}
                    x2={targetPoint.x}
                    y2={targetPoint.y}
                    stroke={isSelected ? 'green' : color}
                    strokeWidth={2}
                    markerEnd="url(#arrowhead) "
                    onMouseDown={handleMouseDown}
                    onClick={handleClick}
                />
            </g>
        );
    },
    (prevProps, nextProps) => {
        return (
            JSON.stringify(prevProps.edge.source) ===
                JSON.stringify(nextProps.edge.source) &&
            JSON.stringify(prevProps.edge.target) ===
                JSON.stringify(nextProps.edge.target) &&
            prevProps.dimension === nextProps.dimension &&
            prevProps.isSelected === nextProps.isSelected
        );
    },
);
