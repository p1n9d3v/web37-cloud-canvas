import { useDimensionContext } from '@contexts/DimensionContext';
import { useNodeContext } from '@contexts/NodeContext';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import GitHubIcon from '@mui/icons-material/GitHub';
import LightModeIcon from '@mui/icons-material/LightMode';
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import { Button, ToggleButton, ToggleButtonGroup } from '@mui/material';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import { styled, useColorScheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { TerraformConvertor } from 'node_modules/terraform/convertor/TerraformConvertor';

const StyledBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
}));

const GITHUB_URL = 'https://github.com/boostcampwm-2024/web37-cloud-canvas';
const NOTION_URL =
    'https://pleasant-muenster-8f5.notion.site/Boostcamp-Web37-cloud-canvas-12a389341f0a806dbb98d597fd7b4e52?pvs=4';

const StyledIconButton = styled(IconButton)(({ theme }) => ({
    borderRadius: '12px',
    border: `1px solid ${theme.palette.divider}`,
    scale: 0.8,
    [`&:hover`]: {
        border: `1px solid ${theme.palette.primary.main}`,
        color: theme.palette.primary.main,
        transition: 'border 0.3s linear',
    },
}));

export default () => {
    const { mode: themeMode, setMode: setThemeMode } = useColorScheme();
    const { dimension, toggleDimension } = useDimensionContext();

    const {
        state: { nodes },
    } = useNodeContext();

    const Converter = new TerraformConvertor();

    const validateProperties = (node: any) => {
        const { properties } = node;
        const isValid = Object.values(properties).every((value) => {
            return value !== '';
        });

        return isValid;
    };
    // if (Object.values(nodes).length > 0) {
    //     const node = Object.values(nodes)[0];
    //     console.log(node);
    //     if (validateProperties(node)) {
    //         Converter.addResourceFromJson(node);
    //         console.log(Converter.generate());
    //     }
    // }

    const handleToggleTheme = () =>
        setThemeMode(themeMode === 'dark' ? 'light' : 'dark');

    const openWindow = (url: string) => window.open(url, '_blank')?.focus();

    return (
        <StyledBox>
            <Stack>
                <Typography variant="h6" textTransform="uppercase">
                    Cloud Canvas
                </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
                <Button>Converter</Button>
                <ToggleButtonGroup
                    value={dimension}
                    exclusive
                    onChange={toggleDimension}
                    sx={{
                        height: '38px',
                    }}
                >
                    <ToggleButton value="2d">2D</ToggleButton>
                    <ToggleButton value="3d">3D</ToggleButton>
                </ToggleButtonGroup>
                <ButtonGroup>
                    <StyledIconButton onClick={() => openWindow(GITHUB_URL)}>
                        <GitHubIcon />
                    </StyledIconButton>
                    <Divider orientation="vertical" variant="middle" flexItem />
                    <StyledIconButton onClick={() => openWindow(NOTION_URL)}>
                        <ManageHistoryIcon />
                    </StyledIconButton>
                    <Divider orientation="vertical" variant="middle" flexItem />
                    <StyledIconButton onClick={handleToggleTheme}>
                        {themeMode === 'dark' ? (
                            <DarkModeIcon />
                        ) : (
                            <LightModeIcon />
                        )}
                    </StyledIconButton>
                </ButtonGroup>
            </Stack>
        </StyledBox>
    );
};
