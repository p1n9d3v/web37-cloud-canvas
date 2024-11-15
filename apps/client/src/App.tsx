import Header from '@components/Header';
import Sidebar from '@components/Sidebar';
import Box from '@mui/material/Box';

import { CloudGraph } from '@cloud-graph/index';

function App() {
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
                <CloudGraph />
            </Box>
        </Box>
    );
}

export default App;
