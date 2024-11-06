import { Edge, Node } from '@types';
import {
    createContext,
    Dispatch,
    PropsWithChildren,
    useContext,
    useReducer,
} from 'react';

type ConnectEdge = {
    start: { x: number; y: number };
    end: { x: number; y: number };
    isConnecting: boolean;
};

type FlowInstanceState = {
    nodes: Node[];
    edges: Edge[];
    connectEdge: ConnectEdge;
};

type FlowInstanceAction =
    | { type: 'ADD_NODE'; payload: Node }
    | { type: 'UPDATE_NODE'; payload: Partial<Node> }
    | { type: 'REMOVE_NODE'; payload: { id: string } }
    | { type: 'ADD_EDGE'; payload: Edge }
    | { type: 'SELECT_NODE'; payload: { id: string; isFocused: boolean } }
    | { type: 'CLEAR_SELECTED_NODES' }
    | { type: 'REMOVE_EDGE'; payload: Edge }
    | { type: 'CONNECT_EDGE'; payload: Partial<ConnectEdge> };

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
                    node.id === action.payload.id
                        ? {
                              ...node,
                              ...action.payload,
                          }
                        : node
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
        case 'SELECT_NODE': {
            return {
                ...state,
                nodes: state.nodes.map((node) =>
                    node.id === action.payload.id
                        ? {
                              ...node,
                              isFocused: action.payload.isFocused,
                          }
                        : {
                              ...node,
                              isFocused: false,
                          }
                ),
            };
        }
        case 'CLEAR_SELECTED_NODES': {
            return {
                ...state,
                nodes: state.nodes.map((node) => ({
                    ...node,
                    isFocused: false,
                })),
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
        case 'CONNECT_EDGE': {
            return {
                ...state,
                connectEdge: {
                    ...state.connectEdge,
                    ...action.payload,
                },
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
        connectEdge: {
            isConnecting: false,
            start: { x: 0, y: 0 },
            end: { x: 0, y: 0 },
        },
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
