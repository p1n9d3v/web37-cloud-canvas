import {
    GRID_2D_SIZE,
    GRID_3D_DEPTH_SIZE,
    GRID_3D_HEIGHT_SIZE,
    GRID_3D_WIDTH_SIZE,
} from '@cloud-graph/constants';
import { Dimension, GridPoint, Point, Size } from '@cloud-graph/types';

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

/* https://clintbellanger.net/articles/isometric_math/ */
export const gridToScreen = (gridPoint: GridPoint): Point => {
    const { col, row } = gridPoint;

    const x = (col - row) * (GRID_3D_WIDTH_SIZE / 2);
    const y = (col + row) * (GRID_3D_HEIGHT_SIZE / 2);

    return { x, y };
};

export const screenToGrid = (point: Point) => {
    const { x, y } = point;

    const col =
        (x / (GRID_3D_WIDTH_SIZE / 2) + y / (GRID_3D_HEIGHT_SIZE / 2)) / 2;
    const row =
        (y / (GRID_3D_HEIGHT_SIZE / 2) - x / (GRID_3D_WIDTH_SIZE / 2)) / 2;

    return { col, row };
};

export const getGridAlignedPoint = (
    point: Point,
    dimension: Dimension,
): Point => {
    if (dimension === '2d') {
        const snappedSize = GRID_2D_SIZE / 4;
        const gridAlignedX = Math.round(point.x / snappedSize) * snappedSize;
        const gridAlignedY = Math.round(point.y / snappedSize) * snappedSize;

        return {
            x: gridAlignedX,
            y: gridAlignedY,
        };
    } else if (dimension === '3d') {
        const snappedSize = 1 / 4;
        const { col, row } = screenToGrid(point);

        const snappedCol = Math.round(col / snappedSize) * snappedSize;
        const snappedRow = Math.round(row / snappedSize) * snappedSize;

        return gridToScreen({
            col: snappedCol,
            row: snappedRow,
        });
    } else {
        throw new Error('only support 2d and 3d dimension');
    }
};

export const getNodeSizeForDimension = (dimension: Dimension) => {
    const width = dimension === '2d' ? GRID_2D_SIZE : GRID_3D_WIDTH_SIZE;
    const height = dimension === '2d' ? GRID_2D_SIZE : GRID_3D_HEIGHT_SIZE;

    return { width, height };
};

export const calculateAnchorPoints = (
    point: Point,
    size: { width: number; height: number },
    dimension: Dimension,
) => {
    const { width, height } = size;

    return {
        top: { x: point.x + width / 2, y: point.y },
        right:
            dimension === '2d'
                ? { x: point.x + width, y: point.y + height / 2 }
                : {
                      x: point.x + width,
                      y: point.y + (height - GRID_3D_DEPTH_SIZE) / 2,
                  },
        left:
            dimension === '2d'
                ? { x: point.x, y: point.y + height / 2 }
                : {
                      x: point.x,
                      y: point.y + (height - GRID_3D_DEPTH_SIZE) / 2,
                  },
        bottom: { x: point.x + width / 2, y: point.y + height },
    };
};
