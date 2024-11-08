import useZoomPan from '@hooks/useZoomPan';
import { LegacyRef, ReactElement } from 'react';

type Props = {
    children: ReactElement<{ viewBox?: any }>;
};
export default ({ children }: Props) => {
    const { ref, isDragging, drag, startDrag, stopDrag, zoomInZoomOut } =
        useZoomPan();

    return (
        <div
            ref={ref as LegacyRef<HTMLDivElement>}
            style={{
                width: '100%',
                height: '100%',
                cursor: isDragging ? 'grab' : 'auto',
            }}
            onWheel={zoomInZoomOut}
            onMouseDown={startDrag}
            onMouseMove={drag}
            onMouseUp={stopDrag}
        >
            {children}
        </div>
    );
};
