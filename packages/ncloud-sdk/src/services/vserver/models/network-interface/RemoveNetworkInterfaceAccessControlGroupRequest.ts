/**
 * 네트워크 인터페이스에 적용된 ACG 리스트를 제거하는 요청 타입
 * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-networkinterface-removenetworkinterfaceaccesscontrolgroup}
 */
export type RemoveNetworkInterfaceAccessControlGroupRequest = {
    /**
     * 리전 코드
     * ACG를 제거할 네트워크 인터페이스의 리전(Region) 결정 가능
     * regionCode는 {@link https://api.ncloud-docs.com/docs/compute-vserver-server-common-getregionlist} 액션을 통해 획득 가능
     * Default : getRegionList 조회 결과의 첫 번째 리전을 선택
     */
    regionCode?: string;

    /**
     * ACG를 제거할 네트워크 인터페이스 번호
     * networkInterfaceNo는 {@link https://api.ncloud-docs.com/docs/compute-vserver-networkinterface-getnetworkinterfacelist} 액션을 통해 획득 가능
     */
    networkInterfaceNo: string;

    /**
     * 제거할 ACG 번호 리스트
     * accessControlGroupNo는 {@link https://api.ncloud-docs.com/docs/compute-vserver-acg-getaccesscontrolgrouplist} 액션을 통해 획득 가능
     * ex) accessControlGroupNoList.1=1234&accessControlGroupNoList.2=2345
     */
    accessControlGroupNoList: string[];

    /**
     * 응답 결과의 포맷 타입
     * Options : xml | json
     * Default : xml
     */
    responseFormatType?: 'xml' | 'json';
};
