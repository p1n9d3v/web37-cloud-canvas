import CloudNode from '@cloudflow/components/Node/CloudNode';
import CommonNode from '@cloudflow/components/Node/CommonNode';
import {
    AnchorType,
    CloudNodeType,
    CommonNodeType,
    Dimension,
    Node,
    Point,
} from '@cloudflow/types';
import { getNodeSizeForDimension } from '@cloudflow/utils';
import { memo, MouseEvent } from 'react';

type Props = {
    node: Node;
    dimension: Dimension;
    isSelected: boolean;
    onStartDragNode: (nodeId: string, point: Point) => void;
    onSelectNode: (nodeId: string) => void;
    onStartConnect: (node: Node, anchorType: AnchorType) => void;
};

const cloudNodeType = ['server'];
const commonNodeType = ['pointer'];

export default memo(
    ({
        node,
        dimension,
        isSelected,
        onStartDragNode,
        onSelectNode,
        onStartConnect,
    }: Props) => {
        const { id, type, point } = node;
        const { width, height } = getNodeSizeForDimension(dimension);

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
                data-type="flow-node"
                style={{ transform: `translate(${point.x}px, ${point.y}px)` }}
                onMouseDown={handleMouseDown}
                onDoubleClick={handleDbClick}
            >
                {cloudNodeType.includes(type) && (
                    <CloudNode
                        nodeId={id}
                        type={type as CloudNodeType}
                        width={width}
                        height={height}
                        dimension={dimension}
                        isSelected={isSelected}
                        onStartConnect={(anchorType: AnchorType) =>
                            onStartConnect(node, anchorType)
                        }
                    />
                )}
                {commonNodeType.includes(type) && (
                    <CommonNode
                        type={type as CommonNodeType}
                        isSelected={isSelected}
                    />
                )}
            </g>
        );
    },
);
