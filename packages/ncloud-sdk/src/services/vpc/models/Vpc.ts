import { CommonCode } from './CommonCode';
export interface Vpc {
    vpcNo: string;
    vpcName: string;
    ivp4CidrBlock: string;
    vpcStatus: CommonCode;
    regionCode: string;
    createDate: Date;
}
