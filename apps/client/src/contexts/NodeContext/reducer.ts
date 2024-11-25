import { ConnectorMap, Node, Point } from '@types';

export type NodeState = {
    nodes: Record<string, Node>;
};

export type NodeAction =
    | { type: 'ADD_NODE'; payload: Node }
    | { type: 'UPDATE_NODE'; payload: Partial<Node> & { id: string } }
    | { type: 'UPDATE_NODES'; payload: Record<string, Node> }
    | { type: 'REMOVE_NODE'; payload: { id: string } }
    | {
          type: 'MOVE_NODE';
          payload: { id: string; point: Point; connectors: ConnectorMap };
      }
    | { type: 'ADD_GROUP_TO_NODE'; payload: { id: string; groupId: string } }
    | {
          type: 'REMOVE_GROUP_FROM_NODE';
          payload: { id: string; groupId: string };
      };

export const nodeReducer = (
    state: NodeState,
    action: NodeAction,
): NodeState => {
    switch (action.type) {
        case 'ADD_NODE':
            return {
                ...state,
                nodes: {
                    ...state.nodes,
                    [action.payload.id]: action.payload,
                },
            };
        case 'UPDATE_NODE':
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
        case 'REMOVE_NODE': {
            const { id } = action.payload;
            const { [id]: removedNode, ...remainingNodes } = state.nodes;
            return {
                ...state,
                nodes: remainingNodes,
            };
        }
        case 'MOVE_NODE': {
            const { id, point, connectors } = action.payload;
            const node = state.nodes[id];
            if (!node) return state;

            const updatedNodes = Object.values({
                ...state.nodes,
                [id]: {
                    ...node,
                    point,
                    connectors,
                },
            })
                .sort((a, b) => {
                    if (a.point.y === b.point.y) {
                        return a.point.x - b.point.x;
                    }
                    return a.point.y - b.point.y;
                })
                .reduce((acc, cur) => {
                    return {
                        ...acc,
                        [cur.id]: {
                            ...cur,
                        },
                    };
                }, {});

            return {
                ...state,
                nodes: updatedNodes,
            };
        }
        case 'ADD_GROUP_TO_NODE': {
            const { id, groupId } = action.payload;
            if (!state.nodes[id]) return state;

            return {
                ...state,
                nodes: {
                    ...state.nodes,
                    [id]: {
                        ...state.nodes[id],
                        groupIds: [...state.nodes[id].groupIds, groupId],
                    },
                },
            };
        }

        case 'REMOVE_GROUP_FROM_NODE': {
            const { id, groupId } = action.payload;
            if (!state.nodes[id]) return state;

            return {
                ...state,
                nodes: {
                    ...state.nodes,
                    [id]: {
                        ...state.nodes[id],
                        groupIds: state.nodes[id].groupIds.filter(
                            (id) => id !== groupId,
                        ),
                    },
                },
            };
        }

        case 'UPDATE_NODES': {
            return {
                ...state,
                nodes: {
                    ...state.nodes,
                    ...action.payload,
                },
            };
        }
        default:
            return state;
    }
};
