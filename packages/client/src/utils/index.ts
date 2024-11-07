import { GRID_SIZE, GRID_SIZE_HALF, POINTER_SIZE } from '@constants';
import { ViewBox } from '@types';
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

    const { position: viewBoxPosition } = viewBox;
    const x = (relativeX / zoomPan.width) * viewBox.width + viewBoxPosition.x;
    const y = (relativeY / zoomPan.height) * viewBox.height + viewBoxPosition.y;

    return { x, y };
};

export const getDistance = (
    pos1: { x: number; y: number },
    pos2: { x: number; y: number }
) => {
    return Math.sqrt((pos1.x - pos2.x) ** 2 + (pos1.y - pos2.y) ** 2);
};

export const calculateAnchorsPosition = (x: number, y: number) => {
    const top = { x: x + GRID_SIZE_HALF, y: y + POINTER_SIZE };
    const left = { x: x + POINTER_SIZE, y: y + GRID_SIZE_HALF };
    const right = {
        x: x + GRID_SIZE - POINTER_SIZE,
        y: y + GRID_SIZE_HALF,
    };
    const bottom = {
        x: x + GRID_SIZE_HALF,
        y: y + GRID_SIZE - POINTER_SIZE,
    };

    return { top, left, right, bottom };
};
