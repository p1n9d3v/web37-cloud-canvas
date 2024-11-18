import { GraphCanvasProvider } from '@contexts/GraphCanvas.tsx';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from '@theme';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { GraphDimensionProvider } from '@contexts/GraphDimensionContext.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider theme={theme} defaultMode="light">
            <CssBaseline />
            <GraphDimensionProvider>
                <GraphCanvasProvider>
                    <App />
                </GraphCanvasProvider>
            </GraphDimensionProvider>
        </ThemeProvider>
    </StrictMode>,
);
