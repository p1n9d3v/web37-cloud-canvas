import { Dimension, Point } from '@cloud-graph/types';
import {
    getDistance,
    getGridAlignedPoint,
    getSvgPoint,
} from '@cloud-graph/utils';
import { useRef } from 'react';

type Props = {
    svg: SVGSVGElement;
    dimension: Dimension;
    handleMoveNode: (nodeId: string, point: Point) => void;
};

export default ({ svg, dimension, handleMoveNode }: Props) => {
    const isDragging = useRef<boolean>(false);
    const dragNodeBBox = useRef<DOMRect | null>(null);
    const draggingId = useRef<string | null>(null);
    const startDragPoint = useRef<Point | null>(null);

    const handleStartDrag = (nodeId: string, point: Point) => {
        const $node = svg.getElementById(nodeId) as SVGGElement;

        startDragPoint.current = getSvgPoint(svg, point);
        dragNodeBBox.current = $node.getBBox();
        draggingId.current = nodeId;
        isDragging.current = true;
    };

    const handleDrag = (point: Point) => {
        if (!isDragging || !draggingId) return;
        const curPoint = getSvgPoint(svg, point);
        const { width, height } = dragNodeBBox.current!;

        const distance = getDistance(curPoint, startDragPoint.current!);
        if (distance < 10) return;

        const centerPoint = {
            x: curPoint.x - width / 2,
            y: curPoint.y - height / 2,
        };
        const newPoint = getGridAlignedPoint(centerPoint, dimension);

        handleMoveNode(draggingId.current!, newPoint);
    };

    const handleStopDrag = () => {
        isDragging.current = false;
        draggingId.current = null;
        dragNodeBBox.current = null;
        startDragPoint.current = null;
    };

    return {
        handleStartDrag,
        handleStopDrag,
        handleDrag,
    };
};
