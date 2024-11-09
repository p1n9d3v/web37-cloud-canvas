import { Edge, EdgePoint, Node } from '@types';
import { calculateAnchorsPosition } from '@utils/index';
import {
    createContext,
    Dispatch,
    PropsWithChildren,
    useContext,
    useReducer,
} from 'react';

type ConnectingEdge = {
    source: EdgePoint | null;
    target: EdgePoint | null;
    isConnecting: boolean;
};

type FlowInstanceState = {
    nodes: Node[];
    edges: Edge[];
    connectingEdge: ConnectingEdge;
};

type FlowInstanceAction =
    | { type: 'ADD_NODE'; payload: Pick<Node, 'id' | 'type'> }
    | { type: 'UPDATE_NODE'; payload: Partial<Node> }
    | { type: 'REMOVE_NODE'; payload: { id: string } }
    | { type: 'MOVE_NODE'; payload: Pick<Node, 'id' | 'position'> }
    | { type: 'ADD_EDGE'; payload: Edge }
    | { type: 'SELECT_NODE'; payload: { id: string; isFocused: boolean } }
    | { type: 'CLEAR_SELECTED_NODES' }
    | { type: 'REMOVE_EDGE'; payload: Edge }
    | { type: 'CONNECTING_EDGE'; payload: Partial<ConnectingEdge> };

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
                nodes: [
                    ...state.nodes,
                    {
                        ...action.payload,
                        isFocused: false,
                        position: {
                            //TODO: 추후 선택된 지점으로 이동할 수 있도록 설정하던가 해야함
                            x: 0,
                            y: 0,
                        },
                        anchors: calculateAnchorsPosition(0, 0),
                    },
                ],
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

        case 'MOVE_NODE': {
            const {
                position: { x, y },
            } = action.payload;
            const anchors = calculateAnchorsPosition(x, y);
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
                edges: state.edges.map((edge) => {
                    if (edge.source.nodeId === action.payload.id) {
                        return {
                            ...edge,
                            source: {
                                ...edge.source,
                                anchor: {
                                    ...edge.source.anchor,
                                    position: {
                                        x: anchors[edge.source.anchor.type!].x,
                                        y: anchors[edge.source.anchor.type!].y,
                                    },
                                },
                            },
                        };
                    } else if (edge.target.nodeId === action.payload.id) {
                        return {
                            ...edge,
                            target: {
                                ...edge.target,
                                anchor: {
                                    ...edge.target.anchor,
                                    position: {
                                        x: anchors[edge.target.anchor.type!].x,
                                        y: anchors[edge.target.anchor.type!].y,
                                    },
                                },
                            },
                        };
                    }
                    return edge;
                }),
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
        case 'CONNECTING_EDGE': {
            return {
                ...state,
                connectingEdge: {
                    ...state.connectingEdge,
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
        connectingEdge: {
            source: null,
            target: null,
            isConnecting: false,
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
