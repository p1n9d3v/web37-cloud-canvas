/**
 * ACG 상세 정보 조회 응답 타입
 * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-acg-getaccesscontrolgroupdetail}
 * @example
 * {
 *   "requestId": "245b3116-7c66-407a-8969-3b8376167fb3",
 *   "returnCode": "0",
 *   "returnMessage": "success",
 *   "totalRows": "1",
 *   "accessControlGroupList": [
 *     {
 *       "accessControlGroupNo": "***63",
 *       "accessControlGroupName": "test-***",
 *       "isDefault": false,
 *       "vpcNo": "***04",
 *       "accessControlGroupStatus": {
 *         "code": "RUN",
 *         "codeName": "run"
 *       },
 *       "accessControlGroupDescription": ""
 *     }
 *   ]
 * }
 */
export type GetAccessControlGroupDetailResponse = {
    requestId: string;
    returnCode: string;
    returnMessage: string;
    totalRows: string;
    accessControlGroupList: Array<{
        accessControlGroupNo: string;
        accessControlGroupName: string;
        isDefault: boolean;
        vpcNo: string;
        accessControlGroupStatus: {
            code: string;
            codeName: string;
        };
        accessControlGroupDescription: string;
    }>;
};
