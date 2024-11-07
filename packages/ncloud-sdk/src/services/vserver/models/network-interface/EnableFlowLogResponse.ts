/**
 * FlowLog 활성화 응답 타입
 * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-networkinterface-enableflowlog}
 * @example
 * {
 *   "requestId": "4a457fad-fa00-4294-ad63-ac406ef9d159",
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
 *       "storageBucketName": "myBucket**Name",
 *       "storageBucketDirectoryName": "VPC_FLOW_LOG"
 *     }
 *   ]
 * }
 */
export type EnableFlowLogResponse = {
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
