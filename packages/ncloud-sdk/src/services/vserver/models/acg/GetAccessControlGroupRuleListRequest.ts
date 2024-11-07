/**
 * ACG의 Rule 리스트 조회 요청 타입
 * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-acg-getaccesscontrolgrouprulelist}
 */
export type GetAccessControlGroupRuleListRequest = {
    /**
     * 리전 코드
     * ACG의 Rule 리스트가 조회될 리전(Region) 결정 가능
     * regionCode는 {@link https://api.ncloud-docs.com/docs/compute-vserver-server-common-getregionlist} 액션을 통해 획득 가능
     * Default : getRegionList 조회 결과의 첫 번째 리전을 선택
     */
    regionCode?: string;

    /**
     * ACG 번호
     * accessControlGroupNo는 {@link https://api.ncloud-docs.com/docs/compute-vserver-acg-getaccesscontrolgrouplist} 액션을 통해 획득 가능
     */
    accessControlGroupNo: string;

    /**
     * ACG Rule 유형 코드
     * ACG Rule 유형 코드로 필터링하여 검색 가능
     * Options : INBND (Inbound 규칙) | OTBND (Outbound 규칙)
     * Default : ACG의 모든 Rule 조회
     */
    accessControlGroupRuleTypeCode?: 'INBND' | 'OTBND';

    /**
     * 응답 결과의 포맷 타입
     * Options : xml | json
     * Default : xml
     */
    responseFormatType?: 'xml' | 'json';
};
