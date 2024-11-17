import { Dimension, Edge, Point } from '@cloud-graph/types';
import { calculateAnchorPoints } from '@cloud-graph/utils';
import { useTheme } from '@mui/material';
import { useRef } from 'react';

type Props = {
    edge: Edge;
    isSelected: boolean;
    dimension: Dimension;
    onSelect: (id: string) => void;
    onSplit: (edge: Edge, point: Point) => void;
    onSelectEntireEdge: (edge: Edge) => void;
};

export default ({
    edge,
    isSelected,
    dimension,
    onSelect,
    onSplit,
    onSelectEntireEdge,
}: Props) => {
    const theme = useTheme();
    const { id, type, source, target } = edge;
    const timeoutRef = useRef<number | null>(null);

    const sourceAnchor = calculateAnchorPoints(source.node, dimension);
    const targetAnchor = calculateAnchorPoints(target.node, dimension);

    const sourcePoint = source.anchorType
        ? sourceAnchor[source.anchorType]
        : source.node.point;
    const targetPoint = target.anchorType
        ? targetAnchor[target.anchorType]
        : target.node.point;

    const color = isSelected
        ? theme.palette.primary.main
        : theme.palette.text.primary;

    const handleClick = () => {
        onSelect(id);
    };
    const handleDoubleClick = () => {
        onSelectEntireEdge(edge);
    };

    const handleMouseDown = (event: React.MouseEvent) => {
        timeoutRef.current = setTimeout(() => {
            const { clientX, clientY } = event;
            onSplit(edge, { x: clientX, y: clientY });
        }, 500);

        const handleMouseUp = () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
            }

            document.removeEventListener('mouseup', handleMouseUp);
        };

        document.addEventListener('mouseup', handleMouseUp);
    };

    return (
        <g
            id={id}
            data-type="graph-edge"
            onClick={handleClick}
            onDoubleClick={handleDoubleClick}
            onMouseDown={handleMouseDown}
        >
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
                stroke={color}
                strokeWidth={2}
                markerEnd={type === 'arrow' ? 'url(#arrowhead)' : ''}
            />
        </g>
    );
};
