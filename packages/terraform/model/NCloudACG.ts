import { ACG } from '../interface/ACG';
import { NCloudModel } from '../interface/NCloudModel';
import { ResourcePriority } from '../enum/ResourcePriority';

export class NCloudACG implements ACG, NCloudModel {
    id: string;
    vpcNo: string;
    name?: string;
    description?: string;
    isDefault?: boolean;
    serviceType: string;
    priority: ResourcePriority;

    constructor(json: any) {
        this.serviceType = 'ncloud_access_control_group';
        this.priority = ResourcePriority.ACG;

        if (json.name) {
            this.name = json.name;
        }
        if (json.description) {
            this.description = json.description;
        }

        this.vpcNo = 'VPC_ID_PLACEHOLDER';
    }

    getProperties() {
        const properties: { [key: string]: any } = {
            vpc_no: this.vpcNo,
        };

        if (this.name) {
            properties.name = this.name;
        }
        if (this.description) {
            properties.description = this.description;
        }

        return properties;
    }
}
