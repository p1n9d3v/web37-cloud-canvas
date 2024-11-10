import { useConnectionContext } from '@cloudflow/contexts/ConnectionContext';
import { useFlowContext } from '@cloudflow/contexts/FlowContext';
import { useNodeContext } from '@cloudflow/contexts/NodeContext';
import { Point } from '@cloudflow/types';
import { getSvgPoint } from '@cloudflow/utils';
import { nanoid } from 'nanoid';

export default () => {
    const { flowRef, dimension } = useFlowContext();
    const {
        state: { nodes },
    } = useNodeContext();
    const {
        state: { isConnecting },
        dispatch: dispatchConnection,
    } = useConnectionContext();

    const findNearestAnchor = (mouseX: number, mouseY: number) => {
        if (!flowRef.current) return;
        const cursorSvgPoint = getSvgPoint(flowRef.current, {
            x: mouseX,
            y: mouseY,
        });

        const { x: cursorSvgX, y: cursorSvgY } = cursorSvgPoint!;
    };

    const startConnection = (startPoint: Point) => {
        if (!flowRef.current) return;
        const startSvgPoint = getSvgPoint(flowRef.current, startPoint);

        dispatchConnection({
            type: 'START_CONNECTION',
            payload: {
                id: nanoid(),
                point: { x: startSvgPoint!.x, y: startSvgPoint!.y },
            },
        });
    };

    const connecting = (cursorPoint: Point) => {
        if (!isConnecting || !flowRef.current) return;

        const cursorSvgPoint = getSvgPoint(flowRef.current, {
            x: cursorPoint.x,
            y: cursorPoint.y,
        });

        if (cursorSvgPoint) {
            const { x: cursorSvgX, y: cursorSvgY } = cursorSvgPoint;
            const nearestNode = findNearestAnchor(cursorSvgX, cursorSvgY);
            dispatchConnection({
                type: 'MOVE_CONNECTION',
                payload: {
                    x: cursorSvgX,
                    y: cursorSvgY,
                },
            });
        }
    };

    const endConnection = () => {
        dispatchConnection({
            type: 'END_CONNECTION',
        });
    };

    return {
        isConnecting,
        startConnecting: startConnection,
        connecting,
        endConnection,
    };
};
