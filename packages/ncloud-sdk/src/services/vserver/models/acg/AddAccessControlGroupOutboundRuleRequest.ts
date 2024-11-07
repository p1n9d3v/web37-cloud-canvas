/**
 * ACG의 Outbound Rule 리스트 추가 요청 타입
 * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-acg-addaccesscontrolgroupoutboundrule}
 */
export type AddAccessControlGroupOutboundRuleRequest = {
    /**
     * 리전 코드
     * Outbound Rule이 추가될 ACG의 리전(Region) 결정 가능
     * regionCode는 {@link https://api.ncloud-docs.com/docs/compute-vserver-server-common-getregionlist} 액션을 통해 획득 가능
     * Default : getRegionList 조회 결과의 첫 번째 리전을 선택
     */
    regionCode?: string;

    /**
     * VPC 번호
     * Outbound Rule이 추가될 ACG의 VPC를 결정함
     * vpcNo는 {@link https://api.ncloud-docs.com/docs/networking-vpc-vpcmanagement-getvpclist} 액션을 통해 획득 가능
     */
    vpcNo: string;

    /**
     * ACG 번호
     * accessControlGroupNo는 {@link https://api.ncloud-docs.com/docs/compute-vserver-acg-getaccesscontrolgrouplist} 액션을 통해 획득 가능
     */
    accessControlGroupNo: string;

    /**
     * ACG Rule 리스트
     */
    accessControlGroupRuleList: Array<{
        /**
         * ACG Rule의 프로토콜 유형 코드
         * {@link https://www.iana.org/assignments/protocol-numbers/protocol-numbers.xhtml 프로토콜 번호}는 1-254까지 허용
         * Options : TCP | UDP | ICMP | 1-254
         */
        protocolTypeCode: string;

        /**
         * ACG Rule의 접근 소스 IP 주소 블록
         * 접근 소스를 IP 주소 블록과 ACG 번호중 한 가지로 등록 가능.
         * ex) 0.0.0.0/0, 100.10.20.0/24, 192.168.0.10/32
         */
        ipBlock?: string;

        /**
         * ACG Rule의 접근 소스 ACG 번호
         * 접근 소스를 IP 주소 블록과 ACG 번호중 한 가지로 등록 가능
         * accessControlGroupNo는 {@link https://api.ncloud-docs.com/docs/compute-vserver-acg-getaccesscontrolgrouplist} 액션을 통해 획득 가능
         */
        accessControlGroupSequence?: string;

        /**
         * ACG Rule의 포트 범위
         * ex1) 단일 포트 : 22
         * ex2) 범위 지정 : 1-65535
         * protocolTypeCode가 TCP(6),UDP(17) 인 경우를 제외하고는 포트 범위를 입력하지 않음
         */
        portRange?: string;

        /**
         * ACG Rule의 설명
         */
        accessControlGroupRuleDescription?: string;
    }>;

    /**
     * 응답 결과의 포맷 타입
     * Options : xml | json
     * Default : xml
     */
    responseFormatType?: 'xml' | 'json';
};
