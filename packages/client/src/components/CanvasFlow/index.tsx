import Background from '@components/CanvasFlow/Background';
import Edge from '@components/CanvasFlow/Edge';
import Node from '@components/CanvasFlow/Node';
import { useFlowInstanceContext } from '@contexts/FlowInstanceContext';
import { useFlowZoomPanContext } from '@contexts/FlowZoomPanContext';
import useZoomPan from '@hooks/useZoomPan';
import { LegacyRef } from 'react';

export default () => {
    const { ref, viewBox } = useFlowZoomPanContext();
    const { position: viewBoxPosition } = viewBox;

    const {
        state: { connectingEdge, nodes, edges },
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
                {edges.map((edge) => {
                    const {
                        source: {
                            anchor: {
                                position: { x: sx, y: sy },
                            },
                        },

                        target: {
                            anchor: {
                                position: { x: tx, y: ty },
                            },
                        },
                    } = edge;
                    return (
                        <Edge key={edge.id} x1={sx} y1={sy} x2={tx} y2={ty} />
                    );
                })}
                {nodes.map((node) => (
                    <Node key={node.id} {...node} />
                ))}

                {connectingEdge.isConnecting && (
                    <Edge
                        x1={connectingEdge.source.anchor.position.x}
                        y1={connectingEdge.source.anchor.position.y}
                        x2={connectingEdge.target.anchor.position.x}
                        y2={connectingEdge.target.anchor.position.y}
                        stroke={'black'}
                        strokeWidth={2}
                    />
                )}
            </svg>
        </div>
    );
};
