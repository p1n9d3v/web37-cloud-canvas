export type Dimension = '2d' | '3d';

export type Point = { x: number; y: number };

export type GridPoint = { col: number; row: number };

export type Size = { width: number; height: number; offset?: number };

export type ViewBox = Point & Size;

export type Bounds = Point & Size;

export type Node = {
    id: string;
    type: string;
    name: string;
    point: Point;
    size: {
        '2d': Size;
        '3d': Size;
    };
    properties: { [key: string]: any };
    connectors: { x: number; y: number }[];
    groupIds: string[];
};

export type Edge = {
    id: string;
    sourceNodeId: string;
    targetNodeId: string;
    bendPoints: { x: number; y: number }[];
};

export type Group = {
    id: string;
    type: string;
    name: string;
    nodeIds: string[];
    bounds: Bounds;
    properties: { [key: string]: any };
    childGroupIds: string[];
    parentGroupId?: string;
    // parentGroupId?: string;
};

// export type Group = {
//   id: string;
//   type: 'Region' | 'VPC' | 'Subnet' | 'SecurityGroup'; // 그룹 유형 명시
//   name: string;
//   nodes: string[]; // 그룹에 직접 속한 노드들의 ID
//   groups: string[]; // 하위 그룹들의 ID
//   parentGroupId?: string; // 상위 그룹의 ID (루트 그룹인 경우 없음)
//   bounds: { x: number; y: number; width: number; height: number };
//   properties: { [key: string]: any }; // 그룹별 속성 (CIDR 블록 등)
// };
