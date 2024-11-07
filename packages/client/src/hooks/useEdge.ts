import { GRID_SIZE } from '@constants';
import { useFlowInstanceContext } from '@contexts/FlowInstanceContext';
import { useFlowZoomPanContext } from '@contexts/FlowZoomPanContext';
import { EdgePoint, Node } from '@types';
import {
    calculateAnchorsPosition,
    getDistance,
    getRelativeCoordinatesForViewBox,
} from '@utils/index';
import { MouseEvent as ReactMouseEvent, useEffect, useRef } from 'react';

export default () => {
    const { ref, viewBox } = useFlowZoomPanContext();
    const {
        state: { connectingEdge, nodes },
        dispatch: flowInstanceDispatch,
    } = useFlowInstanceContext();

    const sourceRef = useRef<EdgePoint | null>(null);
    const targetRef = useRef<EdgePoint | null>(null);

    const findNearestNode = (mouseX: number, mouseY: number) => {
        return nodes.find((node) => {
            const { position } = node;
            const nodeCenter = {
                x: position.x + GRID_SIZE / 2,
                y: position.y + GRID_SIZE / 2,
            };
            const distance = getDistance(nodeCenter, { x: mouseX, y: mouseY });
            return distance < GRID_SIZE / 2;
        });
    };

    const findNearestAnchor = (node: Node, mouseX: number, mouseY: number) => {
        const {
            position: { x: nodeX, y: nodeY },
        } = node;
        const anchors = calculateAnchorsPosition(nodeX, nodeY);

        return Object.entries(anchors).reduce(
            (nearest, [type, pos]: any) => {
                const distance = getDistance(pos, { x: mouseX, y: mouseY });
                return distance < nearest.distance
                    ? { type, ...pos, distance }
                    : nearest;
            },
            { type: undefined, x: 0, y: 0, distance: Infinity }
        );
    };

    const startConnecting = (e: ReactMouseEvent) => {
        e.stopPropagation();
        const { clientX, clientY } = e;
        const { x: mouseX, y: mouseY } = getRelativeCoordinatesForViewBox(
            clientX,
            clientY,
            ref,
            viewBox
        );
        const nearestNode = findNearestNode(mouseX, mouseY);
        if (!nearestNode) return;

        const nearestAnchor = findNearestAnchor(nearestNode, mouseX, mouseY);

        const source = {
            nodeId: nearestNode.id,
            anchor: {
                type: nearestAnchor.type,
                position: { x: mouseX, y: mouseY },
            },
        };

        sourceRef.current = source;
        targetRef.current = source;

        flowInstanceDispatch({
            type: 'CONNECTING_EDGE',
            payload: {
                isConnecting: true,
                source,
                target: source,
            },
        });
    };

    const updateEdgeTarget = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const { x: mouseX, y: mouseY } = getRelativeCoordinatesForViewBox(
            clientX,
            clientY,
            ref,
            viewBox
        );

        let target: EdgePoint = {
            nodeId: undefined,
            anchor: { type: undefined, position: { x: mouseX, y: mouseY } },
        };

        const nearestNode = findNearestNode(mouseX, mouseY);
        if (nearestNode) {
            const { type, x, y } = findNearestAnchor(
                nearestNode,
                mouseX,
                mouseY
            );

            target = {
                nodeId: nearestNode.id,
                anchor: { type, position: { x, y } },
            };

            targetRef.current = target;
        }

        flowInstanceDispatch({
            type: 'CONNECTING_EDGE',
            payload: { target },
        });
    };

    const finishConnecting = () => {
        flowInstanceDispatch({
            type: 'CONNECTING_EDGE',
            payload: { isConnecting: false },
        });

        const isExistTarget =
            targetRef.current &&
            targetRef.current.nodeId &&
            targetRef.current.nodeId !== sourceRef.current?.nodeId;

        if (!isExistTarget) return;
        flowInstanceDispatch({
            type: 'ADD_EDGE',
            payload: {
                id: `${sourceRef.current!.nodeId}-${targetRef.current!.nodeId}`,
                source: sourceRef.current!,
                target: targetRef.current!,
            },
        });
    };

    useEffect(() => {
        if (connectingEdge.isConnecting) {
            window.addEventListener('mousemove', updateEdgeTarget);
            window.addEventListener('mouseup', finishConnecting);
        } else {
            window.removeEventListener('mousemove', updateEdgeTarget);
            window.removeEventListener('mouseup', finishConnecting);
        }

        return () => {
            window.removeEventListener('mousemove', updateEdgeTarget);
            window.removeEventListener('mouseup', finishConnecting);
        };
    }, [connectingEdge.isConnecting]);

    return {
        startConnecting,
    };
};
