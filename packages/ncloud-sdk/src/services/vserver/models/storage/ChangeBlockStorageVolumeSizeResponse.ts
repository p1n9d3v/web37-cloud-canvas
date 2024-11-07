/**
 * 블록 스토리지 볼륨 사이즈 변경 응답 타입
 * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-storage-changeblockstoragevolumesize}
 * @example
 * ```json
 * {
 *   "requestId": "17b3bcf6-8e52-47e5-b822-1352ec765a97",
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
 *       "blockStorageSize": 64424509440,
 *       "deviceName": "/dev/xvdb",
 *       "blockStorageProductCode": "SPBSTBSTAD000006",
 *       "blockStorageInstanceStatus": {
 *         "code": "ATTAC",
 *         "codeName": "Block storage ATTACHED state"
 *       },
 *       "blockStorageInstanceOperation": {
 *         "code": "CHNG",
 *         "codeName": "Block Storage Resize OP"
 *       },
 *       "blockStorageInstanceStatusName": "changingSpec",
 *       "createDate": "2020-08-25T09:38:49+0900",
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
 *       "regionCode": "KR"
 *     }
 *   ]
 * }
 * ```
 */
export type ChangeBlockStorageVolumeSizeResponse = {
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
    }>;
};
