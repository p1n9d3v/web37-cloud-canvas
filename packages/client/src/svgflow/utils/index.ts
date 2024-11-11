import {
    GRID_3D_DEPTH_SIZE,
    GRID_3D_HEIGHT_SIZE,
    GRID_3D_WIDTH_SIZE,
    GRID_SIZE,
} from '@svgflow/constants';
import { AnchorType, Dimension, Point } from '@svgflow/types';

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
    dimension: Dimension
): Record<AnchorType, Point> => {
    const { width, height } = getNodeSizeForDimension(dimension);
    return {
        top: { x: point.x + width / 2, y: point.y },
        right: { x: point.x + width, y: point.y + height / 2 },
        bottom: { x: point.x + width / 2, y: point.y + height },
        left: { x: point.x, y: point.y + height / 2 },
    };
};
