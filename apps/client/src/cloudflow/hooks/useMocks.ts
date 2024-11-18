import { createMockNodesAndEdges } from '@/mocks/instance';
import { useEdgeContext } from '@cloudflow/contexts/EdgeContext';
import { useNodeContext } from '@cloudflow/contexts/NodeContext';
import { Edge, Node } from '@cloudflow/types';
import { useEffect, useState } from 'react';

export default () => {
    const { dispatch: dispatchEdge } = useEdgeContext();
    const { dispatch: dispatchNode } = useNodeContext();
    const [mockNodes, setMockNodes] = useState<Node[]>([]);
    const [mockEdges, setMockEdges] = useState<Edge[]>([]);

    useEffect(() => {
        const { nodes, edges } = createMockNodesAndEdges(200, 50);
        setMockNodes(nodes);
        setMockEdges(edges);
    }, []);

    useEffect(() => {
        mockNodes.forEach((node) => {
            dispatchNode({
                type: 'ADD_NODE',
                payload: node,
            });
        });

        mockEdges.forEach((edge) => {
            dispatchEdge({
                type: 'ADD_EDGE',
                payload: edge,
            });
        });
    }, [mockNodes, mockEdges]);
};
