import Anchor from '@cloudflow/components/Anchor';
import { GRID_SIZE } from '@cloudflow/constants';
import useDragNode from '@cloudflow/hooks/useDragNode';
import { AnchorType, Dimension, Node } from '@cloudflow/types';
import {
    calculateAnchorPoint,
    getNodeSizeForDimension,
} from '@cloudflow/utils';
import { createElement, memo, MouseEvent, MouseEventHandler } from 'react';
import ServerNode from './Svgs/ServerNode';

type Props = {
    node: Node;
    dimension: Dimension;
    onMouseDown: (e: MouseEvent) => void;
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

export default memo(
    ({ node: { id, type, point }, dimension, onMouseDown }: Props) => {
        const { width, height } = getNodeSizeForDimension(dimension);

        const anchors = ['top', 'right', 'bottom', 'left'].map((anchorType) => {
            const anchorPoint = calculateAnchorPoint(
                anchorType as AnchorType,
                dimension
            );
            return { type: anchorType, point: anchorPoint };
        });

        return (
            <g
                id={id}
                style={{ transform: `translate(${point.x}px, ${point.y}px)` }}
                onMouseDown={onMouseDown}
            >
                {createElement(getNodeComponent(type), {
                    dimension,
                    width,
                    height,
                })}

                {anchors.map((anchor) => (
                    <Anchor
                        key={anchor.type}
                        nodeId={id}
                        type={anchor.type as AnchorType}
                        cx={anchor.point.x}
                        cy={anchor.point.y}
                    />
                ))}
            </g>
        );
    }
);
