import {
    EdgeAction,
    edgeReducer,
    EdgeState,
    initialEdgeState,
} from '@cloudflow/contexts/EdgeContext/reducer';
import {
    createContext,
    Dispatch,
    PropsWithChildren,
    useContext,
    useReducer,
} from 'react';

const EdgeContext = createContext<{
    state: EdgeState;
    dispatch: Dispatch<EdgeAction>;
}>({
    state: initialEdgeState,
    dispatch: () => null,
});

export const EdgeProvider = ({ children }: PropsWithChildren) => {
    const [state, dispatch] = useReducer(edgeReducer, initialEdgeState);

    return (
        <EdgeContext.Provider value={{ state, dispatch }}>
            {children}
        </EdgeContext.Provider>
    );
};

export const useEdgeContext = () => useContext(EdgeContext);
