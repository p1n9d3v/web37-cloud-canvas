import {
    GRID_2D_SIZE,
    GRID_3D_HEIGHT_SIZE,
    GRID_3D_WIDTH_SIZE,
} from '@constants';
import { Bounds, Point } from '@types';

export const getDistance = (point1: Point, point2: Point) => {
    return Math.sqrt((point1.x - point2.x) ** 2 + (point1.y - point2.y) ** 2);
};

export const getSvgPoint = (svg: SVGSVGElement, point: Point) => {
    const svgPoint = svg.createSVGPoint();
    svgPoint.x = point.x;
    svgPoint.y = point.y;
    const screenCTM = svg.getScreenCTM();
    return svgPoint.matrixTransform(screenCTM!.inverse());
};

export const gridToScreen = (point: { col: number; row: number }): Point => {
    const { col, row } = point;

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

export const getGridAlignedPoint2D = (point: Point) => {
    const snappedSize = GRID_2D_SIZE / 4;
    const gridAlignedX = Math.round(point.x / snappedSize) * snappedSize;
    const gridAlignedY = Math.round(point.y / snappedSize) * snappedSize;

    return {
        x: gridAlignedX,
        y: gridAlignedY,
    };
};

export const getGridAlignedPoint3D = (point: Point) => {
    const snappedSize = 1 / 4;
    const { col, row } = screenToGrid(point);
    const snappedCol = Math.round(col / snappedSize) * snappedSize;
    const snappedRow = Math.round(row / snappedSize) * snappedSize;
    return gridToScreen({
        col: snappedCol,
        row: snappedRow,
    });
};
