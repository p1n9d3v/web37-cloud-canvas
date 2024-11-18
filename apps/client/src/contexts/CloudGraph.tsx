import { ViewBox } from '@types';
import {
    createContext,
    Dispatch,
    ReactNode,
    RefObject,
    SetStateAction,
    useContext,
    useLayoutEffect,
    useRef,
    useState,
} from 'react';

type CloudGraphContextProps = {
    svgRef: RefObject<SVGSVGElement>;
    viewBox: ViewBox;
    setViewBox: Dispatch<SetStateAction<ViewBox>>;
};
const CloudGraphContext = createContext<CloudGraphContextProps | null>(null);

export const CloudGraphPropvider = ({ children }: { children: ReactNode }) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const [viewBox, setViewBox] = useState<ViewBox>({
        x: 0,
        y: 0,
        width: 0,
        height: 0,
    });

    useLayoutEffect(() => {
        if (svgRef.current) {
            const updateViewBoxSize = () => {
                setViewBox((prev) => ({
                    ...prev,
                    width: svgRef.current!.clientWidth,
                    height: svgRef.current!.clientHeight,
                }));
            };
            updateViewBoxSize();
            window.addEventListener('resize', updateViewBoxSize);

            return () => {
                window.removeEventListener('resize', updateViewBoxSize);
            };
        }
    }, []);
    return (
        <CloudGraphContext.Provider value={{ svgRef, viewBox, setViewBox }}>
            {children}
        </CloudGraphContext.Provider>
    );
};

export const useCloudGraphContext = () => {
    const context = useContext(CloudGraphContext);
    if (!context) throw new Error('CloudGraph: context is undefined');

    return context;
};
