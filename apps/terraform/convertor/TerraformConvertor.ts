import { NCloudModel } from '../interface/NCloudModel';
import { NCloudProvider } from '../model/NCloudProvider';

export class TerraformConvertor {
    private resources: NCloudModel[];
    private provider: NCloudProvider;

    constructor(provider: NCloudProvider) {
        this.provider = provider;
        this.resources = [];
    }

    addResource(resource: NCloudModel) {
        this.resources.push(resource);
    }

    private formatValue(value: any): string {
        if (typeof value === 'string') {
            if (value.includes('ncloud_') && value.includes('.') && value.includes('_')) {
                return value.replace(/"/g, '');
            }
            if (value.startsWith('var.')) {
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
            .map(resource => `
resource "${resource.serviceType}" "${resource.name}" {
${this.formatProperties(resource.getProperties())}
}`);

        return [terraformBlock, providerBlock, ...resourceBlocks].join('\n');
    }

    async saveToFile(filePath: string): Promise<void> {
        const fs = require('fs').promises;
        const terraformCode = this.generate();
        console.log(terraformCode);
        await fs.writeFile(filePath, terraformCode);
    }
}
