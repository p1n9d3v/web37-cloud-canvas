import { useTheme } from '@mui/material';

type Props = {
    cx?: number;
    cy?: number;
};

export default ({ cx, cy }: Props) => {
    const theme = useTheme();
    const color =
        theme.palette.mode === 'dark'
            ? theme.palette.grey[200]
            : theme.palette.grey[800];

    return <circle r={5} fill={color} cx={cx} cy={cy} />;
};
