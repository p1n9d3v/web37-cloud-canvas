/**
 * ACG 삭제 응답 타입
 * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-acg-deleteaccesscontrolgroup}
 * @example
 * {
 *   "requestId": "e7b41cdc-0168-4d2b-8efd-0f94f1680cd5",
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
 *         "code": "TERMT",
 *         "codeName": "terminate"
 *       },
 *       "accessControlGroupDescription": ""
 *     }
 *   ]
 * }
 */
export type DeleteAccessControlGroupResponse = {
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
