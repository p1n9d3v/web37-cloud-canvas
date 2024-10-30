import { styled } from '@mui/material/styles';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MuiAccordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: 0,
    backgroundColor: theme.palette.grey[100],
}));

const Accordion = styled(MuiAccordion)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    [`&:before`]: {
        height: 0, // Remove the default before border
    },
    [`&:first-of-type`]: {
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
    },
    [`&:last-of-type`]: {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    },
}));

const ServiceItem = ({ title, desc }: { title: string; desc: string }) => {
    return (
        <ListItem
            sx={{
                cursor: 'pointer',
                color: 'black',
                ['&:not(:last-child)']: {
                    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
                },
                ['&:hover']: {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                },
            }}
            key={title}
        >
            <ListItemText primary={title} secondary={desc} />
        </ListItem>
    );
};

export default ({
    title,
    items,
}: {
    title: string;
    items: Array<{
        title: string;
        desc: string;
    }>;
}) => {
    return (
        <Accordion elevation={0} disableGutters>
            <AccordionSummary
                expandIcon={
                    <ExpandMoreIcon
                        sx={{
                            color: 'white',
                        }}
                    />
                }
            >
                <Typography
                    sx={{
                        textTransform: 'capitalize',
                    }}
                >
                    {title}
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <List
                    sx={{
                        overflow: 'hidden',
                        padding: 0,
                    }}
                >
                    {items.map((item, index) => (
                        <ServiceItem
                            key={`${title}-${index}`}
                            title={item.title}
                            desc={item.desc}
                        />
                    ))}
                </List>
            </AccordionDetails>
        </Accordion>
    );
};
