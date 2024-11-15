import Graph from '@/src/cloud-graph/components/Graph';
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
        });
    }, []);

    return (
        <Graph>
            {graph.nodes.map((node) => {
                return (
                    <rect
                        key={node.id}
                        x={node.point.x}
                        y={node.point.y}
                        width={node.size.width}
                        height={node.size.height}
                        fill="blue"
                    />
                );
            })}
        </Graph>
    );
};

export const CloudGraphProvider = ({ children }: { children: ReactNode }) => {
    return (
        <GraphProvider>
            <ViewportProvider>{children}</ViewportProvider>
        </GraphProvider>
    );
};