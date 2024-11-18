import Anchor from '@cloud-graph/components/Anchor';
import { AnchorType, Dimension, Edge, Node, Point } from '@cloud-graph/types';
import { calculateAnchorPoints } from '@cloud-graph/utils';
import React from 'react';

type AnchorsProps = {
    node: Node;
    edges: Edge[];
    dimension: Dimension;
    isSelected: boolean;
    onStartConnect: (node: Node, anchorType: AnchorType) => void;
    onConnect: (point: Point) => void;
    onStopConnect: () => void;
};

const Anchors: React.FC<AnchorsProps> = ({
    node,
    edges,
    dimension,
    isSelected,
    onStartConnect,
    onConnect,
    onStopConnect,
}) => {
    const anchors = calculateAnchorPoints(node, dimension);

    const connectedAnchors = edges
        .filter((edge) => edge.source.node.id === node.id)
        .map((edge) => edge.source.anchorType);

    return (
        <>
            {anchors &&
                Object.entries(anchors).map(([type, point]) => (
                    <Anchor
                        key={`${node.id}-${type}`}
                        cx={point.x}
                        cy={point.y}
                        visible={
                            isSelected ||
                            connectedAnchors.includes(type as AnchorType)
                        }
                        onStartConnect={() =>
                            onStartConnect(node, type as AnchorType)
                        }
                        onConnect={onConnect}
                        onStopConnect={onStopConnect}
                    />
                ))}
        </>
    );
};

export default Anchors;
