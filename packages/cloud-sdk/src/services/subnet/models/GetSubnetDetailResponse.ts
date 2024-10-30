import { NcloudResponse } from './NcloudResponse';
import { SubnetList } from './SubnetList';

/**
 * 서브넷 상세 정보 조회를 위한 응답 객체
 */
export interface GetSubnetDetailResponse extends NcloudResponse, SubnetList {}
