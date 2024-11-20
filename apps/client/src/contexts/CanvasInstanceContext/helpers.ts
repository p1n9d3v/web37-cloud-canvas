import { GRID_2D_SIZE } from '@constants';
import { Dimension, Node } from '@types';
import { convert2dTo3dPoint, convert3dTo2dPoint } from '@utils';

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
