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
            return { edges: [...state.edges, action.payload] };
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
                type: 'arrow',
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
