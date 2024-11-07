/**
 * 블록 스토리지 인스턴스 할당 요청 타입
 * @see {@link https://api.ncloud-docs.com/docs/compute-vserver-storage-attachblockstorageinstance}
 */
export type AttachBlockStorageInstanceRequest = {
    /**
     * 리전 코드
     * 서버 인스턴스에 할당할 블록 스토리지 인스턴스의 리전(Region) 결정 가능
     * @link https://api.ncloud-docs.com/docs/compute-vserver-server-common-getregionlist 액션을 통해 획득 가능
     * Default : getRegionList 조회 결과의 첫 번째 리전을 선택
     */
    regionCode?: string;

    /**
     * 블록 스토리지 인스턴스 번호
     * 서버 인스턴스에 할당할 블록 스토리지 인스턴스 번호 결정
     * @link https://api.ncloud-docs.com/docs/compute-vserver-storage-getblockstorageinstancelist 액션을 통해 획득 가능
     */
    blockStorageInstanceNo: string;

    /**
     * 서버 인스턴스 번호
     * 블록 스토리지 인스턴스가 할당될 서버 인스턴스 결정
     * @link https://api.ncloud-docs.com/docs/compute-vserver-server-getserverinstancelist 액션을 통해 획득 가능
     */
    serverInstanceNo: string;

    /**
     * 응답 결과의 포맷 타입
     * Options : xml | json
     * Default : xml
     */
    responseFormatType?: 'xml' | 'json';
};
