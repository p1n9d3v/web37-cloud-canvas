import { createContext, ReactNode, useContext, useState } from 'react';

interface ErrorContextType {
    setError: (error: Error) => void;
}

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export const useError = () => {
    const context = useContext(ErrorContext);
    if (!context) {
        throw new Error('useError must be used within an ErrorProvider');
    }
    return context;
};

export const ErrorProvider = ({ children }: { children: ReactNode }) => {
    const [error, setError] = useState<Error | null>(null);

    if (error) {
        throw error;
    }

    return (
        <ErrorContext.Provider value={{ setError }}>
            {children}
        </ErrorContext.Provider>
    );
};
