import { Server } from '../interface/Server';
import { NCloudModel } from '../interface/NCloudModel';
import { ResourcePriority } from '../enum/ResourcePriority';

export class NCloudServer implements Server, NCloudModel {
    id: string;
    name: string;
    subnetNo: string;
    serverImageProductCode: string;
    serverProductCode: string;
    loginKeyName: string;
    networkInterfaceNo: string;
    serviceType: string;
    priority: ResourcePriority;

    constructor(json: any) {
        this.serviceType = 'ncloud_server';
        this.priority = ResourcePriority.SERVER;
        this.id = json.id;
        this.name = json.name;
        this.subnetNo = json.subnetNo;
        this.serverImageProductCode = json.serverImageProductCode;
        this.serverProductCode = json.serverProductCode;
        this.loginKeyName = json.loginKeyName;
        this.networkInterfaceNo = json.networkInterfaceNo;
    }

    getProperties() {
        return {
            subnet_no: "ncloud_subnet.subnet.id",
            name: this.name,
            server_image_product_code: this.serverImageProductCode,
            server_product_code: this.serverProductCode,
            login_key_name: "ncloud_login_key.my-key.key_name",
            network_interface: {
                network_interface_no: "ncloud_network_interface.my-nic.id",
                order: 0
            }
        };
    }
}

