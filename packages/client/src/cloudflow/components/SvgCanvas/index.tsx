import { ViewBox } from '@types';
import { ReactNode } from 'react';

type Props = {
    viewBox: ViewBox;
    onMouseUp?: React.MouseEventHandler<SVGSVGElement>;
    onMouseMove?: React.MouseEventHandler<SVGSVGElement>;
    children: ReactNode;
};

export default ({ viewBox, children, onMouseUp, onMouseMove }: Props) => {
    return (
        <svg
            width="100%"
            height="100%"
            viewBox={`${viewBox.position.x} ${viewBox.position.y} ${viewBox.width} ${viewBox.height}`}
            onMouseUp={onMouseUp}
            onMouseMove={onMouseMove}
        >
            {children}
        </svg>
    );
};
