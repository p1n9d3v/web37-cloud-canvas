import { useTheme } from '@mui/material';

export default () => {
    const theme = useTheme();
    return <circle cx="0" cy="0" r={6} fill={theme.palette.primary.main} />;
};
