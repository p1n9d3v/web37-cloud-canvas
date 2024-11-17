import { Dimension, Edge, Node, Point } from '@cloud-graph/types';
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
            id: node.id,
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
        let nearest: { id: string; point: Point } | undefined;
        nodes.forEach((node) => {
            const anchors = calculateAnchorPoints(node, dimension);

            Object.values(anchors).forEach((anchorPoint) => {
                const distance = getDistance(svgPoint, anchorPoint);
                const snappedThreshold = 30;
                if (distance < snappedThreshold && distance < minDistance) {
                    nearest = {
                        id: node.id,
                        point: anchorPoint,
                    };
                    minDistance = distance;
                }
            });
        });

        setConnection((prev) => {
            if (!prev) return null;
            if (nearest) {
                target.current = {
                    id: nearest.id,
                    anchorType: 'center',
                };
                return {
                    from: prev.from,
                    to: nearest.point,
                };
            }
            return {
                from: prev.from,
                to: svgPoint,
            };
        });
    };

    const handleStopConnect = () => {
        setConnection(null);
    };

    // const handleEndConnect = () => {
    //     if (
    //         isConnecting &&
    //         connection?.source &&
    //         connection.target &&
    //         connection.target.node?.id &&
    //         connection.source.node.id !== connection.target.node?.id
    //     ) {
    //         const { source, target } = connection;
    //         dispatchEdge({
    //             type: 'ADD_EDGE',
    //             payload: {
    //                 id: nanoid(),
    //                 type: 'arrow',
    //                 source: {
    //                     ...source.node,
    //                     anchorType: source.anchorType,
    //                 },
    //                 target: {
    //                     ...(target.node as Node),
    //                     anchorType: target.anchorType as AnchorType,
    //                 },
    //             },
    //         });
    //     }
    //     setConnection(null);
    //     setIsConnecting(false);
    // };
    //

    return {
        connection,
        handleStartConnect,
        handleConnect,
        handleStopConnect,
    };
};
