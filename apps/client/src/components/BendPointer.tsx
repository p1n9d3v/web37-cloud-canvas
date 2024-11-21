import { useCanvasDimensionContext } from '@contexts/CanvasDimensionContext';
import { useCanvasInstanceContext } from '@contexts/CanvasInstanceContext';
import useDrag from '@hooks/useDrag';
import { useTheme } from '@mui/material';
import { Dimension, Point } from '@types';
import { useEffect } from 'react';

type Props = {
    edgeId: string;
    point: Point;
    index: number;
};

export default ({ edgeId, point, index }: Props) => {
    const theme = useTheme();
    const { dispatch } = useCanvasInstanceContext();
    const { dimension } = useCanvasDimensionContext();
    const { isDragging, startDrag, moveDrag, stopDrag } = useDrag({
        initialPoint: point,
        updateFn: (newPoint) => {
            dispatch({
                type: 'MOVE_BENDING_POINT',
                payload: {
                    edgeId,
                    bendPointIdx: index,
                    point: newPoint,
                    dimension,
                },
            });
        },
    });

    const handleMouseDown = (e: React.MouseEvent) => {
        e.stopPropagation();
        const { clientX, clientY } = e;
        startDrag({ x: clientX, y: clientY });
        document.body.style.cursor = 'move';
    };

    const handleMouseMove = (e: MouseEvent) => {
        moveDrag({ x: e.clientX, y: e.clientY });
    };

    const handleMouseUp = () => {
        stopDrag();
        document.body.style.cursor = 'default';
    };

    useEffect(() => {
        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging]);

    return (
        <circle
            cx={point.x}
            cy={point.y}
            r={6}
            fill={theme.palette.text.primary}
            onMouseDown={handleMouseDown}
        />
    );
};
