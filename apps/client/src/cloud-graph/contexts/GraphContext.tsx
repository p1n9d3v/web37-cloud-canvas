import { GraphData, Node, Point } from '@cloud-graph/types';
import { nanoid } from 'nanoid';
import { createContext, ReactNode, useContext, useReducer } from 'react';

interface GraphContextType {
    graph: GraphData;
    addNode: (node: Node) => void;
    moveNode: (id: string, point: Point) => void;
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
      };
const GraphContext = createContext<GraphContextType | null>(null);

const graphReducer = (state: GraphData, action: GraphAction) => {
    const { type, payload } = action;
    switch (type) {
        case 'ADD_NODE': {
            return {
                ...state,
                nodes: [...state.nodes, payload],
            };
        }
        case 'MOVE_NODE': {
            return {
                ...state,
                nodes: state.nodes.map((node) => {
                    if (node.id === payload.id) {
                        return { ...node, point: payload.point };
                    }
                    return node;
                }),
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
        label: 'G1',
    },
    {
        id: `node-${nanoid()}`,
        type: 'cloud-function',
        point: { x: 10, y: 100 },
    },
    {
        id: `node-${nanoid()}`,
        type: 'object-storage',
        point: { x: 100, y: 10 },
    },
    {
        id: `node-${nanoid()}`,
        type: 'db-mysql',
        point: { x: 100, y: 100 },
    },
];
export const GraphProvider = ({ children }: { children: ReactNode }) => {
    const [graph, dispatch] = useReducer(graphReducer, {
        nodes: [...mockNodes],
        edges: [],
        groups: [],
    });

    const addNode = (node: Node) =>
        dispatch({ type: 'ADD_NODE', payload: node });

    const moveNode = (id: string, point: Point) =>
        dispatch({
            type: 'MOVE_NODE',
            payload: {
                id,
                point,
            },
        });

    return (
        <GraphContext.Provider value={{ graph, addNode, moveNode }}>
            {children}
        </GraphContext.Provider>
    );
};

export const useGraphContext = () => {
    const context = useContext(GraphContext);
    if (!context) throw new Error('GraphCOntext: context is undefined');

    return context;
};
