import { nanoid } from 'nanoid';
const getRandomPoint = () => {
    return {
        x: Math.floor(Math.random() * 10000),
        y: Math.floor(Math.random() * 10000),
    };
};

const randomAnchorType = () => {
    const anchors = ['top', 'right', 'bottom', 'left'];
    return anchors[Math.floor(Math.random() * anchors.length)];
};

export const createMockNodesAndEdges = (
    nodeCount: number,
    edgeCount: number
) => {
    const nodes = Array.from({ length: nodeCount }, () => ({
        id: nanoid(),
        type: 'server',
        point: getRandomPoint(),
    }));

    const edges = Array.from({ length: edgeCount }, () => {
        const sourceIndex = Math.floor(Math.random() * nodes.length);
        let targetIndex = Math.floor(Math.random() * nodes.length);
        while (targetIndex === sourceIndex) {
            targetIndex = Math.floor(Math.random() * nodes.length);
        }

        return {
            id: nanoid(),
            sourceId: nodes[sourceIndex].id,
            targetId: nodes[targetIndex].id,
            sourceAnchorType: randomAnchorType(),
            targetAnchorType: randomAnchorType(),
        };
    });

    return {
        nodes,
        edges,
    };
};
