import { Node } from '@types';
import {
    createContext,
    Dispatch,
    ReactNode,
    useContext,
    useReducer,
} from 'react';

type CanvasInstanceState = {
    nodes: Record<string, Node>;
};

type CanvasInstanceAction = {
    type: 'UPDATE_NODE';
    payload: Partial<Node> & { id: Node['id'] };
};

type CanvasInstanceContextProps = {
    state: CanvasInstanceState;
    dispatch: Dispatch<CanvasInstanceAction>;
};

const CanvasInstanceContext = createContext<CanvasInstanceContextProps | null>(
    null,
);

const canvasInstanceReducer = (
    state: CanvasInstanceState,
    action: CanvasInstanceAction,
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

export const CanvasInstanceProvider = ({
    children,
    initialState,
}: {
    children: ReactNode;
    initialState?: CanvasInstanceState;
}) => {
    const [state, dispatch] = useReducer(
        canvasInstanceReducer,
        initialState ?? { nodes: {} },
    );

    return (
        <CanvasInstanceContext.Provider value={{ state, dispatch }}>
            {children}
        </CanvasInstanceContext.Provider>
    );
};

export const useCanvasInstanceContext = () => {
    const context = useContext(CanvasInstanceContext);
    if (!context) throw new Error('GraphInstanceContext: context is undefined');

    return context;
};
