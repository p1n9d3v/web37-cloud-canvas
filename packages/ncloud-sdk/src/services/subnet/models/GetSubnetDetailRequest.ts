/**
 * 서브넷 상세 정보 조회를 위한 요청 객체
 */
export interface GetSubnetDetailRequest {
    /**
     * Subnet 상세 정보를 조회하려는 리전 코드.
     * 조회 결과의 첫 번째 리전(기본값).
     * getRegionList를 통해 확인 가능.
     *
     * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-server-common-getregionlist}<br>
     *
     * Optional
     */
    regionCode?: string;

    /**
     * Subnet 번호로 Subnet 상세 정보 조회.
     * subnetNo는 getSubnetList를 통해 확인 가능.
     *
     * @see {@link https://api.ncloud-docs.com/docs/networking-vpc-subnetmanagement-getsubnetlist}<br>
     *
     * Required
     */
    subnetNo: string;

    /**
     * 응답 결과의 형식 (JSON 또는 XML).
     *
     * Optional
     * @default "json"
     */
    responseFormatType?: string;
}
