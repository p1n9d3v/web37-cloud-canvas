/**
 * ACG의 Inbound Rule 리스트 제거 응답 타입
 * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-acg-removeaccesscontrolgroupinboundrule}
 * @example
 * {
 *   "requestId": "4d82787f-c538-4a7b-a5e8-1351f7bdf592",
 *   "returnCode": "0",
 *   "returnMessage": "success",
 *   "totalRows": "1",
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
 *       "portRange": "22",
 *       "accessControlGroupRuleType": {
 *         "code": "INBND",
 *         "codeName": "Inbound"
 *       },
 *       "accessControlGroupRuleDescription": ""
 *     }
 *   ]
 * }
 */
export type RemoveAccessControlGroupInboundRuleResponse = {
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
