import { NetworkInterface } from '../interface/NetworkInterface';
import { NCloudModel } from '../interface/NCloudModel';

export class NCloudNetworkInterface implements NetworkInterface, NCloudModel {
    id: string;
    name: string;
    subnetNo: string;
    accessControlGroups: string[];
    serviceType: string;

    constructor(json: any) {
        this.serviceType = 'ncloud_network_interface';
        Object.assign(this, json);
    }

    getProperties() {
        return {
            subnet_no: "ncloud_subnet.subnet.id",
            name: this.name,
            access_control_groups: this.accessControlGroups
        };
    }
}

