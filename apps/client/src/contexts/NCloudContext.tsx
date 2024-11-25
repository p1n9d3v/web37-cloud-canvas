import {
    createContext,
    Dispatch,
    PropsWithChildren,
    RefObject,
    SetStateAction,
    useContext,
    useRef,
    useState,
} from 'react';

type NCloudContextProps = {
    region: string;
    setRegion: Dispatch<SetStateAction<string>>;
};

const NCloudContext = createContext<NCloudContextProps | undefined>(undefined);

export const NCloudProvider = ({ children }: PropsWithChildren) => {
    const [region, setRegion] = useState<string>('kr');

    return (
        <NCloudContext.Provider value={{ region, setRegion }}>
            {children}
        </NCloudContext.Provider>
    );
};

export const useNCloudContext = () => {
    const context = useContext(NCloudContext);
    if (!context) {
        throw new Error('NCloudContext: context is undefined');
    }
    return context;
};
