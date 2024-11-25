import { Region } from '@types';
import SearchIcon from '@mui/icons-material/Search';
import useNCloud from '@hooks/useNCloud';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Popover from '@mui/material/Popover';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useState } from 'react';
import { FormControl } from '@mui/material';

export default () => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const { vpc, vpcList, changeVPC } = useNCloud();
    const handlePopoverOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(e.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const handleListItemClick = (value: string) => {
        changeVPC(value);
        setAnchorEl(null);
    };

    const handleAddVPC = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const vpc = e.currentTarget.vpc.value;
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'vpc' : undefined;

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
                    {vpc || <AddCircleOutlineIcon />}
                </Button>
            </Box>

            <Popover
                id={id}
                className="graph-ignore-select"
                open={open}
                anchorEl={anchorEl}
                onClose={handlePopoverClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                sx={{
                    ['& .MuiPopover-paper']: {
                        padding: 2,
                    },
                }}
            >
                <form onSubmit={handleAddVPC}>
                    <Input
                        name="vpc"
                        fullWidth
                        placeholder="Search services"
                        endAdornment={
                            <IconButton>
                                <SearchIcon />
                            </IconButton>
                        }
                    />
                </form>
                <List component="nav">
                    {vpcList.map((v) => (
                        <ListItemButton
                            key={vpc}
                            selected={vpc === v}
                            onClick={() => handleListItemClick(v as string)}
                        >
                            <ListItemText primary={v} />
                        </ListItemButton>
                    ))}
                </List>
            </Popover>
        </Box>
    );
};
