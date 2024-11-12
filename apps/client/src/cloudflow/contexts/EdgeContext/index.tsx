import {
    edgeReducer,
    EdgeState,
    initialState,
} from '@cloudflow/contexts/EdgeContext/reducer';
import { createContext, useContext, useReducer } from 'react';

const EdgeContext = createContext<{
    state: EdgeState;
    dispatch: React.Dispatch<any>;
}>({
    state: initialState,
    dispatch: () => null,
});

export const EdgeProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(edgeReducer, initialState);
    return (
        <EdgeContext.Provider value={{ state, dispatch }}>
            {children}
        </EdgeContext.Provider>
    );
};

export const useEdgeContext = () => useContext(EdgeContext);
