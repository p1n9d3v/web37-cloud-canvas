export interface GetVpcListRequest {
    /**
     * VPC 리전 코드
     */
    regionCode: string;
    /**
     * VPC 상태 코드
     */
    vpcStatusCode?: string;
    /**
     * VPC 이름
     */
    vpcName?: string;
    /**
     * VPC 번호
     */
    vpcNoList?: string[];
    /**
     * 응답 결과의 형식
     */
    responseFormatType?: string;
}
