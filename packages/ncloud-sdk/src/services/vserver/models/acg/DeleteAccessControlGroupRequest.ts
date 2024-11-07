/**
 * ACG 삭제 요청 타입
 * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-acg-deleteaccesscontrolgroup}
 */
export type DeleteAccessControlGroupRequest = {
    /**
     * 리전 코드
     * 삭제할 ACG의 리전(Region)결정 가능
     * regionCode는 {@link https://api.ncloud-docs.com/docs/compute-vserver-server-common-getregionlist} 액션을 통해 획득 가능
     * Default : getRegionList 조회 결과의 첫 번째 리전을 선택
     */
    regionCode?: string;

    /**
     * VPC 번호
     * 삭제할 ACG의 VPC 결정
     * vpcNo는 {@link https://api.ncloud-docs.com/docs/networking-vpc-vpcmanagement-getvpclist} 액션을 통해 획득 가능
     */
    vpcNo: string;

    /**
     * 삭제할 ACG 번호
     * accessControlGroupNo는 {@link https://api.ncloud-docs.com/docs/compute-vserver-acg-getaccesscontrolgrouplist} 액션을 통해 획득 가능
     */
    accessControlGroupNo: string;

    /**
     * 응답 결과의 포맷 타입
     * Options : xml | json
     * Default : xml
     */
    responseFormatType?: 'xml' | 'json';
};
