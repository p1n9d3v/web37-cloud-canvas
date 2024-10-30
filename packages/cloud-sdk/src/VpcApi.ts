import { AxiosRequestConfig } from 'axios';
import { ApiClient } from './ApiClient';
import { ApiKeyCredentials } from './types';

export class VpcApi {
    private client: ApiClient;

    constructor(apiKey?: ApiKeyCredentials) {
        this.client = new ApiClient(apiKey, 'vpc');
    }

    async createVpc(params: {
        regionCode: string;
        vpcName: string;
        ipv4CidrBlock: string;
    }) {
        return await this.client.request({
            method: 'POST',
            url: '/createVpc',
            params,
        });
    }
}
