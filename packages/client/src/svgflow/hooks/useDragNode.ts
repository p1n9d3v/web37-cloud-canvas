import {
    GRID_3D_HEIGHT_SIZE,
    GRID_3D_WIDTH_SIZE,
    GRID_SIZE,
} from '@svgflow/constants';
import { useNodeContext } from '@svgflow/contexts/NodeContext';
import { Dimension, Point } from '@svgflow/types';
import { getDistance, getSvgPoint } from '@svgflow/utils';
import { RefObject, useCallback, useEffect, useRef, useState } from 'react';

export default (flowRef: RefObject<SVGSVGElement>, dimension: Dimension) => {
    const { dispatch: dispatchNode } = useNodeContext();
    const startDragPoint = useRef<Point | null>(null);

    const [draggingId, setDraggingId] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    const gridToScreen = (col: number, row: number): Point => {
        const x = (col - row) * (GRID_3D_WIDTH_SIZE / 2);
        const y = (col + row) * (GRID_3D_HEIGHT_SIZE / 2);
        return { x, y };
    };

    const screenToGrid = (
        x: number,
        y: number
    ): { col: number; row: number } => {
        const col =
            (x / (GRID_3D_WIDTH_SIZE / 2) + y / (GRID_3D_HEIGHT_SIZE / 2)) / 2;
        const row =
            (y / (GRID_3D_HEIGHT_SIZE / 2) - x / (GRID_3D_WIDTH_SIZE / 2)) / 2;
        return { col, row };
    };

    const getGridAlignedPoint = (
        cursorPoint: Point,
        nodeElement: SVGGraphicsElement,
        dimension: '2d' | '3d',
        gridSize: number
    ): Point => {
        const bbox = nodeElement.getBBox();
        const newX = cursorPoint.x - bbox.width / 2;
        const newY = cursorPoint.y - bbox.height / 2;
        if (dimension === '2d') {
            const gridAlignedX = Math.floor(newX / gridSize) * gridSize;
            const gridAlignedY = Math.floor(newY / gridSize) * gridSize;

            return {
                x: gridAlignedX,
                y: gridAlignedY,
            };
        } else if (dimension === '3d') {
            const { col, row } = screenToGrid(newX, newY);

            const snappedCol = Math.floor(col / gridSize) * gridSize;
            const snappedRow = Math.floor(row / gridSize) * gridSize;

            return gridToScreen(snappedCol, snappedRow);
        } else {
            throw new Error('Invalid dimension');
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

    const handleDragNode = (point: Point) => {
        if (!isDragging || !draggingId || !flowRef.current) return;
        const cursorSvgPoint = getSvgPoint(flowRef.current, {
            x: point.x,
            y: point.y,
        });

        if (cursorSvgPoint) {
            const distance = getDistance(
                startDragPoint.current!,
                cursorSvgPoint
            );
            const snappedSize = dimension === '2d' ? GRID_SIZE / 4 : 1 / 4;
            if (distance < snappedSize) return;

            const nodeElement = flowRef.current!.getElementById(
                draggingId
            ) as SVGGraphicsElement | null;
            if (!nodeElement) return;

            const newPoint = getGridAlignedPoint(
                cursorSvgPoint,
                nodeElement,
                dimension,
                snappedSize
            );

            dispatchNode({
                type: 'MOVE_NODE',
                payload: {
                    id: draggingId,
                    point: newPoint,
                },
            });
        }
    };

    const handleEndDragNode = () => {
        setDraggingId(null);
        setIsDragging(false);
        startDragPoint.current = null;
    };

    return {
        isDragging,
        handleStartDragNode,
        handleDragNode,
        handleEndDragNode,
    };
};
