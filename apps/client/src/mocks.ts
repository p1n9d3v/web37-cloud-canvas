import { Group } from '@types';
import { nanoid } from 'nanoid';

const CloudFunctionNode = {
    id: `node-${nanoid()}`,
    type: 'cloud-function',
    name: 'CloudFunction1',
    point: { x: 270, y: 270 },
    size: {
        '2d': { width: 90, height: 90 },
        '3d': { width: 96, height: 113.438, offset: 10 },
    },
    properties: {
        vpc: 'vpc1',
        subnet: 'subnet1',
        spec: 's2-g2-s50',
    },
    groupIds: ['region1', 'vpc1'],
    connectors: [],
};
const ObjectStorageNode = {
    id: `node-${nanoid()}`,
    type: 'object-storage',
    name: 'ObjectStorage1',
    point: { x: 100, y: 0 },
    size: {
        '2d': { width: 90, height: 90 },
        '3d': { width: 100.626, height: 115.695, offset: 20 },
    },
    properties: {
        vpc: 'vpc1',
        subnet: 'subnet1',
        spec: 's2-g2-s50',
    },
    groupIds: ['sg1', 'subnet1', 'region1'],
    connectors: [],
};
const MySQLDBNode = {
    id: `node-${nanoid()}`,
    type: 'db-mysql',
    name: 'MySQLDB1',
    point: { x: 0, y: 0 },
    size: {
        '2d': { width: 90, height: 90 },
        '3d': { width: 128, height: 137.5 },
    },
    properties: {
        vpc: 'vpc1',
        subnet: 'subnet1',
        spec: 's2-g2-s50',
    },
    groupIds: ['region1', 'subnet1'],
    connectors: [],
};
const ServerNode = {
    id: `node-${nanoid()}`,
    type: 'server',
    name: 'WebServer1',
    point: { x: 90, y: 90 },
    size: {
        '2d': { width: 90, height: 90 },
        '3d': { width: 128, height: 111 },
    },
    properties: {
        os: 'Ubuntu 20.04',
        vpc: 'vpc1',
        subnet: 'subnet1',
        spec: 's2-g2-s50',
        ip: '192.168.0.2',
    },
    connectors: [],
    groupIds: ['subnet1', 'region1', 'vpc1'],
};

const regionGroup: Group = {
    id: 'region1',
    type: 'region',
    name: 'KR-1',
    nodeIds: [
        MySQLDBNode.id,
        CloudFunctionNode.id,
        ServerNode.id,
        ObjectStorageNode.id,
    ],
    properties: {
        regionCode: 'KR-1',
    },
};

const vpcGroup: Group = {
    id: 'vpc1',
    type: 'vpc',
    name: 'VPC-1',
    nodeIds: [CloudFunctionNode.id, ServerNode.id],
    properties: {
        cidr: '',
    },
    parentGroupId: 'region1',
};

const subnetGroup: Group = {
    id: 'subnet1',
    type: 'subnet',
    name: 'Subnet-1',
    nodeIds: [MySQLDBNode.id, ObjectStorageNode.id],
    properties: {
        cidr: '',
    },
};

const securityGroup: Group = {
    id: 'sg1',
    type: 'security-group',
    name: 'SG-1',
    nodeIds: [ObjectStorageNode.id],
    properties: {
        cidr: '',
    },
};

const mockNodes = [
    CloudFunctionNode,
    ObjectStorageNode,
    MySQLDBNode,
    MySQLDBNode,
    ServerNode,
];

const mockGroups = [regionGroup, vpcGroup, subnetGroup, securityGroup];

export const initialState = {
    nodes: mockNodes.reduce((acc, node) => ({ ...acc, [node.id]: node }), {}),
    groups: mockGroups.reduce(
        (acc, group) => ({ ...acc, [group.id]: group }),
        {},
    ),
    edges: {},
};
