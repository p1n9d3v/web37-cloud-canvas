/**
 * 공인 IP 인스턴스 리스트 조회 요청
 * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-publicip-getpublicipinstancelist}
 */
export type GetPublicIpInstanceListRequest = {
    /**
     * 리전 코드
     * 공인 IP 인스턴스 리스트가 조회될 리전(Region) 결정 가능
     * regionCode는 {@link https://api.ncloud-docs.com/docs/compute-vserver-server-common-getregionlist} 액션을 통해 획득 가능
     * Default : getRegionList 조회 결과의 첫 번째 리전을 선택
     */
    regionCode?: string;

    /**
     * 공인 IP 인스턴스 번호 리스트
     * 공인 IP 인스턴스 번호로 필터링하여 검색 가능
     * publicIpInstanceNo는 {@link https://api.ncloud-docs.com/docs/compute-vserver-publicip-getpublicipinstancelist} 액션을 통해 획득 가능
     */
    publicIpInstanceNoList?: string[];

    /**
     * 공인 IP 주소
     * 공인 IP 주소로 필터링하여 검색 가능
     */
    publicIp?: string;

    /**
     * 비공인 IP 주소
     * 공인 IP 인스턴스가 할당된 서버 인스턴스의 eth0 비공인 IP 주소로 필터링하여 검색 가능
     */
    privateIp?: string;

    /**
     * 할당 여부
     * 서버 인스턴스에 할당된 공인 IP와 할당 되지 않은 공인 IP로 필터링하여 검색 가능
     */
    isAssociated?: boolean;

    /**
     * 서버 이름
     * 공인 IP 인스턴스가 할당된 서버 이름으로 필터링하여 검색 가능
     */
    serverName?: string;

    /**
     * 공인 IP 인스턴스 상태 코드
     * 공인 IP 인스턴스의 상태 코드로 필터링하여 검색 가능
     * Options : INIT | SET | RUN | TERMTING
     */
    publicIpInstanceStatusCode?: 'INIT' | 'SET' | 'RUN' | 'TERMTING';

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
     * VPC 번호
     * VPC 번호로 필터링하여 검색 가능
     * vpcNo는 {@link https://api.ncloud-docs.com/docs/networking-vpc-vpcmanagement-getvpclist} 액션을 통해 획득 가능
     */
    vpcNo?: string;

    /**
     * 응답 결과의 포맷 타입
     * Options : xml | json
     * Default : xml
     */
    responseFormatType?: 'xml' | 'json';
};
