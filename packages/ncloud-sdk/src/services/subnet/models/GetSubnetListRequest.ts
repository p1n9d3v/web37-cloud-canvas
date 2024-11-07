import { SubnetNoList } from './SubnetNoList';

/**
 * 서브넷 목록을 조회하기 위한 요청 객체
 */
export interface GetSubnetListRequest {
    /**
     * Subnet 목록을 조회하려는 리전 코드.
     * 조회 결과의 첫 번째 리전(기본값).
     * getRegionList를 통해 확인 가능.
     *
     * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-server-common-getregionlist}<br>
     *
     * Optional
     */
    regionCode?: string;

    /**
     * Subnet 번호로 목록 조회.
     * subnetNo는 getSubnetList를 통해 확인 가능.
     *
     * @see {@link https://api.ncloud-docs.com/docs/networking-vpc-subnetmanagement-getsubnetlist}<br>
     * @see {@link SubnetNoList}<br>
     *
     * Optional
     * @example subnetNoList.1=1234&subnetNoList.2=2345
     */
    subnetNoList?: SubnetNoList;

    /**
     * Subnet 이름으로 목록 조회.
     *
     * Optional
     */
    subnetName?: string;

    /**
     * 	Subnet IP 주소 범위로 목록 조회.
     *
     * Optional
     * @example subnet=10.0.0.0/24
     */
    subnet?: string;

    /**
     * Subnet 유형 코드로 목록 조회.
     *
     * Optional
     * - PUBLIC
     * - PRIVATE
     */
    subnetTypeCode?: string;

    /**
     * Subnet 용도 유형 코드로 Subnet 목록 조회.
     *
     * Optional
     * - GEN: 일반
     * - LOADB: 로드밸런서 전용
     * - BM: 베어메탈 전용
     * - NATGW: NAT Gateway 전용
     */
    usageTypeCode?: string;

    /**
     * Subnet에 적용된 Network ACL 번호로 Subnet 목록 조회.
     * networkAclNo는 getNetworkAclList를 통해 확인 가능.
     *
     * @see {@link https://api.ncloud-docs.com/docs/networking-vpc-networkacl-getnetworkacllist}<br>
     *
     * Optional
     */
    networkAclNo?: string;

    /**
     * 페이징된 결과의 페이지 번호.
     * pageNo, pageSize를 이용하여 결과값을 페이징 처리.
     *
     * Optional
     */
    pageNo?: number;

    /**
     * 페이징 시 보여줄 각 페이지 크기.
     * pageNo 입력 시 필수.
     * pageNo, pageSize를 이용하여 결과값을 페이징 처리.
     *
     * Optional
     */
    pageSize?: number;

    /**
     * Subnet 상태 코드로 Subnet 목록 조회.
     *
     * Optional
     * - INIT
     * - CREATING
     * - RUN
     * - TERMTING
     */
    subnetStatusCode?: string;

    /**
     * VPC 번호로 Subnet 목록 조회.
     * getVpcList를 통해 확인 가능.
     *
     * @see {@link https://api.ncloud-docs.com/docs/networking-vpc-vpcmanagement-getvpclist}<br>
     *
     * Optional
     */
    vpcNo?: string;

    /**
     * 존 코드로 Subnet 목록 조회.
     * getZoneList를 통해 확인 가능.
     *
     * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-server-common-getzonelist}<br>
     *
     * Optional
     */
    zoneCode?: string;

    /**
     * 응답 결과의 형식 (JSON 또는 XML).
     *
     * Optional
     * @default "json"
     */
    responseFormatType?: string;
}
