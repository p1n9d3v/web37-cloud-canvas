import { createContext, ReactNode, useContext, useState } from 'react';

const SelectionContext = createContext<
    | {
          selectedId: string | undefined;
          select: (id: string) => void;
          clearSelect: () => void;
      }
    | undefined
>(undefined);

export const SelectionProvider = ({ children }: { children: ReactNode }) => {
    const [selectedId, setSelectedId] = useState<string | undefined>(undefined);

    const select = (id: string) => {
        setSelectedId(id);
    };

    const clearSelect = () => setSelectedId(undefined);

    return (
        <SelectionContext.Provider value={{ selectedId, select, clearSelect }}>
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
