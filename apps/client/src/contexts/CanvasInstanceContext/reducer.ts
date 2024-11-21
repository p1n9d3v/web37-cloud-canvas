import {
    convertNodePointDimension,
    alignNodePoint,
    getParentGroups,
    sortNodes,
    updateGroupBounds,
} from '@contexts/CanvasInstanceContext/helpers';
import { Dimension, Group, Node, Point } from '@types';
import {
    alignPoint2d,
    alignPoint3d,
    convert2dTo3dPoint,
    convert3dTo2dPoint,
} from '@utils';

export type CanvasInstanceState = {
    nodes: Record<string, Node>;
    groups: Record<string, Group>;
};

export type CanvasInstanceAction =
    | {
          type: 'UPDATE_NODE';
          payload: Partial<Node> & { id: string };
      }
    | {
          type: 'UPDATE_GROUP';
          payload: Partial<Group> & { id: string };
      }
    | {
          type: 'MOVE_NODE';
          payload: { id: string; point: Point; dimension: Dimension };
      }
    | {
          type: 'MOVE_GROUP';
          payload: { id: string; point: Point; dimension: Dimension };
      }
    | {
          type: 'ADJUST_POINT_FOR_DIMENSION';
          payload: {
              dimension: Dimension;
          };
      };

export const canvasInstanceReducer = (
    state: CanvasInstanceState,
    action: CanvasInstanceAction,
) => {
    switch (action.type) {
        case 'UPDATE_NODE': {
            return {
                ...state,
                nodes: {
                    ...state.nodes,
                    [action.payload.id]: {
                        ...state.nodes[action.payload.id],
                        ...action.payload,
                    },
                },
            };
        }
        case 'UPDATE_GROUP': {
            return {
                ...state,
                groups: {
                    ...state.groups,
                    [action.payload.id]: {
                        ...state.groups[action.payload.id],
                        ...action.payload,
                    },
                },
            };
        }
        case 'MOVE_NODE': {
            const { id, point, dimension } = action.payload;
            const node = state.nodes[id];
            const { groupIds } = node;

            let updatedNodes = {
                ...state.nodes,
                [id]: {
                    ...node,
                    point: alignNodePoint(node, point, dimension),
                },
            };
            if (dimension === '3d') {
                updatedNodes = sortNodes(Object.values(updatedNodes));
            }

            const groups = groupIds.map((groupId) => state.groups[groupId]);
            const updatedGroups = updateGroupBounds(state, groups, dimension);
            return {
                ...state,
                nodes: updatedNodes,
                groups: {
                    ...state.groups,
                    ...updatedGroups,
                },
            };
        }

        case 'MOVE_GROUP': {
            const { id, point, dimension } = action.payload;
            const group = state.groups[id];
            const { nodeIds } = group;
            const newPoint =
                dimension === '2d' ? alignPoint2d(point) : alignPoint3d(point);
            const offset = {
                x: newPoint.x - group.bounds.x,
                y: newPoint.y - group.bounds.y,
            };

            const updatedGroups = {
                [id]: {
                    ...group,
                    bounds: {
                        ...group.bounds,
                        x: newPoint.x,
                        y: newPoint.y,
                    },
                },
            };

            //INFO: Update Inner Group Point
            const updatedChildrenGroups = group.childGroupIds.reduce(
                (acc, childGroupId) => {
                    const childGroup = state.groups[childGroupId];
                    const updatedChildGroup = {
                        ...childGroup,
                        bounds: {
                            ...childGroup.bounds,
                            x: childGroup.bounds.x + offset.x,
                            y: childGroup.bounds.y + offset.y,
                        },
                    };

                    return {
                        ...acc,
                        [childGroupId]: updatedChildGroup,
                    };
                },
                {},
            );

            //INFO: Update Inner Node Point
            const updatedNodes = nodeIds.reduce((acc, nodeId) => {
                const node = state.nodes[nodeId];
                const updatedNode = {
                    ...node,
                    point: {
                        x: node.point.x + offset.x,
                        y: node.point.y + offset.y,
                    },
                };
                return {
                    ...acc,
                    [nodeId]: updatedNode,
                };
            }, {});

            //INFO: Update Parent Group Bounds
            const updatedParentGroups = group.parentGroupId
                ? updateGroupBounds(
                      state,
                      getParentGroups(state.groups, group),
                      dimension,
                  )
                : {};

            return {
                ...state,
                nodes: {
                    ...state.nodes,
                    ...updatedNodes,
                },
                groups: {
                    ...state.groups,
                    ...updatedGroups,
                    ...updatedChildrenGroups,
                    ...updatedParentGroups,
                },
            };
        }

        case 'ADJUST_POINT_FOR_DIMENSION': {
            const { nodes, groups } = state;
            const { dimension } = action.payload;

            const converterPoint =
                dimension === '2d' ? convert3dTo2dPoint : convert2dTo3dPoint;

            return {
                ...state,
                nodes: Object.values(nodes).reduce((acc, node) => {
                    const updatedPoint = convertNodePointDimension(
                        node,
                        dimension,
                    );
                    return {
                        ...acc,
                        [node.id]: {
                            ...node,
                            point: updatedPoint,
                        },
                    };
                }, {}),
                groups: Object.values(groups).reduce((acc, cur) => {
                    const { bounds } = cur;
                    const point = { x: bounds.x, y: bounds.y };
                    const updatedPoint = converterPoint(point);
                    return {
                        ...acc,
                        [cur.id]: {
                            ...cur,
                            bounds: {
                                ...bounds,
                                x: updatedPoint.x,
                                y: updatedPoint.y,
                            },
                        },
                    };
                }, {}),
            };
        }
        default:
            return state;
    }
};
