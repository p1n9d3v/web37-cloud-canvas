import { useGraphContext } from '@cloud-graph/contexts/GraphContext';
import { Dimension, Edge, Node, Point } from '@cloud-graph/types';
import {
    calculateAnchorPoints,
    getDistance,
    getSvgPoint,
} from '@cloud-graph/utils';
import { nanoid } from 'nanoid';
import { useRef, useState } from 'react';

type Props = {
    svg: SVGSVGElement;
    nodes: Node[];
    dimension: Dimension;
    updateEdge: (edge: Edge) => void;
};

export default ({ svg, nodes, dimension, updateEdge }: Props) => {
    const [connection, setConnection] = useState<{
        from: Point;
        to: Point;
    } | null>(null);
    const source = useRef<Edge['source'] | null>(null);
    const target = useRef<Edge['target'] | null>(null);

    const handleStartConnect = (node: Node, anchorType: string) => {
        const anchors = calculateAnchorPoints(node, dimension);

        const anchorPoint = anchors[anchorType];

        source.current = {
            node,
            anchorType,
        };
        setConnection({
            from: anchorPoint,
            to: anchorPoint,
        });
    };

    const handleConnect = (point: Point) => {
        const svgPoint = getSvgPoint(svg, point);

        let minDistance = Infinity;
        let newPoint: Point = svgPoint;
        nodes.forEach((node) => {
            const anchors = calculateAnchorPoints(node, dimension);

            Object.entries(anchors).forEach(([type, point]) => {
                const distance = getDistance(svgPoint, point);
                const snappedThreshold = 30;
                if (distance < snappedThreshold && distance < minDistance) {
                    target.current = {
                        node,
                        anchorType: type,
                    };
                    newPoint = point;
                    minDistance = distance;
                }
            });
        });

        setConnection((prev) => {
            if (!prev) return null;
            return {
                from: prev.from,
                to: newPoint,
            };
        });
    };

    const handleStopConnect = () => {
        if (
            source.current &&
            target.current &&
            source.current.node.id !== target.current.node.id
        ) {
            updateEdge({
                id: nanoid(),
                type: 'arrow',
                source: source.current,
                target: target.current,
            });
        }
        setConnection(null);
        source.current = null;
        target.current = null;
    };

    return {
        connection,
        handleStartConnect,
        handleConnect,
        handleStopConnect,
    };
};
