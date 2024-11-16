import Graph from '@/src/cloud-graph/components/Graph';
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
import useSvgViewBox from '@cloud-graph/hooks/useSvgViewBox';
import useZoomPan from '@cloud-graph/hooks/useZoomPan';
import { ReactNode } from 'react';

export const CloudGraph = () => {
    const { dimension } = useDimensionContext();
    const { nodes, selectedId, handleMoveNode, handleSelect } =
        useGraphContext();
    const { svgRef, viewBox, setViewBox } = useSvgViewBox();
    const { handleStartDrag, handleStopDrag, handleDrag } = useDrag({
        svg: svgRef.current!,
        dimension,
        handleMoveNode,
    });
    const { handleZoom, handleStartPan, handleMovePan, handleStopPan } =
        useZoomPan({
            svg: svgRef.current!,
            viewBox,
            setViewBox,
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
                />
            ))}
        </Graph>
    );
};

export const CloudGraphProvider = ({ children }: { children: ReactNode }) => {
    return (
        <GraphProvider>
            <DimensionProvider>{children}</DimensionProvider>
        </GraphProvider>
    );
};
