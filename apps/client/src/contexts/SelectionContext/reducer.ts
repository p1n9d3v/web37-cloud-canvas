export type SelectionState = {
    selectedNodeId?: string;
    selectedEdgeId?: string;
    selectedEdgeSegment?: number;
    selectedGroupId?: string;
};

export type SelectionAction =
    | { type: 'SELECT_NODE'; payload: { id: string } }
    | { type: 'SELECT_EDGE'; payload: { id: string; segmentIndex?: number } }
    | { type: 'SELECT_GROUP'; payload: { id: string } }
    | { type: 'DESELECT_NODE' }
    | { type: 'DESELECT_EDGE' }
    | { type: 'DESELECT_GROUP'; payload: { id: string } }
    | { type: 'CLEAR_SELECTION' };

export const selectionReducer = (
    state: SelectionState,
    action: SelectionAction,
): SelectionState => {
    switch (action.type) {
        case 'SELECT_NODE':
            return {
                ...state,
                selectedNodeId: action.payload.id,
                selectedEdgeId: undefined,
                selectedEdgeSegment: undefined,
            };
        case 'SELECT_EDGE':
            return {
                ...state,
                selectedEdgeId: action.payload.id,
                selectedEdgeSegment: action.payload.segmentIndex,
                selectedNodeId: undefined,
            };
        case 'SELECT_GROUP':
            return {
                ...state,
                selectedGroupId: action.payload.id,
                selectedEdgeId: undefined,
                selectedEdgeSegment: undefined,
            };
        case 'DESELECT_NODE':
            return {
                ...state,
                selectedNodeId: undefined,
            };
        case 'DESELECT_EDGE':
            return {
                ...state,
                selectedEdgeId: undefined,
                selectedEdgeSegment: undefined,
            };
        case 'DESELECT_GROUP':
            return {
                ...state,
                selectedGroupId: undefined,
            };
        case 'CLEAR_SELECTION':
            return {
                selectedNodeId: undefined,
                selectedEdgeId: undefined,
                selectedEdgeSegment: undefined,
                selectedGroupId: undefined,
            };
        default:
            return state;
    }
};
