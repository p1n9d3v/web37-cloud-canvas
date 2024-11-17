import Graph from '@/src/cloud-graph/components/Graph';
import Edge from '@cloud-graph/components/Edge';
import Connector from '@cloud-graph/components/Connector';
import Node from '@cloud-graph/components/Node';
import {
    DimensionProvider,
    useDimensionContext,
} from '@cloud-graph/contexts/DimensionContext';
import {
    GraphProvider,
    useGraphContext,
} from '@cloud-graph/contexts/GraphContext';
import useDrag from '@cloud-graph/hooks/useDrag';
import useEdgeConnector from '@cloud-graph/hooks/useConnector';
import useSvgViewBox from '@cloud-graph/hooks/useSvgViewBox';
import useZoomPan from '@cloud-graph/hooks/useZoomPan';
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

    return (
        <Graph
            ref={svgRef}
            dimension={dimension}
            viewBox={viewBox}
            onZoom={handleZoom}
            onStartPan={handleStartPan}
            onStopPan={handleStopPan}
            onMovePan={handleMovePan}
        >
            {nodes.map((node) => (
                <Node
                    key={node.id}
                    node={node}
                    dimension={dimension}
                    isSelected={selectedId === node.id}
                    onStartDrag={handleStartDrag}
                    onDrag={handleDrag}
                    onStopDrag={handleStopDrag}
                    onSelect={handleSelect}
                    onStartConnect={handleStartConnect}
                    onConnect={handleConnect}
                    onStopConnect={handleStopConnect}
                />
            ))}

            {edges.map((edge) => (
                <Edge key={edge.id} edge={edge} dimension={dimension} />
            ))}

            {connection && (
                <Connector from={connection.from} to={connection.to} />
            )}
        </Graph>
    );
};

export const CloudGraphProvider = ({ children }: { children: ReactNode }) => {
    return (
        <DimensionProvider>
            <GraphProvider>{children}</GraphProvider>
        </DimensionProvider>
    );
};
