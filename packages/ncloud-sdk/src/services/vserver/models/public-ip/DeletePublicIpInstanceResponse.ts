/**
 * 공인 IP 인스턴스 삭제 응답
 * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-publicip-deletepublicipinstance}
 * @example
 * {
 *   "requestId": "c1f78233-d06d-4cb6-9aae-5f8502110e01",
 *   "returnCode": "0",
 *   "returnMessage": "success",
 *   "totalRows": 1,
 *   "publicIpInstanceList": [
 *     {
 *       "publicIpInstanceNo": "***7551",
 *       "publicIp": "***.***.111.215",
 *       "publicIpDescription": "",
 *       "createDate": "2020-08-19T16:37:12+0900",
 *       "publicIpInstanceStatusName": "삭제중",
 *       "publicIpInstanceStatus": {
 *         "code": "RUN",
 *         "codeName": "run"
 *       },
 *       "serverInstanceNo": "",
 *       "serverName": "",
 *       "privateIp": "",
 *       "publicIpInstanceOperation": {
 *         "code": "TERMT",
 *         "codeName": "TERMINATE OP"
 *       }
 *     }
 *   ]
 * }
 */
export type DeletePublicIpInstanceResponse = {
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
