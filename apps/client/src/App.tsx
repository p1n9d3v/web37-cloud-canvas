import CloudFlow from '@cloudflow/CloudFlow';
import Header from '@components/Header';
import Sidebar from '@components/Sidebar';
import Box from '@mui/material/Box';

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
                <CloudFlow />
            </Box>
        </Box>
    );
}

export default App;
