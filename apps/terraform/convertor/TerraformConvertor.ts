import { NCloudModel } from '../interface/NCloudModel';
import { NCloudProvider } from '../model/NCloudProvider';
import { CloudCanvasNode } from '../interface/CloudCanvasNode';
import { parseToNCloudModel } from '../util/resourceParser';

export class TerraformConvertor {
    private resources: NCloudModel[];
    private provider: NCloudProvider;
    private resourceMap: Map<string, string>;

    constructor(provider: NCloudProvider) {
        this.provider = provider;
        this.resources = [];
        this.resourceMap = new Map();
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
        this.resourceMap.set(resource.serviceType, resource.name);
    }

    getResourceName(serviceType: string): string {
        return this.resourceMap.get(serviceType) || '';
    }

    private replaceReferences(properties: { [key: string]: any }): { [key: string]: any } {
        const result = { ...properties };

        for (const [key, value] of Object.entries(result)) {
            if (typeof value === 'string') {
                if (value === 'VPC_ID_PLACEHOLDER') {
                    const vpcName = this.resourceMap.get('ncloud_vpc');
                    result[key] = `ncloud_vpc.${vpcName}.id`;
                }
                if (value === 'VPC_ACL_PLACEHOLDER') {
                    const vpcName = this.resourceMap.get('ncloud_vpc');
                    result[key] = `ncloud_vpc.${vpcName}.default_network_acl_no`;
                }
            } else if (typeof value === 'object' && value !== null) {
                result[key] = this.replaceReferences(value);
            }
        }

        return result;
    }


    private formatValue(value: any): string {
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
                if (Array.isArray(value)) {
                    const formattedArray = value.map(item => {
                        if (typeof item === 'object') {
                            return `  ${key} {
${this.formatProperties(item)}
 }`;
                        }
                        return `  ${key} = ${this.formatValue(item)}`;
                    }).join('\n');
                    return formattedArray;
                }

                if (typeof value === 'object' && value !== null) {
                    return `  ${key} {
${this.formatProperties(value)}
 }`;
                }

                const padding = ' '.repeat(maxKeyLength - key.length);
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
