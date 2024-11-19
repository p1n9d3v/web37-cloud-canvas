import { VPC } from '../interface/VPC';
import { NCloudModel } from '../interface/NCloudModel';

export class NCloudVPC implements VPC, NCloudModel {
    id: string;
    name: string;
    region: string;
    ipv4CidrBlock: string;
    defaultNetworkAclNo: string;
    defaultAccessControlGroupNo: string;
    defaultPublicRouteTableNo: string;
    defaultPrivateRouteTableNo: string;
    serviceType: string;

    constructor(json: any) {
        this.serviceType = 'ncloud_vpc';
        this.id = json.id;
        this.name = json.name;
        this.region = json.region;
        this.ipv4CidrBlock = json.ipv4CidrBlock;
        this.defaultNetworkAclNo = json.defaultNetworkAclNo;
        this.defaultAccessControlGroupNo = json.defaultAccessControlGroupNo;
        this.defaultPublicRouteTableNo = json.defaultPublicRouteTableNo;
        this.defaultPrivateRouteTableNo = json.defaultPrivateRouteTableNo;
    }

    getProperties() {
        return {
            name: this.name,
            ipv4_cidr_block: this.ipv4CidrBlock
        };
    }
}
