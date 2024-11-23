import { NcloudFactory } from '@/src/models/ncloud';
import { useDimensionContext } from '@contexts/DimensionContext';
import { useEdgeContext } from '@contexts/EdgeContext';
import { useGraphContext } from '@contexts/GraphConetxt';
import { useGroupContext } from '@contexts/GroupContext';
import { useNodeContext } from '@contexts/NodeContext';
import { useSvgContext } from '@contexts/SvgContext';
import { getNearestConnector } from '@helpers/edge';
import { adjustNodePointForDimension, alignNodePoint } from '@helpers/node';
import { Connection, Node, Point } from '@types';
import { getConnectorPoints, getSvgPoint } from '@utils';
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

    //INFO: Node

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

    const moveNode = (id: string, point: Point) => {
        if (!svgRef.current) return;
        const node = nodes[id];
        const newPoint = alignNodePoint(node, point, dimension);
        const connectors = getConnectorPoints(
            { ...node, point: newPoint },
            dimension,
        );
        nodeDispatch({
            type: 'MOVE_NODE',
            payload: { id, point: newPoint, connectors },
        });
    };

    const updateNodePointForDimension = () => {
        const updatedNodes = Object.entries(nodes).reduce((acc, [id, node]) => {
            const adjustedPoint = adjustNodePointForDimension(node, dimension);
            const connectors = getConnectorPoints(
                { ...node, point: adjustedPoint },
                dimension,
            );
            return {
                ...acc,
                [id]: {
                    ...node,
                    point: adjustedPoint,
                    connectors,
                },
            };
        }, {});

        nodeDispatch({
            type: 'UPDATE_NODES',
            payload: updatedNodes,
        });
    };

    //INFO: Edge

    const addEdge = (
        source: Required<Connection>,
        target: Required<Connection>,
    ) => {
        edgeDispatch({
            type: 'ADD_EDGE',
            payload: {
                id: `edge-${nanoid()}`,
                type: 'arrow',
                source: {
                    id: source.id,
                    connectorType: source.connectorType,
                },
                target: {
                    id: target.id,
                    connectorType: target.connectorType,
                },
            },
        });
    };

    useEffect(() => {
        if (dimension === prevDimension) return;

        updateNodePointForDimension();
    }, [dimension]);

    return {
        addNode,
        moveNode,
        addEdge,
    };
};
