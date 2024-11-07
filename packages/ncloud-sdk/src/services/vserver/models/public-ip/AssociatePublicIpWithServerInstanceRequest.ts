/**
 * 공인 IP 인스턴스를 서버 인스턴스에 할당 요청
 * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-publicip-associatepublicipwithserverinstance}
 */
export type AssociatePublicIpWithServerInstanceRequest = {
    /**
     * 리전 코드
     * 서버 인스턴스에 할당할 공인 IP 인스턴스의 리전(Region) 결정 가능
     * regionCode는 {@link https://api.ncloud-docs.com/docs/compute-vserver-server-common-getregionlist} 액션을 통해 획득 가능
     * Default : getRegionList 조회 결과의 첫 번째 리전을 선택
     */
    regionCode?: string;

    /**
     * 공인 IP 인스턴스 번호
     * 서버 인스턴스에 할당할 공인 IP 인스턴스 번호 결정
     * publicIpInstanceNo는 {@link https://api.ncloud-docs.com/docs/compute-vserver-publicip-getpublicipinstancelist} 액션을 통해 획득 가능
     */
    publicIpInstanceNo: string;

    /**
     * 서버 인스턴스 번호
     * 공인 IP 인스턴스가 할당될 서버 인스턴스를 결정
     * serverInstanceNo는 {@link https://api.ncloud-docs.com/docs/compute-vserver-server-getserverinstancelist} 액션을 통해 획득 가능
     */
    serverInstanceNo: string;

    /**
     * 응답 결과의 포맷 타입
     * Options : xml | json
     * Default : xml
     */
    responseFormatType?: 'xml' | 'json';
};
