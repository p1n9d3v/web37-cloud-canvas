import { Group, Node } from '@types';
import { nanoid } from 'nanoid';

const CloudFunctionNode: Node = {
    id: `node-${nanoid()}`,
    type: 'cloud-function',
    point: { x: 270, y: 270 },
    size: {
        '2d': { width: 90, height: 90 },
        '3d': { width: 96, height: 113.438, offset: 10 },
    },
    properties: {
        vpc: '',
        subnet: '',
        region: '',
    },
    connectors: {},
};
const ObjectStorageNode: Node = {
    id: `node-${nanoid()}`,
    type: 'object-storage',
    point: { x: 100, y: 0 },
    size: {
        '2d': { width: 90, height: 90 },
        '3d': { width: 100.626, height: 115.695, offset: 20 },
    },
    properties: {
        vpc: '',
        subnet: '',
        region: '',
    },
    connectors: {},
};
const MySQLDBNode: Node = {
    id: `node-${nanoid()}`,
    type: 'db-mysql',
    point: { x: 0, y: 0 },
    size: {
        '2d': { width: 90, height: 90 },
        '3d': { width: 128, height: 137.5 },
    },
    properties: {
        vpc: '',
        subnet: '',
        region: '',
    },
    connectors: {},
};
const ServerNode: Node = {
    id: `node-${nanoid()}`,
    type: 'server',
    point: { x: 90, y: 90 },
    size: {
        '2d': { width: 90, height: 90 },
        '3d': { width: 128, height: 111 },
    },
    properties: {
        vpc: '',
        subnet: '',
        region: '',
    },
    connectors: {},
};

const ServerNode2: Node = {
    id: `node-${nanoid()}`,
    type: 'server',
    point: { x: 90, y: 90 },
    size: {
        '2d': { width: 90, height: 90 },
        '3d': { width: 128, height: 111 },
    },
    properties: {
        vpc: '',
        subnet: '',
        region: '',
    },
    connectors: {},
};

const SubnetGroup: Group = {
    id: 'subnet1',
    type: 'subnet',
    nodeIds: [ServerNode.id, MySQLDBNode.id, ObjectStorageNode.id],
    properties: {
        cidr: '',
    },

    childGroupIds: [],
    parentGroupId: '',
};

const VpcGroup: Group = {
    id: 'vpc1',
    type: 'vpc',
    nodeIds: [CloudFunctionNode.id],
    properties: {
        cidr: '',
    },
    childGroupIds: [SubnetGroup.id],
    parentGroupId: '',
};

const RegionGroup: Group = {
    id: 'seoul',
    type: 'region',
    nodeIds: [],
    properties: {
        regionCode: 'KR-1',
    },
    childGroupIds: [VpcGroup.id],
    parentGroupId: '',
};

const mockNodes = [
    ServerNode,
    CloudFunctionNode,
    MySQLDBNode,
    ObjectStorageNode,
];

const mockGroups = [RegionGroup, VpcGroup, SubnetGroup];

mockGroups.forEach((group) => {
    // set properties for each group
    group.nodeIds.forEach((nodeId: string) => {
        const node = mockNodes.find((n) => n.id === nodeId);
        if (node) {
            node.properties[group.type] = group.id;
        }
    });
});

export const mockInitialState = {
    nodes: mockNodes.reduce((acc, node) => ({ ...acc, [node.id]: node }), {}),
    groups: mockGroups.reduce(
        (acc, group) => ({ ...acc, [group.id]: group }),
        {},
    ),
    edges: {},
};
