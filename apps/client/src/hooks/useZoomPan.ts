import { useFlowZoomPanContext } from '@contexts/FlowZoomPanContext';
import { getRelativeCoordinatesForViewBox } from '@utils/index';
import {
    MouseEvent,
    WheelEvent,
    useLayoutEffect,
    useRef,
    useState,
} from 'react';

export default () => {
    const { ref, viewBox, changeViewBox } = useFlowZoomPanContext();

    const [isDragging, setIsDragging] = useState(false);

    const dragStartMousePosition = useRef({ x: 0, y: 0 });
    const dragStartViewBoxPosition = useRef({ x: 0, y: 0 });

    const zoomInZoomOut = (e: WheelEvent) => {
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

        const { position: viewBoxPosition } = viewBox;
        const newX = _x - (_x - viewBoxPosition.x) * ratio;
        const newY = _y - (_y - viewBoxPosition.y) * ratio;

        const newWidth = viewBox.width * ratio;
        const newHeight = viewBox.height * ratio;

        changeViewBox({
            position: {
                x: newX,
                y: newY,
            },
            width: newWidth,
            height: newHeight,
        });
    };

    const startDrag = (e: MouseEvent) => {
        setIsDragging(true);

        const { clientX, clientY } = e;

        const { position: viewBoxPosition } = viewBox;
        dragStartMousePosition.current = { x: clientX, y: clientY };
        dragStartViewBoxPosition.current = {
            x: viewBoxPosition.x,
            y: viewBoxPosition.y,
        };
    };

    const drag = (e: MouseEvent) => {
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
            position: {
                x: viewBoxStartX - dx,
                y: viewBoxStartY - dy,
            },
        });
    };

    const stopDrag = () => setIsDragging(false);

    useLayoutEffect(() => {
        const zoomPan = ref.current;

        const handleResize = () => {
            changeViewBox({
                position: {
                    x: 0,
                    y: 0,
                },
                width: ref.current!.offsetWidth,
                height: ref.current!.offsetHeight,
            });
        };
        if (zoomPan) {
            handleResize();
            zoomPan.addEventListener('resize', handleResize);
            return () => zoomPan.removeEventListener('resize', handleResize);
        }
    }, []);

    return {
        ref,
        viewBox,
        isDragging,
        startDrag,
        stopDrag,
        drag,
        zoomInZoomOut,
    };
};
