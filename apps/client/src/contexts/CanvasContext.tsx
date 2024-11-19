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

type CanvasContextProps = {
    canvasRef: RefObject<SVGSVGElement>;
    canvas: SVGSVGElement;
    viewBox: ViewBox;
    setViewBox: Dispatch<SetStateAction<ViewBox>>;
};
const CanvasContext = createContext<CanvasContextProps | null>(null);

export const CanvasProvider = ({ children }: { children: ReactNode }) => {
    const canvasRef = useRef<SVGSVGElement>(null);
    const [viewBox, setViewBox] = useState<ViewBox>({
        x: 0,
        y: 0,
        width: 0,
        height: 0,
    });

    useLayoutEffect(() => {
        if (canvasRef.current) {
            const updateViewBoxSize = () => {
                setViewBox((prev) => ({
                    ...prev,
                    width: canvasRef.current!.clientWidth,
                    height: canvasRef.current!.clientHeight,
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
        <CanvasContext.Provider
            value={{
                canvasRef,
                canvas: canvasRef.current!,
                viewBox,
                setViewBox,
            }}
        >
            {children}
        </CanvasContext.Provider>
    );
};

export const useCanvasContext = () => {
    const context = useContext(CanvasContext);
    if (!context) throw new Error('CloudGraph: context is undefined');

    return context;
};
