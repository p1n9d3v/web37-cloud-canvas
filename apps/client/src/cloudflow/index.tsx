import { createMockNodesAndEdges } from '@/mocks/instance';
import Connector from '@cloudflow/components/Connector';
import Edge from '@cloudflow/components/Edge';
import Flow from '@cloudflow/components/Flow';
import Node from '@cloudflow/components/Node';
import { EdgeProvider, useEdgeContext } from '@cloudflow/contexts/EdgeContext';
import { FlowProvider, useFlowContext } from '@cloudflow/contexts/FlowCotext';
import { NodeProvider, useNodeContext } from '@cloudflow/contexts/NodeContext';
import useConnection from '@cloudflow/hooks/useConnection';
import useDragNode from '@cloudflow/hooks/useDragNode';
import useMocks from '@cloudflow/hooks/useMocks';
import useSplitEdge from '@cloudflow/hooks/useSplitEdge';
import useVisible from '@cloudflow/hooks/useVisible';
import useZoomPan from '@cloudflow/hooks/useZoomPan';
import { useCallback, useEffect, useState } from 'react';

export const SvgFlow = () => {
    useMocks();
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

    const { handleSplitEdge } = useSplitEdge(flowRef);

    const {
        state: { nodes },
    } = useNodeContext();
    const {
        state: { edges },
    } = useEdgeContext();

    const { visibleCloudNode, visibleEdges } = useVisible({
        nodes,
        edges,
        viewBox,
        dimension,
    });

    const {
        connection,
        isConnecting,
        handleStartConnect,
        handleMoveConnect,
        handleEndConnect,
    } = useConnection(flowRef, visibleCloudNode, dimension);

    const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
    const [selectedEdgeId, setSelectedEdgeId] = useState<string | null>(null);

    const handleSelectNode = useCallback((nodeId: string) => {
        setSelectedNodeId(nodeId);
    }, []);

    const handleDeSelectNode = () => {
        setSelectedNodeId(null);
    };

    const handleSelectEdge = useCallback((edgeId: string) => {
        setSelectedEdgeId(edgeId);
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
                    onSplitEdge={handleSplitEdge}
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
