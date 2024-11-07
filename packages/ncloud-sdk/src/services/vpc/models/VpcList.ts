import { Vpc } from './Vpc';

/**
 * VPC 목록 정보
 * @interface VpcList
 * @property {number} totalRows - 전체 VPC 개수
 * @property {Vpc[]} vpcList - VPC 목록
 *
 * @example
 * {
 *   "totalRows": 1,
 *   "vpcList": [
 *     {
 *       "vpcNo": "1234",
 *       "vpcName": "test-vpc",
 *       "ipv4CidrBlock": "10.0.0.0/16",
 *       "vpcStatus": {
 *         "code": "RUN",
 *         "codeName": "run"
 *       },
 *       "regionCode": "KR",
 *       "createDate": "2020-07-16T22:23:50+0900"
 *     }
 *   ]
 * }
 */
export interface VpcList {
    totalRows: number;
    vpcList: Vpc[];
}
