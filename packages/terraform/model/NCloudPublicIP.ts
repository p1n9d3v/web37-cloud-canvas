import { ResourcePriority } from '../enum/ResourcePriority';
import { NCloudModel } from '../interface/NCloudModel';
import { PublicIp } from '../interface/PublicIp';

export class NCloudPublicIP implements PublicIp, NCloudModel {
    id: string;
    serverInstanceNo?: string;
    description?: string;
    publicIp?: string;
    kindType?: string;
    serviceType: string;
    priority: ResourcePriority;

    constructor(json: any) {
        this.serviceType = 'ncloud_public_ip';
        this.priority = ResourcePriority.PUBLIC_IP;

        if (json.description) {
            this.description = json.description;
        }
    }

    getProperties() {
        const properties: { [key: string]: any } = {};

        properties.server_instance_no = 'SERVER_ID_PLACEHOLDER';

        if (this.description) {
            properties.description = this.description;
        }

        return properties;
    }
}
