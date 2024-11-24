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
        this.subnetNo = `ncloud_subnet.${json.subnetName}.id`;
        this.serverImageProductCode = json.serverImageProductCode;
        this.serverProductCode = json.serverProductCode;
        this.loginKeyName = `ncloud_login_key.${json.loginKeyName}.key_name`;
        this.networkInterfaceNo = `ncloud_network_interface.${json.nicName}.id`;
    }

    getProperties() {
        return {
            subnet_no: this.subnetNo,
            name: this.name,
            server_image_product_code: this.serverImageProductCode,
            server_product_code: this.serverProductCode,
            login_key_name: this.loginKeyName,
            network_interface: {
                network_interface_no: this.networkInterfaceNo,
                order: 0,
            },
        };
    }
}
