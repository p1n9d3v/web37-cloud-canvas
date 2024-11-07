/**
 * FlowLog 비활성화 응답 타입
 * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-networkinterface-disableflowlog}
 * @example
 * {
 *   "requestId": "00a303f6-bf52-46b4-a600-574f839f7d21",
 *   "returnCode": "0",
 *   "returnMessage": "success",
 *   "totalRows": "1",
 *   "flowLogConfigurationList": [
 *     {
 *       "networkInterfaceNo": "***87",
 *       "collectActionType": {
 *         "code": "ALLOW",
 *         "codeName": "Allow"
 *       },
 *       "collectIntervalMinute": 10,
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
export type DisableFlowLogResponse = {
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
