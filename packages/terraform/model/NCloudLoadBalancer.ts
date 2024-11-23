import { LoadBalancer } from '../interface/LoadBalancer';
import { NCloudModel } from '../interface/NCloudModel';
import { ResourcePriority } from '../enum/ResourcePriority';

export class NCloudLoadBalancer implements LoadBalancer, NCloudModel {
    id: string;
    name: string;
    networkType: string;
    type: string;
    subnetNoList: string[];
    idleTimeout?: number;
    throughputType?: string;
    description?: string;
    serviceType: string;
    priority: ResourcePriority;

    constructor(json: any) {
        this.serviceType = 'ncloud_lb';
        this.priority = ResourcePriority.LOAD_BALANCER;
        this.name = json.name || 'lb';
        this.networkType = json.networkType || 'PUBLIC';
        this.type = json.type || 'APPLICATION';
        this.subnetNoList = json.subnetNoList || ['SUBNET_ID_PLACEHOLDER'];
    }

    getProperties() {
        return {
            name: this.name,
            type: this.type,
            network_type: this.networkType,
            subnet_no_list: this.subnetNoList,
        };
    }
}
