import { SubnetApiClient } from './SubnetApiClient';
import { ApiKeyCredentials } from './types';
import { CreateSubnetRequest } from './models/CreateSubnetRequest';
export class SubnetApi {
    private client: SubnetApiClient;
    private readonly resourcePath: string;
    constructor(apiKey?: ApiKeyCredentials) {
        this.resourcePath = '/subnet/v2';
        this.client = new SubnetApiClient(apiKey);
    }

    /**
     * 서브넷 리스트 조회
     */
    async getSubnetList(createSubnetRequest: CreateSubnetRequest) {}

    async getSubnetDetail() {}

    /**
     * 서브넷 생성
     * @param createSubnetRequest
     * 반환값: {@link models/CreateSubnetResponse}
     */
    async createSubnet(createSubnetRequest: CreateSubnetRequest) {}

    async deleteSubnet() {}
}
