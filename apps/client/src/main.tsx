import { GraphCanvasProvider } from '@contexts/GraphCanvasContext.tsx';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from '@theme';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { GraphDimensionProvider } from '@contexts/GraphDimensionContext.tsx';
import { GraphInstanceProvider } from '@contexts/GraphInstanceContext.tsx';
import { initialState } from '@/src/mocks.ts';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider theme={theme} defaultMode="light">
            <CssBaseline />
            <GraphDimensionProvider>
                <GraphCanvasProvider>
                    <GraphInstanceProvider initialState={initialState}>
                        <App />
                    </GraphInstanceProvider>
                </GraphCanvasProvider>
            </GraphDimensionProvider>
        </ThemeProvider>
    </StrictMode>,
);
