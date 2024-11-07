/**
 * getServerSpecList 요청 파라미터
 * @see {@link }
 */
export type GetServerSpecListRequest = {
    /**
     * 리전 코드
     * - 서버 스펙 리스트가 조회될 리전(Region) 결정 가능
     * - regionCode는 {@link } getRegionList 액션을 통해 획득 가능
     * - Default : getRegionList 조회 결과의 첫 번째 리전을 선택
     */
    regionCode?: string;

    /**
     * 서버 이미지 번호
     * - 서버 이미지 번호로 필터링하여 검색 가능
     * - serverImageNo는 {@link } getServerImageList 액션을 통해 획득 가능
     */
    serverImageNo?: string;

    /**
     * ZONE 코드
     * - 서버 스펙 리스트가 조회될 존(zone) 결정 가능
     * - zoneCode는 {@link } getZoneList 액션을 통해 획득 가능
     */
    zoneCode?: string;

    /**
     * 서버 스펙 코드 리스트
     * - 서버 스펙 코드로 필터링하여 검색 가능
     * - serverSpecCode는 {@link } getServerSpecList 액션을 통해 획득 가능
     */
    'serverSpecCodeList.N'?: string[];

    /**
     * 하이퍼바이저 타입 코드 리스트
     * - 하이퍼바이저 타입 코드로 필터링하여 검색 가능
     * - hypervisorTypeCode는 {@link } getHypervisorTypeList 액션을 통해 획득 가능
     * - Options : XEN | KVM
     */
    'hypervisorTypeCodeList.N'?: Array<'XEN' | 'KVM'>;

    /**
     * 응답 결과의 포맷 타입
     * - Options : xml | json
     * - Default : xml
     */
    responseFormatType?: 'xml' | 'json';
};
