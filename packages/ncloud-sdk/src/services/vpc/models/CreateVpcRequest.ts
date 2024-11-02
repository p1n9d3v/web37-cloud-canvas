export interface CreateVpcRequest {
    /**
     * VPC 이름
     */
    regionCode: string;
    /**
     * VPC 이름
     */
    vpcName: string;
    /**
     * VPC CIDR 블록
     */
    ipv4CidrBlock: string;
    /**
     * 응답 결과의 형식
     */
    responseFormatType?: string;
}
