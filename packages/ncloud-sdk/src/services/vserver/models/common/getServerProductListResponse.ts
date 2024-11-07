/**
 * getServerProductList 응답
 * @see {@link }
 * @example
 * {
 *   "requestId": "23fce239-4517-4e95-84c8-60fdd43a2e7e",
 *   "returnCode": "0",
 *   "returnMessage": "success",
 *   "totalRows": 1,
 *   "productList": [
 *     {
 *       "productCode": "SVR.VSVR.STAND.C002.M004.NET.HDD.B050.G001",
 *       "productName": "vCPU 2EA, Memory 4GB, Disk 50GB",
 *       "productType": {
 *         "code": "STAND",
 *         "codeName": "Standard"
 *       },
 *       "productDescription": "vCPU 2개, 메모리 4GB, 디스크 50GB",
 *       "infraResourceType": {
 *         "code": "VSVR",
 *         "codeName": "Server (VPC)"
 *       },
 *       "cpuCount": 2,
 *       "memorySize": 4294967296,
 *       "baseBlockStorageSize": 53687091200,
 *       "osInformation": "",
 *       "diskType": {
 *         "code": "NET",
 *         "codeName": "Network Storage"
 *       },
 *       "dbKindCode": "",
 *       "addBlockStorageSize": 0,
 *       "generationCode": "G1"
 *     }
 *   ]
 * }
 */
export type GetServerProductListResponse = {
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
        osInformation: string;
        diskType: {
            code: string;
            codeName: string;
        };
        dbKindCode: string;
        addBlockStorageSize: number;
        generationCode: string;
    }>;
};
