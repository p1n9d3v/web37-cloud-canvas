import { VserverApiClient } from './VserverApiClient';
import { ApiKeyCredentials } from './types';

export class VserverApi {
    private client: VserverApiClient;
    private readonly resourcePath: string;

    constructor(apiKey?: ApiKeyCredentials) {
        this.resourcePath = '/vserver/v2';
        this.client = new VserverApiClient(apiKey);
    }

    /**
     * 리전 리스트를 조회합니다.
     * @see {@link }
     */
    async getRegionList(
        params: GetRegionListRequest
    ): Promise<GetRegionListResponse> {
        return await this.client.request({
            method: 'GET',
            url: `${this.resourcePath}/getRegionList`,
            params,
        });
    }

    /**
     * ZONE 리스트를 조회합니다.
     * @see {@link }
     */
    async getZoneList(
        params: GetZoneListRequest
    ): Promise<GetZoneListResponse> {
        return await this.client.request({
            method: 'GET',
            url: `${this.resourcePath}/getZoneList`,
            params,
        });
    }

    /**
     * 네이버 클라우드 플랫폼에서 제공하는 서버 이미지 상품 리스트를 조회합니다.
     * @see {@link }
     */
    async getServerImageProductList(
        params: GetServerImageProductListRequest
    ): Promise<GetServerImageProductListResponse> {
        return await this.client.request({
            method: 'GET',
            url: `${this.resourcePath}/getServerImageProductList`,
            params,
        });
    }

    /**
     * 서버 이미지 상품 코드를 이용하여 네이버 클라우드 플랫폼에서 제공하는 서버 스펙 상품 리스트를 조회합니다.
     * @see {@link }
     */
    async getServerProductList(
        params: GetServerProductListRequest
    ): Promise<GetServerProductListResponse> {
        return await this.client.request({
            method: 'GET',
            url: `${this.resourcePath}/vserver/v2/getServerProductList`,
            params,
        });
    }

    /**
     * 서버 스펙 리스트를 조회합니다.
     * @see {@link }
     */
    async getServerSpecList(
        params: GetServerSpecListRequest
    ): Promise<GetServerSpecListResponse> {
        return await this.client.request({
            method: 'GET',
            url: `${this.resourcePath}/getServerSpecList`,
            params,
        });
    }

    /**
     * 서버 스펙 코드를 이용하여 서버 스펙 상세 정보를 조회합니다.
     * @see {@link }
     */
    async getServerSpecDetail(
        params: GetServerSpecDetailRequest
    ): Promise<GetServerSpecDetailResponse> {
        return await this.client.request({
            method: 'GET',
            url: `${this.resourcePath}/getServerSpecDetail`,
            params,
        });
    }

    /**
     * 하이퍼바이저타입 리스트를 조회합니다.
     * @see {@link }
     */
    async getHypervisorTypeList(
        params: GetHypervisorTypeListRequest
    ): Promise<GetHypervisorTypeListResponse> {
        return await this.client.request({
            method: 'GET',
            url: `${this.resourcePath}/getHypervisorTypeList`,
            params,
        });
    }

    /**
     * 사용 가능한 RAID 리스트를 조회합니다.
     * @see {@link }
     */
    async getRaidList(
        params: GetRaidListRequest
    ): Promise<GetRaidListResponse> {
        return await this.client.request({
            method: 'GET',
            url: `${this.resourcePath}/getRaidList`,
            params,
        });
    }

    // login key
    /**
     * 서버 인스턴스(VM)에 접속시 로그인키를 이용하여 비밀번호를 암호화하고 복호화하는 키를 조회합니다.
     * @param {GetLoginKeyListRequest} params - 요청 파라미터
     * @returns {Promise<GetLoginKeyListResponse>} 응답 결과
     * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-server-loginkey-getloginkeylist}
     */
    async getLoginKeyList(
        params: GetLoginKeyListRequest
    ): Promise<GetLoginKeyListResponse> {
        return await this.client.request({
            method: 'GET',
            url: `${this.resourcePath}/getLoginKeyList`,
            params,
        });
    }

    /**
     * 서버 인스턴스(VM)에 접속시 로그인키를 이용하여 비밀번호를 암호화하고 복호화하는 키를 생성합니다.
     * @param {CreateLoginKeyRequest} params - 요청 파라미터
     * @returns {Promise<CreateLoginKeyResponse>} 응답 결과
     * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-server-loginkey-createloginkey}
     */
    async createLoginKey(
        params: CreateLoginKeyRequest
    ): Promise<CreateLoginKeyResponse> {
        return await this.client.request({
            method: 'GET',
            url: `${this.resourcePath}/createLoginKey`,
            params,
        });
    }

    /**
     * 서버 인스턴스(VM)에 접속시 로그인키를 이용하여 비밀번호를 암호화하고 복호화하는 키를 삭제합니다.
     * @param {DeleteLoginKeysRequest} params - 요청 파라미터
     * @returns {Promise<DeleteLoginKeysResponse>} 응답 결과
     * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-server-loginkey-deleteloginkeys}
     */
    async deleteLoginKeys(
        params: DeleteLoginKeysRequest
    ): Promise<DeleteLoginKeysResponse> {
        return await this.client.request({
            method: 'GET',
            url: `${this.resourcePath}/deleteLoginKeys`,
            params,
        });
    }

    /**
     * 서버 인스턴스(VM)에 접속시 로그인키를 이용하여 비밀번호를 암호화하고 복호화하는 키를 생성합니다.
     * 사용자가 직접 ssh-keygen으로 생성한 public key를 import 합니다.
     * @param {ImportLoginKeyRequest} params - 요청 파라미터
     * @returns {Promise<ImportLoginKeyResponse>} 응답 결과
     * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-server-loginkey-importloginkey}
     */
    async importLoginKey(
        params: ImportLoginKeyRequest
    ): Promise<ImportLoginKeyResponse> {
        return await this.client.request({
            method: 'GET',
            url: `${this.resourcePath}/importLoginKey`,
            params,
        });
    }

    // placement group
    /**
     * 서버 인스턴스(VM)가 소속되는 물리 배치 그룹 리스트를 조회합니다.
     * @param {GetPlacementGroupListRequest} params - 요청 파라미터
     * @returns {Promise<GetPlacementGroupListResponse>} 응답 결과
     * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-server-placementgroup-getplacementgrouplist}
     */
    async getPlacementGroupList(
        params: GetPlacementGroupListRequest
    ): Promise<GetPlacementGroupListResponse> {
        return await this.client.request({
            method: 'GET',
            url: `${this.resourcePath}/getPlacementGroupList`,
            params,
        });
    }

    /**
     * 물리 배치 그룹 번호를 이용하여 물리 배치 그룹 상세 정보를 조회합니다.
     * @param {GetPlacementGroupDetailRequest} params - 요청 파라미터
     * @returns {Promise<GetPlacementGroupDetailResponse>} 응답 결과
     * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-server-placementgroup-getplacementgroupdetail}
     */
    async getPlacementGroupDetail(
        params: GetPlacementGroupDetailRequest
    ): Promise<GetPlacementGroupDetailResponse> {
        return await this.client.request({
            method: 'GET',
            url: `${this.resourcePath}/getPlacementGroupDetail`,
            params,
        });
    }

    /**
     * 서버 인스턴스(VM)가 소속되는 물리 배치 그룹을 생성합니다.
     * @param {CreatePlacementGroupRequest} params - 요청 파라미터
     * @returns {Promise<CreatePlacementGroupResponse>} 응답 결과
     * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-server-placementgroup-createplacementgroup}
     */
    async createPlacementGroup(
        params: CreatePlacementGroupRequest
    ): Promise<CreatePlacementGroupResponse> {
        return await this.client.request({
            method: 'GET',
            url: `${this.resourcePath}/createPlacementGroup`,
            params,
        });
    }

    /**
     * 물리 배치 그룹을 삭제합니다.
     * @param {DeletePlacementGroupRequest} params - 요청 파라미터
     * @returns {Promise<DeletePlacementGroupResponse>} 응답 결과
     * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-server-placementgroup-deleteplacementgroup}
     */
    async deletePlacementGroup(
        params: DeletePlacementGroupRequest
    ): Promise<DeletePlacementGroupResponse> {
        return await this.client.request({
            method: 'GET',
            url: `${this.resourcePath}/deletePlacementGroup`,
            params,
        });
    }

    /**
     * 물리 배치 그룹에 서버 인스턴스를 추가합니다.
     * @param {AddPlacementGroupServerInstanceRequest} params - 요청 파라미터
     * @returns {Promise<AddPlacementGroupServerInstanceResponse>} 응답 결과
     * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-server-placementgroup-addplacementgroupserverinstance}
     */
    async addPlacementGroupServerInstance(
        params: AddPlacementGroupServerInstanceRequest
    ): Promise<AddPlacementGroupServerInstanceResponse> {
        return await this.client.request({
            method: 'GET',
            url: `${this.resourcePath}/addPlacementGroupServerInstance`,
            params,
        });
    }

    /**
     * 물리 배치 그룹에서 서버 인스턴스를 제거합니다.
     * @param {RemovePlacementGroupServerInstanceRequest} params - 요청 파라미터
     * @returns {Promise<RemovePlacementGroupServerInstanceResponse>} 응답 결과
     * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-server-placementgroup-removeplacementgroupserverinstance}
     */
    async removePlacementGroupServerInstance(
        params: RemovePlacementGroupServerInstanceRequest
    ): Promise<RemovePlacementGroupServerInstanceResponse> {
        return await this.client.request({
            method: 'GET',
            url: `${this.resourcePath}/removePlacementGroupServerInstance`,
            params,
        });
    }

    // server
    /**
     * 서버 인스턴스(VM) 리스트를 조회합니다.
     * @param {GetServerInstanceListRequest} params - 요청 파라미터
     * @returns {Promise<GetServerInstanceListResponse>} 응답 결과
     * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-server-getserverinstancelist}
     */
    async getServerInstanceList(
        params: GetServerInstanceListRequest
    ): Promise<GetServerInstanceListResponse> {
        return await this.client.request({
            method: 'GET',
            url: `${this.resourcePath}/getServerInstanceList`,
            params,
        });
    }

    /**
     * 서버 인스턴스 번호를 이용하여 서버 인스턴스 상세 정보를 조회합니다.
     * @param {GetServerInstanceDetailRequest} params - 요청 파라미터
     * @returns {Promise<GetServerInstanceDetailResponse>} 응답 결과
     * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-server-getserverinstancedetail}
     */
    async getServerInstanceDetail(
        params: GetServerInstanceDetailRequest
    ): Promise<GetServerInstanceDetailResponse> {
        return await this.client.request({
            method: 'GET',
            url: `${this.resourcePath}/getServerInstanceDetail`,
            params,
        });
    }

    /**
     * 서버 인스턴스(VM)를 생성합니다.
     * @param {CreateServerInstancesRequest} params - 요청 파라미터
     * @returns {Promise<CreateServerInstancesResponse>} 응답 결과
     * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-server-createserverinstances}
     */
    async createServerInstances(
        params: CreateServerInstancesRequest
    ): Promise<CreateServerInstancesResponse> {
        return await this.client.request({
            method: 'GET',
            url: `${this.resourcePath}/createServerInstances`,
            params,
        });
    }

    /**
     * 정지 상태의 서버 인스턴스(VM)를 시작합니다.
     * @param {StartServerInstancesRequest} params - 요청 파라미터
     * @returns {Promise<StartServerInstancesResponse>} 응답 결과
     * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-server-startserverinstances}
     */
    async startServerInstances(
        params: StartServerInstancesRequest
    ): Promise<StartServerInstancesResponse> {
        return await this.client.request({
            method: 'GET',
            url: `${this.resourcePath}/startServerInstances`,
            params,
        });
    }

    /**
     * 운영중 상태의 서버 인스턴스(VM)를 정지합니다.
     * @param {StopServerInstancesRequest} params - 요청 파라미터
     * @returns {Promise<StopServerInstancesResponse>} 응답 결과
     * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-server-stopserverinstances}
     */
    async stopServerInstances(
        params: StopServerInstancesRequest
    ): Promise<StopServerInstancesResponse> {
        return await this.client.request({
            method: 'GET',
            url: `${this.resourcePath}/stopServerInstances`,
            params,
        });
    }

    /**
     * 운영중 상태의 서버 인스턴스(VM)를 재시작합니다.
     * @param {RebootServerInstancesRequest} params - 요청 파라미터
     * @returns {Promise<RebootServerInstancesResponse>} 응답 결과
     * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-server-rebootserverinstances}
     */
    async rebootServerInstances(
        params: RebootServerInstancesRequest
    ): Promise<RebootServerInstancesResponse> {
        return await this.client.request({
            method: 'GET',
            url: `${this.resourcePath}/rebootServerInstances`,
            params,
        });
    }

    /**
     * 정지 상태의 서버 인스턴스(VM)를 반납합니다.
     * @param {TerminateServerInstancesRequest} params - 요청 파라미터
     * @returns {Promise<TerminateServerInstancesResponse>} 응답 결과
     * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-server-terminateserverinstances}
     */
    async terminateServerInstances(
        params: TerminateServerInstancesRequest
    ): Promise<TerminateServerInstancesResponse> {
        return await this.client.request({
            method: 'GET',
            url: `${this.resourcePath}/terminateServerInstances`,
            params,
        });
    }

    /**
     * 정지 상태의 서버 인스턴스(VM) 스펙을 변경합니다.
     * @param {ChangeServerInstanceSpecRequest} params - 요청 파라미터
     * @returns {Promise<ChangeServerInstanceSpecResponse>} 응답 결과
     * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-server-changeserverinstancespec}
     */
    async changeServerInstanceSpec(
        params: ChangeServerInstanceSpecRequest
    ): Promise<ChangeServerInstanceSpecResponse> {
        return await this.client.request({
            method: 'GET',
            url: `${this.resourcePath}/changeServerInstanceSpec`,
            params,
        });
    }

    /**
     * 서버 인스턴스(VM)의 로그인 키를 이용하여 root 계정의 비밀번호를 조회합니다.
     * privateKey를 입력하지 않으면 해당 서버 인스턴스의 암호화된 비밀번호를 조회합니다.
     * @param {GetRootPasswordRequest} params - 요청 파라미터
     * @returns {Promise<GetRootPasswordResponse>} 응답 결과
     * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-server-getrootpassword}
     */
    async getRootPassword(
        params: GetRootPasswordRequest
    ): Promise<GetRootPasswordResponse> {
        return await this.client.request({
            method: 'GET',
            url: `${this.resourcePath}/getRootPassword`,
            params,
        });
    }

    /**
     * 서버 인스턴스(VM)의 로그인 키를 이용하여 root 계정의 비밀번호를 리스트 형태로 조회합니다.
     * privateKey를 입력하지 않으면 해당 서버 인스턴스의 암호화된 비밀번호를 조회합니다.
     * @param {GetRootPasswordServerInstanceList} params - 요청 파라미터
     * @returns {Promise<GetRootPasswordServerInstanceListResponse>} 응답 결과
     * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-server-getrootpasswordserverinstancelist}
     */
    async getRootPasswordServerInstanceList(
        params: GetRootPasswordServerInstanceList
    ): Promise<GetRootPasswordServerInstanceListResponse> {
        return await this.client.request({
            method: 'GET',
            url: `${this.resourcePath}/getRootPasswordServerInstanceList`,
            params,
        });
    }

    /**
     * 서버 반납 보호 여부를 설정합니다.
     * @param {SetProtectServerTerminationRequest} params - 요청 파라미터
     * @returns {Promise<SetProtectServerTerminationResponse>} 응답 결과
     * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-server-setprotectservertermination}
     */
    async setProtectServerTermination(
        params: SetProtectServerTerminationRequest
    ): Promise<SetProtectServerTerminationResponse> {
        return await this.client.request({
            method: 'GET',
            url: `${this.resourcePath}/setProtectServerTermination`,
            params,
        });
    }

    /**
     * 이상 동작하는 서버 인스턴스(VM)의 진단을 위한 인터럽트를 실행합니다.
     * Windows 계열의 서버 인스턴스(VM) 만 지원합니다.
     * @param {InterruptServerInstanceRequest} params - 요청 파라미터
     * @returns {Promise<InterruptServerInstanceResponse>} 응답 결과
     * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-server-interruptserverinstance}
     */
    async interruptServerInstance(
        params: InterruptServerInstanceRequest
    ): Promise<InterruptServerInstanceResponse> {
        return await this.client.request({
            method: 'GET',
            url: `${this.resourcePath}/interruptServerInstance`,
            params,
        });
    }

    // server image
    /**
     * 서버 이미지 공유 권한을 제거합니다.
     * @param {RemoveServerImageSharingPermissionRequest} params - 요청 파라미터
     * @returns {Promise<RemoveServerImageSharingPermissionResponse>} 응답 결과
     * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-serverimage-removeserveimagesharingpermission}
     */
    async removeServerImageSharingPermission(
        params: RemoveServerImageSharingPermissionRequest
    ): Promise<RemoveServerImageSharingPermissionResponse> {
        return await this.client.request({
            method: 'GET',
            url: `${this.resourcePath}/removeServerImageSharingPermission`,
            params,
        });
    }

    /**
     * 서버 이미지 공유 권한을 추가합니다.
     * @param {AddServerImageSharingPermissionRequest} params - 요청 파라미터
     * @returns {Promise<AddServerImageSharingPermissionResponse>} 응답 결과
     * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-serverimage-addserverimagesharingpermission}
     */
    async addServerImageSharingPermission(
        params: AddServerImageSharingPermissionRequest
    ): Promise<AddServerImageSharingPermissionResponse> {
        return await this.client.request({
            method: 'GET',
            url: `${this.resourcePath}/addServerImageSharingPermission`,
            params,
        });
    }

    /**
     * 서버 이미지 리스트를 조회합니다.
     * @param {GetServerImageListRequest} params - 요청 파라미터
     * @returns {Promise<GetServerImageListResponse>} 응답 결과
     * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-serverimage-getserverimagelist}
     */
    async getServerImageList(
        params: GetServerImageListRequest
    ): Promise<GetServerImageListResponse> {
        return await this.client.request({
            method: 'GET',
            url: `${this.resourcePath}/getServerImageList`,
            params,
        });
    }

    /**
     * 서버 이미지 번호를 이용하여 서버 이미지 상세 정보를 조회합니다.
     * @param {GetServerImageDetailRequest} params - 요청 파라미터
     * @returns {Promise<GetServerImageDetailResponse>} 응답 결과
     * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-serverimage-getserverimagedetail}
     */
    async getServerImageDetail(
        params: GetServerImageDetailRequest
    ): Promise<GetServerImageDetailResponse> {
        return await this.client.request({
            method: 'GET',
            url: `${this.resourcePath}/getServerImageDetail`,
            params,
        });
    }

    /**
     * 스냅샷을 사용하여 내 서버 이미지를 생성합니다.
     * @param {CreateServerImageFromSnapshotRequest} params - 요청 파라미터
     * @returns {Promise<CreateServerImageFromSnapshotResponse>} 응답 결과
     * @see {@link https://api.ncloud-docs.com/docs/createserverimagefromsnapshot}
     */
    async createServerImageFromSnapshot(
        params: CreateServerImageFromSnapshotRequest
    ): Promise<CreateServerImageFromSnapshotResponse> {
        return await this.client.request({
            method: 'GET',
            url: `${this.resourcePath}/createServerImageFromSnapshot`,
            params,
        });
    }

    /**
     * 내 서버 이미지를 생성합니다.
     * @param {CreateServerImageRequest} params - 요청 파라미터
     * @returns {Promise<CreateServerImageResponse>} 응답 결과
     * @see {@link https://api.ncloud-docs.com/docs/createserverimage}
     */
    async createServerImage(
        params: CreateServerImageRequest
    ): Promise<CreateServerImageResponse> {
        return await this.client.request({
            method: 'GET',
            url: `${this.resourcePath}/createServerImage`,
            params,
        });
    }

    /**
     * 내 서버 이미지 리스트를 삭제합니다.
     * @param {DeleteServerImageRequest} params - 요청 파라미터
     * @returns {Promise<DeleteServerImageResponse>} 응답 결과
     * @see {@link https://api.ncloud-docs.com/docs/deleteserverimage}
     */
    async deleteServerImage(
        params: DeleteServerImageRequest
    ): Promise<DeleteServerImageResponse> {
        return await this.client.request({
            method: 'GET',
            url: `${this.resourcePath}/deleteServerImage`,
            params,
        });
    }

    /**
     * 회원 서버 이미지 인스턴스 리스트를 조회합니다.
     * KVM 서버의 내 서버 이미지는 지원되지 않습니다.
     * @param {GetMemberServerImageInstanceListRequest} params - 요청 파라미터
     * @returns {Promise<GetMemberServerImageInstanceListResponse>} 응답 결과
     * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-serverimage-getmemberserverimageinstancelist}
     */
    async getMemberServerImageInstanceList(
        params: GetMemberServerImageInstanceListRequest
    ): Promise<GetMemberServerImageInstanceListResponse> {
        return await this.client.request({
            method: 'GET',
            url: `${this.resourcePath}/getMemberServerImageInstanceList`,
            params,
        });
    }

    /**
     * 회원 서버 이미지 인스턴스 번호를 이용하여 회원 서버 이미지 인스턴스 상세 정보를 조회합니다.
     * KVM 서버의 내 서버 이미지는 지원되지 않습니다.
     * @param {GetMemberServerImageInstanceDetailRequest} params - 요청 파라미터
     * @returns {Promise<GetMemberServerImageInstanceDetailResponse>} 응답 결과
     * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-serverimage-getmemberserverimageinstancedetail}
     */
    async getMemberServerImageInstanceDetail(
        params: GetMemberServerImageInstanceDetailRequest
    ): Promise<GetMemberServerImageInstanceDetailResponse> {
        return await this.client.request({
            method: 'GET',
            url: `${this.resourcePath}/getMemberServerImageInstanceDetail`,
            params,
        });
    }

    /**
     * 정지/운영중 상태의 서버 인스턴스로부터 회원 서버 이미지 인스턴스를 생성합니다.
     * KVM 하이퍼바이저는 지원되지 않습니다.
     * @param {CreateMemberServerImageInstanceRequest} params - 요청 파라미터
     * @returns {Promise<CreateMemberServerImageInstanceResponse>} 응답 결과
     * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-serverimage-creatememberserverimageinstance}
     */
    async createMemberServerImageInstance(
        params: CreateMemberServerImageInstanceRequest
    ): Promise<CreateMemberServerImageInstanceResponse> {
        return await this.client.request({
            method: 'GET',
            url: `${this.resourcePath}/createMemberServerImageInstance`,
            params,
        });
    }

    /**
     * 회원 서버 이미지 인스턴스 리스트를 삭제합니다.
     * KVM 하이퍼바이저는 지원되지 않습니다.
     * @param {DeleteMemberServerImageInstancesRequest} params - 요청 파라미터
     * @returns {Promise<DeleteMemberServerImageInstancesResponse>} 응답 결과
     * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-serverimage-deletememberserverimageinstances}
     */
    async deleteMemberServerImageInstances(
        params: DeleteMemberServerImageInstancesRequest
    ): Promise<DeleteMemberServerImageInstancesResponse> {
        return await this.client.request({
            method: 'GET',
            url: `${this.resourcePath}/deleteMemberServerImageInstances`,
            params,
        });
    }

    /**
     * 회원 서버 이미지 공유 권한을 설정합니다.
     * @param {SetMemberServerImageSharingPermissionRequest} params - 요청 파라미터
     * @returns {Promise<SetMemberServerImageSharingPermissionResponse>} 응답 결과
     * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-serverimage-setmemberserverimagesharingpermission}
     */
    async setMemberServerImageSharingPermission(
        params: SetMemberServerImageSharingPermissionRequest
    ): Promise<SetMemberServerImageSharingPermissionResponse> {
        return await this.client.request({
            method: 'GET',
            url: `${this.resourcePath}/setMemberServerImageSharingPermission`,
            params,
        });
    }

    /**
     * 회원 서버 이미지 공유 권한을 추가합니다.
     * KVM 서버의 내 서버 이미지는 지원되지 않습니다.
     * @param {AddMemberServerImageSharingPermissionRequest} params - 요청 파라미터
     * @returns {Promise<AddMemberServerImageSharingPermissionResponse>} 응답 결과
     * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-serverimage-addmemberserverimagesharingpermission}
     */
    async addMemberServerImageSharingPermission(
        params: AddMemberServerImageSharingPermissionRequest
    ): Promise<AddMemberServerImageSharingPermissionResponse> {
        return await this.client.request({
            method: 'GET',
            url: `${this.resourcePath}/addMemberServerImageSharingPermission`,
            params,
        });
    }

    /**
     * 회원 서버 이미지 공유 권한을 제거합니다.
     * KVM 서버의 내 서버 이미지는 지원되지 않습니다.
     * @param {RemoveMemberServerImageSharingPermissionRequest} params - 요청 파라미터
     * @returns {Promise<RemoveMemberServerImageSharingPermissionResponse>} 응답 결과
     * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-serverimage-removememberserverimagesharingpermission}
     */
    async removeMemberServerImageSharingPermission(
        params: RemoveMemberServerImageSharingPermissionRequest
    ): Promise<RemoveMemberServerImageSharingPermissionResponse> {
        return await this.client.request({
            method: 'GET',
            url: `${this.resourcePath}/removeMemberServerImageSharingPermission`,
            params,
        });
    }

    // storage
    /**
     * 블록 스토리지 인스턴스 리스트를 조회합니다.
     * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-storage-getblockstorageinstancelist}
     * @param {GetBlockStorageInstanceListRequest} params 블록 스토리지 인스턴스 리스트 조회 요청 파라미터
     * @returns {Promise<GetBlockStorageInstanceListResponse>} 블록 스토리지 인스턴스 리스트 조회 결과
     */
    async getBlockStorageInstanceList(
        params: GetBlockStorageInstanceListRequest
    ): Promise<GetBlockStorageInstanceListResponse> {
        return await this.client.request({
            method: 'GET',
            url: `${this.resourcePath}/getBlockStorageInstanceList`,
            params,
        });
    }

    /**
     * 블록 스토리지 인스턴스 번호를 이용하여 블록 스토리지 인스턴스 상세 정보를 조회합니다.
     * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-storage-getblockstorageinstancedetail}
     * @param {GetBlockStorageInstanceDetailRequest} params 블록 스토리지 인스턴스 상세 정보 조회 요청 파라미터
     * @returns {Promise<GetBlockStorageInstanceDetailResponse>} 블록 스토리지 인스턴스 상세 정보 조회 결과
     */
    async getBlockStorageInstanceDetail(
        params: GetBlockStorageInstanceDetailRequest
    ): Promise<GetBlockStorageInstanceDetailResponse> {
        return await this.client.request({
            method: 'GET',
            url: `${this.resourcePath}/getBlockStorageInstanceDetail`,
            params,
        });
    }

    /**
     * 블록 스토리지 볼륨타입 리스트를 조회합니다.
     * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-storage-getblockstoragevolumetypelist}
     * @param {GetBlockStorageVolumeTypeListRequest} params 블록 스토리지 볼륨타입 리스트 조회 요청 파라미터
     * @returns {Promise<GetBlockStorageVolumeTypeListResponse>} 블록 스토리지 볼륨타입 리스트 조회 결과
     */
    async getBlockStorageVolumeTypeList(
        params: GetBlockStorageVolumeTypeListRequest
    ): Promise<GetBlockStorageVolumeTypeListResponse> {
        return await this.client.request({
            method: 'GET',
            url: `${this.resourcePath}/getBlockStorageVolumeTypeList`,
            params,
        });
    }

    /**
     * 블록 스토리지 인스턴스를 생성합니다.
     * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-storage-createblockstorageinstance}
     */
    async createBlockStorageInstance(
        params: CreateBlockStorageInstanceRequest
    ): Promise<BlockStorageInstanceResponse> {
        return await this.client.request({
            method: 'GET',
            url: `${this.resourcePath}/createBlockStorageInstance`,
            params,
        });
    }

    /**
     * 블록 스토리지 볼륨 사이즈를 변경합니다.
     * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-storage-changeblockstoragevolumesize}
     */
    async changeBlockStorageVolumeSize(
        params: ChangeBlockStorageVolumeSizeRequest
    ): Promise<BlockStorageInstanceResponse> {
        return await this.client.request({
            method: 'GET',
            url: `${this.resourcePath}/changeBlockStorageVolumeSize`,
            params,
        });
    }

    /**
     * 블록 스토리지 속성을 변경합니다.
     * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-storage-changeblockstorageinstance}
     */
    async changeBlockStorageInstance(
        params: ChangeBlockStorageInstanceRequest
    ): Promise<BlockStorageInstanceResponse> {
        return await this.client.request({
            method: 'GET',
            url: `${this.resourcePath}/changeBlockStorageInstance`,
            params,
        });
    }

    /**
     * 블록 스토리지 인스턴스 리스트를 삭제합니다.
     * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-storage-deleteblockstorageinstances}
     * @param {DeleteBlockStorageInstancesRequest} params 블록 스토리지 인스턴스 리스트 삭제 요청 파라미터
     * @returns {Promise<DeleteBlockStorageInstancesResponse>} 블록 스토리지 인스턴스 리스트 삭제 결과
     */
    async deleteBlockStorageInstances(
        params: DeleteBlockStorageInstancesRequest
    ): Promise<DeleteBlockStorageInstancesResponse> {
        return await this.client.request({
            method: 'GET',
            url: `${this.resourcePath}/deleteBlockStorageInstances`,
            params,
        });
    }

    /**
     * 블록 스토리지 인스턴스를 서버 인스턴스에 할당합니다.
     * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-storage-attachblockstorageinstance}
     * @param {AttachBlockStorageInstanceRequest} params 블록 스토리지 인스턴스 할당 요청 파라미터
     * @returns {Promise<AttachBlockStorageInstanceResponse>} 블록 스토리지 인스턴스 할당 결과
     */
    async attachBlockStorageInstance(
        params: AttachBlockStorageInstanceRequest
    ): Promise<AttachBlockStorageInstanceResponse> {
        return await this.client.request({
            method: 'GET',
            url: `${this.resourcePath}/attachBlockStorageInstance`,
            params,
        });
    }

    /**
     * 블록 스토리지 인스턴스 리스트를 서버 인스턴스에서 할당 해제합니다.
     * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-storage-detachblockstorageinstances}
     * @param {DetachBlockStorageInstancesRequest} params 블록 스토리지 인스턴스 리스트 할당 해제 요청 파라미터
     * @returns {Promise<DetachBlockStorageInstancesResponse>} 블록 스토리지 인스턴스 리스트 할당 해제 결과
     */
    async detachBlockStorageInstances(
        params: DetachBlockStorageInstancesRequest
    ): Promise<DetachBlockStorageInstancesResponse> {
        return await this.client.request({
            method: 'GET',
            url: `${this.resourcePath}/detachBlockStorageInstances`,
            params,
        });
    }

    /**
     * 블록 스토리지 반납 보호 여부를 설정합니다.
     * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-storage-setblockstoragereturnprotection}
     * @param {SetBlockStorageReturnProtectionRequest} params 블록 스토리지 반납 보호 여부 설정 요청 파라미터
     * @returns {Promise<SetBlockStorageReturnProtectionResponse>} 블록 스토리지 반납 보호 여부 설정 결과
     */
    async setBlockStorageReturnProtection(
        params: SetBlockStorageReturnProtectionRequest
    ): Promise<SetBlockStorageReturnProtectionResponse> {
        return await this.client.request({
            method: 'GET',
            url: `${this.resourcePath}/setBlockStorageReturnProtection`,
            params,
        });
    }

    // snapshot
    /**
     * 블록 스토리지 스냅샷 인스턴스 리스트를 조회합니다.
     * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-snapshot-getblockstoragesnapshotinstancelist}
     */
    async getBlockStorageSnapshotInstanceList(
        params: GetBlockStorageSnapshotInstanceListRequest
    ): Promise<GetBlockStorageSnapshotInstanceListResponse> {
        return await this.client.request({
            method: 'GET',
            url: `${this.resourcePath}/getBlockStorageSnapshotInstanceList`,
            params,
        });
    }

    /**
     * 블록 스토리지 스냅샷 인스턴스 번호를 이용하여 블록 스토리지 스냅샷 인스턴스 상세 정보를 조회합니다.
     * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-snapshot-getblockstoragesnapshotinstancedetail}
     */
    async getBlockStorageSnapshotInstanceDetail(
        params: GetBlockStorageSnapshotInstanceDetailRequest
    ): Promise<GetBlockStorageSnapshotInstanceDetailResponse> {
        return await this.client.request({
            method: 'GET',
            url: `${this.resourcePath}/getBlockStorageSnapshotInstanceDetail`,
            params,
        });
    }

    /**
     * 블록 스토리지 스냅샷 인스턴스를 생성합니다.
     * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-snapshot-createblockstoragesnapshotinstance}
     */
    async createBlockStorageSnapshotInstance(
        params: CreateBlockStorageSnapshotInstanceRequest
    ): Promise<CreateBlockStorageSnapshotInstanceResponse> {
        return await this.client.request({
            method: 'GET',
            url: `${this.resourcePath}/createBlockStorageSnapshotInstance`,
            params,
        });
    }

    /**
     * 블록 스토리지 스냅샷 인스턴스 리스트를 삭제합니다.
     * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-snapshot-deleteblockstoragesnapshotinstances}
     */
    async deleteBlockStorageSnapshotInstances(
        params: DeleteBlockStorageSnapshotInstancesRequest
    ): Promise<DeleteBlockStorageSnapshotInstancesResponse> {
        return await this.client.request({
            method: 'GET',
            url: `${this.resourcePath}/deleteBlockStorageSnapshotInstances`,
            params,
        });
    }

    // public ip
    /**
     * 공인 IP 인스턴스 리스트를 조회합니다.
     * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-publicip-getpublicipinstancelist}
     */
    async getPublicIpInstanceList(
        params: GetPublicIpInstanceListRequest
    ): Promise<GetPublicIpInstanceListResponse> {
        return await this.client.request({
            method: 'GET',
            url: `${this.resourcePath}/getPublicIpInstanceList`,
            params,
        });
    }

    /**
     * 공인 IP 인스턴스 번호를 이용하여 공인 IP 인스턴스 상세 정보를 조회합니다.
     * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-publicip-getpublicipinstancedetail}
     */
    async getPublicIpInstanceDetail(
        params: GetPublicIpInstanceDetailRequest
    ): Promise<GetPublicIpInstanceDetailResponse> {
        return await this.client.request({
            method: 'GET',
            url: `${this.resourcePath}/getPublicIpInstanceDetail`,
            params,
        });
    }

    /**
     * 공인 IP 인스턴스를 생성합니다.
     * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-publicip-createpublicipinstance}
     */
    async createPublicIpInstance(
        params: CreatePublicIpInstanceRequest
    ): Promise<CreatePublicIpInstanceResponse> {
        return await this.client.request({
            method: 'GET',
            url: `${this.resourcePath}/createPublicIpInstance`,
            params,
        });
    }

    /**
     * 공인 IP 인스턴스를 삭제합니다.
     * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-publicip-deletepublicipinstance}
     */
    async deletePublicIpInstance(
        params: DeletePublicIpInstanceRequest
    ): Promise<DeletePublicIpInstanceResponse> {
        return await this.client.request({
            method: 'GET',
            url: `${this.resourcePath}/deletePublicIpInstance`,
            params,
        });
    }

    /**
     * 공인 IP 인스턴스를 할당 가능한 서버 인스턴스 리스트를 조회합니다.
     * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-publicip-getpubliciptargetserverinstancelist}
     */
    async getPublicIpTargetServerInstanceList(
        params: GetPublicIpTargetServerInstanceListRequest
    ): Promise<GetPublicIpTargetServerInstanceListResponse> {
        return await this.client.request({
            method: 'GET',
            url: `${this.resourcePath}/getPublicIpTargetServerInstanceList`,
            params,
        });
    }

    /**
     * 공인 IP 인스턴스를 서버 인스턴스에 할당합니다.
     * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-publicip-associatepublicipwithserverinstance}
     */
    async associatePublicIpWithServerInstance(
        params: AssociatePublicIpWithServerInstanceRequest
    ): Promise<AssociatePublicIpWithServerInstanceResponse> {
        return await this.client.request({
            method: 'GET',
            url: `${this.resourcePath}/associatePublicIpWithServerInstance`,
            params,
        });
    }

    /**
     * 공인 IP 인스턴스를 서버 인스턴스에서 할당 해제합니다.
     * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-publicip-disassociatepublicipfromserverinstance}
     */
    async disassociatePublicIpFromServerInstance(
        params: DisassociatePublicIpFromServerInstanceRequest
    ): Promise<DisassociatePublicIpFromServerInstanceResponse> {
        return await this.client.request({
            method: 'GET',
            url: `${this.resourcePath}/disassociatePublicIpFromServerInstance`,
            params,
        });
    }

    // init script
    /**
     * 사용자가 생성한 초기화 스크립트 리스트를 조회합니다.
     * @param {GetInitScriptListRequest} params - 요청 파라미터
     * @returns {Promise<GetInitScriptListResponse>} 초기화 스크립트 리스트
     * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-initscript-getinitscriptlist}
     */
    async getInitScriptList(
        params: GetInitScriptListRequest
    ): Promise<GetInitScriptListResponse> {
        return await this.client.request({
            method: 'GET',
            url: `${this.resourcePath}/getInitScriptList`,
            params,
        });
    }

    /**
     * 초기화 스크립트 번호를 이용하여 초기화 스크립트 상세 정보를 조회합니다.
     * @param {GetInitScriptDetailRequest} params - 요청 파라미터
     * @returns {Promise<GetInitScriptDetailResponse>} 초기화 스크립트 상세 정보
     * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-initscript-getinitscriptdetail}
     */
    async getInitScriptDetail(
        params: GetInitScriptDetailRequest
    ): Promise<GetInitScriptDetailResponse> {
        return await this.client.request({
            method: 'GET',
            url: `${this.resourcePath}/vpc/v2/getInitScriptDetail`,
            params,
        });
    }

    /**
     * 초기화 스크립트를 생성합니다.
     * @param {CreateInitScriptRequest} params - 요청 파라미터
     * @returns {Promise<CreateInitScriptResponse>} 생성된 초기화 스크립트 정보
     * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-initscript-createinitscript}
     */
    async createInitScript(
        params: CreateInitScriptRequest
    ): Promise<CreateInitScriptResponse> {
        return await this.client.request({
            method: 'GET',
            url: `${this.resourcePath}/createInitScript`,
            params,
        });
    }

    /**
     * 초기화 스크립트 리스트를 삭제합니다.
     * @param {DeleteInitScriptsRequest} params - 요청 파라미터
     * @returns {Promise<DeleteInitScriptsResponse>} 삭제된 초기화 스크립트 정보
     * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-initscript-deleteinitscripts}
     */
    async deleteInitScripts(
        params: DeleteInitScriptsRequest
    ): Promise<DeleteInitScriptsResponse> {
        return await this.client.request({
            method: 'GET',
            url: `${this.resourcePath}/deleteInitScripts`,
            params,
        });
    }

    // network interface
    /**
     * 네트워크 인터페이스 리스트를 조회합니다.
     * @param {GetNetworkInterfaceListRequest} params - 요청 파라미터
     * @returns {Promise<GetNetworkInterfaceListResponse>} 네트워크 인터페이스 리스트
     * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-networkinterface-getnetworkinterfacelist}
     */
    async getNetworkInterfaceList(
        params: GetNetworkInterfaceListRequest
    ): Promise<GetNetworkInterfaceListResponse> {
        return await this.client.request({
            method: 'GET',
            url: `${this.resourcePath}/getNetworkInterfaceList`,
            params,
        });
    }

    /**
     * 네트워크 인터페이스에 할당된 보조 IP를 해제합니다.
     * @param {UnassignSecondaryIpsRequest} params - 요청 파라미터
     * @returns {Promise<UnassignSecondaryIpsResponse>} 보조 IP가 해제된 네트워크 인터페이스 정보
     * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-networkinterface-unassignsecondaryips}
     */
    async unassignSecondaryIps(
        params: UnassignSecondaryIpsRequest
    ): Promise<UnassignSecondaryIpsResponse> {
        return await this.client.request({
            method: 'GET',
            url: `${this.resourcePath}/unassignSecondaryIps`,
            params,
        });
    }

    /**
     * 네트워크 인터페이스에 보조 IP를 할당합니다.
     * @param {AssignSecondaryIpsRequest} params - 요청 파라미터
     * @returns {Promise<AssignSecondaryIpsResponse>} 보조 IP가 할당된 네트워크 인터페이스 정보
     * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-networkinterface-assignsecondaryips}
     */
    async assignSecondaryIps(
        params: AssignSecondaryIpsRequest
    ): Promise<AssignSecondaryIpsResponse> {
        return await this.client.request({
            method: 'GET',
            url: `${this.resourcePath}/assignSecondaryIps`,
            params,
        });
    }

    /**
     * 네트워크 인터페이스 번호를 이용하여 네트워크 인터페이스 상세 정보를 조회합니다.
     * @param {GetNetworkInterfaceDetailRequest} params - 요청 파라미터
     * @returns {Promise<GetNetworkInterfaceDetailResponse>} 네트워크 인터페이스 상세 정보
     * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-networkinterface-getnetworkinterfacedetail}
     */
    async getNetworkInterfaceDetail(
        params: GetNetworkInterfaceDetailRequest
    ): Promise<GetNetworkInterfaceDetailResponse> {
        return await this.client.request({
            method: 'GET',
            url: `${this.resourcePath}/getNetworkInterfaceDetail`,
            params,
        });
    }

    /**
     * 네트워크 인터페이스를 생성합니다.
     * @param {CreateNetworkInterfaceRequest} params - 요청 파라미터
     * @returns {Promise<CreateNetworkInterfaceResponse>} 생성된 네트워크 인터페이스 정보
     * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-networkinterface-createnetworkinterface}
     */
    async createNetworkInterface(
        params: CreateNetworkInterfaceRequest
    ): Promise<CreateNetworkInterfaceResponse> {
        return await this.client.request({
            method: 'GET',
            url: `${this.resourcePath}/createNetworkInterface`,
            params,
        });
    }

    /**
     * 네트워크 인터페이스를 삭제합니다.
     * @param {DeleteNetworkInterfaceRequest} params - 요청 파라미터
     * @returns {Promise<DeleteNetworkInterfaceResponse>} 삭제된 네트워크 인터페이스 정보
     * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-networkinterface-deletenetworkinterface}
     */
    async deleteNetworkInterface(
        params: DeleteNetworkInterfaceRequest
    ): Promise<DeleteNetworkInterfaceResponse> {
        return await this.client.request({
            method: 'GET',
            url: `${this.resourcePath}/deleteNetworkInterface`,
            params,
        });
    }

    /**
     * 서버 인스턴스에 네트워크 인터페이스를 할당합니다.
     * @param {AttachNetworkInterfaceRequest} params - 요청 파라미터
     * @returns {Promise<AttachNetworkInterfaceResponse>} 할당된 네트워크 인터페이스 정보
     * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-networkinterface-attachnetworkinterface}
     */
    async attachNetworkInterface(
        params: AttachNetworkInterfaceRequest
    ): Promise<AttachNetworkInterfaceResponse> {
        return await this.client.request({
            method: 'GET',
            url: `${this.resourcePath}/attachNetworkInterface`,
            params,
        });
    }

    /**
     * 서버 인스턴스에 할당된 네트워크 인터페이스를 해제합니다.
     * @param {DetachNetworkInterfaceRequest} params - 요청 파라미터
     * @returns {Promise<DetachNetworkInterfaceResponse>} 해제된 네트워크 인터페이스 정보
     * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-networkinterface-detachnetworkinterface}
     */
    async detachNetworkInterface(
        params: DetachNetworkInterfaceRequest
    ): Promise<DetachNetworkInterfaceResponse> {
        return await this.client.request({
            method: 'GET',
            url: `${this.resourcePath}/detachNetworkInterface`,
            params,
        });
    }

    /**
     * 네트워크 인터페이스에 적용될 ACG 리스트를 추가합니다. 네트워크 인터페이스당 최대 3개의 ACG를 적용할 수 있습니다.
     * @param {AddNetworkInterfaceAccessControlGroupRequest} params - 요청 파라미터
     * @returns {Promise<AddNetworkInterfaceAccessControlGroupResponse>} 네트워크 인터페이스 정보를 포함한 응답
     * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-networkinterface-addnetworkinterfaceaccesscontrolgroup}
     */
    async addNetworkInterfaceAccessControlGroup(
        params: AddNetworkInterfaceAccessControlGroupRequest
    ): Promise<AddNetworkInterfaceAccessControlGroupResponse> {
        return await this.client.request({
            method: 'GET',
            url: `${this.resourcePath}/addNetworkInterfaceAccessControlGroup`,
            params,
        });
    }

    /**
     * 네트워크 인터페이스에 적용된 ACG 리스트를 제거합니다. 네트워크 인터페이스당 최소 1개의 ACG가 적용되어야 합니다.
     * @param {RemoveNetworkInterfaceAccessControlGroupRequest} params - 요청 파라미터
     * @returns {Promise<RemoveNetworkInterfaceAccessControlGroupResponse>} 네트워크 인터페이스 정보를 포함한 응답
     * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-networkinterface-removenetworkinterfaceaccesscontrolgroup}
     */
    async removeNetworkInterfaceAccessControlGroup(
        params: RemoveNetworkInterfaceAccessControlGroupRequest
    ): Promise<RemoveNetworkInterfaceAccessControlGroupResponse> {
        return await this.client.request({
            method: 'GET',
            url: `${this.resourcePath}/removeNetworkInterfaceAccessControlGroup`,
            params,
        });
    }

    /**
     * FlowLog를 활성화합니다.
     * @param {EnableFlowLogRequest} params - 요청 파라미터
     * @returns {Promise<EnableFlowLogResponse>} FlowLog 설정 정보를 포함한 응답
     * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-networkinterface-enableflowlog}
     */
    async enableFlowLog(
        params: EnableFlowLogRequest
    ): Promise<EnableFlowLogResponse> {
        return await this.client.request({
            method: 'GET',
            url: `${this.resourcePath}/enableFlowLog`,
            params,
        });
    }

    /**
     * FlowLog를 비활성화 합니다.
     * @param {DisableFlowLogRequest} params - 요청 파라미터
     * @returns {Promise<DisableFlowLogResponse>} FlowLog 설정 정보를 포함한 응답
     * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-networkinterface-disableflowlog}
     */
    async disableFlowLog(
        params: DisableFlowLogRequest
    ): Promise<DisableFlowLogResponse> {
        return await this.client.request({
            method: 'GET',
            url: `${this.resourcePath}/disableFlowLog`,
            params,
        });
    }

    /**
     * FlowLog 설정 정보를 조회합니다.
     * @param {GetFlowLogConfigurationListRequest} params - 요청 파라미터
     * @returns {Promise<GetFlowLogConfigurationListResponse>} FlowLog 설정 정보를 포함한 응답
     * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-networkinterface-getflowlogconfigurationlist}
     */
    async getFlowLogConfigurationList(
        params: GetFlowLogConfigurationListRequest
    ): Promise<GetFlowLogConfigurationListResponse> {
        return await this.client.request({
            method: 'GET',
            url: `${this.resourcePath}/getFlowLogConfigurationList`,
            params,
        });
    }

    // access control group
    /**
     * ACG 리스트를 조회합니다. ACG는 네트워크 인터페이스에 설정하여 접근 제어 기능을 할 수 있습니다.
     * @param {GetAccessControlGroupListRequest} params - 요청 파라미터
     * @returns {Promise<GetAccessControlGroupListResponse>} ACG 리스트 정보를 포함한 응답
     * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-acg-getaccesscontrolgrouplist}
     */
    async getAccessControlGroupList(
        params: GetAccessControlGroupListRequest
    ): Promise<GetAccessControlGroupListResponse> {
        return await this.client.request({
            method: 'GET',
            url: `${this.resourcePath}/getAccessControlGroupList`,
            params,
        });
    }

    /**
     * ACG 번호를 이용하여 ACG 상세 정보를 조회합니다.
     * @param {GetAccessControlGroupDetailRequest} params - 요청 파라미터
     * @returns {Promise<GetAccessControlGroupDetailResponse>} ACG 상세 정보를 포함한 응답
     * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-acg-getaccesscontrolgroupdetail}
     */
    async getAccessControlGroupDetail(
        params: GetAccessControlGroupDetailRequest
    ): Promise<GetAccessControlGroupDetailResponse> {
        return await this.client.request({
            method: 'GET',
            url: `${this.resourcePath}/getAccessControlGroupDetail`,
            params,
        });
    }

    /**
     * ACG를 생성합니다.
     * @param {CreateAccessControlGroupRequest} params - 요청 파라미터
     * @returns {Promise<CreateAccessControlGroupResponse>} 생성된 ACG 정보를 포함한 응답
     * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-acg-createaccesscontrolgroup}
     */
    async createAccessControlGroup(
        params: CreateAccessControlGroupRequest
    ): Promise<CreateAccessControlGroupResponse> {
        return await this.client.request({
            method: 'GET',
            url: `${this.resourcePath}/createAccessControlGroup`,
            params,
        });
    }

    /**
     * ACG를 삭제합니다.
     * @param {DeleteAccessControlGroupRequest} params - 요청 파라미터
     * @returns {Promise<DeleteAccessControlGroupResponse>} 삭제된 ACG 정보를 포함한 응답
     * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-acg-deleteaccesscontrolgroup}
     */
    async deleteAccessControlGroup(
        params: DeleteAccessControlGroupRequest
    ): Promise<DeleteAccessControlGroupResponse> {
        return await this.client.request({
            method: 'GET',
            url: `${this.resourcePath}/deleteAccessControlGroup`,
            params,
        });
    }

    /**
     * ACG 번호를 이용하여 ACG의 Rule 리스트를 조회합니다.
     * @param {GetAccessControlGroupRuleListRequest} params - 요청 파라미터
     * @returns {Promise<GetAccessControlGroupRuleListResponse>} ACG Rule 리스트 정보를 포함한 응답
     * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-acg-getaccesscontrolgrouprulelist}
     */
    async getAccessControlGroupRuleList(
        params: GetAccessControlGroupRuleListRequest
    ): Promise<GetAccessControlGroupRuleListResponse> {
        return await this.client.request({
            method: 'GET',
            url: `${this.resourcePath}/getAccessControlGroupRuleList`,
            params,
        });
    }

    /**
     * ACG의 Inbound Rule 리스트를 추가합니다.
     * @param {AddAccessControlGroupInboundRuleRequest} params - 요청 파라미터
     * @returns {Promise<AddAccessControlGroupInboundRuleResponse>} 추가된 Inbound Rule 리스트 정보를 포함한 응답
     * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-acg-addaccesscontrolgroupinboundrule}
     */
    async addAccessControlGroupInboundRule(
        params: AddAccessControlGroupInboundRuleRequest
    ): Promise<AddAccessControlGroupInboundRuleResponse> {
        return await this.client.request({
            method: 'GET',
            url: `${this.resourcePath}/addAccessControlGroupInboundRule`,
            params,
        });
    }

    /**
     * ACG의 Outbound Rule 리스트를 추가합니다.
     * @param {AddAccessControlGroupOutboundRuleRequest} params - 요청 파라미터
     * @returns {Promise<AddAccessControlGroupOutboundRuleResponse>} 추가된 Outbound Rule 리스트 정보를 포함한 응답
     * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-acg-addaccesscontrolgroupoutboundrule}
     */
    async addAccessControlGroupOutboundRule(
        params: AddAccessControlGroupOutboundRuleRequest
    ): Promise<AddAccessControlGroupOutboundRuleResponse> {
        return await this.client.request({
            method: 'GET',
            url: `${this.resourcePath}/addAccessControlGroupOutboundRule`,
            params,
        });
    }

    /**
     * ACG의 Inbound Rule 리스트를 제거합니다.
     * @param {RemoveAccessControlGroupInboundRuleRequest} params - 요청 파라미터
     * @returns {Promise<RemoveAccessControlGroupInboundRuleResponse>} 제거된 Inbound Rule 리스트 정보를 포함한 응답
     * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-acg-removeaccesscontrolgroupinboundrule}
     */
    async removeAccessControlGroupInboundRule(
        params: RemoveAccessControlGroupInboundRuleRequest
    ): Promise<RemoveAccessControlGroupInboundRuleResponse> {
        return await this.client.request({
            method: 'GET',
            url: `${this.resourcePath}/removeAccessControlGroupInboundRule`,
            params,
        });
    }

    /**
     * ACG의 Inbound Rule 리스트를 제거합니다.
     * @param {RemoveAccessControlGroupInboundRuleRequest} params - 요청 파라미터
     * @returns {Promise<RemoveAccessControlGroupInboundRuleResponse>} 제거된 Inbound Rule 리스트 정보를 포함한 응답
     * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-acg-removeaccesscontrolgroupinboundrule}
     */
    async removeAccessControlGroupInboundRule(
        params: RemoveAccessControlGroupInboundRuleRequest
    ): Promise<RemoveAccessControlGroupInboundRuleResponse> {
        return await this.client.request({
            method: 'GET',
            url: `${this.resourcePath}/removeAccessControlGroupInboundRule`,
            params,
        });
    }
}
