/**
 * 서브넷 생성을 위한 요청 객체
 */
export interface CreateSubnetRequest {
    /**
     * Subnet이 생성될 리전 코드.
     * 조회 결과의 첫 번째 리전(기본값).
     * getRegionList를 통해 확인 가능.
     * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-server-common-getregionlist}<br>
     *
     * Optional
     */
    regionCode?: string;

    /**
     * Subnet이 생성될 존 코드.
     * getZoneList를 통해 확인 가능.
     * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-server-common-getregionlist}<br>
     *
     * Required
     */
    zoneCode: string;

    /**
     * Subnet을 포함할 VPC의 고유 식별 번호.
     * getVpcList를 통해 확인 가능.
     * @see {@link https://api.ncloud-docs.com/docs/networking-vpc-vpcmanagement-getvpclist}<br>
     *
     * Required
     */
    vpcNo: string;

    /**
     * 생성하려는 Subnet 이름.
     * 만약 요청할 때 해당 프로퍼티가 없다면, 네이버 클라우드가 자동으로 부여(기본값).
     * 3~30자로 영문 소문자, 숫자, 특수 문자 '-'를 허용하며 영문자로 시작해서 영문자 또는 숫자로 끝나야 함.
     *
     * Optional
     */
    subnetName?: string;

    /**
     * Subnet의 IP 주소 범위.
     * /16~/28.
     * Private 대역(10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16) 사용.
     *
     * Required
     */
    subnet: string;

    /**
     * Subnet에 적용될 네트워크 ACL 번호.
     * getNetworkAclList를 통해 확인 가능.
     * @see {@link https://api.ncloud-docs.com/docs/networking-vpc-networkacl-getnetworkacllist}<br>
     *
     * Required
     */
    networkAclNo: string;

    /**
     * Subnet의 유형 코드.
     *
     * Required
     * - 'PUBLIC': 인터넷 게이트웨이 허용.
     * - 'PRIVATE': 인터넷 게이트웨이 비허용.
     */
    subnetTypeCode: 'PUBLIC' | 'PRIVATE';

    /**
     * Subnet의 용도 유형 코드.
     *
     * Optional
     * - 'GEN': 일반 용도.
     * - 'LOADB': 로드밸런서 전용 용도.
     * - 'BM': 베어메탈 전용 용도.
     * - 'NATGW': NAT 게이트웨이 전용 용도
     */
    usageTypeCode?: 'GEN' | 'LOADB' | 'BM' | 'NATGW';

    /**
     * 응답 결과의 형식 (JSON 또는 XML).
     *
     * Optional
     * @default "json"
     */
    responseFormatType?: string;
}
