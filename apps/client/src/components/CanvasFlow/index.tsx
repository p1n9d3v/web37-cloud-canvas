import Background from '@components/CanvasFlow/Background';
import Edge from '@components/CanvasFlow/Edge';
import Node from '@components/CanvasFlow/Node';
import ZoomPan from '@components/CanvasFlow/ZoomPan';
import { useFlowInstanceContext } from '@contexts/FlowInstanceContext';
import useEdge from '@hooks/useEdge';
import useZoomPan from '@hooks/useZoomPan';

export default () => {
    const {
        state: { connectingEdge, nodes, edges },
    } = useFlowInstanceContext();

    const { finishConnecting, updateEdgeTarget } = useEdge();
    const { viewBox } = useZoomPan();

    return (
        <ZoomPan>
            <svg
                width="100%"
                height="100%"
                viewBox={`${viewBox.position.x} ${viewBox.position.y} ${viewBox.width} ${viewBox.height}`}
                onMouseUp={finishConnecting}
                onMouseMove={updateEdgeTarget}
            >
                <Background viewBox={viewBox} showSubLines={true} />
                {edges.map((edge) => {
                    const {
                        source: {
                            anchor: {
                                position: { x: sx, y: sy },
                            },
                        },

                        target: {
                            anchor: {
                                position: { x: tx, y: ty },
                            },
                        },
                    } = edge;
                    return (
                        <Edge
                            key={edge.id}
                            x1={sx}
                            y1={sy}
                            x2={tx}
                            y2={ty}
                            isConnecting={false}
                        />
                    );
                })}
                {nodes.map((node) => (
                    <Node key={node.id} {...node} />
                ))}

                {connectingEdge.isConnecting && (
                    <Edge
                        x1={connectingEdge.source!.anchor.position.x}
                        y1={connectingEdge.source!.anchor.position.y}
                        x2={connectingEdge.target!.anchor.position.x}
                        y2={connectingEdge.target!.anchor.position.y}
                        isConnecting={true}
                    />
                )}
            </svg>
        </ZoomPan>
    );
};
