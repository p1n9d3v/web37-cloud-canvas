import { useTheme } from '@mui/material';
import { Edge, Point } from '@types';
import { useEffect } from 'react';

type Props = {
    edge: Edge;
    isSelected: boolean;
    sourceConnector: Point;
    targetConnector: Point;
    onSplit: (id: string, point: Point, bendingPoints: Point[]) => void;
    onSelect: (id: string) => void;
    onRemove: (id: string) => void;
};

export default ({
    edge,
    isSelected,
    sourceConnector,
    targetConnector,
    onSplit,
    onSelect,
    onRemove,
}: Props) => {
    const { id, type, bendingPoints } = edge;
    const theme = useTheme();
    const color = isSelected
        ? theme.palette.primary.main
        : theme.palette.text.primary;

    const bendPointsString = bendingPoints
        .map((point) => `${point.x},${point.y}`)
        .join(' ');
    const allPoints = `${sourceConnector.x},${sourceConnector.y} ${bendPointsString} ${targetConnector.x},${targetConnector.y}`;

    const handleMouseDown = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (e.ctrlKey) {
            const { clientX, clientY } = e;
            onSplit(edge.id, { x: clientX, y: clientY }, [
                sourceConnector,
                ...bendingPoints,
                targetConnector,
            ]);
        } else {
            onSelect(id);
        }

        const handleMouseUp = () => {
            document.removeEventListener('mouseup', handleMouseUp);
        };

        document.addEventListener('mouseup', handleMouseUp);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Backspace') {
            onRemove(id);
        }
    };

    useEffect(() => {
        if (isSelected) {
            document.addEventListener('keydown', handleKeyDown);
        }
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isSelected]);

    return (
        <g id={id} data-type="edge" onMouseDown={handleMouseDown}>
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
            <polyline
                points={allPoints}
                stroke={color}
                strokeWidth={3}
                fill="none"
                markerEnd={type === 'arrow' ? 'url(#arrowhead)' : ''}
                cursor="pointer"
            />
        </g>
    );
};
