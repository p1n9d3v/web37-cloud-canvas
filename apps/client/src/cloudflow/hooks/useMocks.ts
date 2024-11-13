import { createMockNodesAndEdges } from '@/mocks/instance';
import { useEdgeContext } from '@cloudflow/contexts/EdgeContext';
import { useNodeContext } from '@cloudflow/contexts/NodeContext';
import { useEffect } from 'react';

export default () => {
    const { dispatch: dispatchEdge } = useEdgeContext();
    const { dispatch: dispatchNode } = useNodeContext();

    useEffect(() => {
        const { nodes, edges } = createMockNodesAndEdges(100, 100);
        nodes.forEach((node) => {
            dispatchNode({
                type: 'ADD_NODE',
                payload: node,
            });
        });

        edges.forEach((edge) => {
            dispatchEdge({
                type: 'ADD_EDGE',
                payload: edge,
            });
        });
    }, []);
};
