/**
 * 블록 스토리지 볼륨 타입 리스트 조회 응답 타입
 * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-storage-getblockstoragevolumetypelist}
 * @example
 * ```json
 * {
 *   "requestId": "",
 *   "returnCode": "0",
 *   "returnMessage": "success",
 *   "totalRows": 1,
 *   "blockStorageVolumeTypeList": [
 *     {
 *       "blockStorageVolumeType": {
 *         "code": "SSD",
 *         "codeName": "SSD"
 *       },
 *       "hypervisorType": {
 *         "code": "XEN",
 *         "codeName": "XEN"
 *       },
 *       "minBaseVolumeSize": 53687091200,
 *       "maxBaseVolumeSize": 107374182400,
 *       "minVolumeSize": 10737418240,
 *       "maxVolumeSize": 2147483648000,
 *       "zoneCodeList": ["KR-1", "KR-2"],
 *       "isBasicStorageAvailable": true
 *     }
 *   ]
 * }
 * ```
 */
export type GetBlockStorageVolumeTypeListResponse = {
    requestId: string;
    returnCode: string;
    returnMessage: string;
    totalRows: number;
    blockStorageVolumeTypeList: Array<{
        blockStorageVolumeType: {
            code: string;
            codeName: string;
        };
        hypervisorType: {
            code: string;
            codeName: string;
        };
        minBaseVolumeSize: number;
        maxBaseVolumeSize: number;
        minVolumeSize: number;
        maxVolumeSize: number;
        zoneCodeList: string[];
        isBasicStorageAvailable: boolean;
    }>;
};
