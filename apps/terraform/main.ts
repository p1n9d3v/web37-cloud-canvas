import { NCloudProvider } from './model/NCloudProvider';
import { TerraformConvertor } from './convertor/TerraformConvertor';
import { NCloudVPC } from './model/NCloudVPC';
import { NCloudSubnet } from './model/NCloudSubnet';
import { NCloudNetworkACL } from './model/NCloudNetworkACL';
import { NCloudACG } from './model/NCloudACG';
import { NCloudACGRule } from './model/NCloudACGRule';
import { NCloudLoginKey } from './model/NCloudLoginKey';
import { NCloudNetworkInterface } from './model/NCloudNetworkInterface';
import { NCloudServer } from './model/NCloudServer';
import { NCloudPublicIP } from './model/NCloudPublicIP';

async function main() {
    const provider = new NCloudProvider({
        accessKey: "var.access_key",
        secretKey: "var.secret_key",
        region: "var.region",
        site: "public"
    });

    const generator = new TerraformConvertor(provider);

    const vpc = new NCloudVPC({
        name: "vpc",
        ipv4CidrBlock: "172.16.0.0/16"
    });
    generator.addResource(vpc);

    const nacl = new NCloudNetworkACL({
        name: "nacl"
    });
    generator.addResource(nacl);

    const subnet = new NCloudSubnet({
        name: "subnet",
        subnet: "172.16.10.0/24",
        zone: "KR-2",
        subnetType: "PUBLIC",
        usageType: "GEN"
    });
    generator.addResource(subnet);

    const acg = new NCloudACG({
        name: "acg",
        description: "My ACG"
    });
    generator.addResource(acg);

    const acgRule = new NCloudACGRule({
        protocol: "TCP",
        ipBlock: "0.0.0.0/0",
        portRange: "80",
        description: "HTTP"
    });
    generator.addResource(acgRule);

    const loginKey = new NCloudLoginKey({
        name: "my-key"
    });
    generator.addResource(loginKey);

    const nic = new NCloudNetworkInterface({
        name: "my-nic"
    });
    generator.addResource(nic);

    const server = new NCloudServer({
        name: "my-server",
        serverImageProductCode: "SW.VSVR.OS.LNX64.CNTOS.0708.B050",
        serverProductCode: "SVR.VSVR.HICPU.C002.M004.NET.HDD.B050.G002"
    });
    generator.addResource(server);

    const publicIp = new NCloudPublicIP({
        name: "public-ip"
    });
    generator.addResource(publicIp);

    try {
        await generator.saveToFile('main.tf');
        console.log('Terraform configuration has been generated.');

        const { execSync } = require('child_process');

        console.log('Running terraform init...');
        execSync('terraform init');

        console.log('Running terraform plan...');
        execSync('terraform plan');

        console.log('Running terraform apply...');
        execSync('terraform apply -auto-approve');

        console.log('Infrastructure has been successfully created!');
    } catch (error) {
        console.error('Error:', error);
    }
}

main().catch(console.error);

