import { Dimension } from '@svgflow/types';
import {
    createContext,
    PropsWithChildren,
    RefObject,
    useContext,
    useRef,
    useState,
} from 'react';

type SvgFlowContextProps = {
    flowRef: RefObject<SVGSVGElement>;
    dimension: Dimension;
    changeDimension: (dimension: Dimension) => void;
};
const SvgFlowContext = createContext<SvgFlowContextProps>({
    flowRef: { current: null },
    dimension: '2d',
    changeDimension: () => {},
});

export const SvgFlowProvider = ({ children }: PropsWithChildren) => {
    const flowRef = useRef<SVGSVGElement>(null);
    const [dimension, setDimension] = useState<Dimension>('2d');

    const changeDimension = (dimension: Dimension) => setDimension(dimension);

    return (
        <SvgFlowContext.Provider
            value={{ flowRef, dimension, changeDimension }}
        >
            {children}
        </SvgFlowContext.Provider>
    );
};

export const useSvgFlowContext = () => {
    const context = useContext(SvgFlowContext);

    if (!context) {
        throw new Error('SvgFlowContext : context is undefined');
    }
    return context;
};
