import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { styled } from '@mui/material/styles';

const StyledServiceItem = styled(ListItem)(({ theme }) => ({
    cursor: 'pointer',
    ['&:not(:last-child)']: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    ['&:hover']: {
        backgroundColor: theme.palette.action.hover,
    },
}));

const StyledServiceItemText = styled(ListItemText)(({ theme }) => ({
    [`& .MuiListItemText-primary `]: {
        color: theme.palette.text.primary,
    },
}));

export default ({ title, desc }: { title: string; desc: string }) => {
    return (
        <StyledServiceItem key={title}>
            <StyledServiceItemText primary={title} secondary={desc} />
        </StyledServiceItem>
    );
};
