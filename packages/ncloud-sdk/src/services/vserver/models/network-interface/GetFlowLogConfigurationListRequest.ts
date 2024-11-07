/**
 * FlowLog 설정 정보 조회 요청 타입
 * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-networkinterface-getflowlogconfigurationlist}
 */
export type GetFlowLogConfigurationListRequest = {
    /**
     * 리전 코드
     * 네트워크 인터페이스 리스트가 조회될 리전(Region) 결정 가능
     * regionCode는 {@link https://api.ncloud-docs.com/docs/compute-vserver-server-common-getregionlist} 액션을 통해 획득 가능
     * Default : getRegionList 조회 결과의 첫 번째 리전을 선택
     */
    regionCode?: string;

    /**
     * 네트워크 인터페이스 번호 리스트
     * 네트워크 인터페이스 번호로 필터링하여 검색 가능
     * networkInterfaceNo는 {@link https://api.ncloud-docs.com/docs/compute-vserver-networkinterface-getnetworkinterfacelist} 액션을 통해 획득 가능
     * ex) networkInterfaceNoList.1=1234&networkInterfaceNoList.2=2345
     */
    networkInterfaceNoList: string[];

    /**
     * 응답 결과의 포맷 타입
     * Options : xml | json
     * Default : xml
     */
    responseFormatType?: 'xml' | 'json';
};
