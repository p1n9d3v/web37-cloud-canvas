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
import useKey from '@cloud-graph/hooks/useKey';
import useSplitEdge from '@cloud-graph/hooks/useSplitEdge';
import useSvgViewBox from '@cloud-graph/hooks/useSvgViewBox';
import useVisible from '@cloud-graph/hooks/useVisible';
import useZoomPan from '@cloud-graph/hooks/useZoomPan';
import { isCloudNode, isUtilityNode } from '@cloud-graph/utils';
import { Box } from '@mui/material';
import { ReactNode, useEffect } from 'react';

//INFO: 일단 한곳에 모아놓고 코딩을 했음 나중에 리팩토링 필요
//기존 메모이제이션 코드는 다 삭제, 개발 과정에서 메모이제이션을 적용하니 다른 기능 구현이 까다로워 짐
//추후 성능 문제가 있을시 메모이제이션 적용해야함
//최소한의 최적화로 viewBox내의 노드만 렌더링하도록 함
export const CloudGraph = () => {
    const { dimension } = useDimensionContext();
    const {
        nodes,
        edges,
        selectedIds,
        handleMoveNode,
        handleSelect,
        handleDeselectAll,
        handleAddEdge,
        handleSplitEdge,
        handleRemoveSelected,
        handleSelectEntireEdge,
    } = useGraphContext();
    const { svgRef, viewBox, setViewBox } = useSvgViewBox();
    const { handleStartDrag, handleStopDrag, handleDrag } = useDrag({
        svg: svgRef.current!,
        dimension,
        updatePoint: handleMoveNode,
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
            updateEdge: handleAddEdge,
        });
    const { handleSplit } = useSplitEdge({
        svg: svgRef.current!,
        updateEdge: handleSplitEdge,
    });

    const { visibleEdges, visibleNodes } = useVisible({
        nodes,
        edges,
        viewBox,
        dimension,
    });

    const activeKey = useKey('backspace');

    useEffect(() => {
        const handleMouseDown = () => handleDeselectAll();
        svgRef.current?.addEventListener('mousedown', handleMouseDown);

        return () => {
            svgRef.current?.removeEventListener('mousedown', handleMouseDown);
        };
    }, [svgRef.current]);

    useEffect(() => {
        if (activeKey) {
            handleRemoveSelected();
        }
    }, [activeKey]);
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
            >
                {visibleEdges.map((edge) => (
                    <Edge
                        key={edge.id}
                        edge={edge}
                        dimension={dimension}
                        isSelected={selectedIds.includes(edge.id)}
                        onSelect={handleSelect}
                        onSplit={handleSplit}
                        onSelectEntireEdge={handleSelectEntireEdge}
                    />
                ))}
                {visibleNodes.filter(isCloudNode).map((node) => {
                    const isSelected = selectedIds.includes(node.id);

                    return (
                        <g key={node.id}>
                            <Node
                                node={node}
                                dimension={dimension}
                                isSelected={isSelected}
                                onStartDrag={handleStartDrag}
                                onDrag={handleDrag}
                                onStopDrag={handleStopDrag}
                                onSelect={handleSelect}
                            />
                            <Anchors
                                node={node}
                                edges={edges}
                                dimension={dimension}
                                isSelected={isSelected}
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
