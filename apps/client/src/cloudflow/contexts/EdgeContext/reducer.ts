import { Edge, NodeWithAnchor } from '@cloudflow/types';
import { nanoid } from 'nanoid';

export type EdgeState = {
    edges: Edge[];
};

export const initialEdgeState: EdgeState = {
    edges: [],
};

export type EdgeAction =
    | { type: 'ADD_EDGE'; payload: Edge }
    | { type: 'REMOVE_EDGE'; payload: { edgeId: string } }
    | {
          type: 'SPLIT_EDGE';
          payload: {
              edgeId: string;
              pointer: NodeWithAnchor;
          };
      };

export const edgeReducer = (
    state: EdgeState,
    action: EdgeAction,
): EdgeState => {
    switch (action.type) {
        case 'ADD_EDGE':
            return { ...state, edges: [...state.edges, action.payload] };
        case 'REMOVE_EDGE': {
            const edgeToRemove = state.edges.find(
                (edge) => edge.id === action.payload.edgeId,
            );
            if (!edgeToRemove) return state;

            const { source, target } = edgeToRemove;

            let newEdges = state.edges.filter(
                (edge) => edge.id !== action.payload.edgeId,
            );

            //INFO: source.type === 'pointer' && target.type ==='pointer'조건도 target pointer로 위치를 변경하여
            //source.type ==='pointer'와 조건이 동일
            if (source.type === 'pointer') {
                const sourceEdge = state.edges.find(
                    (edge) => edge.target.id === source.id,
                );
                newEdges = newEdges.map((edge) => {
                    if (sourceEdge && edge.id === sourceEdge.id) {
                        return {
                            ...edge,
                            target: edgeToRemove.target,
                            type:
                                edgeToRemove.target.type === 'pointer'
                                    ? 'line'
                                    : 'arrow',
                        };
                    }

                    return edge;
                });
            } else if (target.type === 'pointer') {
                const targetEdge = state.edges.find(
                    (edge) => edge.source.id === target.id,
                );

                newEdges = newEdges.map((edge) => {
                    if (targetEdge && edge.id === targetEdge.id) {
                        return {
                            ...edge,
                            source: edgeToRemove.source,
                        };
                    }
                    return edge;
                });
            }

            return {
                ...state,
                edges: newEdges,
            };
        }
        case 'SPLIT_EDGE': {
            const { edgeId, pointer } = action.payload;
            const sourceEdge = state.edges.find((edge) => edge.id === edgeId);
            if (!sourceEdge) return state;

            const { source, target } = sourceEdge;
            const sourceToPointer: Edge = {
                id: nanoid(),
                source,
                target: pointer,
                type: 'line',
            };
            const pointerToTarget: Edge = {
                id: nanoid(),
                source: pointer,
                target,
                type: target.type === 'pointer' ? 'line' : 'arrow',
            };

            return {
                edges: [
                    ...state.edges.filter((edge) => edge.id !== edgeId),
                    sourceToPointer,
                    pointerToTarget,
                ],
            };
        }

        default:
            return state;
    }
};
