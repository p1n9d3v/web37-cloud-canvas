import { Group, Node } from '@types';

export const NcloudNodeFactory = (type: string) => {
    switch (type) {
        case 'server':
            return Server;
        case 'cloud-function':
            return CloudFunction;
        case 'db-mysql':
            return MySQLDB;
        default: {
            throw new Error(`Unknown type: ${type}`);
        }
    }
};

export const NcloudGroupFactory = (type: string) => {
    switch (type) {
        case 'region':
            return Region;
        case 'vpc':
            return Vpc;
        case 'subnet':
            return Subnet;

        default: {
            throw new Error(`Unknown type: ${type}`);
        }
    }
};

const Server: Node = {
    id: '',
    name: '',
    type: 'server',
    point: { x: 0, y: 0 },
    size: {
        '2d': { width: 90, height: 90 },
        '3d': { width: 128, height: 111 },
    },
    properties: {
        region: '',
        subnet: '',
        vpc: '',
    },
    connectors: {},
};

const CloudFunction: Node = {
    id: '',
    type: 'cloud-function',
    name: '',
    point: { x: 0, y: 0 },
    size: {
        '2d': { width: 90, height: 90 },
        '3d': { width: 96, height: 113.438, offset: 10 },
    },
    properties: {
        region: '',
        vpc: '',
        subnet: '',
    },
    connectors: {},
};

const MySQLDB: Node = {
    id: '',
    type: 'db-mysql',
    name: '',
    point: { x: 0, y: 0 },
    size: {
        '2d': { width: 90, height: 90 },
        '3d': { width: 128, height: 137.5 },
    },
    properties: {
        region: '',
        vpc: '',
        subnet: '',
    },
    connectors: {},
};

const Region: Group = {
    id: '',
    type: 'region',
    name: '',
    nodeIds: [],
    properties: {},
    childGroupIds: [],
};

const Vpc: Group = {
    id: '',
    type: 'vpc',
    name: '',
    nodeIds: [],
    properties: {},
    childGroupIds: [],
};

const Subnet: Group = {
    id: '',
    type: 'subnet',
    name: '',
    nodeIds: [],
    properties: {},
    childGroupIds: [],
};

export const Regions: { [key: string]: string } = {
    kr: 'korea',
    jp: 'japan',
    sg: 'singapore',
};
