import Background from '@svgflow/components/Background';
import { Dimension, ViewBox } from '@svgflow/types';
import { forwardRef, MouseEventHandler, ReactNode } from 'react';

type Props = {
    viewBox: ViewBox;
    dimension: Dimension;
    onMouseDown?: MouseEventHandler<SVGSVGElement>;
    onMouseUp?: MouseEventHandler<SVGSVGElement>;
    onMouseMove?: MouseEventHandler<SVGSVGElement>;
    children: ReactNode;
};

export default forwardRef<SVGSVGElement, Props>(
    (
        { viewBox, children, dimension, onMouseDown, onMouseUp, onMouseMove },
        ref
    ) => {
        return (
            <svg
                ref={ref}
                width="100%"
                height="100%"
                viewBox={Object.values(viewBox).join(' ')}
                onMouseUp={onMouseUp}
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
            >
                <Background
                    viewBox={viewBox}
                    dimension={dimension}
                    showSubLines
                />
                {children}
            </svg>
        );
    }
);
