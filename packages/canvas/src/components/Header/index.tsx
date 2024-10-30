import DarkModeIcon from '@mui/icons-material/DarkMode';
import GitHubIcon from '@mui/icons-material/GitHub';
import LightModeIcon from '@mui/icons-material/LightMode';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import { useColorScheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

export default () => {
    const { mode: themeMode, setMode: setThemeMode } = useColorScheme();

    const handleToggleTheme = () =>
        setThemeMode(themeMode === 'dark' ? 'light' : 'dark');

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
            <Stack direction="row" spacing={0.5} alignItems="center">
                <IconButton>
                    <GitHubIcon />
                </IconButton>
                <IconButton onClick={handleToggleTheme}>
                    {themeMode === 'dark' ? (
                        <DarkModeIcon />
                    ) : (
                        <LightModeIcon />
                    )}
                </IconButton>
                <Avatar
                    alt="Remy Sharp"
                    src="https://avatars.githubusercontent.com/u/152015839?s=40&v=4"
                />
            </Stack>
        </Box>
    );
};
