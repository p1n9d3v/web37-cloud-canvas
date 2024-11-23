import { ResourcePriority } from '../enum/ResourcePriority';
import { NCloudModel } from '../interface/NCloudModel';

export class NCloudSubnet implements NCloudModel {
    id: string;
    vpcNo: string;
    subnet: string;
    zone: string;
    networkAclNo: string;
    subnetType: 'PUBLIC' | 'PRIVATE';
    name?: string;
    usageType?: 'GEN' | 'LOADB' | 'BM' | 'NATGW';
    serviceType: string;
    priority: ResourcePriority;

    constructor(json: any) {
        this.serviceType = 'ncloud_subnet';
        this.priority = ResourcePriority.SUBNET;

        if (!json.subnet) {
            throw new Error('subnet CIDR block is required');
        }
        if (!json.zone) {
            throw new Error('zone is required');
        }
        if (
            !json.subnetType ||
            !['PUBLIC', 'PRIVATE'].includes(json.subnetType)
        ) {
            throw new Error('subnetType must be either PUBLIC or PRIVATE');
        }

        this.subnet = json.subnet;
        this.zone = json.zone;
        this.subnetType = json.subnetType;

        if (json.name) {
            this.name = json.name;
        }

        if (
            json.usageType &&
            ['GEN', 'LOADB', 'BM', 'NATGW'].includes(json.usageType)
        ) {
            this.usageType = json.usageType;
        } else {
            this.usageType = 'GEN';
        }

        this.vpcNo = 'VPC_ID_PLACEHOLDER';
        this.networkAclNo = 'VPC_ACL_PLACEHOLDER';
    }

    getProperties() {
        const properties: { [key: string]: any } = {
            vpc_no: this.vpcNo,
            subnet: this.subnet,
            zone: this.zone,
            network_acl_no: this.networkAclNo,
            subnet_type: this.subnetType,
        };

        if (this.name) {
            properties.name = this.name;
        }
        if (this.usageType) {
            properties.usage_type = this.usageType;
        }

        return properties;
    }
}
