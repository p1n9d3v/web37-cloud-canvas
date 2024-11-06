import { NcloudResponse } from './NcloudResponse';
import { SubnetList } from './SubnetList';

/**
 * 서브넷 상세 정보 조회를 위한 응답 객체
 * @extends NcloudResponse
 * @extends SubnetList
 */
export interface GetSubnetDetailResponse extends NcloudResponse, SubnetList {}
