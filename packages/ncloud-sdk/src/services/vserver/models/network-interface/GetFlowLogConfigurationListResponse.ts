/**
 * FlowLog 설정 정보 조회 응답 타입
 * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-networkinterface-getflowlogconfigurationlist}
 * @example
 * {
 *   "requestId": "002bff47-48c8-4e2b-a376-eaab45c0e52f",
 *   "returnCode": "0",
 *   "returnMessage": "success",
 *   "totalRows": "1",
 *   "flowLogConfigurationList": [
 *     {
 *       "networkInterfaceNo": "34***",
 *       "collectActionType": {
 *         "code": "ALLOW",
 *         "codeName": "Allow"
 *       },
 *       "collectIntervalMinute": 5,
 *       "storageType": {
 *         "code": "OBJT",
 *         "codeName": "Object Storage"
 *       },
 *       "storageBucketName": "mybk**",
 *       "storageBucketDirectoryName": "VPC_FLOW_LOG"
 *     }
 *   ]
 * }
 */
export type GetFlowLogConfigurationListResponse = {
    requestId: string;
    returnCode: string;
    returnMessage: string;
    totalRows: string;
    flowLogConfigurationList: Array<{
        networkInterfaceNo: string;
        collectActionType: {
            code: string;
            codeName: string;
        };
        collectIntervalMinute: number;
        storageType: {
            code: string;
            codeName: string;
        };
        storageBucketName: string;
        storageBucketDirectoryName: string;
    }>;
};
