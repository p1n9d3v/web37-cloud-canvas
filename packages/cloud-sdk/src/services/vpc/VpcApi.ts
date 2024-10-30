import { VpcApiClient } from './VpcApiClient';
import { ApiKeyCredentials } from './types';

export class VpcApi {
    private client: VpcApiClient;
    private readonly resourcePath: string;
    constructor(apiKey?: ApiKeyCredentials) {
        this.resourcePath = '/vpc/v2';
        this.client = new VpcApiClient(apiKey);
    }

    async createVpc(params: {
        regionCode: string;
        vpcName: string;
        ipv4CidrBlock: string;
    }) {
        return await this.client.request({
            method: 'POST',
            url: this.resourcePath + '/createVpc',
            params,
        });
    }
}
