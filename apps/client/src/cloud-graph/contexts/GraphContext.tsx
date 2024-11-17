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
    selectedId: string | null;
};

interface GraphContextType extends GraphState {
    handleAddNode: (node: Node) => void;
    handleMoveNode: (id: string, point: Point) => void;
    handleSelect: (id: string) => void;
    handleDeselect: (id: string) => void;
    handleAddEdge: (edge: Edge) => void;
    handleSplitEdge: (edge: Edge, pointer: Node) => void;
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
          type: 'SELECT_NODE';
          payload: {
              id: string;
          };
      }
    | {
          type: 'DESELECT_NODE';
          payload: {
              id: string;
          };
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
        case 'SELECT_NODE': {
            return {
                ...state,
                selectedId: action.payload.id,
            };
        }
        case 'DESELECT_NODE': {
            return {
                ...state,
                selectedId: null,
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
        selectedId: null,
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
        dispatch({ type: 'SELECT_NODE', payload: { id } });
    const handleDeselect = (id: string) =>
        dispatch({ type: 'DESELECT_NODE', payload: { id } });
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

    return (
        <GraphContext.Provider
            value={{
                ...state,
                handleAddNode,
                handleMoveNode,
                handleSelect,
                handleDeselect,
                handleAddEdge,
                handleSplitEdge,
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
