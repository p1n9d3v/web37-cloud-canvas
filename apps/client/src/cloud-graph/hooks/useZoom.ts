import { useViewportContext } from '@cloud-graph/contexts/ViewportContext';
import { Point } from '@cloud-graph/types';
import { getSvgPoint } from '@cloud-graph/utils';
import { useCallback, useEffect, useState } from 'react';

export default () => {
    const { viewportRef, setViewBox } = useViewportContext();

    const adjustZoom = useCallback(
        (wheelY: number, cursorPoint: Point) => {
            if (!viewportRef.current) return;

            const zoomFactor = wheelY > 0 ? 1.1 : 0.9;
            const cursorSvgPoint = getSvgPoint(
                viewportRef.current,
                cursorPoint,
            );
            if (!cursorSvgPoint) return;

            setViewBox((prev) => {
                const newWidth = prev.width * zoomFactor;
                const newHeight = prev.height * zoomFactor;

                const deltaX = (cursorSvgPoint.x - prev.x) * (1 - zoomFactor);
                const deltaY = (cursorSvgPoint.y - prev.y) * (1 - zoomFactor);

                return {
                    x: prev.x + deltaX,
                    y: prev.y + deltaY,
                    width: newWidth,
                    height: newHeight,
                };
            });
        },
        [viewportRef, setViewBox],
    );

    return { adjustZoom };
};
