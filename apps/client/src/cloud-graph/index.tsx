import Graph from '@/src/cloud-graph/components/Graph';
import NodeRenderer from '@cloud-graph/components/NodeRenderer';
import { DimensionProvider } from '@cloud-graph/contexts/DimensionContext';
import {
    GraphProvider,
    useGraphContext,
} from '@cloud-graph/contexts/GraphContext';
import { ViewportProvider } from '@cloud-graph/contexts/ViewportContext';
import { nanoid } from 'nanoid';
import { ReactNode, useEffect } from 'react';

export const CloudGraph = () => {
    const { graph, addNode } = useGraphContext();

    useEffect(() => {
        addNode({
            id: `node-${nanoid()}`,
            type: 'server',
            point: { x: 10, y: 10 },
            size: { width: 100, height: 100 },
            label: 'G3',
        });
    }, []);

    return (
        <Graph>
            {graph.nodes.map((node) => (
                <NodeRenderer node={node} />
            ))}
        </Graph>
    );
};

export const CloudGraphProvider = ({ children }: { children: ReactNode }) => {
    return (
        <GraphProvider>
            <DimensionProvider>
                <ViewportProvider>{children}</ViewportProvider>
            </DimensionProvider>
        </GraphProvider>
    );
};
