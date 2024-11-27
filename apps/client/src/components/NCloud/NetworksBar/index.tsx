import RegionSelect from '@components/NCloud/NetworksBar/RegionSelect';
import SubnetSelect from '@components/NCloud/NetworksBar/SubnetSelect';
import VpcSelect from '@components/NCloud/NetworksBar/VpcSelect';
import useNCloud from '@hooks/useNCloud';
import AppBar from '@mui/material/AppBar';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export default () => {
    const {
        selectedResource,
        region,
        subnet,
        subnetList,
        vpc,
        vpcList,
        updateVpc,
        updateRegion,
        updateSubnet,
        removeVpc,
        removeSubnet,
    } = useNCloud();

    return (
        <AppBar
            position="fixed"
            className="graph-ignore-select"
            color="default"
            sx={{
                top: 80,
                left: 320,
                right: 0,
                borderRadius: '20px',
                maxWidth: 'min-content',
                display: selectedResource ? 'block' : 'none',
            }}
        >
            <Toolbar
                sx={{
                    display: 'flex',
                    gap: 2,
                    paddingY: 2,
                }}
            >
                <Typography
                    variant="h6"
                    component="div"
                    sx={{
                        flexGrow: 1,
                        display: { xs: 'none', sm: 'block' },
                        whiteSpace: 'nowrap',
                    }}
                >
                    {selectedResource?.type.toUpperCase()}
                </Typography>
                <Divider orientation="vertical" flexItem />
                <Stack
                    direction="row"
                    divider={<ChevronRightIcon />}
                    spacing={2}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <RegionSelect
                        region={region}
                        onUpdateRegion={updateRegion}
                    />
                    {selectedResource &&
                        Object.hasOwn(selectedResource?.properties, 'vpc') && (
                            <VpcSelect
                                vpc={vpc}
                                vpcList={vpcList}
                                onUpdateVpc={updateVpc}
                                disabled={!Boolean(region)}
                                disabledRemove={Boolean(subnet)}
                                onRemoveVpc={removeVpc}
                            />
                        )}
                    {selectedResource &&
                        Object.hasOwn(
                            selectedResource?.properties,
                            'subnet',
                        ) && (
                            <SubnetSelect
                                subnet={subnet}
                                subnetList={subnetList}
                                disabled={!Boolean(vpc)}
                                // disabledRemove={!Boolean(scg)} // to be continued
                                onUpdateSubnet={updateSubnet}
                                onRemoveSubnet={removeSubnet}
                            />
                        )}
                </Stack>
            </Toolbar>
        </AppBar>
    );
};
