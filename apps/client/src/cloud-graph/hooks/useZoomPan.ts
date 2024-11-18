import { Point, ViewBox } from '@cloud-graph/types';
import { getSvgPoint } from '@cloud-graph/utils';
import { Dispatch, SetStateAction, useRef } from 'react';

type Props = {
    svg: SVGSVGElement;
    viewBox: ViewBox;
    setViewBox: Dispatch<SetStateAction<ViewBox>>;
};

export default ({ svg, viewBox, setViewBox }: Props) => {
    const isPanningRef = useRef(false);
    const startPointRef = useRef<Point>({ x: 0, y: 0 });

    const handleZoom = (wheelY: number, point: Point) => {
        const zoomFactor = wheelY > 0 ? 1.1 : 0.9;
        const cursorSvgPoint = getSvgPoint(svg, point);
        if (!cursorSvgPoint) return;

        setViewBox((prev) => {
            const newWidth = prev.width * zoomFactor;
            const newHeight = prev.height * zoomFactor;

            const deltaX = (cursorSvgPoint.x - prev.x) * (1 - zoomFactor);
            const deltaY = (cursorSvgPoint.y - prev.y) * (1 - zoomFactor);

            return {
                x: prev.x + deltaX,
                y: prev.y + deltaY,
                width: newWidth,
                height: newHeight,
            };
        });
    };

    const handleStartPan = (point: Point) => {
        isPanningRef.current = true;
        startPointRef.current = point;
    };

    const handleMovePan = (point: Point) => {
        if (!isPanningRef.current || !svg) return;
        document.body.style.cursor = 'grabbing';

        const dx =
            (startPointRef.current.x - point.x) *
            (viewBox.width / svg.clientWidth);
        const dy =
            (startPointRef.current.y - point.y) *
            (viewBox.height / svg.clientHeight);

        startPointRef.current = point;

        setViewBox((prev) => ({
            ...prev,
            x: prev.x + dx,
            y: prev.y + dy,
        }));
    };

    const handleStopPan = () => {
        isPanningRef.current = false;
        document.body.style.cursor = 'default';
    };

    return { handleStartPan, handleMovePan, handleStopPan, handleZoom };
};
