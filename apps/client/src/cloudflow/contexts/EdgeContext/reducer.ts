import { Edge } from '@cloudflow/types';

export type EdgeState = {
    edges: Edge[];
};

export const initialState: EdgeState = {
    edges: [],
};

export type EdgeAction = { type: 'ADD_EDGE'; payload: Edge };

export const edgeReducer = (state: EdgeState, action: EdgeAction) => {
    switch (action.type) {
        case 'ADD_EDGE':
            return { edges: [...state.edges, action.payload] };
        default:
            return state;
    }
};
