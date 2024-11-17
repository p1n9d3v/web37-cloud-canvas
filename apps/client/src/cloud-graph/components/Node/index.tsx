import Anchor from '@cloud-graph/components/Anchor';
import NodeRenderer from '@cloud-graph/components/Node/NodeRenderer';
import {
    Anchors,
    AnchorType,
    Dimension,
    Node,
    Point,
} from '@cloud-graph/types';
import { calculateAnchorPoints } from '@cloud-graph/utils';
import { useEffect, useRef, useState } from 'react';

type Props = {
    node: Node;
    dimension: Dimension;
    isSelected: boolean;
    onStartDrag: (nodeId: string, point: { x: number; y: number }) => void;
    onDrag: (point: { x: number; y: number }) => void;
    onStopDrag: () => void;
    onSelect: (nodeId: string) => void;
    onStartConnect: (node: Node, anchorType: AnchorType) => void;
    onConnect: (point: Point) => void;
    onStopConnect: () => void;
};
export default ({
    node,
    dimension,
    isSelected,
    onStartDrag,
    onDrag,
    onStopDrag,
    onSelect,
    onStartConnect,
    onConnect,
    onStopConnect,
}: Props) => {
    const nodeRef = useRef<SVGGElement>(null);
    const [anchors, setAnchors] = useState<Anchors | null>(null);

    const handleStartDrag = (event: React.MouseEvent) => {
        const { clientX, clientY } = event;
        onSelect(node.id);
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

    useEffect(() => {
        if (nodeRef.current) {
            const anchorPoints = calculateAnchorPoints(node, dimension);
            setAnchors(anchorPoints);
        }
    }, [node, dimension]);

    return (
        <>
            <g
                ref={nodeRef}
                id={node.id}
                data-type={node.type}
                transform={`translate(${node.point.x}, ${node.point.y})`}
                onMouseDown={handleStartDrag}
            >
                <NodeRenderer
                    node={node}
                    dimension={dimension}
                    isSelected={isSelected}
                />
            </g>

            {anchors &&
                Object.entries(anchors).map(([type, point]) => (
                    <Anchor
                        key={`${node.id}-${type}`}
                        cx={point.x as any}
                        cy={point.y as any}
                        visible={isSelected}
                        onStartConnect={() =>
                            onStartConnect(node, type as AnchorType)
                        }
                        onConnect={onConnect}
                        onStopConnect={onStopConnect}
                    />
                ))}
        </>
    );
};
