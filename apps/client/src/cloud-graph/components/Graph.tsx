import { createRef, ReactNode, useState } from 'react';

type Props = {
    children: ReactNode;
};

export default ({ children }: Props) => {
    const ref = createRef<SVGSVGElement>();
    const [viewBox, setViewBox] = useState('0 0 100 100');
    return (
        <svg ref={ref} viewBox={viewBox} width="100%" height="100%">
            {children}
        </svg>
    );
};
