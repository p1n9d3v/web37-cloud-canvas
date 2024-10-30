import {
    Paper,
    Input,
    IconButton,
    Divider,
    List,
    Accordion as MuiAccordion,
    AccordionSummary,
    Typography,
    AccordionDetails as MuiAccordionDetails,
    ListItem,
    ListItemText,
    Select,
    MenuItem,
    SelectChangeEvent,
    Stack,
    ListItemAvatar,
    Avatar,
} from '@mui/material';
import {
    Search as SearchIcon,
    ExpandMore as ExpandMoreIcon,
} from '@mui/icons-material';

import { styled } from '@mui/material/styles';
import { useState } from 'react';

const SERVICES = [
    {
        title: 'compute',
        items: [
            { title: 'EC2', desc: 'Virtual servers in the cloud' },
            {
                title: 'Lambda',
                desc: 'Run code without thinking about servers',
            },
        ],
    },
    {
        title: 'container',
        items: [
            { title: 'ECS', desc: 'Highly scalable container service' },
            { title: 'EKS', desc: 'Managed Kubernetes service' },
        ],
    },
    {
        title: 'storage',
        items: [
            { title: 'S3', desc: 'Scalable storage in the cloud' },
            { title: 'EBS', desc: 'Block storage for EC2' },
        ],
    },
    {
        title: 'database',
        items: [
            { title: 'RDS', desc: 'Managed relational database service' },
            { title: 'DynamoDB', desc: 'NoSQL database service' },
        ],
    },
    {
        title: 'networking',
        items: [
            { title: 'VPC', desc: 'Virtual private cloud' },
            { title: 'CloudFront', desc: 'Content delivery network' },
        ],
    },
    {
        title: 'security',
        items: [
            { title: 'IAM', desc: 'Identity and access management' },
            { title: 'KMS', desc: 'Key management service' },
        ],
    },
    {
        title: 'ai services',
        items: [
            { title: 'Rekognition', desc: 'Image and video analysis' },
            { title: 'Comprehend', desc: 'Natural language processing' },
        ],
    },
    {
        title: 'applications',
        items: [
            {
                title: 'Elastic Beanstalk',
                desc: 'Deploy and manage applications',
            },
            { title: 'App Runner', desc: 'Run containerized web applications' },
        ],
    },
    {
        title: 'blockchain',
        items: [
            {
                title: 'Managed Blockchain',
                desc: 'Create and manage blockchain networks',
            },
            { title: 'QLDB', desc: 'Ledger database service' },
        ],
    },
    {
        title: 'ai api',
        items: [
            { title: 'Lex', desc: 'Build conversational interfaces' },
            { title: 'Polly', desc: 'Text-to-speech service' },
        ],
    },
    {
        title: 'big data & analytics',
        items: [
            { title: 'EMR', desc: 'Big data processing with Hadoop' },
            { title: 'Redshift', desc: 'Data warehousing service' },
        ],
    },
];

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

const Service = ({
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

const SidebarPaper = styled(Paper)(({ theme }) => ({
    width: '100%',
    maxWidth: theme.custom.sidebarWidth,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
}));

const CLOUD_PLATFORMS = [
    {
        value: 'ncloud',
        title: 'Naver Cloud Platform',
        imgUrl: 'https://seekvectors.com/files/download/Naver-Logo-04.png',
    },
    {
        value: 'aws',
        title: 'Amazon Web Service',
        imgUrl: 'https://img.icons8.com/color/600/amazon-web-services.png',
    },
    {
        value: 'gcp',
        title: 'Google Cloud Platfor',
        imgUrl: 'https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FQ7yRI%2Fbtrbd0hgJPP%2F5f6Y6zp67DHSjn4JBEAKo1%2Fimg.png',
    },
];

const SelectCloud = ({
    platforms,
}: {
    platforms: Array<{
        value: string;
        title: string;
        imgUrl: string;
    }>;
}) => {
    const [value, setValue] = useState(platforms.at(0)!.value);
    const handleChange = (event: SelectChangeEvent) =>
        setValue(event.target.value);
    return (
        <Select
            value={value}
            onChange={handleChange}
            fullWidth
            sx={{
                [`& .MuiSelect-select`]: {
                    px: 1.5,
                    py: 1,
                },
            }}
        >
            {platforms.map(({ value, title, imgUrl }) => (
                <MenuItem value={value}>
                    <ListItem sx={{ p: 0 }}>
                        <ListItemAvatar>
                            <Avatar alt="aws" src={imgUrl} />
                        </ListItemAvatar>
                        <ListItemText primary={title} />
                    </ListItem>
                </MenuItem>
            ))}
        </Select>
    );
};

export default () => {
    return (
        <SidebarPaper elevation={1}>
            <Stack
                spacing={2}
                sx={{
                    p: 1,
                }}
            >
                <SelectCloud platforms={CLOUD_PLATFORMS} />
                <Divider />
                <Input
                    fullWidth
                    placeholder="Search services"
                    endAdornment={
                        <IconButton>
                            <SearchIcon />
                        </IconButton>
                    }
                />
            </Stack>
            <List
                sx={{
                    flex: 1,
                    padding: 0,
                    overflow: 'auto',
                }}
            >
                {SERVICES.map((service) => (
                    <Service
                        key={service.title}
                        title={service.title}
                        items={service.items}
                    />
                ))}
            </List>
        </SidebarPaper>
    );
};
