import Background from '@cloudflow/components/Background';
import GraphNode from '@cloudflow/components/GraphNode';
import Flow from '@cloudflow/components/Flow';
import ZoomPan from '@cloudflow/components/ZoomPan';
import { FlowProvider, useFlowContext } from '@cloudflow/contexts/FlowContext';
import { DragProvider } from '@cloudflow/contexts/DragContext';
import {
    GraphNodeProvider,
    useGraphNodeContext,
} from '@cloudflow/contexts/GraphNodeContext';
import useDragNode from '@cloudflow/hooks/useDragNode';
import { nanoid } from 'nanoid';
import { MouseEvent, useEffect } from 'react';

const CloudFlow = () => {
    const { flowRef, dimension, changeDimension } = useFlowContext();
    const {
        state: { nodes },
        dispatch,
    } = useGraphNodeContext();
    const { dragNode, endDragNode } = useDragNode();

    const handleMouseMoveFlow = (e: MouseEvent<SVGGElement>) => {
        const { clientX, clientY } = e;
        dragNode({ x: clientX, y: clientY });
    };

    const handleMouseUpFlow = () => endDragNode();

    useEffect(() => {
        // Test Node
        dispatch({
            type: 'ADD_NODE',
            payload: {
                id: nanoid(),
                type: 'server',
                point: { x: 100, y: 100 },
            },
        });
    }, []);

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
                        <GraphNode
                            key={node.id}
                            node={node}
                            dimension={dimension}
                        />
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
                </Flow>
            )}
        </ZoomPan>
    );
};

export default () => {
    return (
        <FlowProvider>
            <GraphNodeProvider>
                <DragProvider>
                    <CloudFlow />
                </DragProvider>
            </GraphNodeProvider>
        </FlowProvider>
    );
};
