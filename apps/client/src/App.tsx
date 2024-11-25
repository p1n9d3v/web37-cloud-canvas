import CloudGraph from '@/src/CloudGraph';
import Header from '@components/Layout/Header';
import Sidebar from '@components/Layout/Sidebar';
import RegionSelect from '@components/RegionSelect';
import { Divider } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const PropertiesBar = () => {
    return (
        <AppBar
            position="absolute"
            color="default"
            sx={{
                top: 10,
                left: 10,
                right: 0,
                borderRadius: '20px',
                maxWidth: 'min-content',
            }}
        >
            <Toolbar
                sx={{
                    display: 'flex',
                    gap: 2,
                    paddingY: 2,
                }}
            >
                {' '}
                <Typography
                    variant="h6"
                    component="div"
                    sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                >
                    Server
                </Typography>
                <Divider orientation="vertical" flexItem />
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <RegionSelect value="" />
                </Box>
            </Toolbar>
        </AppBar>
    );
};

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
                <Box
                    sx={{
                        position: 'relative',
                    }}
                >
                    <PropertiesBar />
                    <CloudGraph />
                </Box>
            </Box>
        </Box>
    );
}

export default App;
