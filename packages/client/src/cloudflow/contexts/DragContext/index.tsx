import { Point } from '@cloudflow/types';
import {
    createContext,
    PropsWithChildren,
    useContext,
    useRef,
    useState,
} from 'react';

type DragState = {
    isDragging: boolean;
    draggingId: string | null;
    startDragPoint: { x: number; y: number };
};

interface DragContext extends DragState {
    isDragging: boolean;
    draggingId: string | null;
    startDrag: (id: string, point?: Point) => void;
    endDrag: () => void;
}

const DragContext = createContext<DragContext>({
    isDragging: false,
    draggingId: null,
    startDragPoint: { x: 0, y: 0 },
    startDrag: () => {},
    endDrag: () => {},
});

export const DragProvider = ({ children }: PropsWithChildren) => {
    const [isDragging, setIsDragging] = useState(false);
    const [draggingId, setDraggingNodeId] = useState<string | null>(null);
    const startDragPoint = useRef({ x: 0, y: 0 });

    const startDrag = (nodeId: string, point?: Point) => {
        setIsDragging(true);
        setDraggingNodeId(nodeId);

        if (point) {
            startDragPoint.current = point;
        }
    };

    const endDrag = () => {
        setIsDragging(false);
        setDraggingNodeId(null);
        startDragPoint.current = { x: 0, y: 0 };
    };

    return (
        <DragContext.Provider
            value={{
                startDragPoint: startDragPoint.current,
                isDragging,
                draggingId,
                startDrag,
                endDrag,
            }}
        >
            {children}
        </DragContext.Provider>
    );
};

export const useDragContext = () => {
    const context = useContext(DragContext);
    if (!context) {
        throw new Error('DragContext : context is undefined');
    }

    return context;
};
