export interface DeleteVpcRequest {
    /**
     * VPC 리전 코드
     */
    regionCode: string;
    /**
     * VPC 번호
     */
    vpcNo: string;
    /**
     * 응답 결과의 형식
     */
    responseFormatType: string;
}
