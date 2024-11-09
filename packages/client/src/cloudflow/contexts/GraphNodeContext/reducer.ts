import { GraphNode } from '@cloudflow/types';

export type GraphNodeState = {
    nodes: GraphNode[];
    selectedNodeIds: Set<string>;
};

export type NodeAction =
    | { type: 'ADD_NODE'; payload: GraphNode }
    | { type: 'UPDATE_NODE'; payload: GraphNode }
    | { type: 'REMOVE_NODE'; payload: { id: string } }
    | { type: 'SELECT_NODE'; payload: { id: string } }
    | { type: 'DESELECT_NODE'; payload: { id: string } }
    | { type: 'DESELECT_ALL_NODES' }
    | {
          type: 'MOVE_NODE';
          payload: Pick<GraphNode, 'id' | 'point'>;
      };

export const initialGraphNodeState: GraphNodeState = {
    nodes: [],
    selectedNodeIds: new Set(),
};

export const graphNodeReducer = (
    state: GraphNodeState,
    action: NodeAction
): GraphNodeState => {
    switch (action.type) {
        case 'ADD_NODE':
            return { ...state, nodes: [...state.nodes, action.payload] };
        case 'UPDATE_NODE':
            return {
                ...state,
                nodes: state.nodes.map((node) =>
                    node.id === action.payload.id ? action.payload : node
                ),
            };
        case 'REMOVE_NODE':
            return {
                ...state,
                nodes: state.nodes.filter(
                    (node) => node.id !== action.payload.id
                ),
                selectedNodeIds: new Set(
                    [...state.selectedNodeIds].filter(
                        (id) => id !== action.payload.id
                    )
                ),
            };
        case 'SELECT_NODE':
            return {
                ...state,
                selectedNodeIds: new Set(state.selectedNodeIds).add(
                    action.payload.id
                ),
            };
        case 'DESELECT_NODE':
            const newSelectedNodeIds = new Set(state.selectedNodeIds);
            newSelectedNodeIds.delete(action.payload.id);
            return { ...state, selectedNodeIds: newSelectedNodeIds };
        case 'DESELECT_ALL_NODES':
            return { ...state, selectedNodeIds: new Set() };
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
