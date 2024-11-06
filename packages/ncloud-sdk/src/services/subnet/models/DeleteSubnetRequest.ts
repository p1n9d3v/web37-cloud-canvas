/**
 * 서브넷 삭제를 위한 요청 객체
 */
export interface DeleteSubnetRequest {
    /**
     * 삭제하려는 Subnet의 리전 코드.
     * 조회 결과의 첫 번째 리전(기본값).
     * getRegionList를 통해 확인 가능.
     *
     * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-server-common-getregionlist}<br>
     *
     * Optional
     */
    regionCode?: string;

    /**
     * 삭제하려는 Subnet 번호.
     * getSubnetList를 통해 확인 가능.
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
