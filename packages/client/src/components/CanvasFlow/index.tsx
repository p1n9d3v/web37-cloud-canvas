import Background from '@components/CanvasFlow/Background';
import Node from '@components/CanvasFlow/Node';
import { useFlowInstanceContext } from '@contexts/FlowInstanceContext';
import { useFlowZoomPanContext } from '@contexts/FlowZoomPanContext';
import useNodeMovement from '@hooks/useNodeMovement';
import useZoomPan from '@hooks/useZoomPan';
import { LegacyRef } from 'react';

export default () => {
    const { ref, viewBox } = useFlowZoomPanContext();

    const {
        state: { edges, nodes },
    } = useFlowInstanceContext();

    const {
        isDragging: isPanZoomDragging,
        handleMoveStart: handleZoomPanMoveStart,
        handleZoom,
    } = useZoomPan(ref);

    const { handleMoveStart: handleNodeMoveStart } = useNodeMovement();

    const backgroundPoints = [
        [viewBox.x, viewBox.y],
        [viewBox.x + viewBox.width, viewBox.y],
        [viewBox.x + viewBox.width, viewBox.y + viewBox.height],
        [viewBox.x, viewBox.y + viewBox.height],
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
                viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`}
            >
                <Background
                    points={backgroundPoints
                        .map((point) => point.join(','))
                        .join(' ')}
                    showSubLines={true}
                />
                {edges.map((edge, index) => {
                    const fromNode = nodes.find(
                        (node) => node.id === edge.source
                    );
                    const toNode = nodes.find(
                        (node) => node.id === edge.target
                    );
                    return (
                        fromNode &&
                        toNode && (
                            <line
                                key={index}
                                x1={fromNode.x}
                                y1={fromNode.y}
                                x2={toNode.x}
                                y2={toNode.y}
                                stroke="blue"
                                strokeWidth="2"
                            />
                        )
                    );
                })}
                {nodes.map((node) => (
                    <Node
                        key={node.id}
                        {...node}
                        type="server"
                        onMouseDown={(e) => handleNodeMoveStart(e, node.id)}
                    />
                ))}
            </svg>
        </div>
    );
};
