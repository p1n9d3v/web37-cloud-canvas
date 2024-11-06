/**
 * 공인 IP 인스턴스 상세 정보 조회 요청
 * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-publicip-getpublicipinstancedetail}
 */
export type GetPublicIpInstanceDetailRequest = {
    /**
     * 리전 코드
     * 공인 IP 인스턴스 상세 정보가 조회될 리전(Region) 결정 가능
     * regionCode는 {@link https://api.ncloud-docs.com/docs/compute-vserver-server-common-getregionlist} 액션을 통해 획득 가능
     * Default : getRegionList 조회 결과의 첫 번째 리전을 선택
     */
    regionCode?: string;

    /**
     * 조회할 공인 IP 인스턴스 번호
     * publicIpInstanceNo는 {@link https://api.ncloud-docs.com/docs/compute-vserver-publicip-getpublicipinstancelist} 액션을 통해 획득 가능
     */
    publicIpInstanceNo: string;

    /**
     * 응답 결과의 포맷 타입
     * Options : xml | json
     * Default : xml
     */
    responseFormatType?: 'xml' | 'json';
};
