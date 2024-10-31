import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Input from '@mui/material/Input';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import List from '@mui/material/List';

import { MOCK_SERVICES } from '@/mocks';
import Service from '@components/Sidebar/Service';
import SelectPlatform from '@components/Sidebar/SelectPlatform';

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

const SidebarPaper = styled(Paper)(({ theme }) => ({
    width: '100%',
    maxWidth: theme.custom.sidebarWidth,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
}));

export default () => {
    return (
        <SidebarPaper elevation={1}>
            <Stack
                spacing={2}
                sx={{
                    p: 1,
                }}
            >
                <SelectPlatform platforms={CLOUD_PLATFORMS} />
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
                {MOCK_SERVICES.map((service) => (
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
