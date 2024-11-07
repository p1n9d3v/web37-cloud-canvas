import Background from '@components/Background';
import usePanZoom from '@hooks/usePanZoom';
import { PropsWithChildren, useRef } from 'react';

export default ({ children }: PropsWithChildren) => {
    const ref = useRef<HTMLDivElement>(null);
    const {
        viewBox,
        isDragging,
        handleMoveStart,
        handleMove,
        handleMoveEnd,
        handleZoom,
    } = usePanZoom(ref);

    const backgroundPoints = [
        [viewBox.x, viewBox.y],
        [viewBox.x + viewBox.width, viewBox.y],
        [viewBox.x + viewBox.width, viewBox.y + viewBox.height],
        [viewBox.x, viewBox.y + viewBox.height],
    ];

    return (
        <div
            ref={ref}
            style={{
                width: '100%',
                height: '100%',
                cursor: isDragging ? 'grab' : 'auto',
            }}
            onWheel={handleZoom}
            onMouseDown={handleMoveStart}
            onMouseMove={handleMove}
            onMouseUp={handleMoveEnd}
        >
            <svg
                width="100%"
                height="100%"
                viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`}
            >
                <Background
                    points={backgroundPoints
                        .map((point) => point.join(','))
                        .join(' ')}
                    showSubLines={true}
                />
                {children}
            </svg>
        </div>
    );
};
