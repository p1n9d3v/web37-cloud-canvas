import useZoomPan from '@cloudflow/hooks/useZoomPan';
import { ViewBox } from '@cloudflow/types';
import { MouseEvent, ReactElement, WheelEvent } from 'react';

type Props = {
    children: (props: { viewBox: ViewBox }) => ReactElement;
};
export default ({ children }: Props) => {
    const { zoomPanRef, viewBox, zoom, startDragPan, dragPan, endDragPan } =
        useZoomPan();

    const handleWheel = (e: WheelEvent<HTMLDivElement>) => {
        const { clientX, clientY, deltaY } = e;
        zoom(deltaY, { x: clientX, y: clientY });
    };

    const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        const { clientX, clientY } = e;
        startDragPan({ x: clientX, y: clientY });
    };

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        const { clientX, clientY } = e;
        dragPan({ x: clientX, y: clientY });
    };

    const handleMouseUp = () => {
        endDragPan();
    };

    return (
        <div
            ref={zoomPanRef}
            style={{
                width: '100%',
                height: '100%',
            }}
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
        >
            {children({ viewBox })}
        </div>
    );
};
