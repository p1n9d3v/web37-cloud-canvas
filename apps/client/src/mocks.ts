import { nanoid } from 'nanoid';

const CloudFunctionNode = {
    id: `node-${nanoid()}`,
    type: 'cloud-function',
    name: 'CloudFunction1',
    point: { x: 90, y: 90 },
    size: {
        d2: { width: 90, height: 90 },
        d3: { width: 96, height: 113.438, offset: 10 },
    },
    properties: {
        vpc: 'vpc1',
        subnet: 'subnet1',
        spec: 's2-g2-s50',
    },
    groupIds: ['region1'],
    connectors: [],
};
const ObjectStorageNode = {
    id: `node-${nanoid()}`,
    type: 'object-storage',
    name: 'ObjectStorage1',
    point: { x: 100, y: 0 },
    size: {
        d2: { width: 90, height: 90 },
        d3: { width: 100.626, height: 115.695, offset: 20 },
    },
    properties: {
        vpc: 'vpc1',
        subnet: 'subnet1',
        spec: 's2-g2-s50',
    },
    groupIds: [],
    connectors: [],
};
const MySQLDBNode = {
    id: `node-${nanoid()}`,
    type: 'db-mysql',
    name: 'MySQLDB1',
    point: { x: 0, y: 0 },
    size: {
        d2: { width: 90, height: 90 },
        d3: { width: 128, height: 137.5 },
    },
    properties: {
        vpc: 'vpc1',
        subnet: 'subnet1',
        spec: 's2-g2-s50',
    },
    groupIds: ['region1'],
    connectors: [],
};
const ServerNode = {
    id: `node-${nanoid()}`,
    type: 'server',
    name: 'WebServer1',
    point: { x: 90, y: 90 },
    size: {
        d2: { width: 90, height: 90 },
        d3: { width: 128, height: 111 },
    },
    properties: {
        os: 'Ubuntu 20.04',
        vpc: 'vpc1',
        subnet: 'subnet1',
        spec: 's2-g2-s50',
        ip: '192.168.0.2',
    },
    connectors: [],
    groupIds: ['region1'],
};

const regionGroup: any = {
    id: 'region1',
    type: 'region',
    name: 'KR-1',
    nodeIds: [ServerNode.id, MySQLDBNode.id, CloudFunctionNode.id],
    groupIds: ['vpc1'], // 아직 VPC 그룹이 없음
    bounds: { x: 0, y: 0, width: 600, height: 450 },
    properties: {
        regionCode: 'KR-1',
    },
};

const mockNodes = [
    CloudFunctionNode,
    // ObjectStorageNode,
    // MySQLDBNode,
    MySQLDBNode,
    ServerNode,
];

const mockGroups = [regionGroup];

export const initialState = {
    nodes: mockNodes.reduce((acc, node) => ({ ...acc, [node.id]: node }), {}),
    groups: mockGroups.reduce(
        (acc, group) => ({ ...acc, [group.id]: group }),
        {},
    ),
};
