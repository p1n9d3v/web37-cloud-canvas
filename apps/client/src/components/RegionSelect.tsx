import { ListItemIcon, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Popover from '@mui/material/Popover';
import { useState } from 'react';

type Props = {
    value: string;
};

const REGION_OPTIONS = [
    {
        value: 'kr',
        label: 'Korea',
    },
    {
        value: 'jp',
        label: 'Japan',
    },
    {
        value: 'sg',
        label: 'Singapore',
    },
];

export default ({ value }: Props) => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const [region, setRegion] = useState(value || 'NONE');

    const handlePopoverOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const handleListItemClick = (value: string) => {
        setRegion(
            REGION_OPTIONS.find((option) => option.value === value)!.label,
        );
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'region' : undefined;

    return (
        <Box>
            <Box>
                <Typography
                    variant="subtitle2"
                    sx={{
                        textAlign: 'center',
                        fontWeight: 'bold',
                    }}
                >
                    Region
                </Typography>
                <Button onClick={handlePopoverOpen} variant="text">
                    {region}
                </Button>
            </Box>

            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handlePopoverClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <List component="nav">
                    {REGION_OPTIONS.map((option) => (
                        <ListItemButton
                            key={option.value}
                            selected={region === option.value}
                            onClick={() => handleListItemClick(option.value)}
                        >
                            <ListItemIcon>
                                <img
                                    src={`assets/${option.value.toUpperCase()}.svg`}
                                    alt="flag"
                                />
                            </ListItemIcon>
                            <ListItemText primary={option.label} />
                        </ListItemButton>
                    ))}
                </List>
            </Popover>
        </Box>
    );
};
