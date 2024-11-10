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

type EdgeContextProps = {
    state: EdgeState;
    dispatch: Dispatch<EdgeAction>;
};

const EdgeContext = createContext<EdgeContextProps>({
    state: initialEdgeState,
    dispatch: () => {},
});

export const EdgeProvider = ({ children }: PropsWithChildren) => {
    const [state, dispatch] = useReducer(edgeReducer, initialEdgeState);
    return (
        <EdgeContext.Provider value={{ state, dispatch }}>
            {children}
        </EdgeContext.Provider>
    );
};

export const useEdgeContext = () => {
    const context = useContext(EdgeContext);
    if (!context) {
        throw new Error('EdgeContext : context is undefined');
    }

    return context;
};
