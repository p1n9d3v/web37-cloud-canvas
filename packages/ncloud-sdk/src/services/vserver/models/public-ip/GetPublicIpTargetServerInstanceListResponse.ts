/**
 * 공인 IP 인스턴스를 할당 가능한 서버 인스턴스 리스트 조회 응답
 * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-publicip-getpubliciptargetserverinstancelist}
 * @example
 * {
 *   "requestId": "d463213f-718e-481c-85e6-908dfc723537",
 *   "returnCode": "0",
 *   "returnMessage": "success",
 *   "totalRows": 1,
 *   "serverInstanceList": [
 *     {
 *       "serverInstanceNo": "***4299",
 *       "serverName": "test-***",
 *       "serverDescription": "",
 *       "cpuCount": 2,
 *       "memorySize": 4294967296,
 *       "platformType": {
 *         "code": "LNX64",
 *         "codeName": "Linux 64 Bit"
 *       },
 *       "loginKeyName": "test-***",
 *       "publicIpInstanceNo": "",
 *       "publicIp": "",
 *       "serverInstanceStatus": {
 *         "code": "RUN",
 *         "codeName": "Server run state"
 *       },
 *       "serverInstanceOperation": {
 *         "code": "NULL",
 *         "codeName": "Server NULL OP"
 *       },
 *       "serverInstanceStatusName": "running",
 *       "createDate": "2020-08-19T15:05:07+0900",
 *       "uptime": "2020-08-19T15:08:09+0900",
 *       "serverImageProductCode": "SW.VSVR.OS.LNX64.CNTOS.0703.B050",
 *       "serverProductCode": "SVR.VSVR.STAND.C002.M004.NET.SSD.B050.G001",
 *       "isProtectServerTermination": false,
 *       "zoneCode": "KR-1",
 *       "regionCode": "KR",
 *       "vpcNo": "***04",
 *       "subnetNo": "***43",
 *       "networkInterfaceNoList": [
 *         "***87"
 *       ],
 *       "initScriptNo": "",
 *       "serverInstanceType": {
 *         "code": "STAND",
 *         "codeName": "Standard"
 *       },
 *       "baseBlockStorageDiskType": {
 *         "code": "NET",
 *         "codeName": "Network Storage"
 *       },
 *       "baseBlockStorageDiskDetailType": {
 *         "code": "SSD",
 *         "codeName": "SSD"
 *       },
 *       "placementGroupNo": "",
 *       "placementGroupName": ""
 *     }
 *   ]
 * }
 */
export type GetPublicIpTargetServerInstanceListResponse = {
    requestId: string;
    returnCode: string;
    returnMessage: string;
    totalRows: number;
    serverInstanceList: ServerInstance[];
};

type ServerInstance = {
    serverInstanceNo: string;
    serverName: string;
    serverDescription: string;
    cpuCount: number;
    memorySize: number;
    platformType: {
        code: string;
        codeName: string;
    };
    loginKeyName: string;
    publicIpInstanceNo: string;
    publicIp: string;
    serverInstanceStatus: {
        code: string;
        codeName: string;
    };
    serverInstanceOperation: {
        code: string;
        codeName: string;
    };
    serverInstanceStatusName: string;
    createDate: string;
    uptime: string;
    serverImageProductCode: string;
    serverProductCode: string;
    isProtectServerTermination: boolean;
    zoneCode: string;
    regionCode: string;
    vpcNo: string;
    subnetNo: string;
    networkInterfaceNoList: string[];
    initScriptNo: string;
    serverInstanceType: {
        code: string;
        codeName: string;
    };
    baseBlockStorageDiskType: {
        code: string;
        codeName: string;
    };
    baseBlockStorageDiskDetailType: {
        code: string;
        codeName: string;
    };
    placementGroupNo: string;
    placementGroupName: string;
};
