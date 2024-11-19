import CloudFunctionNode from '@components/Node/ncloud/CloudFunctionNode';
import DBMySQLNode from '@components/Node/ncloud/DBMySQLNode';
import ObjectStorageNode from '@components/Node/ncloud/ObjectStorageNode';
import ServerNode from '@components/Node/ncloud/ServerNode';
import { useGraphInstanceContext } from '@contexts/GraphInstanceContext';
import useDrag from '@hooks/useDrag';
import { Node } from '@types';
import { useEffect, useState } from 'react';

const nodeFactory = (node: Node) => {
    switch (node.type) {
        case 'server':
            return <ServerNode node={node} />;
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
    node: Node;
};
export default ({ node }: Props) => {
    const { id, point } = node;
    const { dispatch } = useGraphInstanceContext();
    const { dragOffset, isDragging, startDrag, moveDrag, stopDrag } = useDrag({
        updateFn: (offset) =>
            dispatch({
                type: 'UPDATE_NODE',
                payload: {
                    id,
                    point: {
                        x: point.x + offset.x,
                        y: point.y + offset.y,
                    },
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
            transform={`translate(${point.x + dragOffset.x}, ${point.y + dragOffset.y})`}
            onMouseDown={handleMouseDown}
        >
            {nodeFactory(node)}
        </g>
    );
};
