import Flow from '@svgflow/components/Flow';
import { Dimension, ViewBox } from '@svgflow/types';
import { useLayoutEffect, useRef, useState } from 'react';

export default () => {
    const flowRef = useRef<SVGSVGElement | null>(null);
    const [dimension, setDimension] = useState<Dimension>('2d');
    const [viewBox, setViewBox] = useState<ViewBox>({
        x: 0,
        y: 0,
        width: document.body.clientWidth,
        height: document.body.clientHeight,
    });

    useLayoutEffect(() => {
        if (flowRef.current) {
            const updateViewBoxSize = () => {
                setViewBox((prev) => ({
                    ...prev,
                    width: flowRef.current!.clientWidth,
                    height: flowRef.current!.clientHeight,
                }));
            };
            updateViewBoxSize();
            window.addEventListener('resize', updateViewBoxSize);

            return () => {
                window.removeEventListener('resize', updateViewBoxSize);
            };
        }
    }, [flowRef]);

    return (
        <Flow ref={flowRef} viewBox={viewBox} dimension={dimension}>
            <rect />
        </Flow>
    );
};
