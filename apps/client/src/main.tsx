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
import { NodeProvider } from '@contexts/NodeContext/index.tsx';
import { EdgeProvider } from '@contexts/EdgeContext/index.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider theme={theme} defaultMode="light">
            <CssBaseline />
            <SvgProvider>
                <DimensionProvider>
                    <GraphProvider>
                        <GraphProvider>
                            <NodeProvider>
                                <EdgeProvider>
                                    <CanvasDimensionProvider>
                                        <CanvasProvider>
                                            <CanvasInstanceProvider
                                                initialState={initialState}
                                            >
                                                <App />
                                            </CanvasInstanceProvider>
                                        </CanvasProvider>
                                    </CanvasDimensionProvider>
                                </EdgeProvider>
                            </NodeProvider>
                        </GraphProvider>
                    </GraphProvider>
                </DimensionProvider>
            </SvgProvider>
        </ThemeProvider>
    </StrictMode>,
);
