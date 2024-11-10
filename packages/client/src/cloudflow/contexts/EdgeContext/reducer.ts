import { Edge } from '@cloudflow/types';

export interface EdgeState {
    edges: Edge[];
}

export type EdgeAction =
    | { type: 'ADD_EDGE'; payload: Edge }
    | { type: 'REMOVE_EDGE'; payload: { id: string } }
    | { type: 'UPDATE_EDGE'; payload: Edge };

export const initialEdgeState: EdgeState = {
    edges: [],
};

export const edgeReducer = (
    state: EdgeState,
    action: EdgeAction
): EdgeState => {
    switch (action.type) {
        case 'ADD_EDGE':
            return { ...state, edges: [...state.edges, action.payload] };
        case 'REMOVE_EDGE':
            return {
                ...state,
                edges: state.edges.filter(
                    (edge) => edge.id !== action.payload.id
                ),
            };
        case 'UPDATE_EDGE':
            return {
                ...state,
                edges: state.edges.map((edge) =>
                    edge.id === action.payload.id ? action.payload : edge
                ),
            };
        default:
            return state;
    }
};
