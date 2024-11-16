import NodeRenderer from '@cloud-graph/components/Node/NodeRenderer';
import useDrag from '@cloud-graph/hooks/useDrag';
import { Node } from '@cloud-graph/types';

type Props = {
    node: Node;
};
export default ({ node }: Props) => {
    const { startDrag, drag, stopDrag } = useDrag();

    const handleStartDrag = (event: React.MouseEvent) => {
        const { clientX, clientY } = event;
        startDrag(node.id, {
            x: clientX,
            y: clientY,
        });

        const handleMouseMove = (moveEvent: MouseEvent) => {
            drag({ x: moveEvent.clientX, y: moveEvent.clientY });
        };

        const handleMouseUp = () => {
            stopDrag();
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
    };

    return (
        <g
            id={node.id}
            data-type={node.type}
            transform={`translate(${node.point.x}, ${node.point.y})`}
            onMouseDown={handleStartDrag}
        >
            <NodeRenderer node={node} />
        </g>
    );
};
