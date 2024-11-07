import { Edge, Node } from '@types';
import {
    createContext,
    Dispatch,
    PropsWithChildren,
    useContext,
    useReducer,
} from 'react';

type FlowInstanceState = {
    nodes: Node[];
    edges: Edge[];
};

type FlowInstanceAction =
    | { type: 'ADD_NODE'; payload: Node }
    | { type: 'UPDATE_NODE'; payload: Node }
    | { type: 'REMOVE_NODE'; payload: { id: string } }
    | { type: 'ADD_EDGE'; payload: Edge }
    | { type: 'REMOVE_EDGE'; payload: Edge };

const FlowInstanceContext = createContext<
    | {
          state: FlowInstanceState;
          dispatch: Dispatch<FlowInstanceAction>;
      }
    | undefined
>(undefined);

const flowInstanceReducer = (
    state: FlowInstanceState,
    action: FlowInstanceAction
): FlowInstanceState => {
    switch (action.type) {
        case 'ADD_NODE': {
            return {
                ...state,
                nodes: [...state.nodes, action.payload],
            };
        }
        case 'UPDATE_NODE': {
            return {
                ...state,
                nodes: state.nodes.map((node) =>
                    node.id === action.payload.id ? action.payload : node
                ),
            };
        }
        case 'REMOVE_NODE': {
            return {
                ...state,
                nodes: state.nodes.filter(
                    (node) => node.id !== action.payload.id
                ),
            };
        }
        case 'ADD_EDGE': {
            return {
                ...state,
                edges: [...state.edges, action.payload],
            };
        }
        case 'REMOVE_EDGE': {
            return {
                ...state,
                edges: state.edges.filter(
                    (edge) => edge.id === action.payload.id
                ),
            };
        }
        default:
            return state;
    }
};

export const FlowInstanceContextProvider = ({
    children,
}: PropsWithChildren) => {
    const [state, dispatch] = useReducer(flowInstanceReducer, {
        nodes: [],
        edges: [],
    });

    return (
        <FlowInstanceContext.Provider value={{ state, dispatch }}>
            {children}
        </FlowInstanceContext.Provider>
    );
};

export const useFlowInstanceContext = () => {
    const context = useContext(FlowInstanceContext);
    if (!context) throw new Error('FlowContext : context is undefined');

    return context;
};
