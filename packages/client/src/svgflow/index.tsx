import Edge from '@svgflow/components/Edge';
import Flow from '@svgflow/components/Flow';
import Node from '@svgflow/components/Node';
import {
    GRID_3D_DEPTH_SIZE,
    GRID_3D_HEIGHT_SIZE,
    GRID_3D_WIDTH_SIZE,
    GRID_SIZE,
} from '@svgflow/constants';
import { EdgeProvider, useEdgeContext } from '@svgflow/contexts/EdgeContext';
import { FlowProvider, useFlowContext } from '@svgflow/contexts/FlowCotext';
import { NodeProvider, useNodeContext } from '@svgflow/contexts/NodeContext';
import useDragNode from '@svgflow/hooks/useDragNode';
import useZoomPan from '@svgflow/hooks/useZoomPan';
import { nanoid } from 'nanoid';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { createMockNodesAndEdges } from '@/mocks/instance';

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
        dispatch: dispatchNode,
    } = useNodeContext();
    const {
        state: { edges },
        dispatch: dispatchEdge,
    } = useEdgeContext();

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

    const visibleEdges = useMemo(
        () =>
            edges.filter((edge) => {
                const sourceNode = visibleNodes.find(
                    (node) => node.id === edge.sourceId
                );

                // INFO: source만 target인 anchor는 보이지 않게 해놨음 이게 제일 베스트인듯
                if (sourceNode) return true;

                // const targetNode = visibleNodes.find(
                //     (node) => node.id === edge.targetId
                // );
                // INFO: 다보임
                // if (sourceNode || targetNode) return true;
                // return false;
                //
                // INFO:  화면에 보이는 것만 렌더링
                // if (!sourceNode || !targetNode) return false;
                // return true;
            }),
        [edges, visibleNodes]
    );

    const handleSelectNode = useCallback((nodeId: string) => {
        setSelectedNodeId(nodeId);
    }, []);

    //mocks
    useEffect(() => {
        const { nodes, edges } = createMockNodesAndEdges(100, 100);

        nodes.forEach((node) => {
            dispatchNode({
                type: 'ADD_NODE',
                payload: node,
            });
        });

        edges.forEach((edge) => {
            dispatchEdge({
                type: 'ADD_EDGE',
                payload: edge,
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
                    // visibleEdges={visibleEdges}
                    onStartDragNode={handleStartDragNode}
                    onSelectNode={handleSelectNode}
                />
            ))}

            {visibleEdges.map((edge) => (
                <Edge key={edge.id} edge={edge} dimension={dimension} />
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
                <EdgeProvider>
                    <SvgFlow />
                </EdgeProvider>
            </NodeProvider>
        </FlowProvider>
    );
};
