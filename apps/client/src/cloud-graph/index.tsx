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

const mockNodes = [
    {
        id: `node-${nanoid()}`,
        type: 'server',
        point: { x: 10, y: 10 },
        label: 'G1',
    },
    {
        id: `node-${nanoid()}`,
        type: 'cloud-function',
        point: { x: 10, y: 100 },
    },
    {
        id: `node-${nanoid()}`,
        type: 'object-storage',
        point: { x: 100, y: 10 },
    },
    {
        id: `node-${nanoid()}`,
        type: 'db-mysql',
        point: { x: 100, y: 100 },
    },
];
export const CloudGraph = () => {
    const { graph, addNode } = useGraphContext();

    useEffect(() => {
        mockNodes.forEach((node) => {
            addNode(node);
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
