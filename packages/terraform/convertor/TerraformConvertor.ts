import { ResourceManager } from '../type/ResourceManager';
import { CodeGenerator } from '../type/TerraformGenerator';
import { NCloudProvider } from '../model/NCloudProvider';
import { CloudCanvasNode } from '../interface/CloudCanvasNode';
import { parseToNCloudModel } from '../util/resourceParser';

export class TerraformConvertor {
    private readonly resourceManager: ResourceManager;
    private readonly codeGenerator: CodeGenerator;
    private providers: Map<string, NCloudProvider>;

    constructor() {
        this.resourceManager = new ResourceManager();
        this.codeGenerator = new CodeGenerator(this.resourceManager);
        this.providers = new Map();
    }

    private processDependencies(node: CloudCanvasNode): CloudCanvasNode[] {
        const dependencies: CloudCanvasNode[] = [];
        const { properties } = node;

        switch (node.type.toLowerCase()) {
            case 'server':
                if (properties.vpcName) {
                    dependencies.push({
                        id: `vpc-${properties.vpcName}`,
                        type: 'VPC',
                        name: properties.vpcName,
                        properties: {
                            cidrBlock: properties.vpcCidr || '172.16.0.0/16',
                            region: properties.region,
                        },
                    });
                }

                if (properties.subnetName) {
                    dependencies.push({
                        id: `subnet-${properties.subnetName}`,
                        type: 'Subnet',
                        name: properties.subnetName,
                        properties: {
                            subnet: properties.subnetCidr || '172.16.10.0/24',
                            zone: properties.zone || 'KR-2',
                            subnetType: properties.subnetType || 'PUBLIC',
                            usageType: 'GEN',
                            vpcName: properties.vpcName,
                            region: properties.region,
                        },
                    });
                    console.log('properties', properties);
                }

                if (properties.acgName) {
                    dependencies.push({
                        id: `acg-${properties.acgName}`,
                        type: 'ACG',
                        name: properties.acgName,
                        properties: {
                            description: `Security group for ${node.name}`,
                            vpcName: properties.vpcName,
                            region: properties.region,
                        },
                    });

                    dependencies.push({
                        id: `acgrule-${properties.acgName}`,
                        type: 'ACGRule',
                        name: `${properties.acgName}-rule`,
                        properties: {
                            acgName: properties.acgName,
                            protocol: 'TCP',
                            ipBlock: '0.0.0.0/0',
                            portRange: '22',
                            description: 'SSH access',
                            region: properties.region,
                        },
                    });
                }

                if (properties.nicName) {
                    dependencies.push({
                        id: `nic-${properties.nicName}`,
                        type: 'NetworkInterface',
                        name: properties.nicName,
                        properties: {
                            subnetName: properties.subnetName,
                            acgName: properties.acgName,
                            region: properties.region,
                        },
                    });
                }

                if (properties.loginKeyName) {
                    dependencies.push({
                        id: `loginkey-${properties.loginKeyName}`,
                        type: 'LoginKey',
                        name: properties.loginKeyName,
                        properties: {
                            region: properties.region,
                        },
                    });
                }
                break;
        }

        return dependencies;
    }

    addResourceFromJson(jsonData: { nodes?: CloudCanvasNode[] }): void {
        const allNodes: CloudCanvasNode[] = [];

        jsonData.nodes?.forEach((node) => {
            const dependencies = this.processDependencies(node);
            allNodes.push(...dependencies);
            allNodes.push(node);
        });

        const regions = this.collectRegions(allNodes);
        regions.forEach((region) => {
            const provider = new NCloudProvider({
                accessKey: 'var.access_key',
                secretKey: 'var.secret_key',
                region: region,
                site: 'public',
                alias: region.toLowerCase(),
            });
            this.providers.set(region, provider);
        });

        allNodes.forEach((node) => {
            try {
                const resource = parseToNCloudModel(node);
                this.resourceManager.addResource(
                    resource,
                    node.properties?.region,
                );
            } catch (error) {
                console.warn(error);
            }
        });
    }

    private collectRegions(nodes: CloudCanvasNode[]): Set<string> {
        const regions = new Set<string>();
        nodes.forEach((node) => {
            if (node.properties?.region) {
                regions.add(node.properties.region);
            }
        });
        return regions;
    }

    generate(): string {
        if (this.providers.size === 0) {
            throw new Error(
                'No providers initialized. Make sure to add resources with region information first.',
            );
        }
        return this.codeGenerator.generateCode([...this.providers.values()]);
    }
}
