import { GRID_SIZE_QUARTER } from '@constants';
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
    const { ref: zoomPanRef, viewBox } = useFlowZoomPanContext();
    const ref = useRef<SVGGElement>(null);
    const { dispatch: flowInstanceDispatch } = useFlowInstanceContext();

    //TDDO: Context로 옮길지 고민
    const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
    const originPosition = useRef({ x: 0, y: 0 });

    const getAdjustedMousePosition = (
        clientX: number,
        clientY: number,
        nodeId: string
    ) => {
        const $node = zoomPanRef.current!.querySelector(`#${nodeId}`);
        const rect = $node!.getBoundingClientRect();
        const { height, width } = rect;

        return getRelativeCoordinatesForViewBox(
            clientX - width / 2,
            clientY - height / 2,
            zoomPanRef,
            viewBox
        );
    };

    const initiateNodeDrag = (e: ReactMouseEvent, id: string) => {
        e.stopPropagation();
        setSelectedNodeId(id);

        originPosition.current = getAdjustedMousePosition(
            e.clientX,
            e.clientY,
            id
        );
    };

    const updateNodePosition = (e: MouseEvent) => {
        if (!selectedNodeId || !zoomPanRef.current) return;

        const { x: newX, y: newY } = getAdjustedMousePosition(
            e.clientX,
            e.clientY,
            selectedNodeId
        );

        const gridAlignedX =
            Math.floor(newX / GRID_SIZE_QUARTER) * GRID_SIZE_QUARTER;
        const gridAlignedY =
            Math.floor(newY / GRID_SIZE_QUARTER) * GRID_SIZE_QUARTER;

        flowInstanceDispatch({
            type: 'MOVE_NODE',
            payload: {
                id: selectedNodeId,
                position: {
                    x: gridAlignedX,
                    y: gridAlignedY,
                },
            },
        });
    };

    const finalizeNodePosition = () => setSelectedNodeId(null);

    const selectNode = (id: string) =>
        flowInstanceDispatch({
            type: 'SELECT_NODE',
            payload: { id, isFocused: true },
        });

    const clearSelect = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as any)) {
            flowInstanceDispatch({
                type: 'CLEAR_SELECTED_NODES',
            });
        }
    };

    useEffect(() => {
        window.addEventListener('mousedown', clearSelect);

        return () => window.removeEventListener('mousedown', clearSelect);
    }, []);

    useEffect(() => {
        if (selectedNodeId) {
            window.addEventListener('mousemove', updateNodePosition);
            window.addEventListener('mouseup', finalizeNodePosition);
        } else {
            window.removeEventListener('mousemove', updateNodePosition);
            window.removeEventListener('mouseup', finalizeNodePosition);
        }

        return () => {
            window.removeEventListener('mousemove', updateNodePosition);
            window.removeEventListener('mouseup', finalizeNodePosition);
        };
    }, [selectedNodeId]);

    return {
        ref,
        selectNode,
        initiateNodeDrag,
    };
};
