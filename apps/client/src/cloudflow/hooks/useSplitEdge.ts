import { useEdgeContext } from '@cloudflow/contexts/EdgeContext';
import { useNodeContext } from '@cloudflow/contexts/NodeContext';
import { Node, Point } from '@cloudflow/types';
import { getSvgPoint } from '@cloudflow/utils';
import { nanoid } from 'nanoid';
import { RefObject, useCallback } from 'react';

export default (flowRef: RefObject<SVGSVGElement>) => {
    const { dispatch: dispatchEdge } = useEdgeContext();
    const { dispatch: dispatchNode } = useNodeContext();

    const handleSplitEdge = useCallback((edgeId: string, point: Point) => {
        if (!flowRef.current) return;
        const svgPoint = getSvgPoint(flowRef.current, point);
        const pointer: Node = {
            id: nanoid(),
            type: 'pointer',
            point: svgPoint,
        };
        dispatchNode({
            type: 'ADD_NODE',
            payload: pointer,
        });

        dispatchEdge({
            type: 'SPLIT_EDGE',
            payload: {
                edgeId,
                pointer,
            },
        });
    }, []);

    return {
        handleSplitEdge,
    };
};
