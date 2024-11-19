import { Node, Point } from '@types';
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
    dragNode: (id: string, point: Point) => void;
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

    const dragNode = (id: string, offset: Point) => {
        const { point } = state.nodes[id];
        dispatch({
            type: 'UPDATE_NODE',
            payload: {
                id,
                point: {
                    x: point.x + offset.x,
                    y: point.y + offset.y,
                },
            },
        });
    };

    return (
        <CanvasInstanceContext.Provider value={{ state, dispatch, dragNode }}>
            {children}
        </CanvasInstanceContext.Provider>
    );
};

export const useCanvasInstanceContext = () => {
    const context = useContext(CanvasInstanceContext);
    if (!context) throw new Error('GraphInstanceContext: context is undefined');

    return context;
};
