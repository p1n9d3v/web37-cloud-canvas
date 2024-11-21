import { GRID_2D_SIZE, NODE_BASE_SIZE } from '@constants';
import { CanvasInstanceState } from '@contexts/CanvasInstanceContext/reducer';
import { Bounds, Dimension, Group, Node, Point } from '@types';
import {
    alignPoint2d,
    alignPoint3d,
    convert2dTo3dPoint,
    convert3dTo2dPoint,
    getNodeOffsetForConvertDimension,
} from '@utils';

export const computeBounds = (_bounds: Bounds[], dimension: Dimension) => {
    const padding = GRID_2D_SIZE * 2;
    let bounds = _bounds;
    if (dimension === '3d') {
        bounds = bounds.map((bound) => ({
            ...bound,
            ...convert3dTo2dPoint({
                x: bound.x,
                y: bound.y,
            }),
        }));
    }

    const minX = Math.min(...bounds.map((bounds) => bounds.x));
    const minY = Math.min(...bounds.map((bounds) => bounds.y));
    const maxX = Math.max(...bounds.map((bounds) => bounds.x + bounds.width));
    const maxY = Math.max(...bounds.map((bounds) => bounds.y + bounds.height));

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

//TODO: 추후 리팩토링 필요
export const updateGroupBounds = (
    state: Pick<CanvasInstanceState, 'groups' | 'nodes'>,
    groups: Group[],
    dimension: Dimension,
) => {
    return groups.reduce((acc, group) => {
        const childrenGroupBounds = group.childGroupIds.map(
            (groupId) => state.groups[groupId].bounds,
        );

        const nodeBounds = group.nodeIds.map((nodeId) =>
            getNodeBounds(state.nodes[nodeId], dimension),
        );

        const groupBounds = computeBounds(
            [...nodeBounds, ...childrenGroupBounds],
            dimension,
        );

        return {
            ...acc,
            [group.id]: {
                ...group,
                bounds: groupBounds,
            },
        };
    }, {});
};

//INFO: 처음이 2d로 시작하기 때문에 nodeSize : 3d , baseSize : 3d로 해야함. 다른 방법은 잘 모르곘음.
//2d에서 3d로 변환할 때는 3d에서 2d로 변환할 때와 달리 baseSize와 nodeSize가 반대로 들어가야 할 것 같음
export const convertNodePointDimension = (node: Node, dimension: Dimension) => {
    const { point, size } = node;

    const offset = getNodeOffsetForConvertDimension(
        size['3d'],
        NODE_BASE_SIZE['3d'],
    );
    let result;
    if (dimension === '2d') {
        result = convert3dTo2dPoint({
            x: point.x - offset.x,
            y: point.y - offset.y,
        });
    } else {
        result = convert2dTo3dPoint(point);
        result = {
            x: result.x + offset.x,
            y: result.y + offset.y,
        };
    }

    return result;
};

//INFO: SVG z-index를 위한 노드 정렬
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

//TODO: 추후 Node도 Point와 Size를 Bounds타입으로 통합 필요
export const getNodeBounds = (node: Node, dimension: Dimension) => {
    return {
        x: node.point.x,
        y: node.point.y,
        width: node.size[dimension].width,
        height: node.size[dimension].height,
    };
};

export const getParentGroups = (
    groups: { [groupId: string]: Group },
    group: Group,
): Group[] => {
    if (!group.parentGroupId) return [];
    const parentGroup = groups[group.parentGroupId];
    return [parentGroup, ...getParentGroups(groups, parentGroup)];
};
