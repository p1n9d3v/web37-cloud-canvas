import Graph from '@components/Graph';
import GridBackground from '@components/GridBackground';
import Header from '@components/Header';
import Node from '@components/Node';
import Sidebar from '@components/Sidebar';
import { useCanvasInstanceContext } from '@contexts/CanvasInstanceContext';
import Box from '@mui/material/Box';

function App() {
    const {
        state: { nodes },
    } = useCanvasInstanceContext();
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
