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
            {nodes.map((node) => {
                const isSelected = selectedId === node.id;

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
