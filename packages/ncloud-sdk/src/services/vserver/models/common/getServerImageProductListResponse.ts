/**
 * getServerImageProductList 응답
 * @see {@link }
 * @example
 * {
 *   "requestId": "c389ef63-aa90-4d3f-a875-f9166ae9c249",
 *   "returnCode": "0",
 *   "returnMessage": "success",
 *   "totalRows": 1,
 *   "productList": [
 *     {
 *       "productCode": "SW.VSVR.OS.LNX64.CNTOS.0703.B050",
 *       "productName": "centos-7.3-64",
 *       "productType": {
 *         "code": "LINUX",
 *         "codeName": "Linux"
 *       },
 *       "productDescription": "CentOS 7.3 (64-bit)",
 *       "infraResourceType": {
 *         "code": "SW",
 *         "codeName": "Software"
 *       },
 *       "cpuCount": 0,
 *       "memorySize": 0,
 *       "baseBlockStorageSize": 53687091200,
 *       "platformType": {
 *         "code": "LNX64",
 *         "codeName": "Linux 64 Bit"
 *       },
 *       "osInformation": "CentOS 7.3 (64-bit)",
 *       "dbKindCode": "",
 *       "addBlockStorageSize": 0,
 *       "generationCode": ""
 *     }
 *   ]
 * }
 */
export type GetServerImageProductListResponse = {
    requestId: string;
    returnCode: string;
    returnMessage: string;
    totalRows: number;
    productList: Array<{
        productCode: string;
        productName: string;
        productType: {
            code: string;
            codeName: string;
        };
        productDescription: string;
        infraResourceType: {
            code: string;
            codeName: string;
        };
        cpuCount: number;
        memorySize: number;
        baseBlockStorageSize: number;
        platformType: {
            code: string;
            codeName: string;
        };
        osInformation: string;
        dbKindCode: string;
        addBlockStorageSize: number;
        generationCode: string;
    }>;
};
