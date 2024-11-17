import NodeRenderer from '@cloud-graph/components/Node/NodeRenderer';
import { Dimension, Node } from '@cloud-graph/types';
import { useRef } from 'react';

type Props = {
    node: Node;
    dimension: Dimension;
    isSelected?: boolean;
    onStartDrag: (nodeId: string, point: { x: number; y: number }) => void;
    onDrag: (point: { x: number; y: number }) => void;
    onStopDrag: () => void;
    onSelect?: (nodeId: string) => void;
};
export default ({
    node,
    dimension,
    isSelected = false,
    onStartDrag,
    onDrag,
    onStopDrag,
    onSelect,
}: Props) => {
    const handleMouseDown = (event: React.MouseEvent) => {
        const { clientX, clientY } = event;
        onSelect && onSelect(node.id);
        onStartDrag(node.id, {
            x: clientX,
            y: clientY,
        });

        const handleMouseMove = (moveEvent: MouseEvent) => {
            onDrag({ x: moveEvent.clientX, y: moveEvent.clientY });
        };

        const handleMouseUp = () => {
            onStopDrag();
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
    };

    return (
        <g
            id={node.id}
            data-type="graph-node"
            data-service-type={node.type}
            transform={`translate(${node.point.x}, ${node.point.y})`}
            onMouseDown={handleMouseDown}
        >
            <NodeRenderer
                node={node}
                dimension={dimension}
                isSelected={isSelected}
            />
        </g>
    );
};
