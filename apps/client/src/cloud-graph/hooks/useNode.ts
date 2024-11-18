import { useGraphContext } from '@cloud-graph/contexts/GraphContext';
import { Edge, Node } from '@cloud-graph/types';

export default () => {
    const { edges, dispatch } = useGraphContext();

    const traverseEdge = (edge: Edge, direction: 'source' | 'target') => {
        let nextEdge: Edge | undefined;
        let nextNode =
            direction === 'target' ? edge.target.node : edge.source.node;
        let pointersToRemove: string[] = [];
        let edgesToRemove: string[] = [edge.id];

        while (nextNode.type === 'pointer') {
            pointersToRemove.push(nextNode.id);
            nextEdge =
                direction === 'target'
                    ? edges.find((e) => e.source.node.id === nextNode!.id)
                    : edges.find((e) => e.target.node.id === nextNode!.id);

            if (nextEdge) {
                edgesToRemove.push(nextEdge.id);
                nextNode =
                    direction === 'target'
                        ? nextEdge.target.node
                        : nextEdge.source.node;
            } else {
                break;
            }
        }

        return {
            pointersToRemove,
            edgesToRemove,
        };
    };

    const handleAdd = (node: Node) => {
        dispatch({ type: 'ADD_NODE', payload: node });
    };

    const handleRemove = (id: string) => {
        const connectedEdges = edges.filter(
            (edge) => edge.source.node.id === id || edge.target.node.id === id,
        );

        const edgeIds: string[] = [];
        const nodeIds: string[] = [id];

        connectedEdges.forEach((edge) => {
            const direction = edge.source.node.id === id ? 'target' : 'source';
            const { pointersToRemove, edgesToRemove } = traverseEdge(
                edge,
                direction,
            );

            edgeIds.push(...edgesToRemove);
            nodeIds.push(...pointersToRemove);
        });

        dispatch({
            type: 'REMOVE_NODE',
            payload: {
                nodeIds,
                edgeIds,
            },
        });
    };

    return {
        handleAdd,
        handleRemove,
    };
};
