import Anchor from '@svgflow/components/Anchor';
import Server from '@svgflow/components/Node/svgs/Server';
import { GRID_SIZE } from '@svgflow/constants';
import { Dimension, Node, Point } from '@svgflow/types';
import { calculateAnchorPoints, getNodeSizeForDimension } from '@svgflow/utils';
import { createElement, memo, MouseEvent } from 'react';

type Props = {
    node: Node;
    dimension: Dimension;
    isSelected: boolean;
    onStartDragNode: (nodeId: string, point: Point) => void;
    onSelectNode: (nodeId: string) => void;
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

export default memo(
    ({ node, dimension, isSelected, onStartDragNode, onSelectNode }: Props) => {
        const { id, type, point } = node;
        const { width, height } = getNodeSizeForDimension(dimension);

        const anchors = calculateAnchorPoints(
            {
                x: 0,
                y: 0,
            },
            dimension
        );

        const handleMouseDown = (event: MouseEvent) => {
            event.stopPropagation();
            const { clientX, clientY } = event;
            onStartDragNode(id, {
                x: clientX,
                y: clientY,
            });
        };

        const handleDbClick = () => {
            onSelectNode(id);
        };

        return (
            <g
                id={id}
                style={{ transform: `translate(${point.x}px, ${point.y}px)` }}
                onMouseDown={handleMouseDown}
                onDoubleClick={handleDbClick}
            >
                {createElement(getNodeComponent(type), {
                    dimension,
                    width,
                    height,
                })}

                {isSelected &&
                    Object.entries(anchors).map(([anchorType, point]) => (
                        <Anchor
                            key={`${id}-${anchorType}`}
                            cx={point.x}
                            cy={point.y}
                        />
                    ))}
            </g>
        );
    }
);
