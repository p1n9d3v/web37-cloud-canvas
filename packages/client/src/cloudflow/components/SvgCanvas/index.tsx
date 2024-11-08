import { ViewBox } from '@cloudflow/types';
import { MouseEventHandler, ReactNode } from 'react';

type Props = {
    viewBox: ViewBox;
    onMouseUp?: MouseEventHandler<SVGSVGElement>;
    onMouseMove?: MouseEventHandler<SVGSVGElement>;
    children: ReactNode;
};

export default ({ viewBox, children, onMouseUp, onMouseMove }: Props) => {
    const { point, width, height } = viewBox;

    return (
        <svg
            width="100%"
            height="100%"
            viewBox={`${point.x} ${point.y} ${width} ${height}`}
            onMouseUp={onMouseUp}
            onMouseMove={onMouseMove}
        >
            {children}
        </svg>
    );
};
