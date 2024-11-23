import { Point } from '@types';
import { getDistanceToSegment } from '@utils';

export const getClosestSegEdgeIdx = (bendPoints: Point[], point: Point) => {
    let closestDistance = Infinity;
    let closestSegmentIndex = -1;

    for (let i = 0; i < bendPoints.length - 1; i++) {
        const p1 = bendPoints[i];
        const p2 = bendPoints[i + 1];
        const distance = getDistanceToSegment(point, p1, p2);
        if (distance < closestDistance) {
            closestDistance = distance;
            closestSegmentIndex = i;
        }
    }

    if (closestSegmentIndex !== -1) {
        return closestSegmentIndex;
    }

    return bendPoints.length - 1;
};
