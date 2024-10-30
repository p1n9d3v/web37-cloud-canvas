import { SubnetApiClient } from './SubnetApiClient';
import { ApiKeyCredentials } from './types';
import { CreateSubnetRequest } from './models/CreateSubnetRequest';
import { CreateSubnetResponse } from './models/CreateSubnetResponse';
import { GetSubnetListRequest } from './models/GetSubnetListRequest';
import { GetSubnetListResponse } from './models/GetSubnetListResponse';
import { GetSubnetDetailRequest } from './models/GetSubnetDetailRequest';
import { GetSubnetDetailResponse } from './models/GetSubnetDetailResponse';
import { DeleteSubnetRequest } from './models/DeleteSubnetRequest';
import { DeleteSubnetResponse } from './models/DeleteSubnetResponse';

export class SubnetApi {
    private client: SubnetApiClient;
    private readonly resourcePath: string;
    constructor(apiKey?: ApiKeyCredentials) {
        this.resourcePath = '/vpc/v2';
        this.client = new SubnetApiClient(apiKey);
    }

    /**
     * 서브넷 리스트 조회
     * @param getSubnetListRequest 서브넷 목록을 조회하기 위한 요청 객체
     * @returns GetSubnetListResponse 서브넷 목록을 조회하기 위한 응답 객체
     * @see {@link GetSubnetListRequest}
     * @see {@link GetSubnetListResponse}
     * @see {@link https://api.ncloud-docs.com/docs/networking-vpc-subnetmanagement-getsubnetlist}
     */
    async getSubnetList(getSubnetListRequest: GetSubnetListRequest) {}

    /**
     * 서브넷 상세 조회
     * @param getSubnetDetailRequest 서브넷 상세 정보 조회를 위한 요청 객체
     * @returns GetSubnetDetailResponse 서브넷 상세 정보 조회를 위한 응답 객체
     * @see {@link GetSubnetDetailRequest}
     * @see {@link GetSubnetDetailResponse}
     * @see {@link https://api.ncloud-docs.com/docs/networking-vpc-subnetmanagement-getsubnetdetail}
     */
    async getSubnetDetail(getSubnetDetailRequest: GetSubnetDetailRequest) {}

    /**
     * 서브넷 생성
     * @param createSubnetRequest 서브넷 생성을 위한 요청 객체
     * @returns CreateSubnetResponse 서브넷 생성을 위한 응답 객체
     * @see {@link CreateSubnetRequest}
     * @see {@link CreateSubnetResponse}
     * @see {@link https://api.ncloud-docs.com/docs/networking-vpc-subnetmanagement-createsubnet}
     */
    async createSubnet(createSubnetRequest: CreateSubnetRequest) {}

    /**
     * 서브넷 삭제
     * @param deleteSubnetRequest 서브넷 삭제를 위한 요청 객체
     * @returns DeleteSubnetResponse 서브넷 삭제를 위한 응답 객체
     * @see {@link DeleteSubnetRequest}
     * @see {@link DeleteSubnetResponse}
     * @see {@link https://api.ncloud-docs.com/docs/networking-vpc-subnetmanagement-deletesubnet}
     */
    async deleteSubnet(deleteSubnetRequest: DeleteSubnetRequest) {}
}
