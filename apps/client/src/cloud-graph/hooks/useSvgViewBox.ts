import { ViewBox } from '@cloud-graph/types';
import { useLayoutEffect, useRef, useState } from 'react';

export default () => {
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

    return { svgRef, viewBox, setViewBox };
};
