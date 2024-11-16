import Graph from '@/src/cloud-graph/components/Graph';
import Node from '@cloud-graph/components/Node';
import { DimensionProvider } from '@cloud-graph/contexts/DimensionContext';
import {
    GraphProvider,
    useGraphContext,
} from '@cloud-graph/contexts/GraphContext';
import { ViewportProvider } from '@cloud-graph/contexts/ViewportContext';
import { ReactNode } from 'react';

export const CloudGraph = () => {
    const { graph, addNode } = useGraphContext();

    return (
        <Graph>
            {graph.nodes.map((node) => (
                <Node key={node.id} node={node} />
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
