import { Subnet } from '../interface/Subnet';
import { NCloudModel } from '../interface/NCloudModel';

export class NCloudSubnet implements Subnet, NCloudModel {
    id: string;
    name: string;
    vpcNo: string;
    subnet: string;
    zone: string;
    networkAclNo: string;
    subnetType: string;
    usageType: string;
    serviceType: string;

    constructor(json: any) {
        this.serviceType = 'ncloud_subnet';
        Object.assign(this, json);
    }

    getProperties() {
        return {
            vpc_no: "ncloud_vpc.vpc.id",
            subnet: this.subnet,
            zone: this.zone,
            network_acl_no: "ncloud_vpc.vpc.default_network_acl_no",
            subnet_type: this.subnetType,
            name: this.name,
            usage_type: this.usageType
        };
    }
}
