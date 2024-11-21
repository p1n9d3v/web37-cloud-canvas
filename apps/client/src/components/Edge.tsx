import BendPointer from '@components/BendPointer';
import { useCanvasContext } from '@contexts/CanvasContext';
import { useCanvasDimensionContext } from '@contexts/CanvasDimensionContext';
import { useCanvasInstanceContext } from '@contexts/CanvasInstanceContext';
import { useTheme } from '@mui/material';
import { Edge, Point } from '@types';
import { getConnectorPoints, getDistanceToSegment, getSvgPoint } from '@utils';

type Props = {
    edge: Edge;
    isSelected: boolean;
};

export default ({ edge, isSelected }: Props) => {
    const { id, type, bendPoints } = edge;
    const theme = useTheme();
    const { dimension } = useCanvasDimensionContext();
    const { canvas } = useCanvasContext();
    const {
        state: { nodes },
        dispatch,
    } = useCanvasInstanceContext();

    const sourceConnector = getConnectorPoints(
        nodes[edge.source.id],
        dimension,
    )[edge.source.connectorType];
    const targetConnector = getConnectorPoints(
        nodes[edge.target.id],
        dimension,
    )[edge.target.connectorType];

    const color = isSelected
        ? theme.palette.primary.main
        : theme.palette.text.primary;

    const splitEdge = (point: Point) => {
        const svgPoint = getSvgPoint(canvas, point);
        const allPoints: Point[] = [
            sourceConnector,
            ...bendPoints,
            targetConnector,
        ];

        // 가장 가까운 선분 찾기
        let closestDistance = Infinity;
        let closestSegmentIndex = -1;

        for (let i = 0; i < allPoints.length - 1; i++) {
            const p1 = allPoints[i];
            const p2 = allPoints[i + 1];
            const distance = getDistanceToSegment(svgPoint, p1, p2);
            if (distance < closestDistance) {
                closestDistance = distance;
                closestSegmentIndex = i;
            }
        }

        if (closestSegmentIndex !== -1) {
            // 가장 가까운 선분 뒤에 포인트 삽입
            dispatch({
                type: 'SPLIT_EDGE',
                payload: {
                    edgeId: edge.id,
                    point: svgPoint,
                    insertAfter: closestSegmentIndex,
                },
            });
        }
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (e.ctrlKey) {
            const { clientX, clientY } = e;
            splitEdge({ x: clientX, y: clientY });
        }

        const handleMouseUp = () => {
            document.removeEventListener('mouseup', handleMouseUp);
        };

        document.addEventListener('mouseup', handleMouseUp);
    };

    const bendPointsString = bendPoints
        .map((point) => `${point.x},${point.y}`)
        .join(' ');
    const allPoints = `${sourceConnector.x},${sourceConnector.y} ${bendPointsString} ${targetConnector.x},${targetConnector.y}`;

    return (
        <g
            id={id}
            data-type="edge"
            onMouseDown={handleMouseDown}
            // onClick={handleClick}
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
            <polyline
                points={allPoints}
                stroke={color}
                strokeWidth={2}
                fill="none"
                markerEnd={type === 'arrow' ? 'url(#arrowhead)' : ''}
            />

            {bendPoints.map((bendPoint, index) => (
                <BendPointer
                    key={`${edge.id}-${index}`}
                    edgeId={edge.id}
                    point={bendPoint}
                    index={index}
                />
            ))}
        </g>
    );
};
