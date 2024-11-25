import { TerraformConvertor } from './convertor/TerraformConvertor';
import { sampleNodes } from './sample/sampleData';
import { saveTerraformFiles } from './util/file';

async function main() {
    try {
        const converter = new TerraformConvertor();
        converter.addResourceFromJson({ nodes: sampleNodes });
        const terraformCode = converter.generate();
        await saveTerraformFiles(terraformCode, { log: true });
    } catch (error) {
        if (error instanceof Error) {
            console.error(
                'Error generating Terraform configuration:',
                error.message,
            );
        } else {
            console.error('An unknown error occurred');
        }
        process.exit(1);
    }
}

if (require.main === module) {
    main().catch(console.error);
}
