import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from '@theme';
import { FlowInstanceContextProvider } from '@contexts/FlowInstanceContext/index.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider theme={theme} defaultMode="light">
            <CssBaseline />
            <FlowInstanceContextProvider>
                <App />
            </FlowInstanceContextProvider>
        </ThemeProvider>
    </StrictMode>
);
