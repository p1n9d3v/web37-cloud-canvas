import {
    ConnectionAction,
    connectionReducer,
    ConnectionState,
    initialConnectionState,
} from '@cloudflow/contexts/ConnectionContext/reducer';
import {
    createContext,
    Dispatch,
    PropsWithChildren,
    useContext,
    useReducer,
} from 'react';

type ConnectionContextProps = {
    state: ConnectionState;
    dispatch: Dispatch<ConnectionAction>;
};

const ConnectionContext = createContext<ConnectionContextProps>({
    state: initialConnectionState,
    dispatch: () => {},
});

export const ConnectionProvider = ({ children }: PropsWithChildren) => {
    const [state, dispatch] = useReducer(
        connectionReducer,
        initialConnectionState
    );

    return (
        <ConnectionContext.Provider
            value={{
                state,
                dispatch,
            }}
        >
            {children}
        </ConnectionContext.Provider>
    );
};

export const useConnectionContext = () => {
    const context = useContext(ConnectionContext);

    if (!context) {
        throw new Error('ConnectionContext : context is undefined');
    }
    return context;
};
