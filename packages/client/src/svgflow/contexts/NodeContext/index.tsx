import {
    NodeAction,
    nodeReducer,
    NodeState,
} from '@svgflow/contexts/NodeContext/reducer';
import {
    createContext,
    Dispatch,
    PropsWithChildren,
    useContext,
    useReducer,
} from 'react';

type NodeContextProps = {
    state: NodeState;
    dispatch: Dispatch<NodeAction>;
};

const initialState: NodeState = {
    nodes: [],
    selectedNodeId: null,
};

const NodeContext = createContext<NodeContextProps>({
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
        throw new Error('NodeContext : context is undefined');
    }
    return context;
};
