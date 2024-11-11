import { Edge } from '@svgflow/types';

export type EdgeState = {
    edges: Edge[];
};

export const initialState: EdgeState = {
    edges: [],
};

export const edgeReducer = (state: EdgeState, action: any) => {
    switch (action.type) {
        case 'ADD_EDGE':
            return { edges: [...state.edges, action.payload] };
        default:
            return state;
    }
};
