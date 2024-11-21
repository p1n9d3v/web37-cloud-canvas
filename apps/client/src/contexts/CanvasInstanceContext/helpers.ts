import { GRID_2D_SIZE, NODE_BASE_SIZE } from '@constants';
import { Dimension, Node } from '@types';
import {
    adjustPoint2dTo3d,
    adjustPoint3dTo2d,
    convert2dTo3dPoint,
    convert3dTo2dPoint,
} from '@utils';

export const computeGroupBounds = (nodes: Node[], dimension: Dimension) => {
    let points = nodes.map((node) => node.point);
    const padding = GRID_2D_SIZE * 2;
    if (dimension === '3d') {
        points = points.map((point) => convert3dTo2dPoint(point));
    }

    const minX = Math.min(...points.map((point) => point.x));
    const minY = Math.min(...points.map((point) => point.y));
    const maxX = Math.max(...points.map((point) => point.x + GRID_2D_SIZE));
    const maxY = Math.max(...points.map((point) => point.y + GRID_2D_SIZE));

    let x = minX - padding;
    let y = minY - padding;
    let width = maxX - minX + padding * 2;
    let height = maxY - minY + padding * 2;

    if (dimension === '3d') {
        const minPoint = convert2dTo3dPoint({
            x: minX - padding,
            y: minY - padding,
        });
        x = minPoint.x;
        y = minPoint.y;
    }

    return {
        x,
        y,
        width,
        height,
    };
};

export const adjustNodePoint = (node: Node, dimension: Dimension) => {
    const { point, size } = node;
    let result;
    if (dimension === '2d') {
        result = adjustPoint3dTo2d(
            point,
            size[dimension],
            NODE_BASE_SIZE[dimension],
        );
        result = convert3dTo2dPoint(result);
    } else {
        result = convert2dTo3dPoint(point);
        result = adjustPoint2dTo3d(
            result,
            size[dimension],
            NODE_BASE_SIZE[dimension],
        );
    }

    return result;
};

export const sortNodes = (nodes: Node[]) => {
    return nodes
        .sort((a, b) => {
            if (a.point.y === b.point.y) {
                return a.point.x - b.point.x;
            }
            return a.point.y - b.point.y;
        })
        .reduce((acc, node) => {
            return {
                ...acc,
                [node.id]: node,
            };
        }, {});
};
