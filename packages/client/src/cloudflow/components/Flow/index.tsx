import { ViewBox } from '@cloudflow/types';
import { forwardRef, MouseEventHandler, ReactNode } from 'react';

type Props = {
    viewBox: ViewBox;
    onMouseDown?: MouseEventHandler<SVGSVGElement>;
    onMouseUp?: MouseEventHandler<SVGSVGElement>;
    onMouseMove?: MouseEventHandler<SVGSVGElement>;
    children: ReactNode;
};

export default forwardRef<SVGSVGElement, Props>(
    ({ viewBox, children, onMouseDown, onMouseUp, onMouseMove }, ref) => {
        const { point, width, height } = viewBox;

        return (
            <svg
                ref={ref}
                width="100%"
                height="100%"
                viewBox={`${point.x} ${point.y} ${width} ${height}`}
                onMouseUp={onMouseUp}
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
            >
                {children}
            </svg>
        );
    }
);
