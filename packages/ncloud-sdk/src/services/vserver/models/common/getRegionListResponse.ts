/**
 * getRegionList 응답
 * @see {@link }
 * @example
 * {
 *   "requestId": "ac39d0d1-6982-4f0b-8c18-47ca9100d51b",
 *   "returnCode": "0",
 *   "returnMessage": "success",
 *   "totalRows": 1,
 *   "regionList": [
 *     {
 *       "regionCode": "KR",
 *       "regionName": "Korea"
 *     }
 *   ]
 * }
 */
export type GetRegionListResponse = {
    requestId: string;
    returnCode: string;
    returnMessage: string;
    totalRows: number;
    regionList: Array<{
        regionCode: string;
        regionName: string;
    }>;
};
