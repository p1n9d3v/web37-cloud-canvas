import { ACG } from '../interface/ACG';
import { NCloudModel } from '../interface/NCloudModel';

export class NCloudACG implements ACG, NCloudModel {
    id: string;
    name: string;
    vpcNo: string;
    description: string;
    serviceType: string;

    constructor(json: any) {
        this.serviceType = 'ncloud_access_control_group';
        Object.assign(this, json);
    }

    getProperties() {
        return {
            name: this.name,
            vpc_no: "ncloud_vpc.vpc.id",
            description: this.description
        };
    }
}
