import useNCloud from '@hooks/useNCloud';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { useState } from 'react';

type Props = {
    vpc: string;
    vpcList: { [id: string]: string };
    onUpdateVpc: (vpc: string) => void;
};

export default ({ vpc, vpcList, onUpdateVpc }: Props) => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handlePopoverOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(e.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const handleListItemClick = (value: string) => {
        onUpdateVpc(value);
        setAnchorEl(null);
    };

    const handleAddVPC = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const vpc = e.currentTarget.vpc.value;
        if (vpc) {
            onUpdateVpc(vpc);
        }
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
                    VPC
                </Typography>
                <Button
                    onClick={handlePopoverOpen}
                    variant="text"
                    type="submit"
                    disableRipple
                >
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
                        onKeyDown={(e) => e.stopPropagation()}
                        endAdornment={
                            <IconButton>
                                <SearchIcon />
                            </IconButton>
                        }
                    />
                </form>
                <List component="nav">
                    {Object.entries(vpcList).map(([id, value]) => (
                        <ListItemButton
                            key={id}
                            selected={vpc === value}
                            onClick={() => handleListItemClick(value as string)}
                        >
                            <ListItemText primary={value} />
                        </ListItemButton>
                    ))}
                </List>
            </Popover>
        </Box>
    );
};
