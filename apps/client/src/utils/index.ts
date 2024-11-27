import {
    GRID_2D_SIZE,
    GRID_3D_HEIGHT_SIZE,
    GRID_3D_WIDTH_SIZE,
} from '@constants';
import { ConnectorMap, Dimension, GridPoint, Node, Point } from '@types';

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

export const generateRandomRGB = () => {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return `rgb(${r},${g},${b})`;
};

export const getConnectorPoints = (
    node: Node,
    dimension: Dimension,
): Omit<ConnectorMap, 'center'> => {
    const point = node.point;
    const { width, height } = node.size[dimension];
    const depth = GRID_3D_HEIGHT_SIZE / 2;
    return {
        top: { x: point.x + width / 2, y: point.y },
        right:
            dimension === '2d'
                ? { x: point.x + width, y: point.y + height / 2 }
                : {
                      x: point.x + width,
                      y: point.y + (height - depth) / 2,
                  },
        left:
            dimension === '2d'
                ? { x: point.x, y: point.y + height / 2 }
                : {
                      x: point.x,
                      y: point.y + (height - depth) / 2,
                  },
        bottom: { x: point.x + width / 2, y: point.y + height },
    };
};

//INFO: 선분과 내적/외적 사이의 최단 거리를 계산(For Bend Point)
export const getDistanceToSegment = (
    p: Point,
    p1: Point,
    p2: Point,
): number => {
    const A = p.x - p1.x;
    const B = p.y - p1.y;
    const C = p2.x - p1.x;
    const D = p2.y - p1.y;

    const dot = A * C + B * D;
    const len_sq = C * C + D * D;
    let param = -1;
    if (len_sq !== 0) param = dot / len_sq;

    let xx, yy;

    if (param < 0) {
        xx = p1.x;
        yy = p1.y;
    } else if (param > 1) {
        xx = p2.x;
        yy = p2.y;
    } else {
        xx = p1.x + param * C;
        yy = p1.y + param * D;
    }

    const dx = p.x - xx;
    const dy = p.y - yy;
    return Math.sqrt(dx * dx + dy * dy);
};

const debounce = (func: (...args: any[]) => void, delay: number) => {
    let timeout: ReturnType<typeof setTimeout> | null = null;

    return (...args: any[]) => {
        if (timeout) clearTimeout(timeout); // 이전 타이머 제거
        timeout = setTimeout(() => {
            func(...args); // 지정된 시간 후 함수 실행
        }, delay);
    };
};
