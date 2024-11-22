import {
    CanvasInstanceAction,
    canvasInstanceReducer,
    CanvasInstanceState,
} from '@contexts/CanvasInstanceContext/reducer';
import {
    createContext,
    Dispatch,
    ReactNode,
    useContext,
    useReducer,
} from 'react';

type CanvasInstanceContextProps = {
    state: CanvasInstanceState;
    dispatch: Dispatch<CanvasInstanceAction>;
};

const CanvasInstanceContext = createContext<CanvasInstanceContextProps | null>(
    null,
);

export const CanvasInstanceProvider = ({
    children,
    initialState,
}: {
    children: ReactNode;
    initialState?: CanvasInstanceState;
}) => {
    const [state, dispatch] = useReducer(
        canvasInstanceReducer,
        initialState ?? { nodes: {}, edges: {}, groups: {}, connection: null },
    );

    // useEffect(() => {
    //     if (dimension === prevDimension) return;
    //
    //     dispatch({
    //         type: 'ADJUST_POINT_FOR_DIMENSION',
    //         payload: { dimension },
    //     });
    // }, [dimension]);

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
