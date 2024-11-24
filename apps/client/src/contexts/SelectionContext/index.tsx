import {
    SelectionState,
    selectionReducer,
} from '@contexts/SelectionContext/reducer';
import { createContext, ReactNode, useContext, useReducer } from 'react';

interface SelectionContextProps extends SelectionState {
    selectNode: (id: string) => void;
    selectEdge: (id: string, segmentIndex?: number) => void;
    selectGroup: (id: string) => void;
    deselectNode: () => void;
    deselectEdge: () => void;
    deselectGroup: (id: string) => void;
    clearSelection: () => void;
}

const SelectionContext = createContext<SelectionContextProps | undefined>(
    undefined,
);

export const SelectionProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(selectionReducer, {
        selectedNodeId: undefined,
        selectedEdgeId: undefined,
        selectedEdgeSegment: undefined,
        selectedGroupId: undefined,
    });

    const selectNode = (id: string) =>
        dispatch({ type: 'SELECT_NODE', payload: { id } });
    const selectEdge = (id: string, segmentIndex?: number) =>
        dispatch({ type: 'SELECT_EDGE', payload: { id, segmentIndex } });
    const selectGroup = (id: string) =>
        dispatch({ type: 'SELECT_GROUP', payload: { id } });
    const deselectNode = () => dispatch({ type: 'DESELECT_NODE' });
    const deselectEdge = () => dispatch({ type: 'DESELECT_EDGE' });
    const deselectGroup = (id: string) =>
        dispatch({ type: 'DESELECT_GROUP', payload: { id } });
    const clearSelection = () => dispatch({ type: 'CLEAR_SELECTION' });

    return (
        <SelectionContext.Provider
            value={{
                ...state,
                selectNode,
                selectEdge,
                selectGroup,
                deselectNode,
                deselectEdge,
                deselectGroup,
                clearSelection,
            }}
        >
            {children}
        </SelectionContext.Provider>
    );
};

export const useSelectionContext = () => {
    const context = useContext(SelectionContext);
    if (!context) {
        throw new Error('SelectionContext: context is undefined');
    }
    return context;
};
