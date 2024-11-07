/**
 * getRaidList 응답
 * @see {@link }
 * @example
 * {
 *   "requestId": "9b0ed68f-b044-4fd8-b138-22397fba64df",
 *   "returnCode": "0",
 *   "returnMessage": "success",
 *   "totalRows": 2,
 *   "raidList": [
 *     {
 *       "raidTypeName": "5",
 *       "raidName": "RAID 5",
 *       "productType": {
 *         "code": "LINUX",
 *         "codeName": "Linux"
 *       }
 *     },
 *     {
 *       "raidTypeName": "1",
 *       "raidName": "RAID 1+0",
 *       "productType": {
 *         "code": "LINUX",
 *         "codeName": "Linux"
 *       }
 *     }
 *   ]
 * }
 */
export type GetRaidListResponse = {
    requestId: string;
    returnCode: string;
    returnMessage: string;
    totalRows: number;
    raidList: Array<{
        raidTypeName: string;
        raidName: string;
        productType: {
            code: string;
            codeName: string;
        };
    }>;
};
