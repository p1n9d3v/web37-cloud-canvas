/**
 * 블록 스토리지 볼륨 사이즈 변경 요청 타입
 * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-storage-changeblockstoragevolumesize}
 */
export type ChangeBlockStorageVolumeSizeRequest = {
    /**
     * 리전 코드
     * 볼륨 사이즈를 변경할 블록 스토리지 인스턴스의 리전(Region) 결정 가능
     * @link https://api.ncloud-docs.com/docs/compute-vserver-server-common-getregionlist 액션을 통해 획득 가능
     * Default : getRegionList 조회 결과의 첫 번째 리전을 선택
     */
    regionCode?: string;

    /**
     * 볼륨 사이즈를 변경할 블록 스토리지 인스턴스 번호
     * @link https://api.ncloud-docs.com/docs/compute-vserver-storage-getblockstorageinstancelist 액션을 통해 획득 가능
     */
    blockStorageInstanceNo: string;

    /**
     * 변경할 블록 스토리지 사이즈
     * Min : 10, Max : 2000 GB
     * 10GB 단위 입력
     * 볼륨 사이즈는 확대만 가능하며, 축소 기능은 제공하지 않음
     * @link https://guide.ncloud-docs.com/docs/compute-compute-13-1 참조
     */
    blockStorageSize: number;

    /**
     * 응답 결과의 포맷 타입
     * Options : xml | json
     * Default : xml
     */
    responseFormatType?: 'xml' | 'json';
};
