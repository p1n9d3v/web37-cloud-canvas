/**
 * getRaidList 요청 파라미터
 * @see {@link }
 */
export type GetRaidListRequest = {
    /**
     * 상품 유형 코드
     * - 상품 유형별로 사용 가능한 RAID 리스트를 조회
     * - productTypeCode는 {@link } getServerImageProductList 액션을 통해서 획득 가능
     * - Options : LINUX | WINNT
     */
    productTypeCode: 'LINUX' | 'WINNT';

    /**
     * 응답 결과의 포맷 타입
     * - Options : xml | json
     * - Default : xml
     */
    responseFormatType?: 'xml' | 'json';
};
