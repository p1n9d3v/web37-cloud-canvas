/**
 * ACG 생성 응답 타입
 * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-acg-createaccesscontrolgroup}
 * @example
 * {
 *   "requestId": "cf08459a-2f8e-4a73-9b1c-cc31d74466ae",
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
export type CreateAccessControlGroupResponse = {
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
