import Anchor from '@cloudflow/components/Anchor';
import { GRID_SIZE } from '@cloudflow/constants';
import useDragNode from '@cloudflow/hooks/useDragNode';
import { Dimension, Node } from '@cloudflow/types';
import { getNodeSizeForDimension } from '@cloudflow/utils';
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

    const { width, height } = getNodeSizeForDimension(dimension);
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
                width,
                height,
            })}

            <>
                {/* Top */}
                <Anchor nodeId={id} type="top" cx={width / 2} />
                {/* Right */}
                <Anchor nodeId={id} type="right" cx={width} cy={height / 2} />
                {/* Bottom */}
                <Anchor nodeId={id} type="bottom" cx={width / 2} cy={height} />
                {/* Left */}
                <Anchor nodeId={id} type="left" cy={height / 2} />
            </>
        </g>
    );
};
