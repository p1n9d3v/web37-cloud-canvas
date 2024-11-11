import { Node } from '@cloudflow/types';

export type NodeState = {
    nodes: Node[];
    selectedNodeId: string | null;
};

export type NodeAction =
    | { type: 'ADD_NODE'; payload: Node }
    | { type: 'REMOVE_NODE'; payload: { id: string } }
    | { type: 'SELECT_NODE'; payload: { id: string } }
    | { type: 'DESELECT_NODE'; payload: { id: string } }
    | {
          type: 'MOVE_NODE';
          payload: Pick<Node, 'id' | 'point'>;
      };

export const initialNodeState: NodeState = {
    nodes: [],
    selectedNodeId: null,
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
        case 'SELECT_NODE': {
            return { ...state, selectedNodeId: action.payload.id };
        }
        default:
            return state;
    }
};
