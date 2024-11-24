import { Edge, Point } from '@types';

export type EdgeState = {
    edges: Record<string, Edge>;
    connection: { from: Point; to: Point } | null;
};

export type EdgeAction =
    | { type: 'ADD_EDGE'; payload: Omit<Edge, 'bendingPoints'> }
    | { type: 'UPDATE_EDGE'; payload: Partial<Edge> & { id: string } }
    | { type: 'UPDATE_EDGES'; payload: Record<string, Edge> }
    | { type: 'REMOVE_EDGE'; payload: { id: string } }
    | {
          type: 'SPLIT_EDGE';
          payload: { id: string; point: Point; insertAfter: number };
      }
    | {
          type: 'MOVE_BENDING_POINTER';
          payload: {
              id: string;
              bendingPointer: {
                  index: number;
                  point: Point;
              };
              connector?: {
                  [key: string]: {
                      id: string;
                      connectorType: string;
                  };
              };
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
        case 'UPDATE_EDGES': {
            return {
                ...state,
                edges: {
                    ...state.edges,
                    ...action.payload,
                },
            };
        }
        case 'REMOVE_EDGE': {
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
            const { id, bendingPointer, connector } = action.payload;
            const edge = state.edges[id];
            const { index, point } = bendingPointer;
            if (!edge || index < 0 || index >= edge.bendingPoints.length)
                return state;

            const updatedBendPoints = [...edge.bendingPoints];
            updatedBendPoints[index] = point;

            let updatedConnector = {};
            if (connector) updatedConnector = connector;
            return {
                ...state,
                edges: {
                    ...state.edges,
                    [id]: {
                        ...edge,
                        bendingPoints: updatedBendPoints,
                        ...updatedConnector,
                    },
                },
            };
        }
        default:
            return state;
    }
};
