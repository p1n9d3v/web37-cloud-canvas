/**
 * getZoneList 응답
 * @see {@link }
 * @example
 * {
 *   "requestId": "9a3aefb2-4d35-4cfe-9152-e4c451cc7966",
 *   "returnCode": "0",
 *   "returnMessage": "success",
 *   "totalRows": 2,
 *   "zoneList": [
 *     {
 *       "zoneName": "KR-2",
 *       "zoneCode": "KR-2",
 *       "regionCode": "KR",
 *       "zoneDescription": "평촌 zone"
 *     },
 *     {
 *       "zoneName": "KR-1",
 *       "zoneCode": "KR-1",
 *       "regionCode": "KR",
 *       "zoneDescription": "가산 zone"
 *     }
 *   ]
 * }
 */
export type GetZoneListResponse = {
    requestId: string;
    returnCode: string;
    returnMessage: string;
    totalRows: number;
    zoneList: Array<{
        zoneName: string;
        zoneCode: string;
        regionCode: string;
        zoneDescription: string;
    }>;
};
