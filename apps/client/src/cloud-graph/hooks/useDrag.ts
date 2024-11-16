import { useDimensionContext } from '@cloud-graph/contexts/DimensionContext';
import { useGraphContext } from '@cloud-graph/contexts/GraphContext';
import { useViewportContext } from '@cloud-graph/contexts/ViewportContext';
import { Point } from '@cloud-graph/types';
import {
    getDistance,
    getGridAlignedPoint,
    getSvgPoint,
} from '@cloud-graph/utils';
import { useRef } from 'react';

export default () => {
    const { viewportRef } = useViewportContext();
    const { dimension } = useDimensionContext();
    const { moveNode } = useGraphContext();

    const dragNodeBBox = useRef<DOMRect | null>(null);
    const isDragging = useRef<boolean>(false);
    const draggingId = useRef<string | null>(null);
    const startDragPoint = useRef<Point | null>(null);

    const startDrag = (nodeId: string, point: Point) => {
        const $node = viewportRef.current!.getElementById(
            nodeId,
        ) as SVGGElement;

        startDragPoint.current = getSvgPoint(viewportRef.current!, point);
        dragNodeBBox.current = $node.getBBox();
        draggingId.current = nodeId;
        isDragging.current = true;
    };

    const drag = (point: Point) => {
        if (!isDragging || !draggingId || !viewportRef.current) return;
        const curPoint = getSvgPoint(viewportRef.current, point);
        const { width, height } = dragNodeBBox.current!;

        const distance = getDistance(curPoint, startDragPoint.current!);
        if (distance < 10) return;

        const centerPoint = {
            x: curPoint.x - width / 2,
            y: curPoint.y - height / 2,
        };
        const newPoint = getGridAlignedPoint(centerPoint, dimension);

        moveNode(draggingId.current!, newPoint);
    };

    const stopDrag = () => {
        isDragging.current = false;
        draggingId.current = null;
        dragNodeBBox.current = null;
        startDragPoint.current = null;
    };

    return {
        startDrag,
        stopDrag,
        drag,
    };
};
