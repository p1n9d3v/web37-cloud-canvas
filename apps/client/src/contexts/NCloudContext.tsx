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
    vpc: string;
    vpcList: string[];
    setRegion: Dispatch<SetStateAction<string>>;
    setVPC: Dispatch<SetStateAction<string>>;
};

const NCloudContext = createContext<NCloudContextProps | undefined>(undefined);

export const NCloudProvider = ({ children }: PropsWithChildren) => {
    const [region, setRegion] = useState<string>('kr');
    const [vpc, setVPC] = useState<string>('');
    const [vpcList, setVPCList] = useState<string[]>([]);

    return (
        <NCloudContext.Provider
            value={{ region, vpc, vpcList, setRegion, setVPC }}
        >
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
