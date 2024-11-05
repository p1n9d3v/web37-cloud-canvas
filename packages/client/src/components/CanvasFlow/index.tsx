import Background from '@components/CanvasFlow/Background';
import Node from '@components/CanvasFlow/Node';
import { useFlowInstanceContext } from '@contexts/FlowInstanceContext';
import useNodeMovement from '@hooks/useNodeMovement';
import usePanZoom from '@hooks/useZoomPan';
import { useRef } from 'react';
import { Node as NodeType } from '@types';

export default () => {
    const ref = useRef<HTMLDivElement>(null);
    const {
        state: { edges, nodes },
        dispatch,
    } = useFlowInstanceContext();

    const {
        viewBox,
        isDragging: isPanZoomDragging,
        handleMoveStart: handleZoomPanMoveStart,
        handleZoom,
    } = usePanZoom(ref);

    const { handleMoveStart: handleNodeMoveStart } = useNodeMovement(
        ref,
        viewBox,
        (node: NodeType) => {
            dispatch({ type: 'UPDATE_NODE', payload: node });
        }
    );

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
