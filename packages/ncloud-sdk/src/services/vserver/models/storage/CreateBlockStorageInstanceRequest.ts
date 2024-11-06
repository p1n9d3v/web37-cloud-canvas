/**
 * 블록 스토리지 인스턴스 생성 요청 타입
 * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-storage-createblockstorageinstance}
 */
export type CreateBlockStorageInstanceRequest = {
    /**
     * 리전 코드
     * @link https://api.ncloud-docs.com/docs/compute-vserver-server-common-getregionlist 액션을 통해 획득 가능
     * Default : getRegionList 조회 결과의 첫 번째 리전을 선택
     */
    regionCode?: string;

    /**
     * ZONE 코드
     * @link https://api.ncloud-docs.com/docs/compute-vserver-server-common-getzonelist 액션을 통해 획득 가능
     * KVM 블록 스토리지인 경우 필수
     */
    zoneCode?: string;

    /**
     * 블록 스토리지 이름
     * Min : 3, Max : 30
     * 영어, 숫자, "-"의 특수문자만 허용하며 영어로 시작해야 함
     * 영어 또는 숫자로 끝나야 함
     */
    blockStorageName?: string;

    /**
     * 블록 스토리지 디스크 상세 유형 코드
     * XEN 블록 스토리지만 유효
     * Options : SSD | HDD
     * Default : SSD
     */
    blockStorageDiskDetailTypeCode?: 'SSD' | 'HDD';

    /**
     * 블록 스토리지 볼륨타입 코드
     * KVM 블록 스토리지는 필수
     * Options : SSD | HDD | FB1 | CB1
     */
    blockStorageVolumeTypeCode?: 'SSD' | 'HDD' | 'FB1' | 'CB1';

    /**
     * 서버 인스턴스 번호
     * XEN 블록 스토리지인 경우 필수
     * @link https://api.ncloud-docs.com/docs/compute-vserver-server-getserverinstancelist 액션을 통해 획득 가능
     */
    serverInstanceNo?: string;

    /** 블록 스토리지 스냅샷 인스턴스 번호 */
    blockStorageSnapshotInstanceNo?: string;

    /**
     * 블록 스토리지 사이즈
     * XEN : Min 10, Max 2000 GB
     * KVM : Min 10, Max 16380 GB
     * 10GB 단위 입력
     */
    blockStorageSize?: number;

    /** 생성할 블록 스토리지에 대한 설명 */
    blockStorageDescription?: string;

    /**
     * 반납 보호 여부
     * Options : true | false
     * Default : false
     */
    isReturnProtection?: boolean;

    /** 응답 포맷 */
    responseFormatType?: 'xml' | 'json';
};
