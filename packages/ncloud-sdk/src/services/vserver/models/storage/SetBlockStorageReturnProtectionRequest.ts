/**
 * 블록 스토리지 반납 보호 여부 설정 요청 타입
 * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-storage-setblockstoragereturnprotection}
 */
export type SetBlockStorageReturnProtectionRequest = {
    /**
     * 리전 코드
     * 반납 보호 여부를 설정할 블록 스토리지 인스턴스의 리전(Region) 결정 가능
     * @link https://api.ncloud-docs.com/docs/compute-vserver-server-common-getregionlist 액션을 통해 획득 가능
     * Default : getRegionList 조회 결과의 첫 번째 리전을 선택
     */
    regionCode?: string;

    /**
     * 반납 보호 여부를 설정할 블록 스토리지 인스턴스 번호
     * @link https://api.ncloud-docs.com/docs/compute-vserver-storage-getblockstorageinstancelist 액션을 통해 획득 가능
     */
    blockStorageInstanceNo: string;

    /**
     * 반납 보호 여부
     * Options : true | false
     */
    isReturnProtection: boolean;

    /**
     * 응답 결과의 포맷 타입
     * Options : xml | json
     * Default : xml
     */
    responseFormatType?: 'xml' | 'json';
};
