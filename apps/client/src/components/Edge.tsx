import { useCanvasDimensionContext } from '@contexts/CanvasDimensionContext';
import { useCanvasInstanceContext } from '@contexts/CanvasInstanceContext';
import { useTheme } from '@mui/material';
import { Edge, Point } from '@types';
import { getConnectorPoints } from '@utils';

type Props = {
    edge: Edge;
    isSelected: boolean;
};

export default ({ edge, isSelected }: Props) => {
    const { type } = edge;
    const theme = useTheme();
    const { dimension } = useCanvasDimensionContext();
    const {
        state: { nodes },
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
    console.log(sourceConnector);
    console.log(targetConnector);
    // const { id, type, source, target } = edge;
    // const timeoutRef = useRef<number | null>(null);
    //
    // const sourceAnchor = calculateAnchorPoints(source.node, dimension);
    // const targetAnchor = calculateAnchorPoints(target.node, dimension);
    //
    // const sourcePoint = source.anchorType
    //     ? sourceAnchor[source.anchorType]
    //     : source.node.point;
    // const targetPoint = target.anchorType
    //     ? targetAnchor[target.anchorType]
    //     : target.node.point;
    //
    //
    // const handleClick = (event: React.MouseEvent) => {
    //     if (event.shiftKey) {
    //         onSelectEntireEdge(edge);
    //     } else {
    //         onSelect(id);
    //     }
    // };
    //
    // const handleMouseDown = (event: React.MouseEvent) => {
    //     event.stopPropagation();
    //     timeoutRef.current = setTimeout(() => {
    //         const { clientX, clientY } = event;
    //         onSplit(edge, { x: clientX, y: clientY });
    //     }, );
    //
    //     const handleMouseUp = () => {
    //         if (timeoutRef.current) {
    //             clearTimeout(timeoutRef.current);
    //             timeoutRef.current = null;
    //         }
    //
    //         document.removeEventListener('mouseup', handleMouseUp);
    //     };
    //
    //     document.addEventListener('mouseup', handleMouseUp);
    // };

    return (
        <g
            // id={id}
            data-type="graph-edge"
            // onMouseDown={handleMouseDown}
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
            <line
                x1={sourceConnector.x}
                y1={sourceConnector.y}
                x2={targetConnector.x}
                y2={targetConnector.y}
                stroke={color}
                strokeWidth={2}
                markerEnd={type === 'arrow' ? 'url(#arrowhead)' : ''}
            />
        </g>
    );
};
