import Flow from '@svgflow/components/Flow';
import Node from '@svgflow/components/Node';
import { FlowProvider, useFlowContext } from '@svgflow/contexts/FlowCotext';
import { NodeProvider, useNodeContext } from '@svgflow/contexts/NodeContext';
import useDragNode from '@svgflow/hooks/useDragNode';
import useZoomPan from '@svgflow/hooks/useZoomPan';
import { nanoid } from 'nanoid';
import { useEffect, useMemo } from 'react';

const getRandomPoint = () => {
    return {
        x: Math.floor(Math.random() * 10000),
        y: Math.floor(Math.random() * 10000),
    };
};

export const SvgFlow = () => {
    const { flowRef, dimension } = useFlowContext();
    const {
        viewBox,
        isPanning,
        handleZoom,
        handleStartPan,
        handleMovePan,
        handleEndPan,
    } = useZoomPan(flowRef);
    const {
        isDragging,
        handleStartDragNode,
        handleDragNode,
        handleEndDragNode,
    } = useDragNode(flowRef, dimension);

    const {
        state: { nodes },
        dispatch,
    } = useNodeContext();

    const visibleNodes = useMemo(
        () =>
            nodes.filter((node) => {
                const { x, y } = node.point;
                return (
                    x >= viewBox.x &&
                    x <= viewBox.x + viewBox.width &&
                    y >= viewBox.y &&
                    y <= viewBox.y + viewBox.height
                );
            }),
        [nodes, viewBox]
    );

    useEffect(() => {
        Array(5000)
            .fill(0)
            .forEach(() => {
                dispatch({
                    type: 'ADD_NODE',
                    payload: {
                        id: nanoid(),
                        type: 'server',
                        point: getRandomPoint(),
                    },
                });
            });
    }, []);

    useEffect(() => {
        if (flowRef.current) {
            flowRef.current.style.cursor =
                isDragging || isPanning ? 'grab' : 'auto';
        }
    }, [isDragging, isPanning]);

    return (
        <Flow
            dimension="2d"
            ref={flowRef}
            viewBox={viewBox}
            onZoom={handleZoom}
            onStartPan={handleStartPan}
            onMovePan={handleMovePan}
            onEndPan={handleEndPan}
            onDragNode={handleDragNode}
            onEndDragNode={handleEndDragNode}
        >
            {visibleNodes.map((node) => (
                <Node
                    key={node.id}
                    node={node}
                    dimension={dimension}
                    onStartDragNode={handleStartDragNode}
                />
            ))}
        </Flow>
    );
};

export default () => {
    // 추후 프로파이더 밖으로 빼야함
    return (
        <FlowProvider>
            <NodeProvider>
                <SvgFlow />
            </NodeProvider>
        </FlowProvider>
    );
};
