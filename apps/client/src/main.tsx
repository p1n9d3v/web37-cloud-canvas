import { initialState } from '@/src/mocks.ts';
import { CanvasProvider } from '@contexts/CanvasContext.tsx';
import { CanvasDimensionProvider } from '@contexts/CanvasDimensionContext.tsx';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from '@theme';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { CanvasInstanceProvider } from '@contexts/CanvasInstanceContext';
import { SvgProvider } from '@contexts/SvgContext.tsx';
import { GraphProvider } from '@contexts/GraphConetxt';
import { DimensionProvider } from '@contexts/DimensionContext';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider theme={theme} defaultMode="light">
            <CssBaseline />
            <SvgProvider>
                <DimensionProvider>
                    <GraphProvider>
                        <CanvasDimensionProvider>
                            <CanvasProvider>
                                <CanvasInstanceProvider
                                    initialState={initialState}
                                >
                                    <App />
                                </CanvasInstanceProvider>
                            </CanvasProvider>
                        </CanvasDimensionProvider>
                    </GraphProvider>
                </DimensionProvider>
            </SvgProvider>
        </ThemeProvider>
    </StrictMode>,
);
