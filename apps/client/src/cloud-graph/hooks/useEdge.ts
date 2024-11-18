import { useGraphContext } from '@cloud-graph/contexts/GraphContext';
import { Edge, Point } from '@cloud-graph/types';
import { getSvgPoint } from '@cloud-graph/utils';
import { nanoid } from 'nanoid';

type Props = {
    svg?: SVGSVGElement;
};
export default ({ svg }: Props) => {
    const { edges, dispatch } = useGraphContext();

    const handleAdd = (edge: Pick<Edge, 'type' | 'source' | 'target'>) => {
        dispatch({
            type: 'ADD_EDGE',
            payload: {
                id: `edge-${nanoid()}`,
                ...edge,
            },
        });
    };

    const handleRemove = (id: string) => {
        const selectedEdge = edges.find((edge) => edge.id === id);
        if (!selectedEdge) return;

        const { source, target } = selectedEdge;
        let filteredEdges = edges.filter((edge) => edge.id !== id);

        let pointerId;

        //INFO: source.type === 'pointer' && target.type ==='pointer'조건도 target pointer로 위치를 변경하여
        //source.type ==='pointer'와 조건이 동일
        if (source.node.type === 'pointer') {
            const sourceEdge = edges.find(
                (edge) => edge.target.node.id === source.node.id,
            );
            pointerId = source.node.id;
            filteredEdges = filteredEdges.map((edge) => {
                if (sourceEdge && edge.id === sourceEdge.id) {
                    return {
                        ...edge,
                        target: selectedEdge.target,
                        type:
                            selectedEdge.target.node.type === 'pointer'
                                ? 'line'
                                : 'arrow',
                    };
                }
                return edge;
            });
        } else if (target.node.type === 'pointer') {
            const targetEdge = edges.find(
                (edge) => edge.source.node.id === target.node.id,
            );
            pointerId = target.node.id;
            filteredEdges = filteredEdges.map((edge) => {
                if (targetEdge && edge.id === targetEdge.id) {
                    return {
                        ...edge,
                        source: selectedEdge.source,
                    };
                }
                return edge;
            });
        }

        dispatch({
            type: 'REMOVE_EDGE',
            payload: {
                edges: filteredEdges,
                pointerId,
            },
        });
    };

    const handleSplit = (edge: Edge, point: Point) => {
        const svgPoint = getSvgPoint(svg!, point);

        const pointer = {
            id: `node-${nanoid()}`,
            type: 'pointer',
            point: svgPoint,
            size: {
                d2: { width: 4, height: 4 },
                d3: { width: 4, height: 4 },
            },
        };

        const sourceToPointer = {
            id: `edge-${nanoid()}`,
            type: 'line',
            source: {
                ...edge.source,
            },
            target: {
                node: pointer,
            },
        };

        const pointerToTarget = {
            id: `edge-${nanoid()}`,
            type: edge.target.node.type === 'pointer' ? 'line' : 'arrow',
            source: {
                node: pointer,
            },
            target: {
                ...edge.target,
            },
        };

        dispatch({
            type: 'SPLIT_EDGE',
            payload: {
                pointer,
                edge,
                sourceToPointer,
                pointerToTarget,
            },
        });
    };

    return {
        handleAdd,
        handleRemove,
        handleSplit,
    };
};
