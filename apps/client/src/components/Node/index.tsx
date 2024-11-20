import CloudFunctionNode from '@components/Node/ncloud/CloudFunctionNode';
import DBMySQLNode from '@components/Node/ncloud/DBMySQLNode';
import ObjectStorageNode from '@components/Node/ncloud/ObjectStorageNode';
import ServerNode from '@components/Node/ncloud/ServerNode';
import { useCanvasInstanceContext } from '@contexts/CanvasInstanceContext/index';
import useDrag from '@hooks/useDrag';
import { Node, Point } from '@types';
import { useEffect } from 'react';

const nodeFactory = (type: Node['type']) => {
    switch (type) {
        case 'server':
            return <ServerNode />;
        case 'cloud-function':
            return <CloudFunctionNode />;
        case 'object-storage':
            return <ObjectStorageNode />;
        case 'db-mysql':
            return <DBMySQLNode />;
        // case 'pointer':
        //     return <PointerNode />;
        default:
            null;
    }
};
type Props = {
    id: string;
    type: string;
    point: Point;
};
export default ({ id, point, type }: Props) => {
    const { dispatch } = useCanvasInstanceContext();
    const { isDragging, startDrag, moveDrag, stopDrag } = useDrag({
        initialPoint: point,
        updateFn: (point) =>
            dispatch({
                type: 'MOVE_NODE',
                payload: {
                    id,
                    point,
                },
            }),
    });

    const handleMouseDown = (e: React.MouseEvent) => {
        e.stopPropagation();
        const { clientX, clientY } = e;
        startDrag({ x: clientX, y: clientY });
        document.body.style.cursor = 'move';
    };

    const handleMouseMove = (moveEvent: MouseEvent) => {
        moveDrag({ x: moveEvent.clientX, y: moveEvent.clientY });
    };

    const handleMouseUp = () => {
        stopDrag();
        document.body.style.cursor = 'default';
    };

    useEffect(() => {
        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging]);

    return (
        <g
            id={id}
            transform={`translate(${point.x}, ${point.y})`}
            onMouseDown={handleMouseDown}
        >
            {nodeFactory(type)}
        </g>
    );
};
