import { nanoid } from 'nanoid';
import { AnchorType, Edge, Node } from '../src/cloudflow/types';

const getRandomPoint = () => {
    return {
        x: Math.floor(Math.random() * 10000),
        y: Math.floor(Math.random() * 10000),
    };
};

const randomAnchorType = () => {
    const anchors: AnchorType[] = ['top', 'right', 'bottom', 'left'];
    return anchors[Math.floor(Math.random() * anchors.length)];
};

export const createMockNodesAndEdges = (
    nodeCount: number,
    edgeCount: number,
) => {
    const nodes: Node[] = Array.from({ length: nodeCount }, () => ({
        id: 'mock'.concat(nanoid()),
        type: 'server',
        point: getRandomPoint(),
    }));

    const edges: Edge[] = Array.from({ length: edgeCount }, () => {
        const sourceIndex = Math.floor(Math.random() * nodes.length);
        let targetIndex = Math.floor(Math.random() * nodes.length);
        while (targetIndex === sourceIndex) {
            targetIndex = Math.floor(Math.random() * nodes.length);
        }

        return {
            id: nanoid(),
            type: 'arrow',
            source: {
                ...nodes[sourceIndex],
                anchorType: randomAnchorType() as AnchorType,
            },
            target: {
                ...nodes[targetIndex],
                anchorType: randomAnchorType() as AnchorType,
            },
        };
    });

    return {
        nodes,
        edges,
    };
};
