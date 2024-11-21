import { useCanvasContext } from '@contexts/CanvasContext';
import { useCanvasDimensionContext } from '@contexts/CanvasDimensionContext';
import { useCanvasInstanceContext } from '@contexts/CanvasInstanceContext';
import { useTheme } from '@mui/material';
import { ConnectorType, Node, Point } from '@types';
import { getConnectorPoints, getDistance, getSvgPoint } from '@utils';
import { useEffect, useRef, useState } from 'react';

type Props = {
    type: ConnectorType;
    node: Node;
    visible: boolean;
    cx: number;
    cy: number;
};

export default ({ cx, cy, visible, node, type }: Props) => {
    const theme = useTheme();

    const { dimension } = useCanvasDimensionContext();
    const { canvas } = useCanvasContext();
    const {
        state: { nodes },
        dispatch,
    } = useCanvasInstanceContext();
    const [isConnecting, setIsConnecting] = useState(false);
    const targetRef = useRef<{
        id: string;
        connectorType: ConnectorType;
    } | null>(null);

    const getNearestConnector = (point: Point) => {
        const svgPoint = getSvgPoint(canvas, point) as Point;

        let minDistance = Infinity;
        let newPoint = svgPoint;
        let target = null;
        Object.values(nodes).forEach((node) => {
            const connectors = getConnectorPoints(node, dimension);
            Object.entries(connectors).forEach(([type, point]) => {
                const distance = getDistance(newPoint, point);
                const threshold = 30;
                if (distance < threshold && distance < minDistance) {
                    target = {
                        id: node.id,
                        connectorType: type as ConnectorType,
                    };
                    newPoint = point;
                    minDistance = distance;
                }
            });
        });

        return { point: newPoint, target };
    };

    const openConnection = (point: Point) => {
        setIsConnecting(true);
        dispatch({
            type: 'OPEN_CONNECTION',
            payload: {
                point,
            },
        });
    };

    const closeConnection = () => {
        if (targetRef.current) {
            dispatch({
                type: 'ADD_EDGE',
                payload: {
                    type: 'arrow',
                    target: targetRef.current,
                    source: {
                        id: node.id,
                        connectorType: type,
                    },
                },
            });
        }
        setIsConnecting(false);
        targetRef.current = null;
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        e.stopPropagation();
        openConnection({ x: cx, y: cy });
        document.body.style.cursor = 'move';
    };

    const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;

        const { target, point } = getNearestConnector({
            x: clientX,
            y: clientY,
        });
        if (target) targetRef.current = target;
        dispatch({
            type: 'CONNECT_CONNECTION',
            payload: {
                point,
            },
        });
    };

    const handleMouseUp = () => {
        closeConnection();
        document.body.style.cursor = 'default';
    };

    useEffect(() => {
        if (isConnecting) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        }
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isConnecting]);

    return (
        <circle
            r={6}
            cx={cx}
            cy={cy}
            fill={theme.palette.text.primary}
            style={{
                visibility: visible ? 'visible' : 'hidden',
            }}
            onMouseDown={handleMouseDown}
        />
    );
};
