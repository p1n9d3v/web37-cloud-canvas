import { Edge, Point, Dimension } from '@types';

export type EdgeState = {
    edges: Record<string, Edge>;
    connection: { from: Point; to: Point } | null;
};

export type EdgeAction =
    | { type: 'ADD_EDGE'; payload: Omit<Edge, 'bendingPoints'> }
    | { type: 'UPDATE_EDGE'; payload: Partial<Edge> & { id: string } }
    | { type: 'DELETE_EDGE'; payload: { id: string } }
    | {
          type: 'SPLIT_EDGE';
          payload: { id: string; point: Point; insertAfter: number };
      }
    | {
          type: 'MOVE_BENDING_POINTER';
          payload: {
              edgeId: string;
              index: number;
              point: Point;
          };
      };

export const edgeReducer = (
    state: EdgeState,
    action: EdgeAction,
): EdgeState => {
    switch (action.type) {
        case 'ADD_EDGE':
            return {
                ...state,
                edges: {
                    ...state.edges,
                    [action.payload.id]: {
                        ...action.payload,
                        bendingPoints: [],
                    },
                },
            };
        case 'UPDATE_EDGE':
            return {
                ...state,
                edges: {
                    ...state.edges,
                    [action.payload.id]: {
                        ...state.edges[action.payload.id],
                        ...action.payload,
                    },
                },
            };
        case 'DELETE_EDGE': {
            const { id } = action.payload;
            const { [id]: removedEdge, ...remainingEdges } = state.edges;
            return {
                ...state,
                edges: remainingEdges,
            };
        }
        case 'SPLIT_EDGE': {
            const { id, point, insertAfter } = action.payload;
            const edge = state.edges[id];
            if (!edge) return state;

            const newBendPoints = [...edge.bendingPoints];
            newBendPoints.splice(insertAfter, 0, point);
            return {
                ...state,
                edges: {
                    ...state.edges,
                    [id]: {
                        ...edge,
                        bendingPoints: newBendPoints,
                    },
                },
            };
        }
        case 'MOVE_BENDING_POINTER': {
            const { edgeId, index, point } = action.payload;
            const edge = state.edges[edgeId];
            if (!edge || index < 0 || index >= edge.bendingPoints.length)
                return state;

            const updatedBendPoints = [...edge.bendingPoints];
            updatedBendPoints[index] = point;
            return {
                ...state,
                edges: {
                    ...state.edges,
                    [edgeId]: {
                        ...edge,
                        bendingPoints: updatedBendPoints,
                    },
                },
            };
        }
        default:
            return state;
    }
};
