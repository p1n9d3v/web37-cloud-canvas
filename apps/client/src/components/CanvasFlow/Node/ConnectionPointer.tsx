import { POINTER_SIZE } from '@constants';
import { useTheme } from '@mui/material';
import { ComponentProps } from 'react';

export default (props: ComponentProps<'circle'>) => {
    const theme = useTheme();
    const color =
        theme.palette.mode === 'dark'
            ? theme.palette.grey[200]
            : theme.palette.grey[800];

    return <circle r={POINTER_SIZE} fill={color} {...props} />;
};
