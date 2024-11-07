/**
 * 공인 IP 인스턴스를 서버 인스턴스에서 할당 해제 응답
 * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-publicip-disassociatepublicipfromserverinstance}
 * @example
 * {
 *   "requestId": "bb66616c-3de6-4fb9-9ff0-823249d4e488",
 *   "returnCode": "0",
 *   "returnMessage": "success",
 *   "totalRows": 1,
 *   "publicIpInstanceList": [
 *     {
 *       "publicIpInstanceNo": "***7551",
 *       "publicIp": "***.***.111.215",
 *       "publicIpDescription": "",
 *       "createDate": "2020-08-19T16:52:50+0900",
 *       "publicIpInstanceStatusName": "설정중",
 *       "publicIpInstanceStatus": {
 *         "code": "RUN",
 *         "codeName": "run"
 *       },
 *       "serverInstanceNo": "",
 *       "serverName": "",
 *       "privateIp": "",
 *       "publicIpInstanceOperation": {
 *         "code": "SET",
 *         "codeName": "SETTING OP"
 *       }
 *     }
 *   ]
 * }
 */
export type DisassociatePublicIpFromServerInstanceResponse = {
    requestId: string;
    returnCode: string;
    returnMessage: string;
    totalRows: number;
    publicIpInstanceList: PublicIpInstance[];
};

type PublicIpInstance = {
    publicIpInstanceNo: string;
    publicIp: string;
    publicIpDescription: string;
    createDate: string;
    publicIpInstanceStatusName: string;
    publicIpInstanceStatus: {
        code: string;
        codeName: string;
    };
    serverInstanceNo: string;
    serverName: string;
    privateIp: string;
    publicIpInstanceOperation: {
        code: string;
        codeName: string;
    };
};
