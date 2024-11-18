import { GRID_SIZE } from '@cloudflow/constants';
import { useEdgeContext } from '@cloudflow/contexts/EdgeContext';
import { useNodeContext } from '@cloudflow/contexts/NodeContext';
import { AnchorsPoint, AnchorType, Dimension, Point } from '@cloudflow/types';
import {
    calculateAnchorPoints,
    getDistance,
    getSvgPoint,
    gridToScreen,
    screenToGrid,
} from '@cloudflow/utils';
import { RefObject, useCallback, useRef, useState } from 'react';

export default (flowRef: RefObject<SVGSVGElement>, dimension: Dimension) => {
    const {
        state: { edges },
        dispatch: dispatchEdge,
    } = useEdgeContext();
    const { dispatch: dispatchNode } = useNodeContext();
    const startDragPoint = useRef<Point | null>(null);

    const [draggingId, setDraggingId] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    const getGridAlignedPoint = (
        cursorPoint: Point,
        nodeElement: SVGGraphicsElement,
        dimension: '2d' | '3d',
        gridSize: number,
    ): Point => {
        const bbox = nodeElement.getBBox();
        const newX = cursorPoint.x - bbox.width / 2;
        const newY = cursorPoint.y - bbox.height / 2;
        if (dimension === '2d') {
            const gridAlignedX = Math.round(newX / gridSize) * gridSize;
            const gridAlignedY = Math.round(newY / gridSize) * gridSize;

            return {
                x: gridAlignedX,
                y: gridAlignedY,
            };
        } else if (dimension === '3d') {
            const { col, row } = screenToGrid(newX, newY);

            const snappedCol = Math.round(col / gridSize) * gridSize;
            const snappedRow = Math.round(row / gridSize) * gridSize;

            return gridToScreen(snappedCol, snappedRow);
        } else {
            throw new Error('only support 2d and 3d dimension');
        }
    };

    const handleStartDragNode = useCallback((nodeId: string, point: Point) => {
        const svgPoint = getSvgPoint(flowRef.current!, {
            x: point.x,
            y: point.y,
        });

        startDragPoint.current = {
            x: svgPoint.x,
            y: svgPoint.y,
        };
        setDraggingId(nodeId);
        setIsDragging(true);
    }, []);

    const handleDragNode = useCallback(
        (point: Point) => {
            if (!isDragging || !draggingId || !flowRef.current) return;
            const cursorSvgPoint = getSvgPoint(flowRef.current!, {
                x: point.x,
                y: point.y,
            });

            if (cursorSvgPoint) {
                const distance = getDistance(
                    startDragPoint.current!,
                    cursorSvgPoint,
                );
                const snappedSize = dimension === '2d' ? GRID_SIZE / 4 : 1 / 4;
                if (distance < snappedSize / 2) return;

                const nodeElement = flowRef.current!.getElementById(
                    draggingId,
                ) as SVGGraphicsElement;
                if (!nodeElement) return;

                const newPoint = getGridAlignedPoint(
                    cursorSvgPoint,
                    nodeElement,
                    dimension,
                    snappedSize,
                );

                dispatchNode({
                    type: 'MOVE_NODE',
                    payload: {
                        id: draggingId,
                        point: newPoint,
                    },
                });

                if (
                    (nodeElement as SVGGElement).dataset.nodeType !== 'pointer'
                ) {
                    updateEdgesToNearestAnchors(newPoint);
                }
            }
        },
        [isDragging, draggingId, dimension],
    );

    const findNearestAnchorPair = (
        draggingAnchorPoints: AnchorsPoint,
        connectedAnchorPoints: AnchorsPoint,
    ) => {
        let nearestAnchorPair = {
            draggingAnchorType: null as AnchorType | null,
            connectedAnchorType: null as AnchorType | null,
            distance: Infinity,
        };

        Object.entries(draggingAnchorPoints).forEach(
            ([draggingAnchorType, draggingAnchorPoint]) => {
                Object.entries(connectedAnchorPoints).forEach(
                    ([connectedAnchorType, connectedAnchorPoint]) => {
                        if (draggingAnchorType === connectedAnchorType) return;

                        const distance = getDistance(
                            draggingAnchorPoint,
                            connectedAnchorPoint,
                        );

                        if (distance < nearestAnchorPair.distance) {
                            nearestAnchorPair = {
                                draggingAnchorType:
                                    draggingAnchorType as AnchorType,
                                connectedAnchorType:
                                    connectedAnchorType as AnchorType,
                                distance,
                            };
                        }
                    },
                );
            },
        );

        return nearestAnchorPair;
    };

    const updateEdgesToNearestAnchors = (cursorSvgPoint: Point) => {
        const connectedEdges = edges.filter((edge) => {
            return (
                edge.source.id === draggingId || edge.target.id === draggingId
            );
        });

        if (connectedEdges.length === 0) return;

        const draggingAnchorPoints = calculateAnchorPoints(
            cursorSvgPoint,
            dimension,
        );

        connectedEdges.forEach((edge) => {
            const { source, target } = edge;

            const isDraggingSource = source.id === draggingId;
            const connectedAnchorPoints = calculateAnchorPoints(
                isDraggingSource ? target.point : source.point,
                dimension,
            );

            const nearestAnchorPair = findNearestAnchorPair(
                draggingAnchorPoints,
                connectedAnchorPoints,
            );

            // 포인터일 경우 anchorType을 변경하지 않음
            if (target.type === 'pointer' || source.type === 'pointer') {
                nearestAnchorPair.connectedAnchorType = null;
            }

            dispatchEdge({
                type: 'UPDATE_EDGE',
                payload: {
                    edgeId: edge.id,
                    data: {
                        source: {
                            ...source,
                            anchorType: isDraggingSource
                                ? nearestAnchorPair.draggingAnchorType!
                                : nearestAnchorPair.connectedAnchorType!,
                        },
                        target: {
                            ...target,
                            anchorType: isDraggingSource
                                ? nearestAnchorPair.connectedAnchorType!
                                : nearestAnchorPair.draggingAnchorType!,
                        },
                    },
                },
            });
        });
    };

    const handleEndDragNode = useCallback(() => {
        setDraggingId(null);
        setIsDragging(false);
        startDragPoint.current = null;
    }, []);

    return {
        isDragging,
        handleStartDragNode,
        handleDragNode,
        handleEndDragNode,
    };
};
