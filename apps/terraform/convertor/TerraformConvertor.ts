import { NCloudModel } from '../interface/NCloudModel';
import { NCloudProvider } from '../model/NCloudProvider';
import { CloudCanvasNode } from '../interface/CloudCanvasNode';
import { parseToNCloudModel } from '../util/resourceParser';

export class TerraformConvertor {
    private resources: NCloudModel[];
    private provider: NCloudProvider;
    private resourceNameMap: Map<string, string>;

    constructor(provider: NCloudProvider) {
        this.provider = provider;
        this.resources = [];
        this.resourceNameMap = new Map();
    }

    addResourceFromJson(jsonData: { nodes?: CloudCanvasNode[] }) {
        jsonData.nodes?.forEach((node => {
            try {
                const resource = parseToNCloudModel(node);
                this.addResource(resource);
            } catch (error) {
                console.warn(`Skipping unsupported node type: ${node.type}`);
            }
        }));
    }

    addResource(resource: NCloudModel) {
        this.resources.push(resource);
        this.resourceNameMap.set(resource.serviceType, resource.name);
    }



    private replaceReferences(properties: { [key: string]: any }): { [key: string]: any } {
        const result = { ...properties };

        for (const [key, value] of Object.entries(result)) {
            if (typeof value === 'string') {
                switch(value) {
                    case 'VPC_ID_PLACEHOLDER':
                        const vpcName = this.resourceNameMap.get('ncloud_vpc');
                        result[key] = `ncloud_vpc.${vpcName}.id`;
                        break;
                    case 'VPC_ACL_PLACEHOLDER':
                        const vpcAclName = this.resourceNameMap.get('ncloud_vpc');
                        result[key] = `ncloud_vpc.${vpcAclName}.default_network_acl_no`;
                        break;
                    case 'SUBNET_ID_PLACEHOLDER':
                        const subnetName = this.resourceNameMap.get('ncloud_subnet');
                        result[key] = `ncloud_subnet.${subnetName}.id`;
                        break;
                    case 'ACG_ID_PLACEHOLDER':
                        const acgName = this.resourceNameMap.get('ncloud_access_control_group');
                        result[key] = `ncloud_access_control_group.${acgName}.id`;
                        break;
                    case 'LOGIN_KEY_NAME_PLACEHOLDER':
                        const loginKeyName = this.resourceNameMap.get('ncloud_login_key');
                        result[key] = `ncloud_login_key.${loginKeyName}.key_name`;
                        break;
                    case 'NIC_ID_PLACEHOLDER':
                        const nicName = this.resourceNameMap.get('ncloud_network_interface');
                        result[key] = `ncloud_network_interface.${nicName}.id`;
                        break;
                    case 'SERVER_ID_PLACEHOLDER':
                        const serverName = this.resourceNameMap.get('ncloud_server');
                        result[key] = `ncloud_server.${serverName}.id`;
                        break;
                }
            } else if (Array.isArray(value)) {
                result[key] = value.map(item => {
                    if (typeof item === 'string') {
                        const replacedValue = this.replaceReferences({ temp: item }).temp;
                        return replacedValue;
                    }
                    return this.replaceReferences(item);
                });
            } else if (typeof value === 'object' && value !== null) {
                result[key] = this.replaceReferences(value);
            }
        }

        return result;
    }

    private formatValue(value: any): string {
        if (Array.isArray(value)) {
            return `[${value.map(item => this.formatValue(item)).join(', ')}]`;
        }

        if (typeof value === 'string') {
            const ncloudRefPattern = /^ncloud_[a-zA-Z_]+\.[a-zA-Z_-]+\.[a-zA-Z_]+$/;
            const varRefPattern = /^var\.[a-zA-Z_]+$/;

            if (ncloudRefPattern.test(value) || varRefPattern.test(value)) {
                return value;
            }

            return `"${value}"`;
        }
        return value;
    }

    private formatProperties(properties: { [key: string]: any }): string {
        const maxKeyLength = Math.max(...Object.keys(properties).map(key => key.length));

        return Object.entries(properties)
            .map(([key, value]) => {
                const padding = ' '.repeat(maxKeyLength - key.length);

                if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
                    return `  ${key} {
${this.formatProperties(value)}
 }`;
                }

                return `  ${key}${padding} = ${this.formatValue(value)}`;
            })
            .join('\n');
    }
    generate(): string {
        const providerProperties = this.provider.getProperties();

        const terraformBlock = `
terraform {
 required_providers {
   ncloud = {
     source = "${providerProperties.terraform.required_providers.ncloud.source}"
   }
 }
 required_version = "${providerProperties.terraform.required_version}"
}`;

        const providerBlock = `
provider "${this.provider.name}" {
${this.formatProperties(providerProperties.provider)}
}`;

        const resourceBlocks = this.resources
            .sort((a, b) => a.priority - b.priority)
            .map(resource => {
                const properties = this.replaceReferences(resource.getProperties());
                return `
resource "${resource.serviceType}" "${resource.name}" {
${this.formatProperties(properties)}
}`;
            });

        return [terraformBlock, providerBlock, ...resourceBlocks].join('\n');
    }

    async saveToFile(filePath: string): Promise<void> {
        const fs = require('fs').promises;
        const terraformCode = this.generate();
        console.log(terraformCode);
        await fs.writeFile(filePath, terraformCode);
    }
}
