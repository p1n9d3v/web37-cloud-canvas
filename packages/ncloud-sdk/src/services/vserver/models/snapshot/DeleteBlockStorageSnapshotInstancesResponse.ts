/**
 * 블록 스토리지 스냅샷 인스턴스 삭제 응답
 * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-snapshot-deleteblockstoragesnapshotinstances}
 * @example
 * {
 *   "requestId": "d57144e3-dcc5-4d73-8ed8-59b31fbe2102",
 *   "returnCode": "0",
 *   "returnMessage": "success",
 *   "totalRows": 1,
 *   "blockStorageSnapshotInstanceList": [
 *     {
 *       "blockStorageSnapshotInstanceNo": "***1951",
 *       "blockStorageSnapshotName": "test-***",
 *       "blockStorageSnapshotVolumeSize": 53687091200,
 *       "originalBlockStorageInstanceNo": "***7746",
 *       "blockStorageSnapshotInstanceStatus": {
 *         "code": "CREAT",
 *         "codeName": "Block storage CREATED state"
 *       },
 *       "blockStorageSnapshotInstanceOperation": {
 *         "code": "TERMT",
 *         "codeName": "Block Storage TERMINATE OP"
 *       },
 *       "blockStorageSnapshotInstanceStatusName": "terminating",
 *       "createDate": "2020-08-25T10:50:30+0900",
 *       "isEncryptedOriginalBlockStorageVolume": false,
 *       "blockStorageSnapshotDescription": "",
 *       "snapshotType": {
 *         "code": "FULL",
 *         "codeName": "Full Storage Snapshot"
 *       },
 *       "baseSnapshotInstanceNo": "",
 *       "snapshotChainDepth": 0
 *     }
 *   ]
 * }
 */
export type DeleteBlockStorageSnapshotInstancesResponse = {
    requestId: string;
    returnCode: string;
    returnMessage: string;
    totalRows: number;
    blockStorageSnapshotInstanceList: BlockStorageSnapshotInstance[];
};

type BlockStorageSnapshotInstance = {
    blockStorageSnapshotInstanceNo: string;
    blockStorageSnapshotName: string;
    blockStorageSnapshotVolumeSize: number;
    originalBlockStorageInstanceNo: string;
    blockStorageSnapshotInstanceStatus: {
        code: string;
        codeName: string;
    };
    blockStorageSnapshotInstanceOperation: {
        code: string;
        codeName: string;
    };
    blockStorageSnapshotInstanceStatusName: string;
    createDate: string;
    isEncryptedOriginalBlockStorageVolume: boolean;
    blockStorageSnapshotDescription: string;
    snapshotType: {
        code: string;
        codeName: string;
    };
    baseSnapshotInstanceNo: string;
    snapshotChainDepth: number;
};
