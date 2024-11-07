/**
 * 블록 스토리지 인스턴스 생성 응답 타입
 * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-storage-createblockstorageinstance}
 * @example
 * ```json
 * {
 *   "requestId": "89254a11-97e3-41d6-9ed2-e9249ebcec7a",
 *   "returnCode": "0",
 *   "returnMessage": "success",
 *   "totalRows": 1,
 *   "blockStorageInstanceList": [
 *     {
 *       "blockStorageInstanceNo": "***7746",
 *       "serverInstanceNo": "***4299",
 *       "blockStorageName": "test-***",
 *       "blockStorageType": {
 *         "code": "SVRBS",
 *         "codeName": "Server BS"
 *       },
 *       "blockStorageSize": 53687091200,
 *       "deviceName": "",
 *       "blockStorageProductCode": "SPBSTBSTAD000006",
 *       "blockStorageInstanceStatus": {
 *         "code": "INIT",
 *         "codeName": "Block storage INIT state"
 *       },
 *       "blockStorageInstanceOperation": {
 *         "code": "NULL",
 *         "codeName": "Block Storage NULLOP"
 *       },
 *       "blockStorageInstanceStatusName": "initialized",
 *       "createDate": "2020-08-24T22:25:35+0900",
 *       "blockStorageDescription": "",
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
 *       "isReturnProtection": false
 *     }
 *   ]
 * }
 * ```
 */
export type CreateBlockStorageInstanceResponse = {
    requestId: string;
    returnCode: string;
    returnMessage: string;
    totalRows: number;
    blockStorageInstanceList: Array<{
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
    }>;
};
