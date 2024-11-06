/**
 * 블록 스토리지 인스턴스 상세 정보 조회 응답 타입
 * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-storage-getblockstorageinstancedetail}
 * @example
 * ```json
 * {
 *   "requestId": "",
 *   "returnCode": "0",
 *   "returnMessage": "success",
 *   "totalRows": 1,
 *   "blockStorageInstanceList": [
 *     {
 *       "blockStorageInstanceNo": "***7746",
 *       "serverInstanceNo": "***4299",
 *       "blockStorageName": "test-***",
 *       "blockStorageType": {
 *         "code": "BASIC",
 *         "codeName": "Basic BS"
 *       },
 *       "blockStorageSize": 53687091200,
 *       "deviceName": "/dev/xvda",
 *       "blockStorageProductCode": "SPBSTBSTBS000005",
 *       "blockStorageInstanceStatus": {
 *         "code": "ATTAC",
 *         "codeName": "Block storage ATTACHED state"
 *       },
 *       "blockStorageInstanceOperation": {
 *         "code": "NULL",
 *         "codeName": "Block Storage NULLOP"
 *       },
 *       "blockStorageInstanceStatusName": "attached",
 *       "createDate": "2020-08-19T15:05:07+0900",
 *       "blockStorageDescription": "test-***'s basic storage",
 *       "blockStorageDiskType": {
 *         "code": "NET",
 *         "codeName": "Network Storage"
 *       },
 *       "blockStorageDiskDetailType": {
 *         "code": "SSD",
 *         "codeName": "SSD"
 *       },
 *       "maxIopsThroughput": 4000,
 *       "isEncryptedVolume": false,
 *       "zoneCode": "KR-1",
 *       "regionCode": "KR",
 *       "isReturnProtection": false,
 *       "blockStorageVolumeType": {
 *         "code": "SSD",
 *         "codeName": "SSD"
 *       },
 *       "hypervisorType": {
 *         "code": "XEN",
 *         "codeName": "XEN"
 *       }
 *     }
 *   ]
 * }
 * ```
 */
export type GetBlockStorageInstanceDetailResponse = {
    requestId: string;
    returnCode: string;
    returnMessage: string;
    totalRows: number;
    blockStorageInstanceList: BlockStorageInstance[];
};

type BlockStorageInstance = {
    blockStorageInstanceNo: string;
    serverInstanceNo: string;
    blockStorageName: string;
    blockStorageType: {
        code: string;
        codeName: string;
    };
    blockStorageSize: number;
    deviceName: string;
    blockStorageProductCode: string;
    blockStorageInstanceStatus: {
        code: string;
        codeName: string;
    };
    blockStorageInstanceOperation: {
        code: string;
        codeName: string;
    };
    blockStorageInstanceStatusName: string;
    createDate: string;
    blockStorageDescription: string;
    blockStorageDiskType: {
        code: string;
        codeName: string;
    };
    blockStorageDiskDetailType: {
        code: string;
        codeName: string;
    };
    maxIopsThroughput: number;
    isEncryptedVolume: boolean;
    zoneCode: string;
    regionCode: string;
    isReturnProtection: boolean;
    blockStorageVolumeType: {
        code: string;
        codeName: string;
    };
    hypervisorType: {
        code: string;
        codeName: string;
    };
};
