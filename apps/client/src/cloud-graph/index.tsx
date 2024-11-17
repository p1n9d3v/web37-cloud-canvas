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
import useSplitEdge from '@cloud-graph/hooks/useSplitEdge';
import useSvgViewBox from '@cloud-graph/hooks/useSvgViewBox';
import useZoomPan from '@cloud-graph/hooks/useZoomPan';
import { isCloudNode, isUtilityNode } from '@cloud-graph/utils';
import { Box } from '@mui/material';
import { ReactNode } from 'react';

export const CloudGraph = () => {
    const { dimension } = useDimensionContext();
    const {
        nodes,
        edges,
        selectedId,
        handleMoveNode,
        handleSelect,
        handleAddEdge,
        handleSplitEdge,
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
                {edges.map((edge) => (
                    <Edge
                        key={edge.id}
                        edge={edge}
                        dimension={dimension}
                        isSelected={edge.id === selectedId}
                        onSelect={handleSelect}
                        onSplit={handleSplit}
                    />
                ))}
                {nodes.filter(isCloudNode).map((node) => {
                    const isSelected =
                        selectedId === node.id && node.type !== 'pointer';

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

                {nodes.filter(isUtilityNode).map((node) => (
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
