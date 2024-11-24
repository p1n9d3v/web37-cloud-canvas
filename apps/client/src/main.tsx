import { CanvasProvider } from '@contexts/CanvasContext.tsx';
import { CanvasDimensionProvider } from '@contexts/CanvasDimensionContext.tsx';
import { CanvasInstanceProvider } from '@contexts/CanvasInstanceContext';
import { DimensionProvider } from '@contexts/DimensionContext';
import { EdgeProvider } from '@contexts/EdgeContext/index.tsx';
import { GraphProvider } from '@contexts/GraphConetxt';
import { GroupProvider } from '@contexts/GroupContext/index.tsx';
import { NodeProvider } from '@contexts/NodeContext/index.tsx';
import { SvgProvider } from '@contexts/SvgContext.tsx';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from '@theme';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { SelectionProvider } from '@contexts/SelectionContext/index.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider theme={theme} defaultMode="light">
            <CssBaseline />
            <SvgProvider>
                <DimensionProvider>
                    <GraphProvider>
                        <GroupProvider>
                            <NodeProvider>
                                <EdgeProvider>
                                    <SelectionProvider>
                                        <CanvasDimensionProvider>
                                            <CanvasProvider>
                                                <CanvasInstanceProvider>
                                                    <App />
                                                </CanvasInstanceProvider>
                                            </CanvasProvider>
                                        </CanvasDimensionProvider>
                                    </SelectionProvider>
                                </EdgeProvider>
                            </NodeProvider>
                        </GroupProvider>
                    </GraphProvider>
                </DimensionProvider>
            </SvgProvider>
        </ThemeProvider>
    </StrictMode>,
);
