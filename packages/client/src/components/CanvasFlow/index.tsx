import Background from '@components/Background';
import useNodeMovement from '@hooks/useNodeMovement';
import usePanZoom from '@hooks/useZoomPan';
import { PropsWithChildren, useRef, useState } from 'react';
import { Node } from '@types';

export default ({ children }: PropsWithChildren) => {
    const ref = useRef<HTMLDivElement>(null);
    const {
        viewBox,
        isDragging: isPanZoomDragging,
        handleMoveStart: handleZoomPanMoveStart,
        handleZoom,
    } = usePanZoom(ref);

    const [nodes, setNodes] = useState<Node[]>([
        {
            id: '1',
            x: 100,
            y: 200,
        },
        {
            id: '2',
            x: 100,
            y: 300,
        },
    ]);
    const { handleMoveStart: handleNodeMoveStart } = useNodeMovement(
        ref,
        viewBox,
        ({ id, x, y }: Node) => {
            setNodes((prev) =>
                prev.map((node) =>
                    node.id === id
                        ? {
                              ...node,
                              x,
                              y,
                          }
                        : node
                )
            );
        }
    );

    const backgroundPoints = [
        [viewBox.x, viewBox.y],
        [viewBox.x + viewBox.width, viewBox.y],
        [viewBox.x + viewBox.width, viewBox.y + viewBox.height],
        [viewBox.x, viewBox.y + viewBox.height],
    ];

    return (
        <div
            ref={ref}
            style={{
                width: '100%',
                height: '100%',
                cursor: isPanZoomDragging ? 'grab' : 'auto',
            }}
            onWheel={handleZoom}
            onMouseDown={handleZoomPanMoveStart}
        >
            <svg
                width="100%"
                height="100%"
                viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`}
            >
                <Background
                    points={backgroundPoints
                        .map((point) => point.join(','))
                        .join(' ')}
                    showSubLines={true}
                />
                {nodes.length === 2 && (
                    <line
                        x1={nodes[0].x}
                        y1={nodes[0].y}
                        x2={nodes[1].x}
                        y2={nodes[1].y}
                        stroke="blue"
                        strokeWidth="2"
                    />
                )}
                {nodes.map((node) => (
                    <circle
                        key={node.id}
                        cx={node.x}
                        cy={node.y}
                        onMouseDown={(event) =>
                            handleNodeMoveStart(event, node.id)
                        }
                        r="20"
                        fill="orange"
                        stroke="black"
                        strokeWidth="2"
                        style={{ cursor: 'pointer' }}
                    />
                ))}
            </svg>
        </div>
    );
};
