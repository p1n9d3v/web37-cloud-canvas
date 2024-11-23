import { NCloudModel } from '../interface/NCloudModel';
import { ResourcePriority } from '../enum/ResourcePriority';
import { ACGRule } from '../interface/ACGRule';

export class NCloudACGRule implements ACGRule, NCloudModel {
    name: string;
    protocol: string;
    ipBlock: string;
    portRange: string;
    serviceType: string;
    priority: ResourcePriority;

    constructor(json: any) {
        this.serviceType = 'ncloud_access_control_group_rule';
        this.priority = ResourcePriority.ACG_RULE;
        this.name = json.name || 'acg-rule';
        this.protocol = json.protocol;
        this.ipBlock = json.ipBlock;
        this.portRange = json.portRange;
    }

    getProperties() {
        return {
            access_control_group_no: 'ACG_ID_PLACEHOLDER',
            inbound: {
                protocol: this.protocol,
                ip_block: this.ipBlock,
                port_range: this.portRange,
            },
        };
    }
}
