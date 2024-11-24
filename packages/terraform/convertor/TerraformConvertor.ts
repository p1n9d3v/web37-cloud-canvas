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

    addResourceFromJson(jsonData: { nodes?: CloudCanvasNode[] }): void {
        const regions = this.collectRegions(jsonData.nodes || []);

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

        jsonData.nodes?.forEach((node) => {
            try {
                const resource = parseToNCloudModel(node);
                const region = node.properties?.region;
                this.resourceManager.addResource(resource, region);
            } catch (error) {
                console.warn(`Skipping unsupported node type: ${node.type}`);
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
    extractRegion(nodes: CloudCanvasNode[]): string | undefined {
        for (const node of nodes) {
            if (node.properties?.region) {
                return node.properties.region;
            }
        }
        return undefined;
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
