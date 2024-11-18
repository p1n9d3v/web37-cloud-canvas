import {
    GRID_3D_DEPTH_SIZE,
    GRID_3D_HEIGHT_SIZE,
    GRID_3D_WIDTH_SIZE,
    GRID_SIZE,
} from '@cloudflow/constants';
import { AnchorsPoint, Dimension, Point } from '@cloudflow/types';

export const getDistance = (point1: Point, point2: Point) => {
    return Math.sqrt((point1.x - point2.x) ** 2 + (point1.y - point2.y) ** 2);
};

export const getSvgPoint = (flow: SVGSVGElement, cursorPoint: Point) => {
    const svgPoint = flow.createSVGPoint();
    svgPoint.x = cursorPoint.x;
    svgPoint.y = cursorPoint.y;
    const screenCTM = flow.getScreenCTM();
    return svgPoint.matrixTransform(screenCTM!.inverse());
};

export const getNodeSizeForDimension = (dimension: Dimension) => {
    const width = dimension === '2d' ? GRID_SIZE : GRID_3D_WIDTH_SIZE;
    const height =
        dimension === '2d'
            ? GRID_SIZE
            : GRID_3D_HEIGHT_SIZE + GRID_3D_DEPTH_SIZE;

    return { width, height };
};

export const calculateAnchorPoints = (
    point: Point,
    dimension: Dimension,
): AnchorsPoint => {
    const { width, height } = getNodeSizeForDimension(dimension);

    return {
        top: { x: point.x + width / 2, y: point.y },
        right: { x: point.x + width, y: point.y + height / 2 },
        bottom: { x: point.x + width / 2, y: point.y + height },
        left: { x: point.x, y: point.y + height / 2 },
    };
};

export const gridToScreen = (col: number, row: number): Point => {
    const x = (col - row) * (GRID_3D_WIDTH_SIZE / 2);
    const y = (col + row) * (GRID_3D_HEIGHT_SIZE / 2);
    return { x, y };
};

export const screenToGrid = (
    x: number,
    y: number,
): { col: number; row: number } => {
    const col =
        (x / (GRID_3D_WIDTH_SIZE / 2) + y / (GRID_3D_HEIGHT_SIZE / 2)) / 2;
    const row =
        (y / (GRID_3D_HEIGHT_SIZE / 2) - x / (GRID_3D_WIDTH_SIZE / 2)) / 2;
    return { col, row };
};

export const getGridAlignedPoint = (point: Point, dimension: Dimension) => {
    const snappedSize = dimension === '2d' ? GRID_SIZE / 4 : 1 / 4;

    if (dimension === '2d') {
        const gridAlignedX = Math.round(point.x / snappedSize) * snappedSize;
        const gridAlignedY = Math.round(point.y / snappedSize) * snappedSize;

        return screenToGrid(gridAlignedX, gridAlignedY);
    }

    const { col, row } = screenToGrid(point.x, point.y);

    const snappedCol = Math.round(col / snappedSize) * snappedSize;
    const snappedRow = Math.round(row / snappedSize) * snappedSize;

    return { col: snappedCol, row: snappedRow };
};
