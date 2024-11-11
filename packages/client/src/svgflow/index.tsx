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

const getRandomPoint = () => {
    return {
        x: Math.floor(Math.random() * 1000),
        y: Math.floor(Math.random() * 1000),
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
                const targetNode = visibleNodes.find(
                    (node) => node.id === edge.targetId
                );

                // 화면에 노드가 하나라도 없으면 엣지를 안보이게 할지 고민
                // if (sourceNode || targetNode) return true;
                //
                // return false;
                if (!sourceNode || !targetNode) return false;

                return true;
            }),
        [edges, visibleNodes]
    );

    const handleSelectNode = useCallback((nodeId: string) => {
        setSelectedNodeId(nodeId);
    }, []);

    useEffect(() => {
        // random node 생성
        const newNodes = Array.from({ length: 5 }, () => ({
            id: nanoid(),
            type: 'server',
            point: getRandomPoint(),
        }));

        newNodes.forEach((node) => {
            dispatchNode({
                type: 'ADD_NODE',
                payload: node,
            });
        });

        // random edge 생성
        const randomAnchorType = () => {
            const anchors = ['top', 'right', 'bottom', 'left'];
            return anchors[Math.floor(Math.random() * anchors.length)];
        };

        const newEdges = Array.from({ length: 2 }, () => {
            const sourceIndex = Math.floor(Math.random() * newNodes.length);
            let targetIndex = Math.floor(Math.random() * newNodes.length);
            while (targetIndex === sourceIndex) {
                targetIndex = Math.floor(Math.random() * newNodes.length);
            }

            return {
                id: nanoid(),
                sourceId: newNodes[sourceIndex].id,
                targetId: newNodes[targetIndex].id,
                sourceAnchorType: randomAnchorType(),
                targetAnchorType: randomAnchorType(),
            };
        });

        newEdges.forEach((edge) => {
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
                    visibleEdges={visibleEdges}
                    dimension={dimension}
                    isSelected={node.id === selectedNodeId}
                    onStartDragNode={handleStartDragNode}
                    onSelectNode={handleSelectNode}
                />
            ))}

            {visibleEdges.map((edge) => (
                <Edge
                    key={edge.id}
                    edge={edge}
                    visibleNodes={visibleNodes}
                    dimension={dimension}
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
                <EdgeProvider>
                    <SvgFlow />
                </EdgeProvider>
            </NodeProvider>
        </FlowProvider>
    );
};
