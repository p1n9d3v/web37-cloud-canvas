/**
 * ACG 리스트 조회 응답 타입
 * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-acg-getaccesscontrolgrouplist}
 * @example
 * {
 *   "requestId": "aca35644-739e-42b3-bdcb-55c2eedc54b9",
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
export type GetAccessControlGroupListResponse = {
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
