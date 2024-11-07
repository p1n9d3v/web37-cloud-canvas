/**
 * ACG의 Inbound Rule 리스트 추가 응답 타입
 * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-acg-addaccesscontrolgroupinboundrule}
 * @example
 * {
 *   "requestId": "eb6a1733-f4a1-4e04-8c99-cf2d8081a9fb",
 *   "returnCode": "0",
 *   "returnMessage": "success",
 *   "totalRows": "2",
 *   "accessControlGroupRuleList": [
 *     {
 *       "accessControlGroupNo": "***63",
 *       "protocolType": {
 *         "code": "TCP",
 *         "codeName": "tcp",
 *         "number": 6
 *       },
 *       "ipBlock": "***.***.0.0/0",
 *       "accessControlGroupSequence": "",
 *       "portRange": "80",
 *       "accessControlGroupRuleType": {
 *         "code": "INBND",
 *         "codeName": "Inbound"
 *       },
 *       "accessControlGroupRuleDescription": ""
 *     }
 *   ]
 * }
 */
export type AddAccessControlGroupInboundRuleResponse = {
    requestId: string;
    returnCode: string;
    returnMessage: string;
    totalRows: string;
    accessControlGroupRuleList: Array<{
        accessControlGroupNo: string;
        protocolType: {
            code: string;
            codeName: string;
            number: number;
        };
        ipBlock: string;
        accessControlGroupSequence: string;
        portRange: string;
        accessControlGroupRuleType: {
            code: string;
            codeName: string;
        };
        accessControlGroupRuleDescription: string;
    }>;
};
