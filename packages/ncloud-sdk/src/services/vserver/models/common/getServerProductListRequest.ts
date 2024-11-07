/**
 * getServerProductList 요청 파라미터
 * @see {@link }
 */
export type GetServerProductListRequest = {
    /**
     * 리전 코드
     * - 서버 상품 리스트가 조회될 리전(Region) 결정 가능
     * - regionCode는 {@link } getRegionList 액션을 통해 획득 가능
     * - Default : getRegionList 조회 결과의 첫 번째 리전을 선택
     */
    regionCode?: string;

    /**
     * ZONE 코드
     * - 서버 상품 리스트가 조회될 존(zone) 결정 가능
     * - zoneCode는 {@link } getZoneList 액션을 통해 획득 가능
     */
    zoneCode?: string;

    /**
     * 서버 이미지 상품 코드
     * - 서버 이미지 상품에서 생성 가능한 서버 스펙 상품 리스트 조회
     * - serverImageProductCode or memberServerImageInstanceNo 두 개의 파라미터 중 하나의 파라미터는 필수 항목
     * - serverImageProductCode는 {@link } getServerImageProductList 액션을 통해 획득 가능
     */
    serverImageProductCode?: string;

    /**
     * 제외할 상품 코드
     * - exclusionProductCode는 {@link } getServerProductList 액션을 통해 획득 가능
     */
    exclusionProductCode?: string;

    /**
     * 조회할 상품 코드
     * - productCode는 {@link } getServerProductList 액션을 통해 획득 가능
     */
    productCode?: string;

    /**
     * 세대 코드
     * - 세대 코드로 필터링하여 검색 가능
     * - Options : G1 | G2
     */
    generationCode?: 'G1' | 'G2';

    /**
     * 회원 서버 이미지 인스턴스 번호
     * - EOL OS에 대한 생성 스펙 조회 가능
     * - serverImageProductCode or memberServerImageInstanceNo 두 개의 파라미터 중 하나의 파라미터는 필수 항목
     * - serverImageProductCode 와 memberServerImageInstanceNo 모두 입력시 memberServerImageInstanceNo 를 이용하여 조회
     * - {@link } getMemberServerImageInstanceList 액션을 통해 획득 가능
     */
    memberServerImageInstanceNo?: string;

    /**
     * 응답 결과의 포맷 타입
     * - Options : xml | json
     * - Default : xml
     */
    responseFormatType?: 'xml' | 'json';
};
