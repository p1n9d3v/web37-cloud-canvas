import {
    graphNodeReducer,
    NodeAction,
    GraphNodeState,
} from '@cloudflow/contexts/GraphNodeContext/reducer';
import {
    createContext,
    Dispatch,
    PropsWithChildren,
    useContext,
    useReducer,
} from 'react';

const initialState: GraphNodeState = {
    nodes: [],
    selectedNodeIds: new Set(),
};

const GraphNodeContext = createContext<{
    state: GraphNodeState;
    dispatch: Dispatch<NodeAction>;
}>({
    state: initialState,
    dispatch: () => null,
});

export const GraphNodeProvider = ({ children }: PropsWithChildren) => {
    const [state, dispatch] = useReducer(graphNodeReducer, initialState);

    return (
        <GraphNodeContext.Provider value={{ state, dispatch }}>
            {children}
        </GraphNodeContext.Provider>
    );
};

export const useGraphNodeContext = () => {
    const context = useContext(GraphNodeContext);
    if (!context) {
        throw new Error('GraphNodeContext : context is undefined');
    }
    return context;
};
