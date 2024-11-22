export const NcloudFactory = (type: string) => {
    switch (type) {
        case 'server':
            return Server;
        default: {
            throw new Error(`Unknown type: ${type}`);
        }
    }
};

export const Server = {
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
    groupIds: [],
};
