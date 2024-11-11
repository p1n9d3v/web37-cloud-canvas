import { useTheme } from '@mui/material';
import { MouseEvent } from 'react';

type Props = {
    visible: boolean;
    cx?: number;
    cy?: number;
    onStartConnect: () => void;
};

export default ({ cx, cy, visible, onStartConnect }: Props) => {
    const theme = useTheme();
    const color =
        theme.palette.mode === 'dark'
            ? theme.palette.grey[200]
            : theme.palette.grey[800];

    const handleMouseDown = (e: MouseEvent) => {
        e.stopPropagation();
        onStartConnect();
    };

    return (
        <circle
            r={5}
            fill={color}
            cx={cx}
            cy={cy}
            style={{
                visibility: visible ? 'visible' : 'hidden',
            }}
            onMouseDown={handleMouseDown}
        />
    );
};
