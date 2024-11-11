import Anchor from '@svgflow/components/Anchor';
import Server from '@svgflow/components/Node/svgs/Server';
import { GRID_SIZE } from '@svgflow/constants';
import useDragNode from '@svgflow/hooks/useDragNode';
import { AnchorType, Dimension, Node, Point } from '@svgflow/types';
import { calculateAnchorPoint, getNodeSizeForDimension } from '@svgflow/utils';
import { createElement, memo, MouseEvent } from 'react';

type Props = {
    node: Node;
    dimension: Dimension;
    onStartDragNode: (nodeId: string, point: Point) => void;
};

const getNodeComponent = (type: string) => {
    switch (type) {
        case 'server':
            return Server;
        default:
            return () => (
                <rect width={GRID_SIZE} height={GRID_SIZE} fill="gray" />
            );
    }
};

export default memo(({ node, dimension, onStartDragNode }: Props) => {
    const { id, type, point } = node;
    const { width, height } = getNodeSizeForDimension(dimension);

    const anchors = ['top', 'right', 'bottom', 'left'].map((anchorType) => {
        const anchorPoint = calculateAnchorPoint(
            anchorType as AnchorType,
            dimension
        );
        return { type: anchorType, point: anchorPoint };
    });

    const handleMouseDown = (event: MouseEvent) => {
        event.stopPropagation();
        onStartDragNode(id, point);
    };

    return (
        <g
            id={id}
            style={{ transform: `translate(${point.x}px, ${point.y}px)` }}
            onMouseDown={handleMouseDown}
        >
            {createElement(getNodeComponent(type), {
                dimension,
                width,
                height,
            })}

            {anchors.map((anchor) => (
                <Anchor
                    key={`${id}-${anchor.type}`}
                    cx={anchor.point.x}
                    cy={anchor.point.y}
                />
            ))}
        </g>
    );
});
