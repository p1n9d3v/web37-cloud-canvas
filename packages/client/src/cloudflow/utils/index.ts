import { ViewBox } from '@cloudflow/types';
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
