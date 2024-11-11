import Flow from '@svgflow/components/Flow';
import Node from '@svgflow/components/Node';
import {
    GRID_3D_DEPTH_SIZE,
    GRID_3D_HEIGHT_SIZE,
    GRID_3D_WIDTH_SIZE,
    GRID_SIZE,
} from '@svgflow/constants';
import { FlowProvider, useFlowContext } from '@svgflow/contexts/FlowCotext';
import { NodeProvider, useNodeContext } from '@svgflow/contexts/NodeContext';
import useDragNode from '@svgflow/hooks/useDragNode';
import useZoomPan from '@svgflow/hooks/useZoomPan';
import { nanoid } from 'nanoid';
import { useCallback, useEffect, useMemo, useState } from 'react';

const getRandomPoint = () => {
    return {
        x: Math.floor(Math.random() * 10000),
        y: Math.floor(Math.random() * 10000),
    };
};

export const SvgFlow = () => {
    const { flowRef, dimension, changeDimension } = useFlowContext();
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
    const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

    const {
        state: { nodes },
        dispatch,
    } = useNodeContext();

    const visibleNodes = useMemo(
        () =>
            nodes.filter((node) => {
                const { x, y } = node.point;
                const offsetWidth =
                    dimension === '2d' ? GRID_SIZE : GRID_3D_WIDTH_SIZE;
                const offsetHeight =
                    dimension === '2d'
                        ? GRID_SIZE
                        : GRID_3D_HEIGHT_SIZE + GRID_3D_DEPTH_SIZE;

                return (
                    x >= viewBox.x - offsetWidth &&
                    x <= viewBox.x + viewBox.width + offsetWidth &&
                    y >= viewBox.y - offsetHeight &&
                    y <= viewBox.y + viewBox.height + offsetHeight
                );
            }),
        [nodes, viewBox, dimension]
    );

    const handleSelectNode = useCallback((nodeId: string) => {
        setSelectedNodeId(nodeId);
    }, []);

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
            dimension={dimension}
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
                    isSelected={node.id === selectedNodeId}
                    onStartDragNode={handleStartDragNode}
                    onSelectNode={handleSelectNode}
                />
            ))}

            <rect
                width="100px"
                height="100px"
                x="0"
                y="0"
                fill="red"
                onClick={() =>
                    changeDimension(dimension === '2d' ? '3d' : '2d')
                }
            />
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
