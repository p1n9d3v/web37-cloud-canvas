import { ViewBox, Node } from '@types';
import {
    MouseEvent as ReactMouseEvent,
    RefObject,
    useEffect,
    useRef,
    useState,
} from 'react';

export default (
    ref: RefObject<HTMLElement>,
    viewBox: ViewBox,
    changeNodePosition: (newNodeInfo: Node) => void
) => {
    const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

    const handleMoveStart = (e: ReactMouseEvent, id: string) => {
        e.stopPropagation();
        setSelectedNodeId(id);
    };

    const handleMove = (e: MouseEvent) => {
        if (!selectedNodeId || !ref.current) return;

        const { clientX, clientY } = e;
        const zoomPan = ref.current.getBoundingClientRect();
        const relativeX = clientX - zoomPan.left;
        const relativeY = clientY - zoomPan.top;

        const newX = (relativeX / zoomPan.width) * viewBox.width + viewBox.x;
        const newY = (relativeY / zoomPan.height) * viewBox.height + viewBox.y;

        changeNodePosition({ id: selectedNodeId, x: newX, y: newY });
    };

    const handleMoveEnd = () => setSelectedNodeId(null);

    useEffect(() => {
        if (selectedNodeId) {
            window.addEventListener('mousemove', handleMove);
            window.addEventListener('mouseup', handleMoveEnd);
        } else {
            window.removeEventListener('mousemove', handleMove);
            window.removeEventListener('mouseup', handleMoveEnd);
        }

        return () => {
            window.removeEventListener('mousemove', handleMove);
            window.removeEventListener('mouseup', handleMoveEnd);
        };
    }, [selectedNodeId]);

    return {
        selectedNodeId,
        handleMoveStart,
    };
};
