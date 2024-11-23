import { LaunchConfiguration } from '../interface/LaunchConfiguration';
import { NCloudModel } from '../interface/NCloudModel';
import { ResourcePriority } from '../enum/ResourcePriority';

export class NCloudLaunchConfiguration
    implements LaunchConfiguration, NCloudModel
{
    id: string;
    name: string;
    serverImageProductCode: string;
    serverProductCode: string;
    loginKeyName: string;
    serviceType: string;
    priority: ResourcePriority;

    constructor(json: any) {
        this.serviceType = 'ncloud_launch_configuration';
        this.priority = ResourcePriority.LAUNCH_CONFIGURATION;
        this.name = json.name || 'launch-config';
        this.serverImageProductCode = json.serverImageProductCode;
        this.serverProductCode = json.serverProductCode;
    }

    getProperties() {
        return {
            name: this.name,
            server_image_product_code: this.serverImageProductCode,
            server_product_code: this.serverProductCode,
            login_key_name: 'LOGIN_KEY_NAME_PLACEHOLDER',
        };
    }
}
