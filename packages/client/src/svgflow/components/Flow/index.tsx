import Background from '@svgflow/components/Background';
import { useSvgFlowContext } from '@svgflow/contexts/SvgFlowCotext';
import useZoomPan from '@svgflow/hooks/useZoomPan';
import { MouseEvent, ReactNode, WheelEvent } from 'react';

type Props = {
    children: ReactNode;
};

export default ({ children }: Props) => {
    const { flowRef, dimension } = useSvgFlowContext();

    const { viewBox, zoom, startPan, endPan, movePan } = useZoomPan();

    const handleWheel = (event: WheelEvent) => {
        const { deltaY, clientX, clientY } = event;
        zoom(deltaY, { x: clientX, y: clientY });
    };

    const handleMouseDown = (event: MouseEvent) => {
        const { clientX, clientY } = event;
        startPan({ x: clientX, y: clientY });
    };

    const handleMouseMove = (event: MouseEvent) => {
        const { clientX, clientY } = event;
        movePan({ x: clientX, y: clientY });
    };

    const handleMouseUp = () => {
        endPan();
    };
    return (
        <svg
            ref={flowRef}
            width="100%"
            height="100%"
            viewBox={Object.values(viewBox).join(' ')}
            onMouseUp={handleMouseUp}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onWheel={handleWheel}
        >
            <Background viewBox={viewBox} dimension={dimension} showSubLines />
            {children}
        </svg>
    );
};
