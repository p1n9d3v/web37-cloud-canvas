import { useDimensionContext } from '@cloud-graph/contexts/DimensionContext';
import { Dimension, Edge, Group, Node, Point } from '@cloud-graph/types';
import {
    calculateAnchorPoints,
    findNearestAnchorPair,
    isUtilityNode,
} from '@cloud-graph/utils';
import { nanoid } from 'nanoid';
import { createContext, ReactNode, useContext, useReducer } from 'react';

type GraphState = {
    nodes: Node[];
    edges: Edge[];
    groups: Group[];
    selectedIds: string[]; //INFO: Set으로 변경할까 고민
};

interface GraphContextType extends GraphState {
    handleAddNode: (node: Node) => void;
    handleMoveNode: (id: string, point: Point) => void;
    handleSelect: (id: string) => void;
    handleSelectEntireEdge: (edge: Edge) => void;
    handleDeselect: (id: string) => void;
    handleDeselectAll: () => void;
    handleAddEdge: (edge: Edge) => void;
    handleSplitEdge: (edge: Edge, pointer: Node) => void;
    handleRemoveSelected: () => void;
}

type GraphAction =
    | {
          type: 'ADD_NODE';
          payload: Node;
      }
    | {
          type: 'MOVE_NODE';
          payload: {
              id: string;
              point: Point;
              dimension: Dimension;
          };
      }
    | {
          type: 'REMOVE_NODE';
          payload: {
              id: string;
          };
      }
    | {
          type: 'SELECT';
          payload: {
              id: string;
          };
      }
    | {
          type: 'MULTIPLE_SELECT';
          payload: {
              ids: string[];
          };
      }
    | {
          type: 'DESELECT';
          payload: {
              id: string;
          };
      }
    | {
          type: 'DESELECT_ALL';
      }
    | {
          type: 'ADD_EDGE';
          payload: Edge;
      }
    | {
          type: 'SPLIT_EDGE';
          payload: {
              pointer: Node;
              edge: Edge;
              sourceToPointer: Edge;
              pointerToTarget: Edge;
          };
      }
    | {
          type: 'REMOVE_EDGE';
          payload: {
              id: string;
          };
      };
const GraphContext = createContext<GraphContextType | null>(null);

const graphReducer = (state: GraphState, action: GraphAction) => {
    switch (action.type) {
        case 'ADD_NODE': {
            return {
                ...state,
                nodes: [...state.nodes, action.payload],
            };
        }
        case 'MOVE_NODE': {
            return {
                ...state,
                nodes: state.nodes
                    .map((node) => {
                        if (node.id === action.payload.id) {
                            return { ...node, point: action.payload.point };
                        }
                        return node;
                    })
                    .sort((a, b) => {
                        if (a.point.y === b.point.y) {
                            return a.point.x - b.point.x;
                        } else {
                            return a.point.y - b.point.y;
                        }
                    }),
                edges: state.edges.map((edge) => {
                    const sourceAnchors = calculateAnchorPoints(
                        edge.source.node,
                        action.payload.dimension,
                    );
                    const targetAnchors = calculateAnchorPoints(
                        edge.target.node,
                        action.payload.dimension,
                    );

                    const nearestAnchorPair = findNearestAnchorPair(
                        sourceAnchors,
                        targetAnchors,
                    );

                    if (edge.source.node.id === action.payload.id) {
                        return {
                            ...edge,
                            source: {
                                ...edge.source,
                                node: {
                                    ...edge.source.node,
                                    point: action.payload.point,
                                },
                                anchorType: !isUtilityNode(edge.source.node)
                                    ? nearestAnchorPair.sourceAnchorType
                                    : undefined,
                            },
                            target: {
                                ...edge.target,
                                anchorType: !isUtilityNode(edge.target.node)
                                    ? nearestAnchorPair.targetAnchorType
                                    : undefined,
                            },
                        };
                    }
                    if (edge.target.node.id === action.payload.id) {
                        return {
                            ...edge,
                            source: {
                                ...edge.source,
                                anchorType: !isUtilityNode(edge.source.node)
                                    ? nearestAnchorPair.sourceAnchorType
                                    : undefined,
                            },
                            target: {
                                ...edge.target,
                                node: {
                                    ...edge.target.node,
                                    point: action.payload.point,
                                },
                                anchorType: !isUtilityNode(edge.target.node)
                                    ? nearestAnchorPair.targetAnchorType
                                    : undefined,
                            },
                        };
                    }

                    return edge;
                }),
            };
        }
        case 'SELECT': {
            return {
                ...state,
                selectedIds: [action.payload.id],
            };
        }
        case 'MULTIPLE_SELECT': {
            return {
                ...state,
                selectedIds: [
                    ...state.selectedIds,
                    ...action.payload.ids.filter(
                        (id) => !state.selectedIds.includes(id),
                    ),
                ],
            };
        }
        case 'DESELECT': {
            return {
                ...state,
                selectedIds: state.selectedIds.filter(
                    (selectedId) => selectedId !== action.payload.id,
                ),
            };
        }
        case 'DESELECT_ALL': {
            return {
                ...state,
                selectedIds: [],
            };
        }
        case 'ADD_EDGE': {
            return {
                ...state,
                edges: [...state.edges, action.payload],
            };
        }
        case 'SPLIT_EDGE': {
            return {
                ...state,
                nodes: [...state.nodes, action.payload.pointer],
                edges: state.edges
                    .filter((edge) => edge.id !== action.payload.edge.id)
                    .concat([
                        action.payload.sourceToPointer,
                        action.payload.pointerToTarget,
                    ]),
            };
        }
        //TODO: Refactoring
        case 'REMOVE_NODE': {
            const connectedEdges = state.edges.filter(
                (edge) =>
                    edge.source.node.id === action.payload.id ||
                    edge.target.node.id === action.payload.id,
            );
            const edgesToRemove: string[] = [];
            const pointersToRemove: string[] = [];
            connectedEdges.forEach((edge) => {
                edgesToRemove.push(edge.id);
                let nextEdge: Edge | undefined;
                let nextNode: Node | undefined;
                if (edge.source.node.id === action.payload.id) {
                    nextNode = edge.target.node;
                    while (nextNode.type === 'pointer') {
                        pointersToRemove.push(edge.target.node.id);
                        nextEdge = state.edges.find(
                            (edge) => edge.source.node.id === nextNode!.id,
                        );
                        edgesToRemove.push(nextEdge!.id);
                        nextNode = nextEdge!.target.node;
                    }
                    if (nextEdge?.source.node.type === 'pointer') {
                        pointersToRemove.push(nextEdge.source.node.id);
                    }
                } else {
                    nextNode = edge.source.node;
                    while (nextNode.type === 'pointer') {
                        pointersToRemove.push(edge.source.node.id);
                        nextEdge = state.edges.find(
                            (edge) => edge.target.node.id === nextNode!.id,
                        );
                        edgesToRemove.push(nextEdge!.id);
                        nextNode = nextEdge!.source.node;
                    }
                    if (nextEdge?.target.node.type === 'pointer') {
                        pointersToRemove.push(nextEdge.target.node.id);
                    }
                }
            });

            return {
                ...state,
                nodes: state.nodes.filter(
                    (node) =>
                        node.id !== action.payload.id &&
                        !pointersToRemove.includes(node.id),
                ),
                edges: state.edges.filter(
                    (edge) => !edgesToRemove.includes(edge.id),
                ),
            };
        }
        //TODO: Refactoring
        case 'REMOVE_EDGE': {
            const selectedEdge = state.edges.find(
                (edge) => edge.id === action.payload.id,
            );
            if (!selectedEdge) return state;

            const { source, target } = selectedEdge;
            let filteredEdges = state.edges.filter(
                (edge) => edge.id !== action.payload.id,
            );

            let pointerIdToRemove = null;
            //INFO: source.type === 'pointer' && target.type ==='pointer'조건도 target pointer로 위치를 변경하여
            //source.type ==='pointer'와 조건이 동일
            if (source.node.type === 'pointer') {
                const sourceEdge = state.edges.find(
                    (edge) => edge.target.node.id === source.node.id,
                );
                pointerIdToRemove = source.node.id;
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
                const targetEdge = state.edges.find(
                    (edge) => edge.source.node.id === target.node.id,
                );
                pointerIdToRemove = target.node.id;
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
            return {
                ...state,
                nodes: state.nodes.filter(
                    (node) => node.id !== pointerIdToRemove,
                ),
                edges: filteredEdges,
            };
        }
        default:
            return state;
    }
};

const mockNodes = [
    {
        id: `node-${nanoid()}`,
        type: 'server',
        point: { x: 0, y: 0 },
        size: {
            d2: { width: 90, height: 90 },
            d3: { width: 128, height: 111 },
        },
        label: 'G1',
    },
    {
        id: `node-${nanoid()}`,
        type: 'server',
        point: { x: 0, y: 0 },
        size: {
            d2: { width: 90, height: 90 },
            d3: { width: 128, height: 111 },
        },
        label: 'G1',
    },
    {
        id: `node-${nanoid()}`,
        type: 'cloud-function',
        point: { x: 10, y: 100 },
        size: {
            d2: { width: 90, height: 90 },
            d3: { width: 96, height: 113.438 },
        },
    },
    {
        id: `node-${nanoid()}`,
        type: 'object-storage',
        size: {
            d2: { width: 90, height: 90 },
            d3: { width: 100.626, height: 115.695 },
        },
        point: { x: 100, y: 10 },
    },
    {
        id: `node-${nanoid()}`,
        type: 'db-mysql',
        size: {
            d2: { width: 90, height: 90 },
            d3: { width: 128, height: 137.5 },
        },
        point: { x: 100, y: 100 },
    },
];
export const GraphProvider = ({ children }: { children: ReactNode }) => {
    const { dimension } = useDimensionContext();
    const [state, dispatch] = useReducer(graphReducer, {
        nodes: [...mockNodes],
        edges: [],
        groups: [],
        selectedIds: [],
    });

    const handleAddNode = (node: Node) =>
        dispatch({ type: 'ADD_NODE', payload: node });

    const handleMoveNode = (id: string, point: Point) => {
        dispatch({
            type: 'MOVE_NODE',
            payload: {
                id,
                point,
                dimension,
            },
        });
    };
    const handleSelect = (id: string) =>
        dispatch({ type: 'SELECT', payload: { id } });
    const handleDeselect = (id: string) =>
        dispatch({ type: 'DESELECT', payload: { id } });
    const handleDeselectAll = () => dispatch({ type: 'DESELECT_ALL' });
    const handleAddEdge = (edge: Edge) =>
        dispatch({ type: 'ADD_EDGE', payload: edge });
    const handleSplitEdge = (edge: Edge, pointer: Node) => {
        const sourceToPointer = {
            id: nanoid(),
            type: 'line',
            source: {
                ...edge.source,
            },
            target: {
                node: pointer,
            },
        };
        const pointerToTarget = {
            id: nanoid(),
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
    //TODO: 분리할지 고민
    const handleRemoveSelected = () => {
        const selectedNodes = state.nodes.filter((node) =>
            state.selectedIds.includes(node.id),
        );
        selectedNodes.forEach((node) => {
            dispatch({
                type: 'REMOVE_NODE',
                payload: {
                    id: node.id,
                },
            });
        });
        const selectedEdges = state.edges.filter((edge) =>
            state.selectedIds.includes(edge.id),
        );
        selectedEdges.forEach((edge) => {
            dispatch({
                type: 'REMOVE_EDGE',
                payload: {
                    id: edge.id,
                },
            });
        });
    };

    const handleSelectEntireEdge = (edge: Edge) => {
        const { source, target } = edge;
        let sourceNode = source.node;
        let targetNode = target.node;
        const ids = [edge.id];
        while (sourceNode.type === 'pointer') {
            const sourceEdge = state.edges.find(
                (edge) => edge.target.node.id === sourceNode.id,
            );
            sourceNode = sourceEdge!.source.node;
            ids.push(sourceEdge!.id);
        }
        while (targetNode.type === 'pointer') {
            const targetEdge = state.edges.find(
                (edge) => edge.source.node.id === targetNode.id,
            );
            targetNode = targetEdge!.target.node;
            ids.push(targetEdge!.id);
        }

        dispatch({
            type: 'MULTIPLE_SELECT',
            payload: {
                ids,
            },
        });
    };

    return (
        <GraphContext.Provider
            value={{
                ...state,
                handleAddNode,
                handleMoveNode,
                handleSelect,
                handleDeselect,
                handleDeselectAll,
                handleAddEdge,
                handleSplitEdge,
                handleRemoveSelected,
                handleSelectEntireEdge,
            }}
        >
            {children}
        </GraphContext.Provider>
    );
};

export const useGraphContext = () => {
    const context = useContext(GraphContext);
    if (!context) throw new Error('GraphCOntext: context is undefined');

    return context;
};
