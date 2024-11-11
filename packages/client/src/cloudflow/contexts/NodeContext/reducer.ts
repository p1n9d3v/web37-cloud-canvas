import { Node } from '@cloudflow/types';

export type NodeState = {
    nodes: Node[];
};

export type NodeAction =
    | { type: 'ADD_NODE'; payload: Node }
    | {
          type: 'MOVE_NODE';
          payload: Pick<Node, 'id' | 'point'>;
      };

export const initialNodeState: NodeState = {
    nodes: [],
};

export const nodeReducer = (
    state: NodeState,
    action: NodeAction
): NodeState => {
    switch (action.type) {
        case 'ADD_NODE':
            return { ...state, nodes: [...state.nodes, action.payload] };
        case 'MOVE_NODE':
            return {
                ...state,
                nodes: state.nodes.map((node) =>
                    node.id === action.payload.id
                        ? { ...node, point: action.payload.point }
                        : node
                ),
            };
        default:
            return state;
    }
};
