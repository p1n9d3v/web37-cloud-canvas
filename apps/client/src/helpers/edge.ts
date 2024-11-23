import { Node, Point } from '@types';
import { getDistance } from '@utils';

export const getNearestConnector = (nodes: Node[], point: Point) => {
    let minDistance = Infinity;
    let newPoint = point;
    let target = null;

    nodes.forEach((node) => {
        Object.entries(node.connectors).forEach(
            ([connectorType, connectorPoint]) => {
                const distance = getDistance(point, connectorPoint);
                const threshold = 30;
                if (distance < threshold && distance < minDistance) {
                    target = {
                        id: node.id,
                        connectorType,
                    };
                    newPoint = point;
                    minDistance = distance;
                }
            },
        );
    });

    return { target, point: newPoint };
};
