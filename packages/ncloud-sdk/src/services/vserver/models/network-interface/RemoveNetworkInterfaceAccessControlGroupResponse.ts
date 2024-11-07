/**
 * 네트워크 인터페이스에 적용된 ACG 리스트 제거 응답 타입
 * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-networkinterface-removenetworkinterfaceaccesscontrolgroup}
 * @example
 * {
 *   "requestId": "ee0c81c5-5d66-49df-857e-696619f1cf35",
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
 *         "***63"
 *       ],
 *       "networkInterfaceDescription": "",
 *       "secondaryIpList": []
 *     }
 *   ]
 * }
 */
export type RemoveNetworkInterfaceAccessControlGroupResponse = {
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
