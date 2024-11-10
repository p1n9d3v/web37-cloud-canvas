import Background from '@cloudflow/components/Background';
import ConnectingEdge from '@cloudflow/components/ConnectingEdge';
import Edge from '@cloudflow/components/Edge';
import Flow from '@cloudflow/components/Flow';
import Node from '@cloudflow/components/Node';
import ZoomPan from '@cloudflow/components/ZoomPan';
import {
    ConnectionProvider,
    useConnectionContext,
} from '@cloudflow/contexts/ConnectionContext';
import { DragProvider } from '@cloudflow/contexts/DragContext';
import { EdgeProvider, useEdgeContext } from '@cloudflow/contexts/EdgeContext';
import { FlowProvider, useFlowContext } from '@cloudflow/contexts/FlowContext';
import { NodeProvider, useNodeContext } from '@cloudflow/contexts/NodeContext';
import useConnection from '@cloudflow/hooks/useConnection';
import useDragNode from '@cloudflow/hooks/useDragNode';
import { nanoid } from 'nanoid';
import { MouseEvent, useEffect } from 'react';

const CloudFlow = () => {
    const { flowRef, dimension, changeDimension } = useFlowContext();
    const {
        state: { nodes },
        dispatch: dispatchNode,
    } = useNodeContext();
    const {
        state: { edges },
    } = useEdgeContext();
    const {
        state: { isConnecting, connection, sourceAnchor, targetAnchor },
    } = useConnectionContext();

    const { dragNode, endDragNode } = useDragNode();
    const { connecting, endConnection } = useConnection();

    const handleMouseMoveFlow = (e: MouseEvent<SVGGElement>) => {
        const { clientX, clientY } = e;
        dragNode({ x: clientX, y: clientY });
        connecting({ x: clientX, y: clientY });
    };

    const handleMouseUpFlow = () => {
        endDragNode();
        endConnection();
    };

    useEffect(() => {
        // Test Node
        if (!flowRef.current) return;
        dispatchNode({
            type: 'ADD_NODE',
            payload: {
                id: `server-${nanoid()}`,
                type: 'server',
                point: { x: 0, y: 0 },
            },
        });
    }, [flowRef]);

    return (
        <ZoomPan>
            {({ viewBox }) => (
                <Flow
                    ref={flowRef}
                    viewBox={viewBox}
                    onMouseMove={handleMouseMoveFlow}
                    onMouseUp={handleMouseUpFlow}
                >
                    <Background
                        viewBox={viewBox}
                        dimension={dimension}
                        showSubLines
                    />
                    {nodes.map((node) => (
                        <Node key={node.id} node={node} dimension={dimension} />
                    ))}

                    <rect
                        onClick={() =>
                            changeDimension(dimension === '2d' ? '3d' : '2d')
                        }
                        width="100"
                        height="100"
                        x="500"
                        y="0"
                        fill="blue"
                    />
                    {edges.map((edge) => (
                        <Edge key={edge.id} edge={edge} />
                    ))}

                    {isConnecting && connection && (
                        <ConnectingEdge
                            start={connection.start}
                            end={connection.end}
                        />
                    )}
                </Flow>
            )}
        </ZoomPan>
    );
};

export default () => {
    return (
        <FlowProvider>
            <NodeProvider>
                <DragProvider>
                    <EdgeProvider>
                        <ConnectionProvider>
                            <CloudFlow />
                        </ConnectionProvider>
                    </EdgeProvider>
                </DragProvider>
            </NodeProvider>
        </FlowProvider>
    );
};
