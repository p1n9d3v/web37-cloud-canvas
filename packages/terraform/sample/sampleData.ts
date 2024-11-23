import { CloudCanvasNode } from '../interface/CloudCanvasNode';

export const sampleNodes: CloudCanvasNode[] = [
    {
        id: 'vpc1',
        type: 'VPC',
        name: 'my-vpc',
        properties: {
            cidrBlock: '172.16.0.0/16',
        },
    },
    {
        id: 'nacl1',
        type: 'NetworkACL',
        name: 'my-nacl',
        properties: {},
    },
    {
        id: 'subnet1',
        type: 'Subnet',
        name: 'my-subnet',
        properties: {
            subnet: '172.16.10.0/24',
            zone: 'KR-2',
            subnetType: 'PUBLIC',
            usageType: 'GEN',
        },
    },
    {
        id: 'acg1',
        type: 'ACG',
        name: 'my-acg',
        properties: {
            description: 'My ACG',
        },
    },
    {
        id: 'acgrule1',
        type: 'ACGRule',
        name: '',
        properties: {
            protocol: 'TCP',
            ipBlock: '0.0.0.0/0',
            portRange: '80',
            description: 'HTTP',
        },
    },
    {
        id: 'loginkey1',
        type: 'LoginKey',
        name: 'my-key',
        properties: {},
    },
    {
        id: 'nic1',
        type: 'NetworkInterface',
        name: 'my-nic',
        properties: {},
    },
    {
        id: 'server1',
        type: 'Server',
        name: 'my-server',
        properties: {
            serverImageProductCode: 'SW.VSVR.OS.LNX64.CNTOS.0708.B050',
            serverProductCode: 'SVR.VSVR.HICPU.C002.M004.NET.HDD.B050.G002',
        },
    },
    {
        id: 'publicip1',
        type: 'PublicIP',
        name: 'my-public-ip',
        properties: {},
    },
    {
        id: 'lb1',
        type: 'LoadBalancer',
        name: 'my-lb',
        properties: {
            type: 'APPLICATION',
            networkType: 'PUBLIC',
            throughputType: 'SMALL',
            description: 'My Load Balancer',
        },
    },
    {
        id: 'lc1',
        type: 'LaunchConfiguration',
        name: 'my-lc',
        properties: {
            serverImageProductCode: 'SW.VSVR.OS.LNX64.CNTOS.0703.B050',
            serverProductCode: 'SVR.VSVR.HICPU.C002.M004.NET.SSD.B050.G002',
            loginKeyName: 'my-key',
            isEncryptedVolume: false,
        },
    },
    {
        id: 'mysql1',
        type: 'MySQL',
        name: 'my-mysql',
        properties: {
            serverNamePrefix: 'mysql',
            userName: 'admin',
            userPassword: 'Password1!',
            hostIp: '192.168.0.1',
            databaseName: 'mydb',
        },
    },
];
