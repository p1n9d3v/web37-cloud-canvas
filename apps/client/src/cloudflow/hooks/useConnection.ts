import { useEdgeContext } from '@cloudflow/contexts/EdgeContext';
import {
    AnchorType,
    Connection,
    Dimension,
    Node,
    Point,
} from '@cloudflow/types';
import {
    calculateAnchorPoints,
    getDistance,
    getSvgPoint,
} from '@cloudflow/utils';
import { nanoid } from 'nanoid';
import { RefObject, useCallback, useState } from 'react';

type TargetConnection = {
    node?: {
        id: string | null;
    } & Omit<Partial<Connection['node']>, 'id'>;
    anchorType?: AnchorType;
};

export default (
    flowRef: RefObject<SVGSVGElement>,
    visibleNodes: Node[],
    dimension: Dimension,
) => {
    const { dispatch: dispatchEdge } = useEdgeContext();
    const [connection, setConnection] = useState<{
        source: Connection;
        target?: TargetConnection;
    } | null>(null);
    const [isConnecting, setIsConnecting] = useState(false);

    const handleStartConnect = useCallback(
        (node: Node, anchorType: AnchorType) => {
            const anchors = calculateAnchorPoints(node.point, dimension);
            const point = anchors[anchorType];
            setConnection({
                source: {
                    node: {
                        ...node,
                        point,
                    },
                    anchorType,
                },
            });
            setIsConnecting(true);
        },
        [dimension],
    );

    const handleMoveConnect = (point: Point) => {
        if (!isConnecting || !connection) return;
        const svgPoint = getSvgPoint(flowRef.current!, point);
        let nearestConnection: Required<Connection> | undefined;
        let minDistance = Infinity;

        visibleNodes.forEach((node) => {
            const anchors = calculateAnchorPoints(node.point, dimension);
            Object.entries(anchors).forEach(([anchorType, anchorPoint]) => {
                const distance = getDistance(svgPoint, anchorPoint);
                const snappedThreshold = 30;
                if (distance < snappedThreshold && distance < minDistance) {
                    minDistance = distance;
                    nearestConnection = {
                        node: {
                            ...node,
                            point: anchorPoint,
                        },
                        anchorType: anchorType as AnchorType,
                    };
                }
            });
        });

        setConnection(
            (prev) =>
                prev && {
                    ...prev,
                    target: nearestConnection ?? {
                        node: {
                            id: null,
                            type: 'connection',
                            point: svgPoint,
                        },
                        anchorType: prev.target?.anchorType,
                    },
                },
        );
    };

    const handleEndConnect = () => {
        if (
            isConnecting &&
            connection?.source &&
            connection.target &&
            connection.target.node?.id &&
            connection.source.node.id !== connection.target.node?.id
        ) {
            const { source, target } = connection;
            dispatchEdge({
                type: 'ADD_EDGE',
                payload: {
                    id: nanoid(),
                    source: {
                        ...source.node,
                        anchorType: source.anchorType,
                    },
                    target: {
                        ...(target.node as Node),
                        anchorType: target.anchorType as AnchorType,
                    },
                },
            });
        }
        setConnection(null);
        setIsConnecting(false);
    };

    return {
        isConnecting,
        connection,
        handleStartConnect,
        handleMoveConnect,
        handleEndConnect,
    };
};
