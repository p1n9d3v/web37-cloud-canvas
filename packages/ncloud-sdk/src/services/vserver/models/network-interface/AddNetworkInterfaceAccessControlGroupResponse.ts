/**
 * 네트워크 인터페이스에 적용될 ACG 리스트 추가 응답 타입
 * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-networkinterface-addnetworkinterfaceaccesscontrolgroup}
 * @example
 * {
 *   "requestId": "6fb2dc37-4505-4dc0-aad3-481d3a6a6434",
 *   "returnCode": "0",
 *   "returnMessage": "success",
 *   "totalRows": "1",
 *   "networkInterfaceList": [
 *     {
 *       "networkInterfaceNo": "***87",
 *       "networkInterfaceName": "test-***",
 *       "subnetNo": "***43",
 *       "deleteOnTermination": false,
 *       "isDefault": false,
 *       "deviceName": "eth1",
 *       "networkInterfaceStatus": {
 *         "code": "USED",
 *         "codeName": "used"
 *       },
 *       "instanceType": {
 *         "code": "VSVR",
 *         "codeName": "Server (VPC)"
 *       },
 *       "instanceNo": "***4299",
 *       "ip": "***.***.1.7",
 *       "macAddress": "F2:20:***:***:8A:F5",
 *       "accessControlGroupNoList": [
 *         "***63",
 *         "***64"
 *       ],
 *       "networkInterfaceDescription": "",
 *       "secondaryIpList": []
 *     }
 *   ]
 * }
 */
export type AddNetworkInterfaceAccessControlGroupResponse = {
    requestId: string;
    returnCode: string;
    returnMessage: string;
    totalRows: string;
    networkInterfaceList: Array<{
        networkInterfaceNo: string;
        networkInterfaceName: string;
        subnetNo: string;
        deleteOnTermination: boolean;
        isDefault: boolean;
        deviceName: string;
        networkInterfaceStatus: {
            code: string;
            codeName: string;
        };
        instanceType: {
            code: string;
            codeName: string;
        };
        instanceNo: string;
        ip: string;
        macAddress: string;
        accessControlGroupNoList: string[];
        networkInterfaceDescription: string;
        secondaryIpList: any[];
    }>;
};
