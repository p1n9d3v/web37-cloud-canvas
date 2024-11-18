import { Edge, Group, Node } from '@cloud-graph/types';
import { nanoid } from 'nanoid';
import {
    createContext,
    Dispatch,
    ReactNode,
    useContext,
    useReducer,
} from 'react';

type GraphState = {
    nodes: Node[];
    edges: Edge[];
    groups: Group[];
    selectedIds: string[]; //INFO: Set으로 변경할까 고민
};

interface GraphContextType extends GraphState {
    handleSelect: (id: string) => void;
    handleSelectEntireEdge: (edge: Edge) => void;
    handleDeselect: (id: string) => void;
    handleDeselectAll: () => void;
    handleRemoveSelected: () => void;
    dispatch: Dispatch<GraphAction>;
}

type GraphAction =
    | {
          type: 'ADD_NODE';
          payload: Node;
      }
    | {
          type: 'MOVE_NODE';
          payload: {
              nodes: Node[];
              edges: Edge[];
          };
      }
    | {
          type: 'REMOVE_NODE';
          payload: {
              nodeIds: string[];
              edgeIds: string[];
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
              edges: Edge[];
              pointerId?: string;
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
                nodes: action.payload.nodes,
                edges: action.payload.edges,
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
        case 'REMOVE_NODE': {
            return {
                ...state,
                nodes: state.nodes.filter(
                    (node) => !action.payload.nodeIds.includes(node.id),
                ),
                edges: state.edges.filter(
                    (edge) => !action.payload.edgeIds.includes(edge.id),
                ),
            };
        }
        case 'REMOVE_EDGE': {
            return {
                ...state,
                nodes: action.payload.pointerId
                    ? state.nodes.filter(
                          (node) => node.id !== action.payload.pointerId,
                      )
                    : state.nodes,
                edges: action.payload.edges,
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
    const [state, dispatch] = useReducer(graphReducer, {
        nodes: [...mockNodes],
        edges: [],
        groups: [],
        selectedIds: [],
    });

    const handleSelect = (id: string) =>
        dispatch({ type: 'SELECT', payload: { id } });
    const handleDeselect = (id: string) =>
        dispatch({ type: 'DESELECT', payload: { id } });
    const handleDeselectAll = () => dispatch({ type: 'DESELECT_ALL' });
    //TODO: 분리할지 고민
    const handleRemoveSelected = () => {
        const selectedNodes = state.nodes.filter((node) =>
            state.selectedIds.includes(node.id),
        );
        selectedNodes.forEach((node) => {
            // dispatch({
            //     type: 'REMOVE_NODE',
            //     payload: {
            //         id: node.id,
            //     },
            // });
        });
        const selectedEdges = state.edges.filter((edge) =>
            state.selectedIds.includes(edge.id),
        );
        // selectedEdges.forEach((edge) => {
        //     dispatch({
        //         type: 'REMOVE_EDGE',
        //         payload: {
        //             id: edge.id,
        //         },
        //     });
        // });
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
                dispatch,
                handleSelect,
                handleDeselect,
                handleDeselectAll,
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
