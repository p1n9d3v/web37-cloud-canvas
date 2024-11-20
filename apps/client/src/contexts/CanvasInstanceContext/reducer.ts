import { computeGroupBounds } from '@contexts/CanvasInstanceContext/helpers';
import { Group, Node, Point } from '@types';

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
          payload: { id: string; point: Point; dimension: '2d' | '3d' };
      }
    | {
          type: 'MOVE_GROUP';
          payload: { id: string; point: Point };
      }
    | {
          type: 'UPDATE_ALL';
          payload: Partial<CanvasInstanceState>;
      };

export const canvasInstanceReducer = (
    state: CanvasInstanceState,
    action: CanvasInstanceAction,
) => {
    switch (action.type) {
        case 'UPDATE_ALL': {
            return {
                ...state,
                ...action.payload,
            };
        }
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

            const updatedNodes = {
                ...state.nodes,
                [id]: {
                    ...node,
                    point,
                },
            };

            const groups = groupIds.map((groupId) => state.groups[groupId]);
            const updatedGroups = groups.reduce((acc, group) => {
                const innerNodes = group.nodeIds.map(
                    (nodeId) => updatedNodes[nodeId],
                );

                const bounds = computeGroupBounds(innerNodes, dimension);
                return {
                    ...acc,
                    [group.id]: {
                        ...group,
                        bounds,
                    },
                };
            }, {});

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
            const { id, point } = action.payload;
            const group = state.groups[id];
            const { nodeIds } = group;
            const offset = {
                x: point.x - group.bounds.x,
                y: point.y - group.bounds.y,
            };

            const updatedGroups = {
                ...state.groups,
                [id]: {
                    ...group,
                    bounds: {
                        ...group.bounds,
                        x: point.x,
                        y: point.y,
                    },
                },
            };
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
            return {
                ...state,
                nodes: {
                    ...state.nodes,
                    ...updatedNodes,
                },
                groups: updatedGroups,
            };
        }
        default:
            return state;
    }
};
