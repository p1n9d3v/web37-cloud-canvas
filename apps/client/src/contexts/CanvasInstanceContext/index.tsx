import { useCanvasDimensionContext } from '@contexts/CanvasDimensionContext';
import {
    CanvasInstanceAction,
    canvasInstanceReducer,
    CanvasInstanceState,
} from '@contexts/CanvasInstanceContext/reducer';
import { Point } from '@types';
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
    const { dimension } = useCanvasDimensionContext();
    const [state, dispatch] = useReducer(
        canvasInstanceReducer,
        initialState ?? { nodes: {}, groups: {} },
    );

    const dragGroup = (id: string, offset: Point) => {
        const { bounds, nodeIds } = state.groups[id];

        // const innerNodes = nodeIds.map((nodeId) => state.nodes[nodeId]);
        // innerNodes.forEach((node) => dragNode(node.id, offset));
        dispatch({
            type: 'UPDATE_GROUP',
            payload: {
                id,
                bounds: {
                    ...bounds,
                    x: bounds.x + offset.x,
                    y: bounds.y + offset.y,
                },
            },
        });
    };

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
