import { Edge, Group, Node } from '@cloud-graph/types';
import { nanoid } from 'nanoid';
import {
    createContext,
    Dispatch,
    ReactNode,
    useContext,
    useReducer,
} from 'react';

type GraphState = {
    nodes: Node[];
    edges: Edge[];
    groups: Group[];
};

interface GraphContextType extends GraphState {
    dispatch: Dispatch<GraphAction>;
}

type GraphAction =
    | {
          type: 'ADD_NODE';
          payload: Node;
      }
    | {
          type: 'MOVE_NODE';
          payload: {
              nodes: Node[];
              edges: Edge[];
          };
      }
    | {
          type: 'REMOVE_NODE';
          payload: {
              nodeIds: string[];
              edgeIds: string[];
          };
      }
    | {
          type: 'ADD_EDGE';
          payload: Edge;
      }
    | {
          type: 'SPLIT_EDGE';
          payload: {
              pointer: Node;
              edge: Edge;
              sourceToPointer: Edge;
              pointerToTarget: Edge;
          };
      }
    | {
          type: 'REMOVE_EDGE';
          payload: {
              edges: Edge[];
              pointerId?: string;
          };
      }
    | {
          type: 'REMOVE_ENTIRE_EDGE';
          payload: {
              pointerIds: string[];
              edgeIds: string[];
          };
      };
const GraphContext = createContext<GraphContextType | null>(null);

const graphReducer = (state: GraphState, action: GraphAction) => {
    switch (action.type) {
        case 'ADD_NODE': {
            return {
                ...state,
                nodes: [...state.nodes, action.payload],
            };
        }
        case 'MOVE_NODE': {
            return {
                ...state,
                nodes: action.payload.nodes,
                edges: action.payload.edges,
            };
        }
        case 'ADD_EDGE': {
            return {
                ...state,
                edges: [...state.edges, action.payload],
            };
        }
        case 'SPLIT_EDGE': {
            return {
                ...state,
                nodes: [...state.nodes, action.payload.pointer],
                edges: state.edges
                    .filter((edge) => edge.id !== action.payload.edge.id)
                    .concat([
                        action.payload.sourceToPointer,
                        action.payload.pointerToTarget,
                    ]),
            };
        }
        case 'REMOVE_NODE': {
            return {
                ...state,
                nodes: state.nodes.filter(
                    (node) => !action.payload.nodeIds.includes(node.id),
                ),
                edges: state.edges.filter(
                    (edge) => !action.payload.edgeIds.includes(edge.id),
                ),
            };
        }
        case 'REMOVE_EDGE': {
            return {
                ...state,
                nodes: action.payload.pointerId
                    ? state.nodes.filter(
                          (node) => node.id !== action.payload.pointerId,
                      )
                    : state.nodes,
                edges: action.payload.edges,
            };
        }
        case 'REMOVE_ENTIRE_EDGE': {
            return {
                ...state,
                nodes: state.nodes.filter(
                    (node) => !action.payload.pointerIds.includes(node.id),
                ),
                edges: state.edges.filter(
                    (edge) => !action.payload.edgeIds.includes(edge.id),
                ),
            };
        }
        default:
            return state;
    }
};

const mockNodes = [
    {
        id: `node-${nanoid()}`,
        type: 'server',
        point: { x: 0, y: 0 },
        size: {
            d2: { width: 90, height: 90 },
            d3: { width: 128, height: 111 },
        },
        label: 'G1',
    },
    {
        id: `node-${nanoid()}`,
        type: 'server',
        point: { x: 0, y: 0 },
        size: {
            d2: { width: 90, height: 90 },
            d3: { width: 128, height: 111 },
        },
        label: 'G1',
    },
    {
        id: `node-${nanoid()}`,
        type: 'cloud-function',
        point: { x: 10, y: 100 },
        size: {
            d2: { width: 90, height: 90 },
            d3: { width: 96, height: 113.438 },
        },
    },
    {
        id: `node-${nanoid()}`,
        type: 'object-storage',
        size: {
            d2: { width: 90, height: 90 },
            d3: { width: 100.626, height: 115.695 },
        },
        point: { x: 100, y: 10 },
    },
    {
        id: `node-${nanoid()}`,
        type: 'db-mysql',
        size: {
            d2: { width: 90, height: 90 },
            d3: { width: 128, height: 137.5 },
        },
        point: { x: 100, y: 100 },
    },
];
export const GraphProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(graphReducer, {
        nodes: [...mockNodes],
        edges: [],
        groups: [],
    });

    return (
        <GraphContext.Provider
            value={{
                ...state,
                dispatch,
            }}
        >
            {children}
        </GraphContext.Provider>
    );
};

export const useGraphContext = () => {
    const context = useContext(GraphContext);
    if (!context) throw new Error('GraphCOntext: context is undefined');

    return context;
};
