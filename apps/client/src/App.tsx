import Graph from '@components/Graph';
import GridBackground from '@components/GridBackground';
import Header from '@components/Header';
import Node from '@components/Node';
import Sidebar from '@components/Sidebar';
import { useGraphInstanceContext } from '@contexts/GraphInstanceContext';
import Box from '@mui/material/Box';
import { Node as NodeType } from '@types';
import { useState } from 'react';

function App() {
    const {
        state: { nodes },
    } = useGraphInstanceContext();
    return (
        <Box
            sx={{
                height: '100%',
                display: 'flex',
            }}
        >
            <Sidebar />
            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                }}
            >
                <Header />
                <Graph>
                    <GridBackground />
                    {Object.values(nodes).map((node) => (
                        <Node node={node} />
                    ))}
                </Graph>
            </Box>
        </Box>
    );
}

export default App;
