import { NCloudModel } from '../interface/NCloudModel';
import { ResourcePriority } from '../enum/ResourcePriority';
import { LoginKey } from '../interface/LoginKey';

export class NCloudLoginKey implements LoginKey, NCloudModel {
    keyName: string;
    privateKey?: string;
    fingerprint?: string;
    serviceType: string;
    priority: ResourcePriority;

    constructor(json: any) {
        this.serviceType = 'ncloud_login_key';
        this.priority = ResourcePriority.LOGIN_KEY;

        if (!json.keyName && !json.name) {
            throw new Error('key_name is required for Login Key');
        }
        this.keyName = json.keyName || json.name;
    }

    getProperties() {
        return {
            key_name: this.keyName,
        };
    }
}
