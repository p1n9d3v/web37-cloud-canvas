export interface GetVpcDetailRequest {
    /**
     * VPC 리전 코드
     */
    regionCode: string;
    /**
     * Vpc 번호
     */
    vpcNo: string;
    /**
     * 응답 결과의 형식
     */
    responseFormatType?: string;
}
