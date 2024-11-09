import { Point, ViewBox } from '@cloudflow/types';
import { RefObject } from 'react';

export const getRelativeCoordinatesForViewBox = (
    clientX: number,
    clientY: number,
    ref: RefObject<HTMLElement>,
    viewBox: ViewBox
): { x: number; y: number } => {
    if (!ref.current) return { x: 0, y: 0 };

    const zoomPan = ref.current.getBoundingClientRect();
    const relativeX = clientX - zoomPan.left;
    const relativeY = clientY - zoomPan.top;

    const { point } = viewBox;
    const x = (relativeX / zoomPan.width) * viewBox.width + point.x;
    const y = (relativeY / zoomPan.height) * viewBox.height + point.y;

    return { x, y };
};

export const getDistance = (point1: Point, point2: Point) => {
    return Math.sqrt((point1.x - point2.x) ** 2 + (point1.y - point2.y) ** 2);
};

export const getSvgPoint = (flow: SVGSVGElement, cursorPoint: Point) => {
    const svgPoint = flow.createSVGPoint();
    svgPoint.x = cursorPoint.x;
    svgPoint.y = cursorPoint.y;
    const screenCTM = flow.getScreenCTM();
    if (!screenCTM) return;
    return svgPoint.matrixTransform(screenCTM.inverse());
};
