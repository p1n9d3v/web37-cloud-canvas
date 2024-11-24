import { GRID_2D_SIZE, NODE_BASE_SIZE } from '@constants';
import { CanvasInstanceState } from '@contexts/CanvasInstanceContext/reducer';
import {
    Bounds,
    Connector,
    ConnectorMap,
    ConnectorType,
    Dimension,
    Group,
    Node,
    Point,
    Size,
} from '@types';
import {
    alignPoint2d,
    alignPoint3d,
    convert2dTo3dPoint,
    convert3dTo2dPoint,
    getConnectorPoints,
    getDistance,
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

        const nodeBounds = group.nodes.map((nodeId) =>
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

export const getNodeOffsetForConvertDimension = (
    nodeSize: Size,
    baseSize: Size,
) => {
    return {
        x: (baseSize.width - nodeSize.width) / 2,
        y: baseSize.height - nodeSize.height - (nodeSize.offset || 0),
    };
};
//INFO: 처음이 2d로 시작하기 때문에 nodeSize : 3d , baseSize : 3d로 해야함. 다른 방법은 잘 모르곘음.
//2d에서 3d로 변환할 때는 3d에서 2d로 변환할 때와 달리 baseSize와 nodeSize가 2d 사이즈 들어가야 할 것 같음
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

export const findNearestConnectorPair = (
    movingConnectors: Connector[],
    connectedConnectors: Connector[],
): {
    movingConnector: Connector;
    connectedConnector: Connector;
    distance: number;
} => {
    let nearestPair: {
        movingConnector: Connector;
        connectedConnector: Connector;
        distance: number;
    } = {
        movingConnector: movingConnectors[0],
        connectedConnector: connectedConnectors[0],
        distance: Infinity,
    };

    movingConnectors.forEach((mConnector) => {
        connectedConnectors.forEach((cConnector) => {
            const distance = getDistance(mConnector.point, cConnector.point);

            if (distance < nearestPair.distance) {
                nearestPair = {
                    movingConnector: mConnector,
                    connectedConnector: cConnector,
                    distance,
                };
            }
        });
    });

    return nearestPair!;
};

const generateNodeConnectors = (
    connectors: Omit<ConnectorMap, 'center'>,
): Connector[] => {
    return Object.entries(connectors).map(([connectorType, point]) => ({
        type: 'node',
        connectorType: connectorType as ConnectorType,
        point,
    }));
};

const generateBendConnector = (bendPoint: Point): Connector => {
    return {
        type: 'bend',
        point: bendPoint,
        connectorType: 'center',
    };
};

export const updateNearestConnectorPair = ({
    state,
    node,
    dimension,
}: {
    state: CanvasInstanceState;
    node: Node;
    dimension: Dimension;
}) => {
    const movingNodeConnectors = getConnectorPoints(node, dimension);
    const connectedEdges = Object.values(state.edges).filter(
        (edge) => edge.source.id === node.id || edge.target.id === node.id,
    );

    const updatedEdges = connectedEdges.reduce((acc, edge) => {
        const sourceIsDragging = edge.source.id === node.id;
        const connectedNodeId = sourceIsDragging
            ? edge.target.id
            : edge.source.id;
        const connectedNode = state.nodes[connectedNodeId];

        const connectedNodeConnectors = getConnectorPoints(
            connectedNode,
            dimension,
        );

        const connectedConnectors = generateNodeConnectors(
            connectedNodeConnectors,
        );

        const movingConnectors = generateNodeConnectors(movingNodeConnectors);

        let updatedEdge = {};
        if (edge.bendPoints.length > 0) {
            if (sourceIsDragging) {
                const firstBendPoint = edge.bendPoints[0];
                const bendConnector = generateBendConnector(firstBendPoint);
                const { movingConnector } = findNearestConnectorPair(
                    movingConnectors,
                    [bendConnector],
                );
                updatedEdge = {
                    ...edge,
                    source: {
                        ...edge.source,
                        connectorType: movingConnector.connectorType,
                    },
                };
            } else {
                const lastBendPoint =
                    edge.bendPoints[edge.bendPoints.length - 1];
                const bendConnector = generateBendConnector(lastBendPoint);
                const { movingConnector } = findNearestConnectorPair(
                    movingConnectors,
                    [bendConnector],
                );
                updatedEdge = {
                    ...edge,
                    target: {
                        ...edge.target,
                        connectorType: movingConnector.connectorType,
                    },
                };
            }
        } else {
            const { movingConnector, connectedConnector } =
                findNearestConnectorPair(movingConnectors, connectedConnectors);
            if (sourceIsDragging) {
                updatedEdge = {
                    ...edge,
                    source: {
                        ...edge.source,
                        connectorType: movingConnector.connectorType,
                    },
                    target: {
                        ...edge.target,
                        connectorType: connectedConnector.connectorType,
                    },
                };
            } else {
                updatedEdge = {
                    ...edge,
                    target: {
                        ...edge.target,
                        connectorType: movingConnector.connectorType,
                    },
                    source: {
                        ...edge.source,
                        connectorType: connectedConnector.connectorType,
                    },
                };
            }
        }

        return {
            ...acc,
            [edge.id]: updatedEdge,
        };
    }, {});

    return updatedEdges;
};

export const findNearestConnectorForBendPoint = (
    node: Node,
    point: Point,
    dimension: Dimension,
) => {
    const connectors = getConnectorPoints(node, dimension);
    const nodeConnectors = generateNodeConnectors(connectors);
    const bendConnector = generateBendConnector(point);

    const connectorPair = findNearestConnectorPair(
        [bendConnector],
        nodeConnectors,
    );
    if (!connectorPair) {
        return null;
    }
    return connectorPair.connectedConnector;
};
