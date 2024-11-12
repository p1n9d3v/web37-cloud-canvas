import { GRID_SIZE } from '@constants';
import { useFlowInstanceContext } from '@contexts/FlowInstanceContext';
import { useFlowZoomPanContext } from '@contexts/FlowZoomPanContext';
import { EdgePoint, Node } from '@types';
import {
    calculateAnchorsPosition,
    getDistance,
    getRelativeCoordinatesForViewBox,
} from '@utils/index';
import { nanoid } from 'nanoid';
import { MouseEvent } from 'react';

export default () => {
    const { ref, viewBox } = useFlowZoomPanContext();
    const {
        state: { connectingEdge, nodes },
        dispatch: flowInstanceDispatch,
    } = useFlowInstanceContext();

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

    const startConnecting = (e: MouseEvent) => {
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
                position: {
                    x: nearestAnchor.x,
                    y: nearestAnchor.y,
                },
            },
        };

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
        if (!connectingEdge.isConnecting) return;
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
        }

        flowInstanceDispatch({
            type: 'CONNECTING_EDGE',
            payload: { target },
        });
    };

    const finishConnecting = () => {
        if (!connectingEdge.isConnecting) return;
        flowInstanceDispatch({
            type: 'CONNECTING_EDGE',
            payload: { isConnecting: false, source: null, target: null },
        });

        const isPossibleToConnect =
            connectingEdge.source &&
            connectingEdge.target &&
            connectingEdge.target.nodeId;

        if (!isPossibleToConnect) return;

        const { source, target } = connectingEdge as {
            source: EdgePoint;
            target: EdgePoint;
        };

        flowInstanceDispatch({
            type: 'ADD_EDGE',
            payload: {
                id: `${source.nodeId}-${target.nodeId}-${nanoid()}`,
                source: source,
                target: target,
            },
        });
    };

    return {
        startConnecting,
        updateEdgeTarget,
        finishConnecting,
    };
};
