/**
 * 블록 스토리지 볼륨 타입 리스트 조회 요청 타입
 * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-storage-getblockstoragevolumetypelist}
 */
export type GetBlockStorageVolumeTypeListRequest = {
    /**
     * 리전 코드
     * 블록 스토리지 볼륨타입 리스트가 조회될 리전(Region) 결정 가능
     * @link https://api.ncloud-docs.com/docs/compute-vserver-server-common-getregionlist 액션을 통해 획득 가능
     * Default : getRegionList 조회 결과의 첫 번째 리전을 선택
     */
    regionCode?: string;

    /**
     * ZONE 코드
     * 블록 스토리지 볼륨타입 리스트가 조회될 존(zone) 결정 가능
     * @link https://api.ncloud-docs.com/docs/compute-vserver-server-common-getzonelist 액션을 통해 획득 가능
     */
    zoneCode?: string;

    /**
     * 블록 스토리지 볼륨타입 코드 리스트
     * 블록 스토리지 볼륨타입 코드로 필터링하여 검색 가능
     * @link https://api.ncloud-docs.com/docs/compute-vserver-storage-getblockstoragevolumetypelist 액션을 통해 획득 가능
     */
    blockStorageVolumeTypeCodeList?: string[];

    /**
     * 하이퍼바이저타입 코드 리스트
     * 하이퍼바이저 타입 코드로 필터링하여 검색 가능
     * @link https://api.ncloud-docs.com/docs/compute-vserver-server-common-gethypervisortypelist 액션을 통해 획득 가능
     * Options : XEN | KVM
     */
    hypervisorTypeCodeList?: Array<'XEN' | 'KVM'>;

    /**
     * 서버스펙코드
     * 서버스펙코드로 필터링하여 검색 가능
     * @link https://api.ncloud-docs.com/docs/compute-vserver-server-common-getserverspeclist 액션을 통해 획득 가능
     */
    serverSpecCode?: string;

    /**
     * 기본 스토리지 가능 여부
     */
    isBaseStorageAvailable?: boolean;

    /**
     * 응답 결과의 포맷 타입
     * Options : xml | json
     * Default : xml
     */
    responseFormatType?: 'xml' | 'json';
};
