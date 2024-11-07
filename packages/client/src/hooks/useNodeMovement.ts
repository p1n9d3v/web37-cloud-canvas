import { GRID_QUARTER } from '@constants';
import { Node, ViewBox } from '@types';
import { getRelativeCoordinatesForViewBox } from '@utils/index';
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

        //TODO: context로 변경함에 따라 dispatch로 변경
        changeNodePosition({
            id: selectedNodeId,
            x: gridAlignedX,
            y: gridAlignedY,
            type: '',
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
