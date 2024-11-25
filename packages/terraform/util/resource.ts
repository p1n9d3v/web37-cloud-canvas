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
    if (node.type.toLowerCase() !== 'server') return [];

    const dependencies: CloudCanvasNode[] = [];
    const { properties } = node;

    if (properties.vpcName) {
        dependencies.push(createVpcDependency(properties));
    }
    if (properties.subnetName) {
        dependencies.push(createSubnetDependency(properties));
    }
    if (properties.acgName) {
        dependencies.push(...createAcgDependencies(properties, node.name));
    }
    if (properties.nicName) {
        dependencies.push(createNicDependency(properties));
    }
    if (properties.loginKeyName) {
        dependencies.push(createLoginKeyDependency(properties));
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
