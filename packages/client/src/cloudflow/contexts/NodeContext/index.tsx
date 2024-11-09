import {
    nodeReducer,
    NodeAction,
    NodeState,
} from '@cloudflow/contexts/NodeContext/reducer';
import {
    createContext,
    Dispatch,
    PropsWithChildren,
    useContext,
    useReducer,
} from 'react';

const initialState: NodeState = {
    nodes: [],
    selectedNodeIds: new Set(),
};

const NodeContext = createContext<{
    state: NodeState;
    dispatch: Dispatch<NodeAction>;
}>({
    state: initialState,
    dispatch: () => null,
});

export const NodeProvider = ({ children }: PropsWithChildren) => {
    const [state, dispatch] = useReducer(nodeReducer, initialState);

    return (
        <NodeContext.Provider value={{ state, dispatch }}>
            {children}
        </NodeContext.Provider>
    );
};

export const useNodeContext = () => {
    const context = useContext(NodeContext);
    if (!context) {
        throw new Error('GraphNodeContext : context is undefined');
    }
    return context;
};
