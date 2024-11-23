import { useTheme } from '@mui/material';
import { Edge, Point } from '@types';

type Props = {
    edge: Edge;
    isSelected: boolean;
    sourceConnector: Point;
    targetConnector: Point;
    onSplit: (id: string, point: Point, bendingPoints: Point[]) => void;
};

export default ({
    edge,
    isSelected,
    sourceConnector,
    targetConnector,
    onSplit,
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
        }

        const handleMouseUp = () => {
            document.removeEventListener('mouseup', handleMouseUp);
        };

        document.addEventListener('mouseup', handleMouseUp);
    };

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
