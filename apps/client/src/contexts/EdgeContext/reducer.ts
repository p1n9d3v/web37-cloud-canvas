import { Edge, Point, Dimension } from '@types';

export type EdgeState = {
    edges: Record<string, Edge>;
};

export type EdgeAction =
    | { type: 'ADD_EDGE'; payload: Edge }
    | { type: 'UPDATE_EDGE'; payload: Partial<Edge> & { id: string } }
    | { type: 'DELETE_EDGE'; payload: { id: string } }
    | {
          type: 'SPLIT_EDGE';
          payload: { edgeId: string; point: Point; insertAfter: number };
      }
    | {
          type: 'MOVE_BENDING_POINT';
          payload: {
              edgeId: string;
              bendPointIdx: number;
              point: Point;
              dimension: Dimension;
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
                    [action.payload.id]: action.payload,
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
            const { edgeId, point, insertAfter } = action.payload;
            const edge = state.edges[edgeId];
            if (!edge) return state;
            const newBendPoints = [...edge.bendPoints];
            newBendPoints.splice(insertAfter + 1, 0, point);
            return {
                ...state,
                edges: {
                    ...state.edges,
                    [edgeId]: {
                        ...edge,
                        bendPoints: newBendPoints,
                    },
                },
            };
        }
        case 'MOVE_BENDING_POINT': {
            const { edgeId, bendPointIdx, point } = action.payload;
            const edge = state.edges[edgeId];
            if (
                !edge ||
                bendPointIdx < 0 ||
                bendPointIdx >= edge.bendPoints.length
            )
                return state;
            const updatedBendPoints = [...edge.bendPoints];
            updatedBendPoints[bendPointIdx] = point;
            return {
                ...state,
                edges: {
                    ...state.edges,
                    [edgeId]: {
                        ...edge,
                        bendPoints: updatedBendPoints,
                    },
                },
            };
        }
        default:
            return state;
    }
};
