import { useTheme } from '@mui/material';

type Props = {
    visible: boolean;
    cx?: number;
    cy?: number;
};

export default ({ cx, cy, visible }: Props) => {
    const theme = useTheme();
    const color =
        theme.palette.mode === 'dark'
            ? theme.palette.grey[200]
            : theme.palette.grey[800];

    return (
        <circle
            r={5}
            fill={color}
            cx={cx}
            cy={cy}
            style={{
                visibility: visible ? 'visible' : 'hidden',
            }}
        />
    );
};
