/**
 * Subnet 객체
 */
export interface Subnet {
    /**
     * Subnet 번호.
     * Subnet을 식별하기 위한 네이버 클라우드 플랫폼의 식별자.
     *
     * Required
     */
    subnetNo: string;

    /**
     * VPC 번호.
     *
     * Required
     */
    vpcNo: string;

    /**
     * 존 코드.
     *
     * Required
     */
    zoneCode: string;

    /**
     * Subnet 이름.
     *
     * Required
     */
    subnetName: string;

    /**
     * IP 주소 범위.
     *
     * Required
     */
    subnet: string;

    /**
     * Subnet 상태
     *
     * {@link CommonCode}<br>
     *
     * Required
     * - INIT: Initiated
     * - CREATING: Creating
     * - RUN: Run
     * - TERMTING: Terminating
     */
    subnetStatus: CommonCode;

    /**
     * 생성 일시(YYYY-MM-DDThh:mm:ssZ)
     *
     * Optional
     */
    createDate: Date;

    /**
     * Subnet 구분
     *
     * {@link CommonCode}<br>
     *
     * Required
     * - PUBLIC: Internet Gateway 전용 Y
     * - PRIVATE: Internet Gateway 전용 N
     */
    subnetType: CommonCode;

    /**
     * 용도 구분
     *
     * {@link CommonCode}<br>
     *
     * Optional
     * - GEN: 일반
     * - LOADB: 로드 밸런서 전용
     * - BM: 베어 메탈 전용
     * - NATGW: NAT Gateway 전용
     */
    usageType: CommonCode;

    /**
     * Network ACL 번호
     *
     * Optional
     */
    networkAclNo: string;
}

/**
 * CommonCode 객체
 * 추후 통합할 때 Common 폴더로 뺄 예정
 */
export interface CommonCode {
    /**
     * 5자리 이내의 코드
     *
     * Required
     * @example INIT, CREAT, RUN, NSTOP
     */
    code: string;

    /**
     * 코드에 해당하는 코드 이름
     *
     * Required
     * @example INIT 상태, 생성, 운영, 정상 정지
     */
    codeName: string;
}
