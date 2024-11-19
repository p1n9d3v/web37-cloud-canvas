import { Provider } from '../interface/Provider';
import { NCloudModel } from '../interface/NCloudModel';

export class NCloudProvider implements Provider, NCloudModel {
    accessKey: string;
    secretKey: string;
    region: string;
    site: string;
    name: string;
    serviceType: string;

    constructor(json: any) {
        this.serviceType = 'provider';
        this.name = 'ncloud';
        this.accessKey = json.accessKey;
        this.secretKey = json.secretKey;
        this.region = json.region;
        this.site = json.site;
    }

    getProperties() {
        return {
            access_key: this.accessKey,
            secret_key: this.secretKey,
            region: this.region,
            site: this.site,
            support_vpc: true
        };
    }
}
