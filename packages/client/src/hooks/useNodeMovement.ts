import { GRID_QUARTER } from '@constants';
import { useFlowInstanceContext } from '@contexts/FlowInstanceContext';
import { useFlowZoomPanContext } from '@contexts/FlowZoomPanContext';
import { getRelativeCoordinatesForViewBox } from '@utils/index';
import {
    MouseEvent as ReactMouseEvent,
    useEffect,
    useRef,
    useState,
} from 'react';

export default () => {
    const { ref, viewBox } = useFlowZoomPanContext();
    const { dispatch: flowInstanceDispatch } = useFlowInstanceContext();

    const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
    const originPosition = useRef({ x: 0, y: 0 });

    const getAdjustedMousePosition = (
        clientX: number,
        clientY: number,
        nodeId: string
    ) => {
        const $node = ref.current!.querySelector(`#${nodeId}`);
        const rect = $node!.getBoundingClientRect();
        const { height, width } = rect;

        return getRelativeCoordinatesForViewBox(
            clientX - width / 2,
            clientY - height / 2,
            ref,
            viewBox
        );
    };

    const handleMoveStart = (e: ReactMouseEvent, id: string) => {
        e.stopPropagation();
        setSelectedNodeId(id);

        originPosition.current = getAdjustedMousePosition(
            e.clientX,
            e.clientY,
            id
        );
    };

    const handleMove = (e: MouseEvent) => {
        if (!selectedNodeId || !ref.current) return;

        const { x: newX, y: newY } = getAdjustedMousePosition(
            e.clientX,
            e.clientY,
            selectedNodeId
        );

        const gridAlignedX = Math.floor(newX / GRID_QUARTER) * GRID_QUARTER;
        const gridAlignedY = Math.floor(newY / GRID_QUARTER) * GRID_QUARTER;

        flowInstanceDispatch({
            type: 'UPDATE_NODE',
            payload: {
                id: selectedNodeId,
                x: gridAlignedX,
                y: gridAlignedY,
                type: '',
            },
        });
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
