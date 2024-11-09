import { ViewBox } from '@types';
import {
    createContext,
    PropsWithChildren,
    RefObject,
    useContext,
    useLayoutEffect,
    useRef,
    useState,
} from 'react';

type FlowZoomPanContextType =
    | {
          ref: RefObject<HTMLElement>;
          viewBox: ViewBox;
          changeViewBox: (viewBox: ViewBox) => void;
      }
    | undefined;

const FlowZoomPanContext = createContext<FlowZoomPanContextType>(undefined);

export const FlowZoomPanContextProvider = ({ children }: PropsWithChildren) => {
    const ref = useRef<HTMLElement>(null);
    const [viewBox, setViewBox] = useState({
        position: {
            x: 0,
            y: 0,
        },
        width: 0,
        height: 0,
    });

    const changeViewBox = (viewBox: ViewBox) =>
        setViewBox((prev) => ({ ...prev, ...viewBox }));

    useLayoutEffect(() => {
        const handleResize = () => {
            if (!ref.current) return;

            const newWidth = ref.current.clientWidth;
            const newHeight = ref.current.clientHeight;
            setViewBox((prev) => {
                return {
                    ...prev,
                    width: newWidth,
                    height: newHeight,
                };
            });
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <FlowZoomPanContext.Provider value={{ ref, viewBox, changeViewBox }}>
            {children}
        </FlowZoomPanContext.Provider>
    );
};

export const useFlowZoomPanContext = () => {
    const context = useContext(FlowZoomPanContext);

    if (!context) throw new Error('FlowContext : context is undefined');

    return context;
};