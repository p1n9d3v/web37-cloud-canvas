import { Point } from '@cloud-graph/types';
import { ANCHOR_RADIUS } from '@cloud-graph/constants';
import { useTheme } from '@mui/material';

type Props = {
    visible: boolean;
    cx?: number;
    cy?: number;
    onStartConnect: () => void;
    onConnect: (point: Point) => void;
    onStopConnect: () => void;
};

export default ({
    cx,
    cy,
    visible,
    onStartConnect,
    onConnect,
    onStopConnect,
}: Props) => {
    const theme = useTheme();
    const handleMouseDown = () => {
        onStartConnect();

        const handleMouseMove = (moveEvent: MouseEvent) => {
            onConnect({ x: moveEvent.clientX, y: moveEvent.clientY });
        };

        const handleMouseUp = () => {
            onStopConnect();
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
    };

    return (
        <circle
            r={ANCHOR_RADIUS}
            cx={cx}
            cy={cy}
            fill={theme.palette.text.primary}
            style={{
                visibility: visible ? 'visible' : 'hidden',
            }}
            onMouseDown={handleMouseDown}
        />
    );
};
