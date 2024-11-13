import {
    GRID_3D_DEPTH_SIZE,
    GRID_3D_HEIGHT_SIZE,
    GRID_3D_WIDTH_SIZE,
    GRID_SIZE,
} from '@cloudflow/constants';
import { Dimension, Edge, Node, ViewBox } from '@cloudflow/types';
import { useCallback, useMemo } from 'react';

type Props = {
    nodes: Node[];
    edges: Edge[];
    viewBox: ViewBox;
    dimension: Dimension;
};

export default ({ nodes, edges, viewBox, dimension }: Props) => {
    const calculateOffset = useCallback(() => {
        return dimension === '2d'
            ? { width: GRID_SIZE, height: GRID_SIZE }
            : {
                  width: GRID_3D_WIDTH_SIZE,
                  height: GRID_3D_HEIGHT_SIZE + GRID_3D_DEPTH_SIZE,
              };
    }, [dimension]);

    const isNodeVisible = useCallback(
        (node: Node) => {
            const { x, y } = node.point;
            const offset = calculateOffset();

            return (
                x >= viewBox.x - offset.width &&
                x <= viewBox.x + viewBox.width + offset.width &&
                y >= viewBox.y - offset.height &&
                y <= viewBox.y + viewBox.height + offset.height
            );
        },
        [viewBox, calculateOffset],
    );

    const visibleCloudNode: Node[] = useMemo(
        () => nodes.filter(isNodeVisible),
        [nodes, isNodeVisible],
    );

    const mapEdgeToVisibleNodes = useCallback(
        (edge: Edge) => {
            const sourceNode = visibleCloudNode.find(
                (node) => node.id === edge.source.id,
            );
            const targetNode = nodes.find((node) => node.id === edge.target.id);

            return sourceNode && targetNode
                ? {
                      ...edge,
                      source: {
                          ...sourceNode,
                          anchorType: edge.source.anchorType,
                      },
                      target: {
                          ...targetNode,
                          anchorType: edge.target.anchorType,
                      },
                  }
                : null;
        },
        [visibleCloudNode, nodes],
    );

    const visibleEdges = useMemo(
        () => edges.map(mapEdgeToVisibleNodes).filter((node) => node !== null),
        [edges, mapEdgeToVisibleNodes],
    );

    return { visibleCloudNode, visibleEdges };
};
