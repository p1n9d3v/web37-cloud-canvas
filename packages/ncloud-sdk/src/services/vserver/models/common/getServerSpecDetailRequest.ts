/**
 * getServerSpecDetail 요청 파라미터
 * @see {@link }
 */
export type GetServerSpecDetailRequest = {
    /**
     * 리전 코드
     * - 서버 스펙이 조회될 리전(Region) 결정 가능
     * - regionCode는 {@link } getRegionList 액션을 통해 획득 가능
     * - Default : getRegionList 조회 결과의 첫 번째 리전을 선택
     */
    regionCode?: string;

    /**
     * 조회할 서버 스펙 코드
     * - serverSpecCode는 {@link } getServerSpecList 액션을 통해 획득 가능
     */
    serverSpecCode: string;

    /**
     * 응답 결과의 포맷 타입
     * - Options : xml | json
     * - Default : xml
     */
    responseFormatType?: 'xml' | 'json';
};
