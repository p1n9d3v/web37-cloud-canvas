/**
 * ACG 리스트 조회 요청 타입
 * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-acg-getaccesscontrolgrouplist}
 */
export type GetAccessControlGroupListRequest = {
    /**
     * 리전 코드
     * ACG 리스트가 조회될 리전(Region) 결정 가능
     * regionCode는 {@link https://api.ncloud-docs.com/docs/compute-vserver-server-common-getregionlist} 액션을 통해 획득 가능
     * Default : getRegionList 조회 결과의 첫 번째 리전을 선택
     */
    regionCode?: string;

    /**
     * VPC 번호
     * VPC 번호로 필터링하여 검색 가능
     * vpcNo는 {@link https://api.ncloud-docs.com/docs/networking-vpc-vpcmanagement-getvpclist} 액션을 통해 획득 가능
     */
    vpcNo?: string;

    /**
     * ACG 번호 리스트
     * ACG 번호로 필터링하여 검색 가능
     * accessControlGroupNo는 {@link https://api.ncloud-docs.com/docs/compute-vserver-acg-getaccesscontrolgrouplist} 액션을 통해 획득 가능
     * ex) accessControlGroupNoList.1=1234&accessControlGroupNoList.2=2345
     */
    accessControlGroupNoList?: string[];

    /**
     * ACG 이름
     * ACG 이름으로 필터링하여 검색 가능
     */
    accessControlGroupName?: string;

    /**
     * ACG 상태 코드
     * ACG 상태 코드로 필터링하여 검색 가능
     * Options : INIT | SET | RUN | TERMTING
     */
    accessControlGroupStatusCode?: 'INIT' | 'SET' | 'RUN' | 'TERMTING';

    /**
     * 페이징된 결과의 페이지 번호
     * 결과값을 pageNo, pageSize를 이용하여 페이징 처리 가능
     */
    pageNo?: number;

    /**
     * 페이징 시 보여줄 각 페이지 사이즈
     * 결과값을 pageNo, pageSize를 이용하여 페이징 처리 가능
     * pageNo 입력시 반드시 입력 필요
     */
    pageSize?: number;

    /**
     * 응답 결과의 포맷 타입
     * Options : xml | json
     * Default : xml
     */
    responseFormatType?: 'xml' | 'json';
};
