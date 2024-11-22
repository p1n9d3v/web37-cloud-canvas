import { Dimension, Node, Point } from '@types';
import { alignPoint2d, alignPoint3d } from '@utils';

export const alignNodePoint = (
    node: Node,
    newPoint: Point,
    dimension: Dimension,
) => {
    let result = newPoint;
    if (dimension === '2d') {
        result = alignPoint2d(result);
    } else {
        const adjustPoint = {
            x: result.x + node.size[dimension].width / 2,
            y: result.y + node.size[dimension].height,
        };
        result = alignPoint3d(adjustPoint);
        result = {
            x: result.x - node.size[dimension].width / 2,
            y:
                result.y -
                node.size[dimension].height -
                (node.size[dimension].offset || 0),
        };
    }

    return result;
};
