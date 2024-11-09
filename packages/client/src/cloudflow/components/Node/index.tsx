import {
    GRID_3D_HEIGHT_SIZE,
    GRID_3D_WIDTH_SIZE,
    GRID_SIZE,
} from '@cloudflow/constants';
import useDragNode from '@cloudflow/hooks/useDragNode';
import { Dimension, Node } from '@cloudflow/types';
import { createElement, MouseEvent } from 'react';
import ServerNode from './Svgs/ServerNode';

type Props = {
    node: Node;
    dimension: Dimension;
};

const getNodeComponent = (type: string) => {
    switch (type) {
        case 'server':
            return ServerNode;
        default:
            return () => (
                <rect width={GRID_SIZE} height={GRID_SIZE} fill="gray" />
            );
    }
};

export default ({ node: { id, type, point }, dimension }: Props) => {
    const { startDragNode } = useDragNode();

    const handleMouseDown = (e: MouseEvent<SVGGElement>) => {
        e.stopPropagation(); // Prevent dragging the flow

        const { clientX, clientY } = e;
        startDragNode(id, { x: clientX, y: clientY });
    };

    return (
        <g
            id={id}
            style={{
                transform: `translate(${point.x}px, ${point.y}px)`,
            }}
            onMouseDown={handleMouseDown}
        >
            {createElement(getNodeComponent(type), {
                dimension,
                width: dimension === '2d' ? GRID_SIZE : GRID_3D_WIDTH_SIZE,
                height:
                    dimension === '2d' ? GRID_SIZE : GRID_3D_HEIGHT_SIZE + 37,
            })}
        </g>
    );
};
