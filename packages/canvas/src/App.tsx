import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import GitHubIcon from '@mui/icons-material/GitHub';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import IconButton from '@mui/material/IconButton';
import Sidebar from './components/Sidebar';

const Header = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                py: 1,
                px: 2,
                borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
            }}
        >
            <Stack>
                <Typography variant="h5">Cloud Canvas</Typography>
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center">
                <IconButton>
                    <GitHubIcon />
                </IconButton>
                <IconButton>
                    <NightsStayIcon />
                </IconButton>
                <Avatar
                    alt="Remy Sharp"
                    src="https://avatars.githubusercontent.com/u/152015839?s=40&v=4"
                />
            </Stack>
        </Box>
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
                }}
            >
                <Header />
            </Box>
        </Box>
    );
}

export default App;
