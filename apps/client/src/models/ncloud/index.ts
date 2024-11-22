export const NcloudFactory = (type: string) => {
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

const Server = {
    id: '',
    name: '',
    type: 'server',
    point: { x: 0, y: 0 },
    size: {
        '2d': { width: 90, height: 90 },
        '3d': { width: 128, height: 111 },
    },
    properties: {
        os: '',
        vpc: '',
        subnet: '',
        spec: '',
        ip: '',
    },
    connectors: {},
    groupIds: [],
};

const CloudFunction = {
    id: '',
    type: 'cloud-function',
    name: '',
    point: { x: 0, y: 0 },
    size: {
        '2d': { width: 90, height: 90 },
        '3d': { width: 96, height: 113.438, offset: 10 },
    },
    properties: {
        vpc: '',
        subnet: '',
        spec: '',
    },
    groupIds: [],
    connectors: {},
};

const MySQLDB = {
    id: '',
    type: 'db-mysql',
    name: '',
    point: { x: 0, y: 0 },
    size: {
        '2d': { width: 90, height: 90 },
        '3d': { width: 128, height: 137.5 },
    },
    properties: {
        vpc: '',
        subnet: '',
        spec: '',
    },
    groupIds: [],
    connectors: {},
};
