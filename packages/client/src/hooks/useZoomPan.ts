import { useFlowZoomPanContext } from '@contexts/FlowZoomPanContext';
import { getRelativeCoordinatesForViewBox } from '@utils/index';
import {
    RefObject,
    MouseEvent as ReactMouseEvent,
    WheelEvent,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from 'react';

export default (ref: RefObject<HTMLElement>) => {
    const { viewBox, changeViewBox } = useFlowZoomPanContext();

    const [isDragging, setIsDragging] = useState(false);
    const dragStartMousePosition = useRef({ x: 0, y: 0 });
    const dragStartViewBoxPosition = useRef({ x: 0, y: 0 });

    const handleZoom = (e: WheelEvent) => {
        const { deltaY, clientX, clientY } = e;

        // scroll up -> scale down, scroll up -> scale down
        const scaleFactor = 0.1;
        const ratio = deltaY > 0 ? 1 + scaleFactor : 1 - scaleFactor;

        const { x: _x, y: _y } = getRelativeCoordinatesForViewBox(
            clientX,
            clientY,
            ref,
            viewBox
        );
        const newX = _x - (_x - viewBox.x) * ratio;
        const newY = _y - (_y - viewBox.y) * ratio;

        const newWidth = viewBox.width * ratio;
        const newHeight = viewBox.height * ratio;

        changeViewBox({
            x: newX,
            y: newY,
            width: newWidth,
            height: newHeight,
        });
    };

    const handleMoveStart = (e: ReactMouseEvent) => {
        setIsDragging(true);

        const { clientX, clientY } = e;
        dragStartMousePosition.current = { x: clientX, y: clientY };
        dragStartViewBoxPosition.current = { x: viewBox.x, y: viewBox.y };
    };

    const handleMove = (e: MouseEvent) => {
        if (!isDragging || !ref.current) return;

        const zoomPan = ref.current.getBoundingClientRect();
        const viewBoxWidthPerPixel = viewBox.width / zoomPan.width;
        const viewBoxHeightPerPixel = viewBox.height / zoomPan.height;

        const { x: mouseStartX, y: mouseStartY } =
            dragStartMousePosition.current;

        const distanceX = e.clientX - mouseStartX;
        const distanceY = e.clientY - mouseStartY;
        const dx = distanceX * viewBoxWidthPerPixel;
        const dy = distanceY * viewBoxHeightPerPixel;

        const { x: viewBoxStartX, y: viewBoxStartY } =
            dragStartViewBoxPosition.current;

        changeViewBox({
            ...viewBox,
            x: viewBoxStartX - dx,
            y: viewBoxStartY - dy,
        });
    };

    const handleMoveEnd = () => setIsDragging(false);

    useLayoutEffect(() => {
        const handleResize = () => {
            if (!ref.current) return;

            changeViewBox({
                x: 0,
                y: 0,
                width: ref.current.offsetWidth,
                height: ref.current.offsetHeight,
            });
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (isDragging) {
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
    }, [isDragging, handleMove, handleMoveEnd]);

    return {
        viewBox,
        isDragging,
        handleMoveStart,
        handleMoveEnd,
        handleMove,
        handleZoom,
    };
};
