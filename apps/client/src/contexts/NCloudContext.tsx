import {
    createContext,
    Dispatch,
    PropsWithChildren,
    SetStateAction,
    useContext,
    useState,
} from 'react';

type NCloudContextProps = {
    region: string;
    vpc: string;
    vpcList: { [id: string]: string };
    setRegion: Dispatch<SetStateAction<string>>;
    setVpc: Dispatch<SetStateAction<string>>;
    setVpcList: Dispatch<SetStateAction<{ [id: string]: string }>>;
};

const NCloudContext = createContext<NCloudContextProps | undefined>(undefined);

export const NCloudProvider = ({ children }: PropsWithChildren) => {
    const [region, setRegion] = useState<string>('kr');
    const [vpc, setVpc] = useState<string>('');
    const [vpcList, setVpcList] = useState<{
        [id: string]: string;
    }>({});

    return (
        <NCloudContext.Provider
            value={{ region, vpc, vpcList, setRegion, setVpc, setVpcList }}
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
