import useZoomPan from '@cloudflow/hooks/useZoomPan';
import { ViewBox } from '@cloudflow/types';
import { ReactElement } from 'react';

type Props = {
    children: (props: { viewBox: ViewBox }) => ReactElement;
};
export default ({ children }: Props) => {
    const { zoomPanRef, viewBox, onZoom, onDragStart, onDrag, onDragEnd } =
        useZoomPan();

    return (
        <div
            ref={zoomPanRef}
            style={{
                width: '100%',
                height: '100%',
            }}
            onWheel={onZoom}
            onMouseDown={onDragStart}
            onMouseMove={onDrag}
            onMouseUp={onDragEnd}
        >
            {children({ viewBox })}
        </div>
    );
};
