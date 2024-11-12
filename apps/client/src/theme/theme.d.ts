import '@mui/material/styles';

declare module '@mui/material/styles' {
    interface Theme {
        status: {
            danger: string;
        };
        custom: {
            sidebarWidth: number;
            animation: {
                move: string;
            };
        };
    }

    interface ThemeOptions {
        status?: {
            danger?: string;
        };
        custom?: {
            sidebarWidth?: number;
            animation?: {
                move: string;
            };
        };
    }

    interface Palette {
        white: string;
        black: string;
        lines: {
            primary: {
                light: string;
                dark: string;
            };
            secondary: {
                light: string;
                dark: string;
            };
        };
    }

    interface PaletteOptions {
        white?: string;
        black?: string;
        lines?: {
            primary: {
                light: string;
                dark: string;
            };
            secondary: {
                light: string;
                dark: string;
            };
        };
    }
}
