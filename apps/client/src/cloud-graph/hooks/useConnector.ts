import useEdge from '@cloud-graph/hooks/useEdge';
import { AnchorType, Dimension, Edge, Node, Point } from '@cloud-graph/types';
import {
    calculateAnchorPoints,
    getDistance,
    getSvgPoint,
} from '@cloud-graph/utils';
import { useRef, useState } from 'react';

type Props = {
    svg: SVGSVGElement;
    nodes: Node[];
    dimension: Dimension;
};

export default ({ svg, nodes, dimension }: Props) => {
    const { handleAdd: handleAddEdge } = useEdge({ svg });

    const [connection, setConnection] = useState<{
        from: Point;
        to: Point;
    } | null>(null);
    const source = useRef<Edge['source'] | null>(null);
    const target = useRef<Edge['target'] | null>(null);

    const handleStartConnect = (node: Node, anchorType: AnchorType) => {
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
                        anchorType: type as AnchorType,
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
            handleAddEdge({
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
