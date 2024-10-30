import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                '*': {
                    boxSizing: 'border-box',
                    margin: 0,
                    padding: 0,
                },
                html: {
                    height: '100%',
                    width: '100%',
                },
                body: {
                    height: '100%',
                    width: '100%',
                },
                '#root': {
                    height: '100%',
                    width: '100%',
                },
            },
        },
    },
    custom: {
        sidebarWidth: 300,
    },
});

export default theme;
