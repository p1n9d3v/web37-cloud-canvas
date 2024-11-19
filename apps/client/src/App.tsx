import Graph from '@components/Graph';
import GridBackground from '@components/GridBackground';
import Header from '@components/Header';
import Sidebar from '@components/Sidebar';
import Box from '@mui/material/Box';
import { useState } from 'react';

function App() {
    const [groups, setGroups] = useState<{ [id: string]: any }>({
        // region1: regionGroup,
        // vpc1: vpcGroup,
        // subnet1: subnetGroup,
    });
    const [nodes, setNodes] = useState<{ [id: string]: any }>({});

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
                </Graph>
            </Box>
        </Box>
    );
}

export default App;
