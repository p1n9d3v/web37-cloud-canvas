export type GetLoginKeyListRequest = {
    /**
     * 조회할 키 이름
     * 키 이름으로 필터링하여 검색 가능
     */
    keyName?: string;

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
     * 응답 결과의 포맷 타입
     * @default xml
     */
    responseFormatType?: 'xml' | 'json';
};
