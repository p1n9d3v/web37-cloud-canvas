import {
    GRID_QUARTER_SIZE,
    GRID_3D_WIDTH_SIZE,
    GRID_3D_HEIGHT_SIZE,
} from '@cloudflow/constants';
import { useFlowContext } from '@cloudflow/contexts/FlowContext';
import { useDragContext } from '@cloudflow/contexts/DragContext';
import { useGraphNodeContext } from '@cloudflow/contexts/GraphNodeContext';
import { Point } from '@cloudflow/types';
import { getDistance, getSvgPoint } from '@cloudflow/utils';
import { useEffect } from 'react';
import { GRID_SIZE } from '@constants';

export default () => {
    const { flowRef, dimension } = useFlowContext();
    const { dispatch: dispatchNode } = useGraphNodeContext();
    const { startDragPoint, isDragging, draggingId, startDrag, endDrag } =
        useDragContext();

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

        const point = getSvgPoint(flowRef.current, {
            x: cursorPoint.x,
            y: cursorPoint.y,
        });

        startDrag(id, point);
    };

    const dragNode = (cursorPoint: Point) => {
        if (!isDragging || !draggingId || !flowRef.current) return;

        const cursorSvgPoint = getSvgPoint(flowRef.current, {
            x: cursorPoint.x,
            y: cursorPoint.y,
        });

        if (cursorSvgPoint) {
            const distance = getDistance(startDragPoint, cursorSvgPoint);
            if (distance < GRID_QUARTER_SIZE) return;

            const nodeElement = document.getElementById(
                draggingId
            ) as SVGGraphicsElement | null;
            if (!nodeElement) return;

            const snappedSize = dimension === '2d' ? GRID_SIZE / 4 : 1 / 4;

            const newPoint = getGridAlignedPoint(
                cursorSvgPoint,
                nodeElement,
                dimension,
                snappedSize
            );

            dispatchNode({
                type: 'MOVE_NODE',
                payload: { id: draggingId, point: newPoint },
            });
        }
    };

    const endDragNode = () => endDrag();

    useEffect(() => {
        document.body.style.cursor = isDragging ? 'grabbing' : 'auto';
    }, [isDragging]);

    return {
        startDragPoint,
        isDragging,
        startDragNode,
        dragNode,
        endDragNode,
    };
};
