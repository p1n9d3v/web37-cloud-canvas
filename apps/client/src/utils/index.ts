import {
    GRID_2D_SIZE,
    GRID_3D_HEIGHT_SIZE,
    GRID_3D_WIDTH_SIZE,
} from '@constants';
import { GridPoint, Point, Size } from '@types';

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

export const gridToScreen3d = (gridPoint: GridPoint): Point => {
    const { col, row } = gridPoint;

    const x = (col - row) * (GRID_3D_WIDTH_SIZE / 2);
    const y = (col + row) * (GRID_3D_HEIGHT_SIZE / 2);

    return { x, y };
};

export const screenToGrid3d = (point: Point) => {
    const { x, y } = point;

    const col =
        (x / (GRID_3D_WIDTH_SIZE / 2) + y / (GRID_3D_HEIGHT_SIZE / 2)) / 2;
    const row =
        (y / (GRID_3D_HEIGHT_SIZE / 2) - x / (GRID_3D_WIDTH_SIZE / 2)) / 2;

    return { col, row };
};

export const screenToGrid2d = (point: Point) => {
    const { x, y } = point;
    const col = x / GRID_2D_SIZE;
    const row = y / GRID_2D_SIZE;

    return { col, row };
};

export const gridToScreen2d = (gridPoint: GridPoint): Point => {
    const { col, row } = gridPoint;
    const x = col * GRID_2D_SIZE;
    const y = row * GRID_2D_SIZE;
    return { x, y };
};

export const alignPoint2d = (point: Point) => {
    const snappedSize = GRID_2D_SIZE / 4;
    const gridAlignedX = Math.round(point.x / snappedSize) * snappedSize;
    const gridAlignedY = Math.round(point.y / snappedSize) * snappedSize;

    return {
        x: gridAlignedX,
        y: gridAlignedY,
    };
};

export const alignPoint3d = (point: Point) => {
    const { col, row } = screenToGrid3d(point);

    const snappedSize = 1 / 4;
    const snappedCol = Math.round(col / snappedSize) * snappedSize;
    const snappedRow = Math.round(row / snappedSize) * snappedSize;

    return gridToScreen3d({
        col: snappedCol,
        row: snappedRow,
    });
};

export const convert3dTo2dPoint = (point: Point) => {
    return gridToScreen2d(screenToGrid3d(point));
};

export const convert2dTo3dPoint = (point: Point) => {
    return gridToScreen3d(screenToGrid2d(point));
};

//INFO: 처음이 2d로 시작하기 때문에 nodeSize : 3d , baseSize : 3d로 해야함
export const adjustPoint3dTo2d = (
    point: Point,
    nodeSize: Size,
    baseSize: Size,
) => {
    return {
        x: point.x - (baseSize.width - nodeSize.width) / 2,
        y:
            point.y -
            (baseSize.height - nodeSize.height - (nodeSize.offset || 0)),
    };
};

export const adjustPoint2dTo3d = (
    point: Point,
    nodeSize: Size,
    baseSize: Size,
) => {
    return {
        x: point.x + (baseSize.width - nodeSize.width) / 2,
        y:
            point.y +
            (baseSize.height - nodeSize.height - (nodeSize.offset || 0)),
    };
};
