import { NcloudFactory } from '@/src/models/ncloud';
import { useDimensionContext } from '@contexts/DimensionContext';
import { useEdgeContext } from '@contexts/EdgeContext';
import { useGroupContext } from '@contexts/GroupContext';
import { useNodeContext } from '@contexts/NodeContext';
import { useSvgContext } from '@contexts/SvgContext';
import { adjustNodePointForDimension, alignNodePoint } from '@helpers/node';
import { Node, Point } from '@types';
import { getConnectorPoints } from '@utils';
import { nanoid } from 'nanoid';
import { useEffect } from 'react';

export default () => {
    const {
        state: { nodes },
        dispatch: nodeDispatch,
    } = useNodeContext();
    const { state: edgeState, dispatch: edgeDispatch } = useEdgeContext();
    const { state: groupState, dispatch: groupDispatch } = useGroupContext();
    const { dimension, prevDimension } = useDimensionContext();
    const { svgRef } = useSvgContext();

    const addNode = (type: Node['type']) => {
        const node = NcloudFactory(type);
        //TODO: Focus 된 그룹에 추가하도록 수정해야함
        nodeDispatch({
            type: 'ADD_NODE',
            payload: {
                ...node,
                id: `node-${nanoid()}`,
                point: { x: 0, y: 0 },
                connectors: getConnectorPoints(node, dimension),
            },
        });
    };

    const dragNode = (id: string, point: Point) => {
        if (!svgRef.current) return;
        const node = nodes[id];
        nodeDispatch({
            type: 'DRAG_NODE',
            payload: { id, point: alignNodePoint(node, point, dimension) },
        });
    };

    const updateNodePointForDimension = () => {
        const updatedNodes = Object.entries(nodes).reduce((acc, [id, node]) => {
            return {
                ...acc,
                [id]: {
                    ...node,
                    point: adjustNodePointForDimension(node, dimension),
                },
            };
        }, {});

        nodeDispatch({
            type: 'UPDATE_NODES',
            payload: updatedNodes,
        });
    };

    useEffect(() => {
        if (dimension === prevDimension) return;

        updateNodePointForDimension();
    }, [dimension]);

    return {
        addNode,
        dragNode,
    };
};
