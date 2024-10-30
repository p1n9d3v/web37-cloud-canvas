import { Subnet } from './Subnet';

/**
 * 서브넷 생성을 위한 응답 객체
 */
export interface CreateSubnetResponse {
    /**
     * 조회된 목록의 총 개수.
     * 페이징 처리 요청의 경우 전체 개수.
     *
     * Required
     */
    totalRows: number;

    /**
     * List<Subnet> 데이터 타입.
     *
     * Required
     */
    subnetList: Subnet[];
}
