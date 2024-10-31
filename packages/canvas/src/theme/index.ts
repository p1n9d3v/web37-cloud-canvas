import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    colorSchemes: {
        dark: true,
    },
    palette: {
        white: '#fff',
        black: '#000',
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: (theme) => ({
                '*': {
                    boxSizing: 'border-box',
                    margin: 0,
                    padding: 0,
                    '&::-webkit-scrollbar': {
                        width: '8px',
                    },
                    '&::-webkit-scrollbar-track': {
                        background: theme.palette.background.paper,
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: theme.palette.primary.main,
                        borderRadius: '4px',
                        border: `2px solid ${theme.palette.background.paper}`,
                    },
                    /* Firefox */
                    '&': {
                        scrollbarWidth: 'thin',
                        scrollbarColor: `${theme.palette.primary.main} ${theme.palette.background.paper}`,
                    },
                    /* IE 10+ */
                    '&::-ms-scrollbar': {
                        width: '8px',
                    },
                    '&::-ms-scrollbar-track': {
                        background: theme.palette.background.paper,
                    },
                    '&::-ms-scrollbar-thumb': {
                        backgroundColor: theme.palette.primary.main,
                        borderRadius: '4px',
                        border: `2px solid ${theme.palette.background.paper}`,
                    },
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
                    height: '100dvh',
                    width: '100%',
                },
            }),
        },
        MuiSvgIcon: {
            styleOverrides: {
                root: {
                    color: 'inherit',
                },
            },
        },
        MuiAccordionSummary: {
            styleOverrides: {
                root: {
                    ['& .MuiAccordionSummary-expandIconWrapper']: {
                        color: 'inherit',
                    },
                },
            },
        },
    },
    custom: {
        sidebarWidth: 300,
    },
});

export default theme;
