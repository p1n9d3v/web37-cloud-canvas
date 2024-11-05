import Background from '@components/CanvasFlow/Background';
import Node from '@components/CanvasFlow/Node';
import { useFlowInstanceContext } from '@contexts/FlowInstanceContext';
import { useFlowZoomPanContext } from '@contexts/FlowZoomPanContext';
import useZoomPan from '@hooks/useZoomPan';
import { LegacyRef } from 'react';

export default () => {
    const { ref, viewBox } = useFlowZoomPanContext();
    const { position: viewBoxPosition } = viewBox;

    const {
        state: { edges, nodes },
    } = useFlowInstanceContext();

    const {
        isDragging: isPanZoomDragging,
        handleMoveStart: handleZoomPanMoveStart,
        handleZoom,
    } = useZoomPan(ref);

    const backgroundPoints = [
        [viewBoxPosition.x, viewBoxPosition.y],
        [viewBoxPosition.x + viewBox.width, viewBoxPosition.y],
        [viewBoxPosition.x + viewBox.width, viewBoxPosition.y + viewBox.height],
        [viewBoxPosition.x, viewBoxPosition.y + viewBox.height],
    ];

    return (
        <div
            ref={ref as LegacyRef<HTMLDivElement>}
            style={{
                width: '100%',
                height: '100%',
                cursor: isPanZoomDragging ? 'grab' : 'auto',
            }}
            onWheel={handleZoom}
            onMouseDown={handleZoomPanMoveStart}
        >
            <svg
                width="100%"
                height="100%"
                viewBox={`${viewBoxPosition.x} ${viewBoxPosition.y} ${viewBox.width} ${viewBox.height}`}
            >
                <Background
                    points={backgroundPoints
                        .map((point) => point.join(','))
                        .join(' ')}
                    showSubLines={true}
                />
                {nodes.map((node) => (
                    <Node key={node.id} {...node} />
                ))}
            </svg>
        </div>
    );
};
