import { GRID_SIZE } from '@constants';
import { ViewBox, Node } from '@types';
import { getRelativeCoordinatesForViewBox } from '@utils/index';
import {
    MouseEvent as ReactMouseEvent,
    RefObject,
    useEffect,
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
        const { x: newX, y: newY } = getRelativeCoordinatesForViewBox(
            clientX,
            clientY,
            ref,
            viewBox
        );

        const GRID_QUARTER = GRID_SIZE / 4;

        const snappedX = Math.round(newX / GRID_QUARTER) * GRID_QUARTER;
        const snappedY = Math.round(newY / GRID_QUARTER) * GRID_QUARTER;

        changeNodePosition({ id: selectedNodeId, x: snappedX, y: snappedY });
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
