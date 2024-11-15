import { GraphData, Node } from '@cloud-graph/types';
import { createContext, ReactNode, useContext, useReducer } from 'react';

interface GraphContextType {
    graph: GraphData;
    addNode: (node: Node) => void;
}

type GraphAction = {
    type: 'ADD_NODE';
    payload: Node;
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
        default:
            return state;
    }
};

export const GraphProvider = ({ children }: { children: ReactNode }) => {
    const [graph, dispatch] = useReducer(graphReducer, {
        nodes: [],
        edges: [],
        groups: [],
    });

    const addNode = (node: Node) =>
        dispatch({ type: 'ADD_NODE', payload: node });
    return (
        <GraphContext.Provider value={{ graph, addNode }}>
            {children}
        </GraphContext.Provider>
    );
};

export const useGraphContext = () => {
    const context = useContext(GraphContext);
    if (!context) throw new Error('GraphCOntext: context is undefined');

    return context;
};
