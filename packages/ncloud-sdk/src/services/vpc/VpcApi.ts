import { VpcApiClient } from './VpcApiClient';
import { ApiKeyCredentials } from './types';
import { CreateVpcRequest } from './models/CreateVpcRequest';
import { CreateVpcResponse } from './models/CreateVpcResponse';
import { DeleteVpcRequest } from './models/DeleteVpcRequest';
import { DeleteVpcResponse } from './models/DeleteVpcResponse';
import { GetVpcListRequest } from './models/GetVpcListRequest';
import { GetVpcListResponse } from './models/GetVpcListResponse';
import { GetVpcDetailRequest } from './models/GetVpcDetailRequest';
import { GetVpcDetailResponse } from './models/GetVpcDetailResponse';
/**
 * 네이버 클라우드 플랫폼의 VPC(Virtual Private Cloud) API를 처리하는 클래스
 * @class VpcApi
 */
export class VpcApi {
    private client: VpcApiClient;
    private readonly resourcePath: string;

    /**
     * VpcApi 클래스의 새 인스턴스를 생성합니다.
     * @param {ApiKeyCredentials} [apiKey] - 네이버 클라우드 플랫폼 API 인증 정보
     * @example
     * const vpcApi = new VpcApi({
     *   accessKey: 'access-key',
     *   secretKey: 'secret-key'
     * });
     */
    constructor(apiKey?: ApiKeyCredentials) {
        this.resourcePath = '/vpc/v2';
        this.client = new VpcApiClient(apiKey);
    }

    /**
     * 새로운 VPC를 생성합니다.
     * @param {CreateVpcRequest} params - VPC 생성 요청 파라미터
     * @returns {Promise<CreateVpcResponse>} VPC 생성 결과
     *
     * @example
     * const response = await vpcApi.createVpc({
     *   regionCode: 'KR',
     *   vpcName: 'boost-vpc',
     *   ipv4CidrBlock: '10.0.0.0/16'
     * });
     *
     */
    async createVpc(params: CreateVpcRequest): Promise<CreateVpcResponse> {
        return await this.client.request({
            method: 'POST',
            url: `${this.resourcePath}/createVpc`,
            params,
        });
    }

    /**
     * VPC를 삭제합니다.
     * @param {DeleteVpcRequest} params - VPC 삭제 요청 파라미터
     * @returns {Promise<DeleteVpcResponse>} VPC 삭제 결과
     *
     * @example
     * const response = await vpcApi.deleteVpc({
     *   regionCode: 'KR',
     *   vpcNo: 'vpc-123'
     * });
     *
     */
    async deleteVpc(params: DeleteVpcRequest): Promise<DeleteVpcResponse> {
        return await this.client.request({
            method: 'POST',
            url: `${this.resourcePath}/deleteVpc`,
            params,
        });
    }

    /**
     * VPC 목록을 조회합니다.
     * @param {GetVpcListRequest} params - VPC 목록 조회 요청 파라미터
     * @returns {Promise<GetVpcListResponse>} VPC 목록 조회 결과
     *
     * @example
     * const response = await vpcApi.getVpcList({
     *   regionCode: 'KR',
     *   vpcStatusCode: 'RUN'
     * });
     *
     */
    async getVpcList(params: GetVpcListRequest): Promise<GetVpcListResponse> {
        return await this.client.request({
            method: 'GET',
            url: `${this.resourcePath}/getVpcList`,
            params,
        });
    }

    /**
     * 특정 VPC의 상세 정보를 조회합니다.
     * @param {GetVpcDetailRequest} params - VPC 상세 정보 조회 요청 파라미터
     * @returns {Promise<GetVpcDetailResponse>} VPC 상세 정보 조회 결과
     *
     * @example
     * const response = await vpcApi.getVpcDetail({
     *   regionCode: 'KR',
     *   vpcNo: 'vpc-123'
     * });
     *
     */
    async getVpcDetail(
        params: GetVpcDetailRequest
    ): Promise<GetVpcDetailResponse> {
        return await this.client.request({
            method: 'GET',
            url: `${this.resourcePath}/getVpcDetail`,
            params,
        });
    }
}
