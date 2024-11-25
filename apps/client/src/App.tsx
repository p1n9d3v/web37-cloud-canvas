import CloudGraph from '@/src/CloudGraph';
import Header from '@components/Layout/Header';
import Sidebar from '@components/Layout/Sidebar';
import RegionSelect from '@components/RegionSelect';
import VpcSelect from '@components/VpcSelect';
import { Divider } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import useNCloud from '@hooks/useNCloud';

const PropertiesBar = () => {
    const { openCloudAppbar } = useNCloud();
    return (
        <AppBar
            position="fixed"
            className="graph-ignore-select"
            color="default"
            sx={{
                top: 80,
                left: 320,
                right: 0,
                borderRadius: '20px',
                maxWidth: 'min-content',
                display: openCloudAppbar ? 'block' : 'none',
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
                <Stack
                    direction="row"
                    divider={<Divider orientation="vertical" flexItem />}
                    spacing={2}
                >
                    <RegionSelect />
                    <VpcSelect />
                </Stack>
            </Toolbar>
        </AppBar>
    );
};

function App() {
    return (
        <>
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

            <PropertiesBar />
        </>
    );
}

export default App;
