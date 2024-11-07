/**
 * getServerImageProductList 요청 파라미터
 * @see {@link }
 */
export type GetServerImageProductListRequest = {
    /**
     * 리전 코드
     * - 서버 이미지 상품 리스트가 조회될 리전(Region)을 결정 가능
     * - regionCode는 {@link } getRegionList 액션을 통해서 획득 가능
     * - Default : getRegionList 조회 결과의 첫 번째 리전을 선택
     */
    regionCode?: string;

    /**
     * 블록 스토리지 사이즈
     * - 서버 이미지의 기본 블록 스토리지 사이즈로 필터링하여 검색 가능
     * - Options : 50 | 100 GB
     */
    blockStorageSize?: number;

    /**
     * 제외할 상품 코드
     * - exclusionProductCode는 {@link } getServerImageProductList 액션을 통해 획득 가능
     */
    exclusionProductCode?: string;

    /**
     * 조회할 상품 코드
     * - productCode는 {@link } getServerImageProductList 액션을 통해 획득 가능
     */
    productCode?: string;

    /**
     * 플랫폼 유형 코드 리스트
     * - 플랫폼 유형으로 필터링하여 검색 가능
     * - Options : LNX32 | LNX64 | WND32 | WND64 | UBD64 | UBS64
     */
    'platformTypeCodeList.N'?: Array<
        'LNX32' | 'LNX64' | 'WND32' | 'WND64' | 'UBD64' | 'UBS64'
    >;

    /**
     * 인프라자원상세유형코드
     * - 특정 유형의 이미지 조회
     * - 현재는 BareMetal만 조회 가능
     * - Options : BM (BareMetal)
     * - Default : BM을 제외한 유형
     */
    infraResourceDetailTypeCode?: 'BM';

    /**
     * 응답 결과의 포맷 타입
     * - Options : xml | json
     * - Default : xml
     */
    responseFormatType?: 'xml' | 'json';
};
