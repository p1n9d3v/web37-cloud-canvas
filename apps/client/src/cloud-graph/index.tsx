import Graph from '@/src/cloud-graph/components/Graph';
import Anchors from '@cloud-graph/components/Anchors';
import Connector from '@cloud-graph/components/Connector';
import Edge from '@cloud-graph/components/Edge';
import Node from '@cloud-graph/components/Node';
import {
    DimensionProvider,
    useDimensionContext,
} from '@cloud-graph/contexts/DimensionContext';
import {
    GraphProvider,
    useGraphContext,
} from '@cloud-graph/contexts/GraphContext';
import useEdgeConnector from '@cloud-graph/hooks/useConnector';
import useDrag from '@cloud-graph/hooks/useDrag';
import useEdge from '@cloud-graph/hooks/useEdge';
import useKey from '@cloud-graph/hooks/useKey';
import useNode from '@cloud-graph/hooks/useNode';
import useSelect from '@cloud-graph/hooks/useSelect';
import useSvgViewBox from '@cloud-graph/hooks/useSvgViewBox';
import useVisible from '@cloud-graph/hooks/useVisible';
import useZoomPan from '@cloud-graph/hooks/useZoomPan';
import { isCloudNode, isUtilityNode } from '@cloud-graph/utils';
import { Box } from '@mui/material';
import { ReactNode, useEffect } from 'react';

//INFO: 일단 한곳에 모아놓고 코딩을 했음 나중에 리팩토링 필요
//- 기존 메모이제이션 코드는 다 삭제, 개발 과정에서 메모이제이션을 적용하니 다른 기능 구현이 까다로워 짐
//- 추후 성능 문제가 있을시 메모이제이션 적용해야함
//- 최소한의 최적화로 viewBox내의 노드만 렌더링하도록 함
//- Context로 구현한 의미가 없을 듯 함 -> 추후 리팩토링 필요, 코드 분리가 필요하여 일단은 hooks로 분리

export const CloudGraph = () => {
    const { dimension } = useDimensionContext();
    const { nodes, edges } = useGraphContext();
    const { svgRef, viewBox, setViewBox } = useSvgViewBox();
    const { handleRemove: handleRemoveNode } = useNode();
    const {
        handleRemove: handleRemoveEdge,
        handleSplit: handleSplitEdge,
        handleRemoveEntire: handleRemoveEntireEdge,
    } = useEdge({
        svg: svgRef.current!,
    });
    const { handleStartDrag, handleStopDrag, handleDrag } = useDrag({
        svg: svgRef.current!,
        dimension,
    });
    const { handleZoom, handleStartPan, handleMovePan, handleStopPan } =
        useZoomPan({
            svg: svgRef.current!,
            viewBox,
            setViewBox,
        });
    const { connection, handleStartConnect, handleConnect, handleStopConnect } =
        useEdgeConnector({
            svg: svgRef.current!,
            dimension,
            nodes,
        });

    const { visibleEdges, visibleNodes } = useVisible({
        nodes,
        edges,
        viewBox,
        dimension,
    });
    const {
        isSelected,
        handleSelect,
        handleDeselectAll,
        handleSelectEntireEdge,
        handleMultiSelect,
    } = useSelect();

    // Delete
    const backspaceKey = useKey('backspace');
    useEffect(() => {
        if (backspaceKey) {
            const selectedNodes = nodes.filter((node) => isSelected(node.id));
            const selectedEdges = edges.filter((edge) => isSelected(edge.id));
            selectedNodes.forEach((node) => handleRemoveNode(node.id));
            if (selectedEdges.length === 1) {
                handleRemoveEdge(selectedEdges.at(0)!.id);
            } else if (selectedEdges.length > 1) {
                handleRemoveEntireEdge(selectedEdges);
            }
            handleDeselectAll();
        }
    }, [backspaceKey]);

    // Global Event Listener
    useEffect(() => {
        const handleContextMenu = (event: MouseEvent) => event.preventDefault();
        document.addEventListener('contextmenu', handleContextMenu);

        return () => {
            document.removeEventListener('contextmenu', handleContextMenu);
        };
    }, []);

    return (
        <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
            <Graph
                ref={svgRef}
                dimension={dimension}
                viewBox={viewBox}
                onZoom={handleZoom}
                onStartPan={handleStartPan}
                onStopPan={handleStopPan}
                onMovePan={handleMovePan}
                onDeselectAll={handleDeselectAll}
            >
                {visibleEdges.map((edge) => (
                    <Edge
                        key={edge.id}
                        edge={edge}
                        dimension={dimension}
                        isSelected={isSelected(edge.id)}
                        onSelect={handleSelect}
                        onSplit={handleSplitEdge}
                        onSelectEntireEdge={handleSelectEntireEdge}
                    />
                ))}
                {visibleNodes.filter(isCloudNode).map((node) => {
                    const isNodeSelected = isSelected(node.id);
                    return (
                        <g key={node.id}>
                            <Node
                                node={node}
                                dimension={dimension}
                                isSelected={isNodeSelected}
                                onStartDrag={handleStartDrag}
                                onDrag={handleDrag}
                                onStopDrag={handleStopDrag}
                                onSelect={handleSelect}
                                onMultiSelect={handleMultiSelect}
                            />
                            <Anchors
                                node={node}
                                edges={edges}
                                dimension={dimension}
                                isSelected={isNodeSelected}
                                onStartConnect={handleStartConnect}
                                onConnect={handleConnect}
                                onStopConnect={handleStopConnect}
                            />
                        </g>
                    );
                })}

                {visibleNodes.filter(isUtilityNode).map((node) => (
                    <Node
                        key={node.id}
                        node={node}
                        dimension={dimension}
                        onStartDrag={handleStartDrag}
                        onDrag={handleDrag}
                        onStopDrag={handleStopDrag}
                    />
                ))}

                {connection && (
                    <Connector from={connection.from} to={connection.to} />
                )}
            </Graph>
        </Box>
    );
};

export const CloudGraphProvider = ({ children }: { children: ReactNode }) => {
    return (
        <DimensionProvider>
            <GraphProvider>{children}</GraphProvider>
        </DimensionProvider>
    );
};
