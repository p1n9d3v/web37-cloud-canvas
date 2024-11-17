import { Edge, Group, Node, Point } from '@cloud-graph/types';
import { nanoid } from 'nanoid';
import { createContext, ReactNode, useContext, useReducer } from 'react';

type GraphState = {
    nodes: Node[];
    edges: Edge[];
    groups: Group[];
    selectedId: string | null;
};

interface GraphContextType extends GraphState {
    handleAddNode: (node: Node) => void;
    handleMoveNode: (id: string, point: Point) => void;
    handleSelect: (id: string) => void;
    handleDeselect: (id: string) => void;
}

type GraphAction =
    | {
          type: 'ADD_NODE';
          payload: Node;
      }
    | {
          type: 'MOVE_NODE';
          payload: {
              id: string;
              point: Point;
          };
      }
    | {
          type: 'SELECT_NODE';
          payload: {
              id: string;
          };
      }
    | {
          type: 'DESELECT_NODE';
          payload: {
              id: string;
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
                nodes: state.nodes
                    .map((node) => {
                        if (node.id === action.payload.id) {
                            return { ...node, point: action.payload.point };
                        }
                        return node;
                    })
                    .sort((a, b) => {
                        if (a.point.y === b.point.y) {
                            return a.point.x - b.point.x;
                        } else {
                            return a.point.y - b.point.y;
                        }
                    }),
            };
        }
        case 'SELECT_NODE': {
            return {
                ...state,
                selectedId: action.payload.id,
            };
        }
        case 'DESELECT_NODE': {
            return {
                ...state,
                selectedId: null,
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
        selectedId: null,
    });

    const handleAddNode = (node: Node) =>
        dispatch({ type: 'ADD_NODE', payload: node });

    const handleMoveNode = (id: string, point: Point) =>
        dispatch({
            type: 'MOVE_NODE',
            payload: {
                id,
                point,
            },
        });
    const handleSelect = (id: string) =>
        dispatch({ type: 'SELECT_NODE', payload: { id } });
    const handleDeselect = (id: string) =>
        dispatch({ type: 'DESELECT_NODE', payload: { id } });

    return (
        <GraphContext.Provider
            value={{
                ...state,
                handleAddNode,
                handleMoveNode,
                handleSelect,
                handleDeselect,
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
