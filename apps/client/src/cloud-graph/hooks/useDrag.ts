import { useGraphContext } from '@cloud-graph/contexts/GraphContext';
import { Dimension, Point } from '@cloud-graph/types';
import {
    getDistance,
    getGridAlignedPoint,
    getSvgPoint,
    calculateAnchorPoints,
    findNearestAnchorPair,
    isUtilityNode,
} from '@cloud-graph/utils';
import { useRef } from 'react';

type Props = {
    svg: SVGSVGElement;
    dimension: Dimension;
};

export default function useDrag({ svg, dimension }: Props) {
    const { nodes, edges, dispatch } = useGraphContext();

    const isDragging = useRef<boolean>(false);
    const dragNodeBBox = useRef<DOMRect | null>(null);
    const draggingId = useRef<string | null>(null);
    const startDragPoint = useRef<Point | null>(null);

    const handleStartDrag = (nodeId: string, point: Point) => {
        const $node = svg.getElementById(nodeId) as SVGGElement;

        if (!$node) return;

        startDragPoint.current = getSvgPoint(svg, point);
        dragNodeBBox.current = $node.getBBox();
        draggingId.current = nodeId;
        isDragging.current = true;
    };

    const calculateUpdatedNodes = (newPoint: Point) => {
        return nodes
            .map((node) =>
                node.id === draggingId.current
                    ? { ...node, point: newPoint }
                    : node,
            )
            .sort((a, b) => {
                if (a.point.y === b.point.y) {
                    return a.point.x - b.point.x;
                }
                return a.point.y - b.point.y;
            });
    };

    const calculateUpdatedEdges = (newPoint: Point) => {
        return edges.map((edge) => {
            const sourceAnchors = calculateAnchorPoints(
                edge.source.node,
                dimension,
            );
            const targetAnchors = calculateAnchorPoints(
                edge.target.node,
                dimension,
            );

            const nearestAnchorPair = findNearestAnchorPair(
                sourceAnchors,
                targetAnchors,
            );

            if (edge.source.node.id === draggingId.current) {
                return {
                    ...edge,
                    source: {
                        ...edge.source,
                        node: {
                            ...edge.source.node,
                            point: newPoint,
                        },
                        anchorType: !isUtilityNode(edge.source.node)
                            ? nearestAnchorPair.sourceAnchorType
                            : undefined,
                    },
                    target: {
                        ...edge.target,
                        anchorType: !isUtilityNode(edge.target.node)
                            ? nearestAnchorPair.targetAnchorType
                            : undefined,
                    },
                };
            }
            if (edge.target.node.id === draggingId.current) {
                return {
                    ...edge,
                    source: {
                        ...edge.source,
                        anchorType: !isUtilityNode(edge.source.node)
                            ? nearestAnchorPair.sourceAnchorType
                            : undefined,
                    },
                    target: {
                        ...edge.target,
                        node: {
                            ...edge.target.node,
                            point: newPoint,
                        },
                        anchorType: !isUtilityNode(edge.target.node)
                            ? nearestAnchorPair.targetAnchorType
                            : undefined,
                    },
                };
            }

            return edge;
        });
    };

    const handleDrag = (point: Point) => {
        if (!isDragging.current || !draggingId.current) return;

        const curPoint = getSvgPoint(svg, point);
        const { width, height } = dragNodeBBox.current!;

        const distance = getDistance(curPoint, startDragPoint.current!);
        if (distance < 10) return;

        const centerPoint = {
            x: curPoint.x - width / 2,
            y: curPoint.y - height / 2,
        };
        const newPoint = getGridAlignedPoint(centerPoint, dimension);

        const updatedNodes = calculateUpdatedNodes(newPoint);
        const updatedEdges = calculateUpdatedEdges(newPoint);

        dispatch({
            type: 'MOVE_NODE',
            payload: {
                nodes: updatedNodes,
                edges: updatedEdges,
            },
        });
    };

    const handleStopDrag = () => {
        isDragging.current = false;
        draggingId.current = null;
        dragNodeBBox.current = null;
        startDragPoint.current = null;
    };

    return {
        handleStartDrag,
        handleDrag,
        handleStopDrag,
    };
}
