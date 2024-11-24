import { ResourcePriority } from '../enum/ResourcePriority';
import { NCloudModel } from '../interface/NCloudModel';
import { PublicIp } from '../interface/PublicIp';

export class NCloudPublicIP implements PublicIp, NCloudModel {
    id: string;
    name: string;
    serverInstanceNo?: string;
    publicIp?: string;
    kindType?: string;
    serviceType: string;
    priority: ResourcePriority;

    constructor(json: any) {
        this.serviceType = 'ncloud_public_ip';
        this.priority = ResourcePriority.PUBLIC_IP;
        this.id = json.id || `publicIp-${Date.now()}`;
        this.name = json.name;
    }

    getProperties() {
        const properties: { [key: string]: any } = {};
        properties.server_instance_no = 'SERVER_ID_PLACEHOLDER';
        return properties;
    }
}
