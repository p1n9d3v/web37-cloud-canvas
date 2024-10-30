import { SubnetApiClient } from './SubnetApiClient';
import { ApiKeyCredentials } from './types';

export class SubnetApi {
    private client: SubnetApiClient;
    private readonly resourcePath: string;
    constructor(apiKey?: ApiKeyCredentials) {
        this.resourcePath = '/subnet/v2';
        this.client = new SubnetApiClient(apiKey);
    }

    async getSubnetList() {}

    async getSubnetDetail() {}

    async createSubnet() {}

    async deleteSubnet() {}
}
