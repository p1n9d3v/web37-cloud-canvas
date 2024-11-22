import { Point, ViewBox } from '@types';

export type GraphState = {
    viewBox: ViewBox;
    connection: { from: Point; to: Point } | null;
};

export type GraphAction =
    | { type: 'SET_VIEWBOX'; payload: GraphState['viewBox'] }
    | { type: 'OPEN_CONNECTION'; payload: { from: Point } }
    | { type: 'CONNECT_CONNECTION'; payload: { to: Point } }
    | { type: 'CLOSE_CONNECTION' };

export const graphReducer = (
    state: GraphState,
    action: GraphAction,
): GraphState => {
    switch (action.type) {
        case 'SET_VIEWBOX':
            return { ...state, viewBox: action.payload };
        case 'OPEN_CONNECTION':
            return {
                ...state,
                connection: {
                    from: action.payload.from,
                    to: action.payload.from,
                },
            };
        case 'CONNECT_CONNECTION':
            if (!state.connection) return state;
            return {
                ...state,
                connection: { ...state.connection, to: action.payload.to },
            };
        case 'CLOSE_CONNECTION':
            return { ...state, connection: null };
        default:
            return state;
    }
};
