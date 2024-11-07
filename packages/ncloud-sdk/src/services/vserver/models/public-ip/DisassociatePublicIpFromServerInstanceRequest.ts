/**
 * 공인 IP 인스턴스를 서버 인스턴스에서 할당 해제 요청
 * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-publicip-disassociatepublicipfromserverinstance}
 */
export type DisassociatePublicIpFromServerInstanceRequest = {
    /**
     * 리전 코드
     * 서버 인스턴스에서 할당 해제할 공인 IP 인스턴스의 리전(Region) 결정 가능
     * regionCode는 {@link https://api.ncloud-docs.com/docs/compute-vserver-server-common-getregionlist} 액션을 통해 획득 가능
     * Default : getRegionList 조회 결과의 첫 번째 리전을 선택
     */
    regionCode?: string;

    /**
     * 공인 IP 인스턴스 번호
     * publicIpInstanceNo와 serverInstanceNo 중 반드시 한 개를 필수로 입력
     * publicIpInstanceNo는 {@link https://api.ncloud-docs.com/docs/compute-vserver-publicip-getpublicipinstancelist} 액션을 통해 획득 가능
     */
    publicIpInstanceNo?: string;

    /**
     * 서버 인스턴스 번호
     * publicIpInstanceNo와 serverInstanceNo 중 반드시 한 개를 필수로 입력
     * serverInstanceNo는 {@link https://api.ncloud-docs.com/docs/compute-vserver-server-getserverinstancelist} 액션을 통해 획득 가능
     */
    serverInstanceNo?: string;

    /**
     * 응답 결과의 포맷 타입
     * Options : xml | json
     * Default : xml
     */
    responseFormatType?: 'xml' | 'json';
};
