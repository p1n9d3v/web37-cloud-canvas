import { CloudCanvasNode } from './interface/CloudCanvasNode';
import { NCloudProvider } from './model/NCloudProvider';
import { TerraformConvertor } from './convertor/TerraformConvertor';

const sampleNodes: CloudCanvasNode[] = [
    {
        id: "vpc1",
        type: "VPC",
        name: "my-vpc",
        properties: {
            cidrBlock: "172.16.0.0/16"
        }
    },
    {
        id: "nacl1",
        type: "NetworkACL",
        name: "my-nacl",
        properties: {
        }
    },
    {
        id: "subnet1",
        type: "Subnet",
        name: "my-subnet",
        properties: {
            subnet: "172.16.10.0/24",
            zone: "KR-2",
            subnetType: "PUBLIC",
            usageType: "GEN"
        }
    },
    {
        id: "acg1",
        type: "ACG",
        name: "my-acg",
        properties: {
            description: "My ACG"
        }
    },
    {
        id: "acgrule1",
        type: "ACGRule",
        name: "",
        properties: {
            protocol: "TCP",
            ipBlock: "0.0.0.0/0",
            portRange: "80",
            description: "HTTP"
        }
    },
    {
        id: "loginkey1",
        type: "LoginKey",
        name: "my-key",
        properties: {
        }
    },
    {
        id: "nic1",
        type: "NetworkInterface",
        name: "my-nic",
        properties: {}
    },
    {
        id: "server1",
        type: "Server",
        name: "my-server",
        properties: {
            serverImageProductCode: "SW.VSVR.OS.LNX64.CNTOS.0708.B050",
            serverProductCode: "SVR.VSVR.HICPU.C002.M004.NET.HDD.B050.G002"
        }
    },
    {
        id: "publicip1",
        type: "PublicIP",
        name: "my-public-ip",
        properties: {}
    }
];

async function main() {
    try {
        const provider = new NCloudProvider({
            accessKey: "var.access_key",
            secretKey: "var.secret_key",
            region: "var.region",
            site: "public"
        });

        const convertor = new TerraformConvertor(provider);

        convertor.addResourceFromJson({ nodes: sampleNodes });
        await convertor.saveToFile('main.tf');
        console.log('\nGenerated Terraform code:');
        console.log('----------------------------------------');
        console.log(convertor.generate());
        console.log('----------------------------------------');

    } catch (error) {
        console.error('Error generating Terraform configuration:', error);
    }
}

main().catch(console.error);
