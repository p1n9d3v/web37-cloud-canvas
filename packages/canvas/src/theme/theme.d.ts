import '@mui/material/styles';

declare module '@mui/material/styles' {
    interface Theme {
        status: {
            danger: string;
        };
        custom: {
            sidebarWidth: number;
        };
    }
    interface ThemeOptions {
        status?: {
            danger?: string;
        };
        custom?: {
            sidebarWidth?: number;
        };
    }
    interface Palette {
        border: {
            light: string;
            dark: string;
        };
    }
    interface PaletteOptions {
        border?: {
            light?: string;
            dark?: string;
        };
    }
}
