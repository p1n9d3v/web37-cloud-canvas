import { Node, Point, Dimension, ConnectorMap } from '@types';

export type NodeState = {
    nodes: Record<string, Node>;
};

export type NodeAction =
    | { type: 'ADD_NODE'; payload: Node }
    | { type: 'UPDATE_NODE'; payload: Partial<Node> & { id: string } }
    | { type: 'UPDATE_NODES'; payload: Record<string, Node> }
    | { type: 'DELETE_NODE'; payload: { id: string } }
    | {
          type: 'MOVE_NODE';
          payload: { id: string; point: Point; connectors: ConnectorMap };
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
        case 'DELETE_NODE': {
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

            return {
                ...state,
                nodes: {
                    ...state.nodes,
                    [id]: {
                        ...node,
                        point,
                        connectors,
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