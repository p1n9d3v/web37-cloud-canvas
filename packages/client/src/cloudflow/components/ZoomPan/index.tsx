import useZoomPan from '@cloudflow/hooks/useZoomPan';
import { ViewBox } from '@cloudflow/types';
import { ReactElement } from 'react';

type Props = {
    children: (props: { viewBox: ViewBox }) => ReactElement;
};
export default ({ children }: Props) => {
    const {
        containerRef,
        viewBox,
        isDragging,
        onZoom,
        onDragStart,
        onDrag,
        onDragEnd,
    } = useZoomPan();

    return (
        <div
            ref={containerRef}
            style={{
                width: '100%',
                height: '100%',
                cursor: isDragging ? 'grab' : 'auto',
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
