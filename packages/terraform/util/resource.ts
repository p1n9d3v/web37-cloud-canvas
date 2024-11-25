import { CloudCanvasNode } from '../interface/CloudCanvasNode';
import {
    createAcgDependencies,
    createLoginKeyDependency,
    createNicDependency,
    createSubnetDependency,
    createVpcDependency,
} from './dependency';

export const processDependencies = (
    node: CloudCanvasNode,
): CloudCanvasNode[] => {
    if (!['server', 'loadbalancer', 'mysql'].includes(node.type.toLowerCase()))
        return [];

    const dependencies: CloudCanvasNode[] = [];
    const { properties } = node;

    if (properties.vpcName) {
        dependencies.push(createVpcDependency(properties));
    }
    if (properties.subnetName) {
        dependencies.push(createSubnetDependency(properties, node.type));
    }
    if (properties.acgName) {
        dependencies.push(...createAcgDependencies(properties, node.name));
    }

    if (node.type.toLowerCase() === 'server') {
        if (properties.nicName) {
            dependencies.push(createNicDependency(properties));
        }
        if (properties.loginKeyName) {
            dependencies.push(createLoginKeyDependency(properties));
        }
    }

    return dependencies;
};

export const processNodes = (nodes: CloudCanvasNode[]): CloudCanvasNode[] =>
    nodes.reduce(
        (acc: CloudCanvasNode[], node) => [
            ...acc,
            ...processDependencies(node),
            node,
        ],
        [],
    );
