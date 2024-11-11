import { GRID_3D_HEIGHT_SIZE, GRID_3D_WIDTH_SIZE } from '@cloudflow/constants';
import { useFlowContext } from '@cloudflow/contexts/FlowContext';
import { useNodeContext } from '@cloudflow/contexts/NodeContext';
import { Point } from '@cloudflow/types';
import { getDistance, getSvgPoint } from '@cloudflow/utils';
import { GRID_SIZE } from '@constants';
import { useEffect, useRef, useState } from 'react';

export default () => {
    const { flowRef, dimension } = useFlowContext();
    const { dispatch: dispatchNode } = useNodeContext();

    const [isDragging, setIsDragging] = useState(false);
    const [draggingId, setDraggingId] = useState<string | null>(null);
    const [startDragPoint, setStartDragPoint] = useState<Point | null>(null);
    const [draggingPoint, setDraggingPoint] = useState<Point | null>(null);

    /* Relative Isometric grid calculations link: https://clintbellanger.net/articles/isometric_math/ */
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

            const { x, y } = gridToScreen(snappedCol, snappedRow);

            return {
                x,
                y,
            };
        } else {
            throw new Error('Invalid dimension');
        }
    };

    const startDragNode = (id: string, cursorPoint: Point) => {
        if (!flowRef.current) return;

        const svgPoint = getSvgPoint(flowRef.current, {
            x: cursorPoint.x,
            y: cursorPoint.y,
        });

        if (!svgPoint) return;

        setStartDragPoint({
            x: svgPoint.x,
            y: svgPoint.y,
        });
        setDraggingId(id);
        setIsDragging(true);
    };

    const dragNode = (cursorPoint: Point) => {
        if (!draggingId || !startDragPoint || !flowRef.current) return;

        const cursorSvgPoint = getSvgPoint(flowRef.current, {
            x: cursorPoint.x,
            y: cursorPoint.y,
        });

        if (cursorSvgPoint) {
            const distance = getDistance(startDragPoint, cursorSvgPoint);
            const snappedSize = dimension === '2d' ? GRID_SIZE / 4 : 1 / 4;
            if (distance < snappedSize) return;

            const nodeElement = document.getElementById(
                draggingId
            ) as SVGGraphicsElement | null;
            if (!nodeElement) return;

            const newPoint = getGridAlignedPoint(
                cursorSvgPoint,
                nodeElement,
                dimension,
                snappedSize
            );

            setDraggingPoint(newPoint);
        }
    };

    const endDragNode = () => {
        if (isDragging && draggingId && draggingPoint) {
            dispatchNode({
                type: 'MOVE_NODE',
                payload: { id: draggingId, point: draggingPoint },
            });
        }
        setDraggingPoint(null);
        setDraggingId(null);
        setStartDragPoint(null);
        setIsDragging(false);
    };

    useEffect(() => {
        document.body.style.cursor = isDragging ? 'grabbing' : 'auto';
    }, [isDragging]);

    return {
        draggingId,
        startDragPoint,
        draggingPoint,
        isDragging,
        startDragNode,
        dragNode,
        endDragNode,
    };
};
