import { NcloudResponse } from './NcloudResponse';
import { SubnetList } from './SubnetList';

/**
 * 서브넷 목록을 조회하기 위한 응답 객체
 */
export interface GetSubnetListResponse extends NcloudResponse, SubnetList {}
