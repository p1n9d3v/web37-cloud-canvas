import { useConnectionContext } from '@cloudflow/contexts/ConnectionContext';
import { useEdgeContext } from '@cloudflow/contexts/EdgeContext';
import { useFlowContext } from '@cloudflow/contexts/FlowContext';
import { useNodeContext } from '@cloudflow/contexts/NodeContext';
import { Anchor, Point } from '@cloudflow/types';
import {
    getDistance,
    getNodeSizeForDimension,
    getSvgPoint,
} from '@cloudflow/utils';
import { nanoid } from 'nanoid';

export default () => {
    const { flowRef, dimension } = useFlowContext();
    const {
        state: { nodes },
    } = useNodeContext();
    const { dispatch: dispatchEdge } = useEdgeContext();
    const {
        state: { isConnecting, targetAnchor, sourceAnchor },
        dispatch: dispatchConnection,
    } = useConnectionContext();

    const findNearestAnchor = (cursorPoint: Point): Anchor | null => {
        if (!flowRef.current) return null;
        const cursorSvgPoint = getSvgPoint(flowRef.current, {
            x: cursorPoint.x,
            y: cursorPoint.y,
        });

        if (!cursorSvgPoint) return null;

        let nearestAnchor = null;
        let minDistance = Infinity;

        //TODO: 모든 노드를 순회하면서 가장 가까운 anchor를 찾기 때문에 성능상 문제가 있음 그래도 200개 까지는 괜찮은 듯
        nodes.forEach((node) => {
            if (node.id === sourceAnchor?.nodeId) return;

            const { width, height } = getNodeSizeForDimension(dimension);
            const anchors = [
                {
                    type: 'top',
                    point: { x: node.point.x + width / 2, y: node.point.y },
                },
                {
                    type: 'right',
                    point: {
                        x: node.point.x + width,
                        y: node.point.y + height / 2,
                    },
                },
                {
                    type: 'bottom',
                    point: {
                        x: node.point.x + width / 2,
                        y: node.point.y + height,
                    },
                },
                {
                    type: 'left',
                    point: {
                        x: node.point.x,
                        y: node.point.y + height / 2,
                    },
                },
            ];

            anchors.forEach((anchor) => {
                const anchorSvgPoint = getSvgPoint(
                    flowRef.current!,
                    anchor.point
                );
                if (!anchorSvgPoint) return;

                const distance = getDistance(cursorSvgPoint, anchorSvgPoint);
                const snappedThreshold = 30;
                if (distance < snappedThreshold && distance < minDistance) {
                    minDistance = distance;
                    nearestAnchor = {
                        nodeId: node.id,
                        type: anchor.type,
                        point: anchor.point,
                    };
                }
            });
        });

        return nearestAnchor;
    };

    const startConnection = (sourceAnchor: Anchor) => {
        if (!flowRef.current) return;
        const startSvgPoint = getSvgPoint(flowRef.current, sourceAnchor.point);
        if (!startSvgPoint) return;

        dispatchConnection({
            type: 'START_CONNECTION',
            payload: {
                x: startSvgPoint.x,
                y: startSvgPoint.y,
            },
        });
        dispatchConnection({
            type: 'SET_SOURCE_ANCHOR',
            payload: {
                ...sourceAnchor,
                point: {
                    x: startSvgPoint.x,
                    y: startSvgPoint.y,
                },
            },
        });
    };

    const connecting = (cursorPoint: Point) => {
        if (!isConnecting || !flowRef.current) return;

        const cursorSvgPoint = getSvgPoint(flowRef.current, {
            x: cursorPoint.x,
            y: cursorPoint.y,
        });
        if (!cursorSvgPoint) return;

        const nearestAnchor = findNearestAnchor(cursorSvgPoint);

        let targetPoint = {
            x: cursorSvgPoint.x,
            y: cursorSvgPoint.y,
        };

        if (nearestAnchor) {
            targetPoint = {
                x: nearestAnchor.point.x,
                y: nearestAnchor.point.y,
            };
            dispatchConnection({
                type: 'SET_TARGET_ANCHOR',
                payload: {
                    ...nearestAnchor,
                },
            });
        } else {
            dispatchConnection({
                type: 'SET_TARGET_ANCHOR',
                payload: null,
            });
        }
        dispatchConnection({
            type: 'MOVE_CONNECTION',
            payload: {
                x: targetPoint.x,
                y: targetPoint.y,
            },
        });
    };

    const endConnection = () => {
        if (targetAnchor) {
            dispatchEdge({
                type: 'ADD_EDGE',
                payload: {
                    id: `edge-${nanoid()}`,
                    source: {
                        id: sourceAnchor!.nodeId,
                        anchorType: sourceAnchor!.type,
                        point: sourceAnchor!.point,
                    },
                    target: {
                        id: targetAnchor.nodeId,
                        anchorType: targetAnchor.type,
                        point: targetAnchor.point,
                    },
                },
            });
        }
        dispatchConnection({
            type: 'RESET_CONNECTION',
        });
    };

    return {
        isConnecting,
        startConnecting: startConnection,
        connecting,
        endConnection,
    };
};
