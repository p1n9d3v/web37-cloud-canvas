import { NcloudFactory } from '@/src/models/ncloud';
import { useDimensionContext } from '@contexts/DimensionContext';
import { useEdgeContext } from '@contexts/EdgeContext';
import { useGraphContext } from '@contexts/GraphConetxt';
import { useGroupContext } from '@contexts/GroupContext';
import { useNodeContext } from '@contexts/NodeContext';
import { useSvgContext } from '@contexts/SvgContext';
import {
    findNearestConnectorForBendPoint,
    getClosestSegEdgeIdx,
    updateNearestConnectorPair,
} from '@helpers/edge';
import { adjustNodePointForDimension, alignNodePoint } from '@helpers/node';
import { Connection, Edge, Node, Point } from '@types';
import {
    alignPoint2d,
    alignPoint3d,
    convert2dTo3dPoint,
    convert3dTo2dPoint,
    getConnectorPoints,
    getDistanceToSegment,
    getSvgPoint,
} from '@utils';
import { nanoid } from 'nanoid';
import { useEffect } from 'react';

export default () => {
    const {
        state: { nodes },
        dispatch: nodeDispatch,
    } = useNodeContext();
    const {
        state: { edges },
        dispatch: edgeDispatch,
    } = useEdgeContext();
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

        const updatedEdges = updateNearestConnectorPair(
            { ...node, point: newPoint, connectors },
            nodes,
            Object.values(edges),
        );

        updateEdges(updatedEdges);
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

    const updateEdges = (edges: Record<string, Edge>) => {
        edgeDispatch({
            type: 'UPDATE_EDGES',
            payload: edges,
        });
    };

    const splitEdge = (id: string, point: Point, bendingPoints: Point[]) => {
        if (!svgRef.current) return;

        const svgPoint = getSvgPoint(svgRef.current, point);
        const closestSegmentIdx = getClosestSegEdgeIdx(bendingPoints, svgPoint);

        edgeDispatch({
            type: 'SPLIT_EDGE',
            payload: {
                id,
                point: svgPoint,
                insertAfter: closestSegmentIdx,
            },
        });
    };

    const moveBendingPointer = (
        edgeId: string,
        index: number,
        point: Point,
    ) => {
        if (!svgRef.current) return;

        const newPoint =
            dimension === '2d' ? alignPoint2d(point) : alignPoint3d(point);

        const edge = edges[edgeId];
        const { source, target } = edge;

        let connector:
            | {
                  [key: string]: {
                      id: string;
                      connectorType: string;
                  };
              }
            | undefined;

        if (index === 0) {
            const sourceNode = nodes[source.id];
            const connectorType = findNearestConnectorForBendPoint(
                sourceNode,
                point,
            ) as string;
            connector = {
                ['source']: {
                    id: source.id,
                    connectorType,
                },
            };
        }
        if (index === edge.bendingPoints.length - 1) {
            const targetNode = nodes[target.id];
            const connectorType = findNearestConnectorForBendPoint(
                targetNode,
                point,
            ) as string;
            connector = {
                ...connector,
                ['target']: {
                    id: target.id,
                    connectorType,
                },
            };
        }

        edgeDispatch({
            type: 'MOVE_BENDING_POINTER',
            payload: {
                id: edgeId,
                bendingPointer: { index, point: newPoint },
                connector,
            },
        });
    };

    const updateEdgePointForDimension = () => {
        const updatedEdges = Object.entries(edges).reduce((acc, [id, edge]) => {
            const adjustedBendingPoints = edge.bendingPoints.map((point) =>
                dimension === '2d'
                    ? convert3dTo2dPoint(point)
                    : convert2dTo3dPoint(point),
            );

            return {
                ...acc,
                [id]: {
                    ...edge,
                    bendingPoints: adjustedBendingPoints,
                },
            };
        }, {});

        edgeDispatch({
            type: 'UPDATE_EDGES',
            payload: updatedEdges,
        });
    };

    useEffect(() => {
        if (dimension === prevDimension) return;

        updateNodePointForDimension();
        updateEdgePointForDimension();
    }, [dimension]);

    return {
        addNode,
        moveNode,
        addEdge,
        splitEdge,
        moveBendingPointer,
    };
};
