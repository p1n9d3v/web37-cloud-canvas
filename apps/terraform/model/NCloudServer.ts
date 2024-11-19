import { Server } from '../interface/Server';
import { NCloudModel } from '../interface/NCloudModel';

export class NCloudServer implements Server, NCloudModel {
    id: string;
    name: string;
    subnetNo: string;
    serverImageProductCode: string;
    serverProductCode: string;
    loginKeyName: string;
    networkInterfaceNo: string;
    serviceType: string;

    constructor(json: any) {
        this.serviceType = 'ncloud_server';
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
            subnet_no: this.subnetNo,
            name: this.name,
            server_image_product_code: this.serverImageProductCode,
            server_product_code: this.serverProductCode,
            login_key_name: this.loginKeyName,
            network_interface: {
                network_interface_no: this.networkInterfaceNo,
                order: 0
            }
        };
    }
}

