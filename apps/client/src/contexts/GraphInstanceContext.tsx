import { Node } from '@types';
import {
    createContext,
    Dispatch,
    ReactNode,
    useContext,
    useReducer,
} from 'react';

type GraphInstanceState = {
    nodes: Record<string, Node>;
};

type GraphInstanceAction = {
    type: 'UPDATE_NODE';
    payload: Partial<Node> & { id: Node['id'] };
};

type GraphInstanceContextProps = {
    state: GraphInstanceState;
    dispatch: Dispatch<GraphInstanceAction>;
};

const GraphInstanceContext = createContext<GraphInstanceContextProps | null>(
    null,
);

const graphInstanceReducer = (
    state: GraphInstanceState,
    action: GraphInstanceAction,
) => {
    switch (action.type) {
        case 'UPDATE_NODE': {
            return {
                ...state,
                nodes: {
                    ...state.nodes,
                    [action.payload.id]: {
                        ...state.nodes[action.payload.id],
                        ...action.payload,
                    },
                },
            };
        }
        default:
            return state;
    }
};

export const GraphInstanceProvider = ({
    children,
    initialState,
}: {
    children: ReactNode;
    initialState?: GraphInstanceState;
}) => {
    const [state, dispatch] = useReducer(
        graphInstanceReducer,
        initialState ?? { nodes: {} },
    );

    return (
        <GraphInstanceContext.Provider value={{ state, dispatch }}>
            {children}
        </GraphInstanceContext.Provider>
    );
};

export const useGraphInstanceContext = () => {
    const context = useContext(GraphInstanceContext);
    if (!context) throw new Error('GraphInstanceContext: context is undefined');

    return context;
};
