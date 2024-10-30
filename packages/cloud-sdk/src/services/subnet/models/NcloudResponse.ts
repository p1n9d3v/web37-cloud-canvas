/**
 * 기본 응답 객체
 */
export interface NcloudResponse {
    /**
     * UUID 형태의 요청 ID.
     *
     * Required
     * @example 4a7ca579-1b43-439b-97f7-c423a37bc3d9
     */
    requestId: string;

    /**
     * 요청에 대한 응답 코드
     *
     * @see {@link https://api.ncloud-docs.com/docs/common-ncpapi#3%EC%9D%91%EB%8B%B5%EC%83%81%ED%83%9C%EC%BD%94%EB%93%9C}
     */
    returnCode: string;

    /**
     * 요청에 대한 응답 메시지
     *
     * @see {@link https://api.ncloud-docs.com/docs/common-ncpapi#3%EC%9D%91%EB%8B%B5%EC%83%81%ED%83%9C%EC%BD%94%EB%93%9C}
     */
    returnMessage: string;
}
