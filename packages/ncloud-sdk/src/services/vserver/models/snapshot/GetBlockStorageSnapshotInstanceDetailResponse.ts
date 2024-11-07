/**
 * 블록 스토리지 스냅샷 인스턴스 상세 정보 응답
 * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-snapshot-getblockstoragesnapshotinstancedetail}
 * @example
 * {
 *   "requestId": "d0fb36ff-f7f5-4171-94ae-c4ff53edd46e",
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
 *         "code": "NULL",
 *         "codeName": "Block Storage NULLOP"
 *       },
 *       "blockStorageSnapshotInstanceStatusName": "created",
 *       "createDate": "2020-08-25T10:18:15+0900",
 *       "isEncryptedOriginalBlockStorageVolume": false,
 *       "blockStorageSnapshotDescription": "",
 *       "snapshotType": {
 *         "code": "FULL",
 *         "codeName": "Full Storage Snapshot"
 *       },
 *       "baseSnapshotInstanceNo": "",
 *       "snapshotChainDepth": 0,
 *       "isBootable": true,
 *       "hypervisorType": {
 *         "code": "KVM",
 *         "codeName": "KVM"
 *       }
 *     }
 *   ]
 * }
 */
export type GetBlockStorageSnapshotInstanceDetailResponse = {
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
    isBootable: boolean;
    hypervisorType: {
        code: string;
        codeName: string;
    };
};
