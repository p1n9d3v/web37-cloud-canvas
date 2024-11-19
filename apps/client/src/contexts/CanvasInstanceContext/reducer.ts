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
          payload: { id: string; point: Point };
      }
    | {
          type: 'MOVE_GROUP';
          payload: { id: string; point: Point };
      };

export const canvasInstanceReducer = (
    state: CanvasInstanceState,
    action: CanvasInstanceAction,
) => {
    switch (action.type) {
        case 'UPDATE_NODE': {
            console.log('UPDATE_NODE');
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
            console.log('UPDATE_GROUP');
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
            const { id, point } = action.payload;
            const node = state.nodes[id];
            const { groupIds, size } = node;

            const updatedState = {
                ...state,
                nodes: {
                    ...state.nodes,
                    [id]: {
                        ...node,
                        point,
                    },
                },
            };

            const groups = groupIds.map((groupId) => state.groups[groupId]);
            const updatedGroups = groups.reduce((acc, group) => {
                const innerNodes = group.nodeIds.map(
                    (nodeId) => updatedState.nodes[nodeId],
                );

                const minX = Math.min(
                    ...innerNodes.map((node) => node.point.x),
                );
                const minY = Math.min(
                    ...innerNodes.map((node) => node.point.y),
                );
                const maxX = Math.max(
                    ...innerNodes.map(
                        (node) => node.point.x + node.size.d2.width,
                    ),
                );
                const maxY = Math.max(
                    ...innerNodes.map(
                        (node) => node.point.y + node.size.d2.height,
                    ),
                );

                const bounds = {
                    x: minX - 180,
                    y: minY - 180,
                    width: maxX - minX + 360,
                    height: maxY - minY + 360,
                };
                return {
                    ...acc,
                    [group.id]: {
                        ...group,
                        bounds,
                    },
                };
            }, {});

            return {
                ...updatedState,
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
            const updatedState = {
                ...state,
                groups: {
                    ...state.groups,
                    [id]: {
                        ...group,
                        bounds: {
                            ...group.bounds,
                            x: point.x,
                            y: point.y,
                        },
                    },
                },
            };
            const updatedNodes = nodeIds.reduce((acc, nodeId) => {
                const node = updatedState.nodes[nodeId];
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
                ...updatedState,
                nodes: {
                    ...state.nodes,
                    ...updatedNodes,
                },
            };
        }
        default:
            return state;
    }
};
