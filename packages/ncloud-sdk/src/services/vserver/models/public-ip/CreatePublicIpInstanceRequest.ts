/**
 * 공인 IP 인스턴스 생성 요청
 * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-publicip-createpublicipinstance}
 */
export type CreatePublicIpInstanceRequest = {
    /**
     * 리전 코드
     * 공인 IP 인스턴가 생성될 리전(Region) 결정 가능
     * regionCode는 {@link https://api.ncloud-docs.com/docs/compute-vserver-server-common-getregionlist} 액션을 통해 획득 가능
     * Default : getRegionList 조회 결과의 첫 번째 리전을 선택
     */
    regionCode?: string;

    /**
     * 서버 인스턴스 번호
     * 생성되는 공인 IP 인스턴스가 할당될 서버 인스턴스 결정 가능
     * serverInstanceNo는 {@link https://api.ncloud-docs.com/docs/compute-vserver-server-getserverinstancelist} 액션을 통해 획득 가능
     */
    serverInstanceNo?: string;

    /**
     * 생성할 공인 IP에 대한 설명
     */
    publicIpDescription?: string;

    /**
     * 응답 결과의 포맷 타입
     * Options : xml | json
     * Default : xml
     */
    responseFormatType?: 'xml' | 'json';
};
