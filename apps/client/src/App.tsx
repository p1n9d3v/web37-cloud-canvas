import CloudCanvas from '@/src/CloudCanvas';
import Header from '@components/Layout/Header';
import Sidebar from '@components/Layout/Sidebar';
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
                <CloudCanvas />
            </Box>
        </Box>
    );
}

export default App;
