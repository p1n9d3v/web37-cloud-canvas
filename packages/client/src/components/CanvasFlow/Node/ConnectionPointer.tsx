import { useTheme } from '@mui/material';

export default ({ cx, cy }: { cx?: number; cy?: number }) => {
    const theme = useTheme();
    const color =
        theme.palette.mode === 'dark'
            ? theme.palette.grey[200]
            : theme.palette.grey[800];
    return <circle cx={cx} cy={cy} r="6" fill={color} />;
};
