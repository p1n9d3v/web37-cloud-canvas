import { ViewBox } from '@cloud-graph/types';
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

interface ViewportContextType {
    viewportRef: RefObject<SVGSVGElement>;
    viewBox: ViewBox;
    setViewBox: Dispatch<SetStateAction<ViewBox>>;
}

const ViewportContext = createContext<ViewportContextType | null>(null);

export const ViewportProvider = ({ children }: { children: ReactNode }) => {
    const viewportRef = useRef<SVGSVGElement>(null);
    const [viewBox, setViewBox] = useState<ViewBox>({
        x: 0,
        y: 0,
        width: 1000,
        height: 800,
    });

    useLayoutEffect(() => {
        if (viewportRef.current) {
            const updateViewBoxSize = () => {
                setViewBox((prev) => ({
                    ...prev,
                    width: viewportRef.current!.clientWidth,
                    height: viewportRef.current!.clientHeight,
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
        <ViewportContext.Provider value={{ viewportRef, viewBox, setViewBox }}>
            {children}
        </ViewportContext.Provider>
    );
};

export const useViewportContext = () => {
    const context = useContext(ViewportContext);
    if (!context) {
        throw new Error(
            'useViewportContext must be used within a ViewportProvider',
        );
    }
    return context;
};
