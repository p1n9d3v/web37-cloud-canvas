import { CloudCanvasNode } from '../interface/CloudCanvasNode';
import { NCloudModel } from '../interface/NCloudModel';
import { NCloudVPC } from '../model/NCloudVPC';
import { NCloudNetworkACL } from '../model/NCloudNetworkACL';
import { NCloudSubnet } from '../model/NCloudSubnet';
import { NCloudACG } from '../model/NCloudACG';
import { NCloudACGRule } from '../model/NCloudACGRule';
import { NCloudLoginKey } from '../model/NCloudLoginKey';
import { NCloudNetworkInterface } from '../model/NCloudNetworkInterface';
import { NCloudServer } from '../model/NCloudServer';
import { NCloudPublicIP } from '../model/NCloudPublicIP';


export function parseToNCloudModel(resource: CloudCanvasNode ): NCloudModel {
    const { type, properties } = resource;

    switch (type.toLowerCase()) {
        case 'vpc':
            return new NCloudVPC({
                name: properties.name || 'vpc',
                ipv4CidrBlock: properties.cidrBlock
            });

        case 'networkacl':
            return new NCloudNetworkACL({
                name: properties.name || 'nacl'
            });

        case 'subnet':
            return new NCloudSubnet({
                name: properties.name || 'subnet',
                subnet: properties.subnet,
                zone: properties.zone,
                subnetType: properties.subnetType,
                usageType: properties.usageType
            });

        case 'acg':
        case 'accesscontrolgroup':
            return new NCloudACG({
                name: properties.name || 'acg',
                description: properties.description
            });

        case 'acgrule':
        case 'accesscontrolgrouprule':
            return new NCloudACGRule({
                protocol: properties.protocol,
                ipBlock: properties.ipBlock,
                portRange: properties.portRange,
                description: properties.description
            });

        case 'loginkey':
            return new NCloudLoginKey({
                name: properties.name || 'login-key'
            });

        case 'networkinterface':
            return new NCloudNetworkInterface({
                name: properties.name || 'nic'
            });

        case 'server':
            return new NCloudServer({
                name: properties.name || 'server',
                serverImageProductCode: properties.serverImageProductCode,
                serverProductCode: properties.serverProductCode
            });

        case 'publicip':
            return new NCloudPublicIP({
                name: properties.name || 'public-ip'
            });

        default:
            throw new Error(`Unsupported resource type: ${type}`);
    }
}