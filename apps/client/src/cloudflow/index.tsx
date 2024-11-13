import { createMockNodesAndEdges } from '@/mocks/instance';
import Connector from '@cloudflow/components/Connector';
import Edge from '@cloudflow/components/Edge';
import Flow from '@cloudflow/components/Flow';
import Node from '@cloudflow/components/Node';
import {
    GRID_3D_DEPTH_SIZE,
    GRID_3D_HEIGHT_SIZE,
    GRID_3D_WIDTH_SIZE,
    GRID_SIZE,
} from '@cloudflow/constants';
import { EdgeProvider, useEdgeContext } from '@cloudflow/contexts/EdgeContext';
import { FlowProvider, useFlowContext } from '@cloudflow/contexts/FlowCotext';
import { NodeProvider, useNodeContext } from '@cloudflow/contexts/NodeContext';
import useConnection from '@cloudflow/hooks/useConnection';
import useDragNode from '@cloudflow/hooks/useDragNode';
import useZoomPan from '@cloudflow/hooks/useZoomPan';
import { Node as NodeType, Point } from '@cloudflow/types';
import { getSvgPoint } from '@cloudflow/utils';
import { nanoid } from 'nanoid';
import { useCallback, useEffect, useMemo, useState } from 'react';

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

    const visibleCloudNode = useMemo(
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
        [nodes, viewBox, dimension],
    );

    const visibleEdges = useMemo(
        () =>
            edges
                .map((edge) => {
                    const sourceNode = visibleCloudNode.find(
                        (node) => node.id === edge.source.id,
                    );

                    //INFO: 화면에 보여지는 것만 하려면 visibleNodes로 필터링 단, Edge는 보이지 않는데 anchor만 보이는 경우가 있음
                    //이는 Node에서 visibleEdges를 이용해서 안찾고 있어서 그럼, visibleEdges를 이용해서 찾게되면 zoom/pan에서 너무 많은 리렌더링이 발생함
                    const targetNode = nodes.find(
                        (node) => node.id === edge.target.id,
                    );

                    return sourceNode && targetNode
                        ? {
                              ...edge,
                              source: {
                                  ...sourceNode,
                                  anchorType: edge.source.anchorType,
                              },
                              target: {
                                  ...targetNode,
                                  anchorType: edge.target.anchorType,
                              },
                          }
                        : null;
                })
                .filter((edge) => edge !== null),
        [edges, visibleCloudNode, nodes],
    );

    const {
        connection,
        isConnecting,
        handleStartConnect,
        handleMoveConnect,
        handleEndConnect,
    } = useConnection(flowRef, visibleCloudNode, dimension);

    const handleSelectNode = useCallback((nodeId: string) => {
        setSelectedNodeId(nodeId);
    }, []);

    const handleDeSelectNode = () => {
        setSelectedNodeId(null);
    };

    const [selectedEdgeId, setSelectedEdgeId] = useState<string | null>(null);

    const handleSelectEdge = useCallback((edgeId: string) => {
        setSelectedEdgeId(edgeId);
    }, []);

    const handleStartSplitEdge = useCallback(
        (point: Point) => {
            if (!flowRef.current || !selectedEdgeId) return;
            const svgPoint = getSvgPoint(flowRef.current, point);
            const pointer: NodeType = {
                id: nanoid(),
                type: 'pointer',
                point: svgPoint,
            };
            dispatchNode({
                type: 'ADD_NODE',
                payload: pointer,
            });

            dispatchEdge({
                type: 'SPLIT_EDGE',
                payload: {
                    edgeId: selectedEdgeId,
                    pointer,
                },
            });

            setSelectedEdgeId(null);
        },
        [selectedEdgeId],
    );

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
                isDragging || isPanning ? 'move' : 'auto';
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
            onMoveConnect={handleMoveConnect}
            onEndConnect={handleEndConnect}
            onDeSelectNode={handleDeSelectNode}
        >
            {visibleEdges.map((edge) => (
                <Edge
                    key={edge.id}
                    edge={edge}
                    dimension={dimension}
                    isSelected={edge.id === selectedEdgeId}
                    onStartSplitEdge={handleStartSplitEdge}
                    onSelectEdge={handleSelectEdge}
                />
            ))}

            {visibleCloudNode.map((node) => (
                <Node
                    key={node.id}
                    node={node}
                    dimension={dimension}
                    isSelected={node.id === selectedNodeId}
                    onStartDragNode={handleStartDragNode}
                    onSelectNode={handleSelectNode}
                    onStartConnect={handleStartConnect}
                />
            ))}

            {isConnecting && connection && connection.target && (
                <Connector
                    start={connection.source.node.point}
                    end={connection.target.node!.point!}
                />
            )}

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
