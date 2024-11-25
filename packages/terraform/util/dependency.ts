import { CloudCanvasNode } from '../interface/CloudCanvasNode';

export const createVpcDependency = (properties: any): CloudCanvasNode => ({
    id: `vpc-${properties.vpcName}`,
    type: 'VPC',
    name: properties.vpcName,
    properties: {
        cidrBlock: properties.vpcCidr || '172.16.0.0/16',
        region: properties.region,
    },
});

export const createSubnetDependency = (properties: any, resourceType: string): CloudCanvasNode => ({
    id: `subnet-${properties.subnetName}`,
    type: 'Subnet',
    name: properties.subnetName,
    properties: {
        subnet: properties.subnetCidr || '172.16.10.0/24',
        zone: properties.zone || getZoneByRegion(properties.region),
        subnetType: properties.subnetType || 'PUBLIC',
        usageType: properties.usageType || getUsageTypeByResourceType(resourceType),
        vpcName: properties.vpcName,
        region: properties.region,
    },
});

export const createAcgDependencies = (
    properties: any,
    nodeName: string,
): CloudCanvasNode[] => [
    {
        id: `acg-${properties.acgName}`,
        type: 'ACG',
        name: properties.acgName,
        properties: {
            description: `Security group for ${nodeName}`,
            vpcName: properties.vpcName,
            region: properties.region,
        },
    },
    {
        id: `acgrule-${properties.acgName}`,
        type: 'ACGRule',
        name: `${properties.acgName}-rule`,
        properties: {
            acgName: properties.acgName,
            protocol: 'TCP',
            ip_block: '0.0.0.0/0',
            port_range: '22',
            description: 'SSH access',
            region: properties.region,
        },
    },
];

export const createNicDependency = (properties: any): CloudCanvasNode => ({
    id: `nic-${properties.nicName}`,
    type: 'NetworkInterface',
    name: properties.nicName,
    properties: {
        subnetName: properties.subnetName,
        acgName: properties.acgName,
        region: properties.region,
    },
});

export const createLoginKeyDependency = (properties: any): CloudCanvasNode => ({
    id: `loginkey-${properties.loginKeyName}`,
    type: 'LoginKey',
    name: properties.loginKeyName,
    properties: {
        region: properties.region,
    },
});

const getZoneByRegion = (region: string): string => {
    switch (region) {
        case 'KR':
            return 'KR-2';
        case 'JPN':
            return 'JPN-4';
        case 'SGN':
            return 'SGN-4';
        default:
            return 'KR-2';
    }
};

const getUsageTypeByResourceType = (type: string): 'GEN' | 'LOADB' | 'BM' | 'NATGW' => {
    switch (type.toLowerCase()) {
        case 'loadbalancer':
            return 'LOADB';
        case 'natgateway':
            return 'NATGW';
        case 'baremetal':
            return 'BM';
        default:
            return 'GEN';
    }
};

